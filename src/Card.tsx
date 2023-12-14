interface CardProps {
  suit: "C" | "D" | "H" | "S" | "back";
  rank?: "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
}

const Card = (cardProps: CardProps) => {
  if (cardProps.suit === "back") {
    return <img src="/src/assets/cards-svg/back.svg"></img>;
  }

  if (!cardProps.rank) {
    throw new Error("Rank must be provided with the suit");
  }
  return <img src={`/src/assets/cards-svg/${cardProps.rank}${cardProps.suit}.svg`}></img>;
};

export default Card;
