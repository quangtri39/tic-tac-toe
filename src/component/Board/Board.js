import Square from "../Square/Square";
import "./Board.css";
export default function Board({ squares, handleClick }) {
  function renderSquare(index) {
    return (
      <Square
        value={squares[index]}
        onClick={() => {
          handleClick(index);
        }}
      />
    );
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
