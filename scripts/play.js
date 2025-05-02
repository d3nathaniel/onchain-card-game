  //const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace this after deploy


const hre = require("hardhat");
const readline = require("readline");

async function main() {
  const [player] = await hre.ethers.getSigners();
  //const address = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace this after deploy
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace this after deploy
  const Game = await hre.ethers.getContractFactory("CardGame");
  const game = await Game.attach(address);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt("Enter command (draw, view, exit): ");
  rl.prompt();

  rl.on("line", async (line) => {
    switch (line.trim()) {
      case "draw":
        const tx = await game.drawCard();
        await tx.wait();
        console.log("You drew a card!");
        break;
      case "view":
        try {
          const cards = await game.getCards(player.address);
          console.log("Your cards:", cards.map(c => `ID: ${c.id.toString()}, Power: ${c.power.toString()}`));
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
        break;
      case "exit":
        rl.close();
        return;
      default:
        console.log("Unknown command.");
    }
    rl.prompt();
  });
}

main();

