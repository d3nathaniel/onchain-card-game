### **Card Game - README**

[English](README.md) | [简体中文](README_zh-CN.md) | [日本語](README_ja.md) | [繁體中文](README_zh-Hant.md)

#### **Overview**

This is a simple card drawing game based on Solidity and Hardhat. Players pay `0.01 ETH` to draw a card. Each time a player draws, they receive one card, which will be added to their collection. Players can view their collection at any time to check which cards they have drawn.

#### **Environment Requirements**

* Node.js (recommended version `v16.x` or above)
* npm (Node.js package manager, usually installed with Node.js)
* Hardhat (Solidity development framework)
* Metamask (for managing Ethereum accounts and interacting with the blockchain)

---

### **Deployment and Running Steps**

#### **1. Clone the Project**

```bash
git clone <repository-url>
cd <project-directory>
```

#### **2. Install Dependencies**

In the project directory, install the required dependencies:

```bash
npm install
```

#### **3. Configure Hardhat**

* Edit `hardhat.config.js` to configure the network and contract settings.
* If using a test network (e.g., Rinkeby), configure the Infura or Alchemy API key and your wallet private key.

#### **4. Compile the Contract**

Run the following command to compile the Solidity contracts:

```bash
npx hardhat compile
```

#### **5. Deploy the Contract**

Create and run the deployment script to deploy the contract to the specified network:

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

* If deploying to another network (e.g., Rinkeby), use:

```bash
npx hardhat run scripts/deploy.js --network rinkeby
```

#### **6. Start the Game**

Run the interaction script to play the game. This script provides command-line interaction, allowing players to input commands to draw cards, view their collection, and more:

```bash
npx hardhat run scripts/play.js --network hardhat
```

Players can input the following commands to interact with the game:

* **`draw`**: Draw a card.
* **`view`**: View the player's card collection.
* **`exit`**: Exit the game.

#### **7. Frontend Interaction with the Contract (Optional)**

If you have a frontend application, you can interact with the contract using `ethers.js`, displaying card information and implementing game functionality.

#### **8. Test the Contract (Optional)**

You can use Hardhat's testing framework to test the contract logic. Run the following command to execute tests:

```bash
npx hardhat test
```

---

### **Game Rules**

* **Drawing Fee**: Each card draw costs `0.01 ETH`.
* **Card Pool Size**: The card pool has a limited number of cards. Each time a player draws a card, the pool's card count decreases.
* **Card Collection**: Each card drawn is added to the player's collection, and players can view the cards they have drawn.
* **Game End**: When the card pool is exhausted, players can no longer draw cards, and the game ends.

---

### **Game Commands**

- `draw`: Draw a new card (maximum 5 cards)
- `view`: View your card collection
- `accounts`: List all available accounts
- `switch <index>`: Switch to a different account (e.g., `switch 1` to switch to account #1)
- `exit`: Exit the game

## Multiple Players

The game supports multiple players through different Ethereum accounts. Each account has its own card collection. Use the `accounts` command to see available accounts and `switch <index>` to change between them.

## Reset Your Cards

---

### **Future Expansions**

* **Victory Conditions**: Currently, there are no specific victory conditions. You can add features like reaching a certain number of cards or a specific combination of cards to win.
* **Card Attributes**: Add attributes to each card (e.g., attack power, health points) to increase the game's complexity.
* **Multiplayer Battles**: Add multiplayer functionality to allow players to compete against each other.

---

### **Conclusion**

By following these steps, you can deploy and run this card drawing game based on Solidity locally and interact with the smart contract. You can also expand and optimize the game’s features as needed.

---

**Q: How are ID and Power in this game different from traditional playing cards?**  
**A:**

- **ID**: It's a unique identifier for each card, incremented from 1 in the order cards are created. Unlike traditional cards, it's not related to suit or rank.
- **Power**: A randomly generated value between 0 and 99 that represents a card’s strength. In standard cards, values like A=1 (or 14), K=13 are fixed and non-random.

**Why the difference?**

- Traditional playing cards have a fixed deck of 52 cards.
- This blockchain game allows unlimited card generation with randomized Power values.

**Want to make it more like traditional cards?**

You can limit Power to 1-13 and add a “suit” field (e.g., 0-3 representing spades, hearts, clubs, diamonds).

