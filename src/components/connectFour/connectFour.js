import React, { useState, useEffect } from "react";
import "./connectFour.css";

const ConnectFour = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [boardArr, setBoardArr] = useState([]);
  const rows = 6;
  const cols = 7;

  // initialize board on render
  useEffect(() => {
    initBoard();
  }, []);

  // diaply game messages (could be handled in state instead)
  const messages = () => {
    if (gameOver) {
      return `Player ${currentPlayer} is the winner!`;
    }
    return `It's player ${currentPlayer}'s turn.`;
  };

  // reset state back to default and reset board
  const initBoard = () => {
    setCurrentPlayer(1);
    setGameOver(false);
    let board = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push(null);
      }
      board.push(row);
    }
    setBoardArr(board);
  };

  const GameBoard = () => {
    const Row = ({ row }) => {
      return (
        <tr>
          {row.map((cell, i) => (
            <Cell key={i} value={cell} columnIndex={i} />
          ))}
        </tr>
      );
    };
    const Cell = ({ value, columnIndex }) => {
      // change color of cell based on boardArr value
      let color = "white";
      let hovered = "";
      if (value === 1) {
        color = "red";
      } else if (value === 2) {
        color = "blue";
      }

      // change hovered className based on value (currentPlayer)
      if (value === "hovered-1") {
        hovered = "hovered-1";
      } else if (value === "hovered-2") {
        hovered = "hovered-2";
      } else {
        hovered = "";
      }

      return (
        <td>
          <div
            // render cell with submit function and moseEnter / mouseLeave for hover states
            className="cell"
            onClick={() => {
              submitPlay(columnIndex);
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              cellMouseOver(columnIndex);
            }}
            onMouseLeave={(e) => {
              cellMouseOut(columnIndex);
            }}
          >
            <div className={`white circle `}>
              <div className={`${color} circle ${hovered}`} />
            </div>
          </div>
        </td>
      );
    };

    return (
      <div className="table">
        <table border="0" cellSpacing="0" cellPadding="0">
          <tbody>
            {boardArr.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // set player state to reverse current value
  const switchPlayer = () => {
    currentPlayer === 1 ? setCurrentPlayer(2) : setCurrentPlayer(1);
  };

  // onsubmit, add current player to boardArr and check if current player won
  const submitPlay = (column) => {
    if (!gameOver) {
      for (let row = rows - 1; row >= 0; row--) {
        if (
          !boardArr[row][column] ||
          boardArr[row][column] === "hovered-1" ||
          boardArr[row][column] === "hovered-2"
        ) {
          boardArr[row][column] = currentPlayer;
          setBoardArr(boardArr);
          if (!checkWinner()) {
            switchPlayer();
          }
          break;
        }
      }
    }
  };

  // verify if currentPlayer won by checking all directions
  const checkWinner = () => {
    let vertical, horizontal, diagonal1, diagonal2;
    let winner = false;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const player = boardArr[r][c];
        if (player) {
          if (r <= 2) {
            vertical =
              player === boardArr[r + 1][c] &&
              player === boardArr[r + 2][c] &&
              player === boardArr[r + 3][c];
          }
          if (c <= 3) {
            horizontal =
              player === boardArr[r][c + 1] &&
              player === boardArr[r][c + 2] &&
              player === boardArr[r][c + 3];
          }
          if (r <= 2 && c <= 3) {
            diagonal1 =
              player === boardArr[r + 1][c + 1] &&
              player === boardArr[r + 2][c + 2] &&
              player === boardArr[r + 3][c + 3];
          }
          if (r >= 3 && c <= 3) {
            diagonal2 =
              player === boardArr[r - 1][c + 1] &&
              player === boardArr[r - 2][c + 2] &&
              player === boardArr[r - 3][c + 3];
          }
          if (vertical || horizontal || diagonal1 || diagonal2) {
            winner = boardArr[r][c];
            break;
          }
        }
      }
    }
    // set gameOver to true (disabled game board until reset)
    if (winner) {
      setGameOver(true);
      return winner;
    }
    return false;
  };

  // add hover class to first empty cell in column
  const cellMouseOver = (column) => {
    if (!gameOver) {
      for (let row = rows - 1; row >= 0; row--) {
        if (
          !boardArr[row][column] ||
          (!boardArr[row][column] === 1 && !boardArr[row][column] === 2)
        ) {
          const newArr = [...boardArr];
          newArr[row][column] = `hovered-${currentPlayer}`;
          setBoardArr(newArr);
          break;
        }
      }
    }
  };

  // remove all hover classes on mouseLeave of any cell
  const cellMouseOut = () => {
    if (!gameOver) {
      const newArr = [...boardArr];
      for (let row = rows - 1; row >= 0; row--) {
        for (let col = cols - 1; col >= 0; col--) {
          if (
            newArr[row][col] === "hovered-1" ||
            newArr[row][col] === "hovered-2"
          ) {
            newArr[row][col] = null;
          }
        }
      }
      setBoardArr(newArr);
    }
  };

  return (
    <div>
      <p>{messages()}</p>
      <GameBoard />
      <button className="resetGame-btn" onClick={initBoard}>
        Reset Game
      </button>
    </div>
  );
};

export default ConnectFour;
