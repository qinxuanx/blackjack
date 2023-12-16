import { useEffect, useState } from "react";
import { createShuffledDeck } from "./Deck";

const Game = () => {
  const [playerChips, setPlayerChips] = useState(1000);
  const [playerBidAmount, setPlayerBidAmount] = useState(0);

  const [currentDeck, setCurrentDeck] = useState<{ suit: string; rank: string }[]>([]);
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);

  const [playerCards, setPlayerCards] = useState<{ suit: string; rank: string }[]>([]);
  const [dealerCards, setDealerCards] = useState<{ suit: string; rank: string }[]>([]);

  // Game states
  const [isPlayerBidding, setIsPlayerBidding] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isDealerTurn, setIsDealerTurn] = useState(false);

  useEffect(() => {
    console.log("Player bid amount: ", playerBidAmount);
    console.log("Player chips left: ", playerChips);
  }, [playerBidAmount, playerChips]);

  useEffect(() => {
    console.log("Current shuffled deck: ", currentDeck);
  }, [currentDeck]);

  useEffect(() => {
    console.log("Player cards: ", playerCards);
    console.log("Dealer cards: ", dealerCards);
  }, [playerCards, dealerCards]);

  // Player has set their bid amount, start the game and go to player's turn
  function handleBid() {
    if (playerBidAmount <= 0) {
      alert("You must bid something!");
      return;
    }
    if (playerBidAmount > playerChips) {
      alert("You don't have enough chips!");
      return;
    }
    setPlayerChips(playerChips - playerBidAmount);

    const newDeck = createShuffledDeck();
    // console.log("Current shuffled deck: ", currentDeck);
    setCurrentDeck(newDeck);

    // Deal to player and dealer
    setPlayerCards([newDeck[0], newDeck[2]]);
    setDealerCards([newDeck[1], newDeck[3]]);
    setCurrentDeckIndex(4);

    setIsPlayerBidding(false); // Update game state
    setIsPlayerTurn(true);
    setIsDealerTurn(false);
  }

  function handleHit() {
    const newPlayerCards = [...playerCards, currentDeck[currentDeckIndex]];
    setPlayerCards(newPlayerCards);
    setCurrentDeckIndex(currentDeckIndex + 1);
  }

  function handleStand() {
    setIsPlayerTurn(false);
    setIsDealerTurn(true);
  }

  return (
    <>
      {isPlayerBidding && (
        <>
          <label>Current Chips: {playerChips}</label>
          <br />
          <input
            type="number"
            id="playerBid"
            placeholder="Enter your bid"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                setPlayerBidAmount(value);
              } else {
                setPlayerBidAmount(0);
              }
            }}
          />
          <br />
          <button onClick={() => handleBid()}>Bid</button>
        </>
      )}
      {isPlayerTurn && (
        <>
          <label>Player Cards:</label>
          <br />
          {playerCards.map((card, index) => (
            <p key={index}>
              {card.suit} {card.rank}
            </p>
          ))}

          <label>Dealer Cards</label>
          <br />
          {dealerCards.map((card, index) => (
            <p key={index}>
              {card.suit} {card.rank}
            </p>
          ))}
          <button onClick={() => handleHit()}>Hit</button>
          <button onClick={() => handleStand()}>Stand</button>
        </>
      )}
    </>
  );
};

export default Game;
