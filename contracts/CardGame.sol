// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CardGame {
    struct Card {
        uint id;
        uint power;
    }

    mapping(address => Card[]) public playerCards;
    uint public nextCardId = 1;

    function drawCard() external {
        require(playerCards[msg.sender].length < 5, "Max 5 cards");
        uint power = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nextCardId))) % 100;
        playerCards[msg.sender].push(Card(nextCardId, power));
        nextCardId++;
    }

    function getCards(address player) external view returns (Card[] memory) {
        return playerCards[player];
    }
}

