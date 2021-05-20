import Board from "../Board/Board";
import { useState } from "react";
import { calculateWinner } from "../../fcHelper/fcHelper";
import "./Game.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

export default function Game() {
  // History ex:
  //  [
  //    [ null, null, null, null, 'X', null, null, null, null, ],
  //    [ null, null, null, null, 'X', null, null, null, 'O', ]
  //  ]
  const [state, setstate] = useState({
    history: [Array(9).fill(null)],
    stepNumber: 0,
    xIsNext: true,
  });
  // const {history, stepNumber, xIsNext} = state;

  const currentSquares = state.history[state.stepNumber];
  const winner = calculateWinner(currentSquares);
  const showClearButton = winner || state.history.length > 9;

  let status;
  if (winner) {
    status = `Winner player: ${winner}`;
  } else if (state.history.length > 9) {
    status = `Draw game`;
  } else {
    status = `Next player: ${state.xIsNext ? "X" : "O"}`;
  }

  const handleClick = (index) => {
    if (winner || currentSquares[index]) {
      return;
    }
    const newSquares = [...currentSquares];
    const newHistory = state.history.slice(0, state.stepNumber + 1);

    newSquares[index] = state.xIsNext ? "X" : "O";
    setstate({
      history: [...newHistory, newSquares],
      stepNumber: state.stepNumber + 1,
      xIsNext: !state.xIsNext,
    });
  };
  function clearGame() {
    setstate({
      history: [Array(9).fill(null)],
      stepNumber: 0,
      xIsNext: true,
    });
  }

  function jumpTo(step) {
    setstate({
      ...state, //Spread syntax
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  const moves = state.history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move} className="mb-1">
        <Button variant="secondary" onClick={() => jumpTo(move)}>
          {desc}
        </Button>
      </li>
    );
  });

  return (
    <div className="game d-flex justify-content-center p-5">
      <div className="game-board">
        <Board squares={currentSquares} handleClick={handleClick} />
      </div>
      <div className="game-info mr-3">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
      {showClearButton ? (
        <Button variant="primary" onClick={clearGame}>
          Clear Game
        </Button>
      ) : null}
    </div>
  );
}
