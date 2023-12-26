import { ethers, parseUnits } from "ethers";
import { abi } from "../artifacts/contracts/NoahToken.sol/NoahToken.json";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const CONTRACT_ABI = abi;

const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
const walletA = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const walletAWithProvider = walletA.connect(provider);
const erc20Contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  walletAWithProvider
);

async function distributeTokens(
  walletAddresses: WalletAddress[],
  amountPerWallet: bigint
) {
  for (const address of walletAddresses) {
    try {
      console.log(
        `正在分发 ${amountPerWallet} 代币到地址 ${address.publicKey}...`
      );
      let nonce = await provider.getTransactionCount(walletA.address);
      const tx = await erc20Contract.transfer(
        address.publicKey,
        amountPerWallet,
        {
          from: walletA.address,
          gasLimit: 100000,
          gasPrice: 1000000000,
          nonce: nonce++,
        }
      );
      await tx.wait();
      console.log(
        `已经成功分发 ${amountPerWallet} 代币到地址 ${address.publicKey}！`
      );

      console.log(`账号 ${address.publicKey} 开始 mint...`);
      await erc20Contract.mint(address.publicKey, parseUnits("1.0", 18), {
        from: walletA.address,
        gasLimit: 100000,
        gasPrice: 1000000000,
        nonce: nonce++,
      });
      console.log(`账号 ${address.publicKey} mint 成功！`);
    } catch (error) {
      console.error(error);
    }
  }
}

type WalletAddress = {
  publicKey: string;
  privateKey: string;
};

const walletAddresses: WalletAddress[] = [
  {
    publicKey: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    privateKey:
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  },
  {
    publicKey: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    privateKey:
      "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
  },
  // ... 其他地址
];

distributeTokens(walletAddresses, parseUnits("1.0", 18))
  .then(() => console.log("所有地址都已经分发完毕！"))
  .catch((error) => console.error(error));
