"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { abi } from "../../../../solidity-test/artifacts/contracts/NoahToken.sol/NoahToken.json";
import { ethers, JsonRpcSigner, BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0xc70c6C5D048C7202d0Bed51F073bBc32ac55F068";

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider>();
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState<BigInt>(BigInt(0));
  const [accounts, setAccounts] = useState<JsonRpcSigner[]>([]);
  const [owner, setOwner] = useState<string>("");
  const [currentMintPrice, setCurrentMintPrice] = useState<BigInt>(BigInt(0));

  const [mintedAmount, setMintedAmount] = useState(BigInt(0));
  const [maxSupply, setMaxSupply] = useState(BigInt(0));
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        // 切换到 Ganache 网络
        const localNetwork = {
          chainId: "0x539", // 1337 的十六进制，也就是 Ganache 的 chainId
          chainName: "Ganache Local Network",
          rpcUrls: ["http://localhost:7545"], // Ganache 的 RPC 地址
          nativeCurrency: {
            name: "Ganache ETH",
            symbol: "ETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://ganache.etherscan.io"],
        };

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: localNetwork.chainId }],
          });
        } catch (switchError: any) {
          // 如果没有添加网络，就添加网络
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [localNetwork], // 添加的网络信息
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(switchError);
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const getMintingInfo = async () => {
          const contract = new ethers.Contract(contractAddress, abi, provider);
          const mintedAmount = await contract.mintedAmount();
          const maxSupply = await contract.maxSupply();
          const owner = await contract.owner();
          const currentMintPrice = await contract.mintPrice();
          setMintedAmount(mintedAmount);
          setMaxSupply(maxSupply);
          setOwner(owner);
          setCurrentMintPrice(currentMintPrice);
          const ratioBigInt = (mintedAmount * BigInt(100)) / maxSupply;
          const progress = Number(ratioBigInt);
          setProgress(progress);
        };
        if (provider) {
          getMintingInfo();
        }
      } else {
        alert("请安装 MetaMask");
      }
    })();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      alert("请安装 MetaMask");
      return;
    }
    const network = await provider.getNetwork();
    console.log("当前网络：", network);

    const accounts = await provider.listAccounts();
    setAccounts(accounts);
    const account = accounts[0];
    setWalletAddress(await account.getAddress());

    const newSigner = await provider.getSigner();
    setSigner(newSigner);

    const contract = new ethers.Contract(contractAddress, abi, newSigner);
    const balance: BigInt = await contract.balanceOf(account);
    setBalance(balance);
  };

  const handleMint = async () => {
    if (!signer) {
      console.log("Please connect your wallet first!");
      return;
    }

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const mintTx = await contract.mint(walletAddress, 1, {
      gasLimit: 300000,
      value: currentMintPrice,
    });

    console.log("Minting...", mintTx.hash);
    await mintTx.wait();
    console.log("Minted", mintTx.hash);
  };

  return (
    <div>
      <Head>
        <title>Mint NoahToken</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">NoahToken</h1>

        <div className="max-w-xl w-full bg-gray-200 h-4 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="my-2">合约地址 : {contractAddress}</p>
        <p className="my-2">合约拥有者 : {owner}</p>
        <p className="my-2">当前 Mint 价格 : {currentMintPrice.toString()}</p>

        <p className="mt-2 flex gap-4">
          <span>总发行量 : {maxSupply.toString()}</span>
          <span>已 Mint :{mintedAmount.toString()}</span>
        </p>

        {walletAddress ? (
          <div>
            <p className="my-2">余额 : {balance.toString()}</p>
            <p className="my-2">钱包地址 : {walletAddress}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleMint}
            >
              Mint
            </button>
          </div>
        ) : (
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={connectWallet}
          >
            连接钱包
          </button>
        )}
      </main>
    </div>
  );
}
