import { useEffect, useState } from "react";
import { createShuffledDeck, getTotalCardsValue, TEST_DECK } from "./DeckUtils";
import Card from "./Card";

const Game = () => {
  const [playerChips, setPlayerChips] = useState(1000);
  const [playerBetAmount, setPlayerBetAmount] = useState(0);

  const [currentDeck, setCurrentDeck] = useState<{ suit: string; rank: string }[]>([]);
  const [currentDeckIndex, setCurrentDeckIndex] = useState(0);

  const [playerCards, setPlayerCards] = useState<{ suit: string; rank: string }[]>([]);
  const [dealerCards, setDealerCards] = useState<{ suit: string; rank: string }[]>([]);

  const [playerCardsValue, setPlayerCardsValue] = useState(0);
  const [dealerCardsValue, setDealerCardsValue] = useState(0);

  const [gameMessage, setGameMessage] = useState("");

  enum GameState {
    Betting,
    PlayerTurn,
    DealerTurn,
    RoundOver,
    GameOver,
  }
  const [currentGameState, setCurrentGameState] = useState(GameState.Betting);

  useEffect(() => {
    console.log("Player bid amount: ", playerBetAmount);
    console.log("Player chips left: ", playerChips);
  }, [playerBetAmount, playerChips]);

  useEffect(() => {
    console.log("Current shuffled deck: ", currentDeck);
  }, [currentDeck]);

  useEffect(() => {
    console.log("Player cards: ", playerCards);
    console.log("Dealer cards: ", dealerCards);
  }, [playerCards, dealerCards]);

  // Player has set their bet amount, start the game and go to player's turn
  function handleBet() {
    if (playerBetAmount <= 0) {
      alert("You must bet something!");
      return;
    }
    if (playerBetAmount > playerChips) {
      alert("You don't have enough chips!");
      return;
    }
    setPlayerChips(playerChips - playerBetAmount);

    const newDeck = createShuffledDeck();
    //const newDeck = TEST_DECK;
    setCurrentDeck(newDeck);

    // Deal to player and dealer
    const newPlayerCards = [newDeck[0], newDeck[2]];
    const newPlayerCardsValue = getTotalCardsValue(newPlayerCards);
    setPlayerCards(newPlayerCards);
    setPlayerCardsValue(newPlayerCardsValue);
    const newDealerCards = [newDeck[1], newDeck[3]];
    const newDealerCardsValue = getTotalCardsValue(newDealerCards);
    setDealerCards(newDealerCards);
    setDealerCardsValue(newDealerCardsValue);
    setCurrentDeckIndex(4);

    if (newPlayerCardsValue === 21 || newDealerCardsValue === 21) {
      if (newPlayerCardsValue === 21 && newDealerCardsValue === 21) {
        setGameMessage("Both players have blackjack! It's a DRAW!");
        setPlayerChips(playerChips + playerBetAmount);
      } else if (newPlayerCardsValue > newDealerCardsValue) {
        setGameMessage("You have blackjack! You WIN!");
        setPlayerChips(playerChips + playerBetAmount * 2 + Math.floor(playerBetAmount / 2));
      } else {
        setGameMessage("Dealer has blackjack! You LOSE!");
      }
      setCurrentGameState(GameState.RoundOver);
      return;
    }

    setCurrentGameState(GameState.PlayerTurn);
  }

  function handleHit() {
    const newPlayerCards = [...playerCards, currentDeck[currentDeckIndex]];
    const newPlayerCardsValue = getTotalCardsValue(newPlayerCards);

    setPlayerCards(newPlayerCards);
    setPlayerCardsValue(newPlayerCardsValue);
    setCurrentDeckIndex(currentDeckIndex + 1);

    if (newPlayerCardsValue > 21) {
      setGameMessage("You bust! You LOSE!");
      setCurrentGameState(GameState.RoundOver);
    }
  }

  function handleStand() {
    setCurrentGameState(GameState.DealerTurn);

    let tempDealerCardsValue = dealerCardsValue;
    let tempDeckIndex = currentDeckIndex;
    const newDealerCards = [...dealerCards];

    while (tempDealerCardsValue < 17) {
      newDealerCards.push(currentDeck[tempDeckIndex]);
      tempDealerCardsValue = getTotalCardsValue(newDealerCards);
      tempDeckIndex++;
    }
    setDealerCards(newDealerCards);
    setDealerCardsValue(tempDealerCardsValue);
    setCurrentDeckIndex(tempDeckIndex);

    if (tempDealerCardsValue > 21) {
      setGameMessage("Dealer busts! You WIN!");
    } else if (tempDealerCardsValue > playerCardsValue) {
      setGameMessage("Dealer wins!");
    } else if (tempDealerCardsValue < playerCardsValue) {
      setGameMessage("YOU WIN!");
      setPlayerChips(playerChips + playerBetAmount * 2);
    } else {
      setGameMessage("It's a draw!");
      setPlayerChips(playerChips + playerBetAmount);
    }
    setCurrentGameState(GameState.RoundOver);
  }

  function handleNextRound() {
    setCurrentGameState(GameState.Betting);
    setPlayerBetAmount(0);
    setCurrentDeckIndex(0);
    setGameMessage("");
  }

  return (
    <>
      {currentGameState === GameState.Betting && (
        <>
          <label>Current Chips: {playerChips}</label>
          <br />
          {playerChips > 0 && (
            <>
              <input
                type="number"
                placeholder="Enter your bid"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setPlayerBetAmount(value);
                  } else {
                    setPlayerBetAmount(0);
                  }
                }}
              />
              <br />
              <button onClick={() => handleBet()}>Bid</button>
            </>
          )}
          {playerChips <= 0 && (
            <>
              <label>You have no more chips! Game over!</label>
              <br />
              <label>Refresh the page to restart</label>
            </>
          )}
        </>
      )}

      {currentGameState != GameState.Betting && (
        <>
          {gameMessage} <br />
          <label>Player Cards: {playerCardsValue}</label>
          <br />
          {playerCards.map((card, index) => (
            <Card key={index} suit={card.suit} rank={card.rank} />
          ))}
          <br />
          <label>Dealer Cards: {dealerCardsValue}</label>
          <br />
          {dealerCards.map((card, index) => (
            <Card key={index} suit={card.suit} rank={card.rank} />
          ))}
          <br />
          {currentGameState != GameState.RoundOver && (
            <>
              <button onClick={() => handleHit()}>Hit</button>
              <button onClick={() => handleStand()}>Stand</button>
            </>
          )}
          {currentGameState === GameState.RoundOver && (
            <>
              <button onClick={() => handleNextRound()}>Next Round</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Game;
