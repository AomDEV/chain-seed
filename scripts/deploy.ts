// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const signers = (await ethers.getSigners());
  const deployer = signers[0];

  // We get the contract to deploy
  const ChainSeed = await ethers.getContractFactory("ChainSeed");
  const chainSeed = await ChainSeed.deploy();

  await chainSeed.deployed();

  console.log("ChainSeed deployed to:", chainSeed.address);

  const trusted = await chainSeed.addTrustedSource([
    "0x298619601ebCd58d0b526963Deb2365B485Edc74", //BNBUSD
    "0x5e66a1775BbC249b5D51C13d29245522582E671C", //BTCUSD
    "0xbe75E0725922D78769e3abF0bcb560d1E2675d5d", //ETHUSD
    "0x887f177CBED2cf555a64e7bF125E1825EB69dB82", //BUSDBNB
    "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526", //CAKEUSD
    "0x1a602D4928faF0A153A520f58B332f9CAFF320f7", //LINKUSD
    "0x5741306c21795FdCBb9b265Ea0255F499DFe515C", //USDTUSD
    "0x5ea7D6A33D3655F661C298ac8086708148883c34", //DOTUSD
    "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa", //BUSDUSD
    "0x81faeDDfeBc2F8Ac524327d70Cf913001732224C", //COMPUSD
    "0xB8eADfD8B78aDA4F85680eD96e0f50e1B5762b0a", //LTCUSD
    "0x0630521aC362bc7A19a4eE44b57cE72Ea34AD01c", //USDCUSD
    "0xE4eE17114774713d2De0eC0f035d4F7665fc025D", //AAVEUSD
    "0x2939E0089e61C5c9493C2013139885444c73a398", //BCHUSD
    "0x963D5e7f285Cc84ed566C486c3c1bC911291be38", //DOGEUSD
    "0xEA8731FD0685DB8AeAde9EcAE90C4fdf1d8164ed", //SXPUSD
    "0x6C2441920404835155f33d88faf0545B895871b1", //UNIUSD
    "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7", //YFIUSD
    "0x17308A18d4a50377A4E1C37baaD424360025C74D", //ADAUSD
  ]);
  await trusted.wait();
  console.log(`addTrustedSource:`, trusted.hash);

  const whitelist = await chainSeed.grantWhitelist(deployer.address, true);
  await whitelist.wait();
  console.log(`grantWhitelist:`, whitelist.hash);

  const firstSeed = await chainSeed.randomSeed();
  await firstSeed.wait();
  console.log(firstSeed);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
