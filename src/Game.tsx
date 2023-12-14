import { useState } from "react";

const Game = () => {
  const [playerChips, setPlayerChips] = useState(1000);
  const [playerBidAmount, setPlayerBidAmount] = useState(0);

  return (
    <>
      <label>Current Chips: {playerChips}</label>
      <br></br>
      <input placeholder="Enter your bid" />
      <button onClick={() => setPlayerBidAmount(playerBidAmount + 1)}>Bid</button>
    </>
  );
};

export default Game;
