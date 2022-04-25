const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

const { WHITELSIT_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

async function main() {
  const whitelistContract = WHITELSIT_CONTRACT_ADDRESS;

  const memtadataURL = METADATA_URL;

  const cryptoDevContract = await ethers.getContractFactory("CryptoDevs");

  const deployedCryptoDevsContract = await cryptoDevContract.deploy(
    memtadataURL,
    whitelistContract
  );

  await deployedCryptoDevsContract.deployed();

  console.log(
    "Crypto Devs Contract Address: ",
    deployedCryptoDevsContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
