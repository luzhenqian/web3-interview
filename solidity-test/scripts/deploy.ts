import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("部署合约的账户:", deployer.address);

  const NoahToken = await ethers.getContractFactory("NoahToken");
  const noahToken = await NoahToken.deploy();

  await noahToken.waitForDeployment();

  const provider = deployer.provider;
  const balance = await provider.getBalance(noahToken);

  console.log("合约余额:", balance.toString());
  console.log("合约部署成功:", await noahToken.getAddress());

  const deployerBalance = await provider.getBalance(deployer.address);
  console.log("部署账户余额:", deployerBalance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
