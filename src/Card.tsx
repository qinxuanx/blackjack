interface CardProps {
  suit: string;
  rank?: string;
}

const validSuits = ["C", "D", "H", "S", "back"];
const validRanks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const Card = (cardProps: CardProps) => {
  if (!validSuits.includes(cardProps.suit)) {
    throw new Error("Invalid suit: " + cardProps.suit);
  }

  if (cardProps.suit === "back") {
    return <img src="/src/assets/cards-svg/back.svg"></img>;
  }

  if (!cardProps.rank) {
    throw new Error("Rank must be provided with the suit " + cardProps.suit);
  }

  if (!validRanks.includes(cardProps.rank)) {
    throw new Error("Invalid rank: " + cardProps.rank);
  }

  return <img src={`/src/assets/cards-svg/${cardProps.rank}${cardProps.suit}.svg`}></img>;
};

export default Card;
