  //const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace this after deploy


const hre = require("hardhat");
const readline = require("readline");

async function main() {
  const signers = await hre.ethers.getSigners();
  let currentPlayerIndex = 0;
  let player = signers[currentPlayerIndex];
  
  const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 替换为你的合约地址
  const Game = await hre.ethers.getContractFactory("CardGame");
  const game = await Game.attach(address);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(`Currently playing as: ${player.address} (Account ${currentPlayerIndex})`);
  rl.setPrompt("Enter command (draw, view, switch, accounts, exit): ");
  rl.prompt();

  rl.on("line", async (line) => {
    const args = line.trim().split(' ');
    const command = args[0];

    switch (command) {
      case "draw":
        try {
          const cards = await game.getCards(player.address);
          if (cards.length >= 5) {
            console.log("You already have 5 cards (maximum). Cannot draw more cards.");
          } else {
            const tx = await game.connect(player).drawCard();
            await tx.wait();
            console.log("You drew a card!");
          }
        } catch (error) {
          console.error("Error drawing card:", error.message);
        }
        break;
      case "view":
        try {
          const cards = await game.getCards(player.address);
          console.log("Your cards:", cards.map(c => `ID: ${c.id.toString()}, Power: ${c.power.toString()}`));
        } catch (error) {
          console.error("Error fetching cards:", error);
        }
        break;
      case "switch":
        try {
          if (args.length < 2) {
            console.log("Please specify the account index: switch <index>");
            break;
          }
          const newIndex = parseInt(args[1]);
          if (isNaN(newIndex) || newIndex < 0 || newIndex >= signers.length) {
            console.log(`Invalid index. Please choose a number between 0 and ${signers.length - 1}`);
            break;
          }
          currentPlayerIndex = newIndex;
          player = signers[currentPlayerIndex];
          console.log(`Switched to account: ${player.address} (Account ${currentPlayerIndex})`);
        } catch (error) {
          console.error("Error switching account:", error.message);
        }
        break;
      case "accounts":
        try {
          console.log("Available accounts:");
          signers.forEach((signer, index) => {
            console.log(`[${index}] ${signer.address}${index === currentPlayerIndex ? ' (current)' : ''}`);
          });
        } catch (error) {
          console.error("Error listing accounts:", error.message);
        }
        break;
      case "exit":
        rl.close();
        return;
      default:
        console.log("Unknown command. Available commands: draw, view, switch, accounts, exit");
    }
    rl.prompt();
  });
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
