import "./App.css";
import Card from "./Card";
import { DECK, shuffleDeck } from "./Deck";
import Game from "./Game";

function App() {
  const deck = DECK;
  console.log(deck);

  return (
    <>
      <div>
        <Game />
      </div>
    </>
  );
}

export default App;
