export const DECK = [
    { suit: "C", rank: "A" },
    { suit: "C", rank: "2" },
    { suit: "C", rank: "3" },
    { suit: "C", rank: "4" },
    { suit: "C", rank: "5" },
    { suit: "C", rank: "6" },
    { suit: "C", rank: "7" },
    { suit: "C", rank: "8" },
    { suit: "C", rank: "9" },
    { suit: "C", rank: "10" },
    { suit: "C", rank: "J" },
    { suit: "C", rank: "Q" },
    { suit: "C", rank: "K" },
    { suit: "D", rank: "A" },
    { suit: "D", rank: "2" },
    { suit: "D", rank: "3" },
    { suit: "D", rank: "4" },
    { suit: "D", rank: "5" },
    { suit: "D", rank: "6" },
    { suit: "D", rank: "7" },
    { suit: "D", rank: "8" },
    { suit: "D", rank: "9" },
    { suit: "D", rank: "10" },
    { suit: "D", rank: "J" },
    { suit: "D", rank: "Q" },
    { suit: "D", rank: "K" },
    { suit: "H", rank: "A" },
    { suit: "H", rank: "2" },
    { suit: "H", rank: "3" },
    { suit: "H", rank: "4" },
    { suit: "H", rank: "5" },
    { suit: "H", rank: "6" },
    { suit: "H", rank: "7" },
    { suit: "H", rank: "8" },
    { suit: "H", rank: "9" },
    { suit: "H", rank: "10" },
    { suit: "H", rank: "J" },
    { suit: "H", rank: "Q" },
    { suit: "H", rank: "K" },
    { suit: "S", rank: "A" },
    { suit: "S", rank: "2" },
    { suit: "S", rank: "3" },
    { suit: "S", rank: "4" },
    { suit: "S", rank: "5" },
    { suit: "S", rank: "6" },
    { suit: "S", rank: "7" },
    { suit: "S", rank: "8" },
    { suit: "S", rank: "9" },
    { suit: "S", rank: "10" },
    { suit: "S", rank: "J" },
    { suit: "S", rank: "Q" },
    { suit: "S", rank: "K" },
];

export function shuffleDeck(deck: { suit: string; rank: string; }[]) {
    const copyDeck = deck;
    for (let i = copyDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copyDeck[i];
        copyDeck[i] = copyDeck[j];
        copyDeck[j] = temp;
    }
    return copyDeck;
}


