const hre = require("hardhat");

async function main() {
  const Game = await hre.ethers.getContractFactory("CardGame");
  const game = await Game.deploy();
  await game.waitForDeployment();  // 替代 .deployed()
  console.log("CardGame deployed to:", await game.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

