import "./App.css";
import "./types.d.ts";
import Board from "./components/Board.tsx";

function App() {
  const letters: Letter[] = [
    { text: "ש", value: 3 },
    { text: "ג", value: 8 },
    { text: "ה", value: 1 },
    { text: "ו", value: 1 },
    { text: "ע", value: 5 },
    { text: "ת", value: 1 },
    { text: "ש", value: 3 },
  ];

  const myLetters = letters.map((letter) => {
    return (
      <div className="my-letters-letter">
        <h1>{letter.text}</h1>
        <h3>{letter.value}</h3>
      </div>
    );
  });

  return (
    <div className="scrabble-grid">
      <Board />
      <div className="scrabble-grid-col">
        <div className="scrabble-instructions">
          <h1>Instructions: </h1>
          <h2>1: Choose a location</h2>
          <h2>2: Choose a direction</h2>
          <h2>3: Enter your word</h2>
        </div>
        <div className="scrabble-my-letters">{myLetters}</div>
      </div>
    </div>
  );
}

export default App;
