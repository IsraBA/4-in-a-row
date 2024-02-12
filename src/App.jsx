import { useEffect, useState } from 'react'
import Cell from './Cell/Cell'
import styles from './app.module.css'
import Timer from './Timer/Timer';
import redTag from '../public/תג אדום.png'
import yelTag from '../public/תג צהוב.png'
import newGameBT from '../public/newGame.png'
import newGameBT2 from '../public/newGame2.png'

function App() {

  const [turnP1, setTurnP1] = useState(true);
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // [0][0][0][0][0][0][0]
    [0, 0, 0, 0, 0, 0],  // 
  ])
  const [animatingR, setAnimatingR] = useState(null);
  const [animatingC, setAnimatingC] = useState(null);
  const [fourInaRow, setFourInaRow] = useState([]);
  const [redTime, setRedTime] = useState(0);
  const [yellowTime, setYellowTime] = useState(0);
  const [runningRed, setRunningRed] = useState(false);
  const [runningYellow, setRunningYellow] = useState(false);

  const dropPiece = (cIndex, col = []) => {
    if (winner) return;
    let cellToFill = col.findIndex(cell => cell === 1 || cell === 2);
    if (cellToFill == 0) return;
    if (cellToFill === -1) {
      setAnimatingR(5);
      setAnimatingC(cIndex);
      setTimeout(() => {
        let newBoard = [...board];
        if (turnP1) {
          newBoard[cIndex][5] = 1,
            setTurnP1(false),
            setRunningYellow(true),
            setRunningRed(false)
        } else {
          newBoard[cIndex][5] = 2,
            setTurnP1(true),
            setRunningYellow(false),
            setRunningRed(true)
        };
        setBoard(newBoard);
        check(board);
        setAnimatingR(null);
        setAnimatingC(null);
      }, 300);
    } else {
      setAnimatingR(cellToFill - 1);
      setAnimatingC(cIndex);
      setTimeout(() => {
        let newBoard = [...board];
        if (turnP1) {
          newBoard[cIndex][cellToFill - 1] = 1,
            setTurnP1(false),
            setRunningYellow(true),
            setRunningRed(false)
        }
        else {
          newBoard[cIndex][cellToFill - 1] = 2,
            setTurnP1(true),
            setRunningYellow(false),
            setRunningRed(true)
        };
        setBoard(newBoard);
        check(board);
        setAnimatingR(null);
        setAnimatingC(null);
      }, 300);
    }
  };

  const numToPlayer = (num) => {
    if (num == 1) { return "אדום" }
    else if (num == 2) { return "צהוב" };
  };

  const check = (board = []) => {
    // בדיקה אופקית
    if (checkHorizontal(board)) {
      return true;
    }

    // בדיקה אנכית
    if (checkVertical(board)) {
      return true;
    }

    // בדיקה אלכסונית
    if (checkDiagonal(board)) {
      return true;
    }

    return false;
  };

  const checkHorizontal = (board) => {
    for (let rowI = 0; rowI < 6; rowI++) {
      for (let colI = 0; colI < 4; colI++) {
        if (board[colI][rowI] !== 0) {
          if (
            board[colI][rowI] == board[colI + 1][rowI] &&
            board[colI][rowI] == board[colI + 2][rowI] &&
            board[colI][rowI] == board[colI + 3][rowI]
          ) {
            setWinner(numToPlayer(board[colI][rowI]));
            setFourInaRow([
              { colI, rowI },
              { colI: colI + 1, rowI },
              { colI: colI + 2, rowI },
              { colI: colI + 3, rowI }
            ]);
            setRunningYellow(false);
            setRunningRed(false);
            // console.log("Player " + numToPlayer(board[colI][rowI]) + " won");
            return true;
          }
        }
      }
    }
  };

  const checkVertical = (board) => {
    board.forEach((column, index) => {
      for (let i = 0; i < 3; i++) {
        if (column[i] !== 0) {
          if (
            column[i] == column[i + 1] &&
            column[i] == column[i + 2] &&
            column[i] == column[i + 3]
          ) {
            setWinner(numToPlayer(column[i]));
            setFourInaRow([
              { colI: index, rowI: i },
              { colI: index, rowI: i + 1 },
              { colI: index, rowI: i + 2 },
              { colI: index, rowI: i + 3 }
            ]);
            setRunningYellow(false);
            setRunningRed(false);
            // console.log("Player " + numToPlayer(column[i]) + " won");
            return true;
          }
        }
      }
    })
  };

  const checkDiagonal = (board) => {
    // בדיקה משמאל למעלה לימין למטה
    for (let colI = 0; colI < 4; colI++) {
      for (let rowI = 0; rowI < 3; rowI++) {
        if (board[colI][rowI] !== 0) {
          if (
            board[colI][rowI] == board[colI + 1][rowI + 1] &&
            board[colI][rowI] == board[colI + 2][rowI + 2] &&
            board[colI][rowI] == board[colI + 3][rowI + 3]
          ) {
            setWinner(numToPlayer(board[colI][rowI]));
            setFourInaRow([
              { colI, rowI },
              { colI: colI + 1, rowI: rowI + 1 },
              { colI: colI + 2, rowI: rowI + 2 },
              { colI: colI + 3, rowI: rowI + 3 }
            ]);
            setRunningYellow(false);
            setRunningRed(false);
            // console.log("Player " + numToPlayer(board[colI][rowI]) + " won");
            return true;
          }
        }
      }
    }
    // בדיקה מימין למעלה לשמאל למטה
    for (let colI = 6; colI > 2; colI--) {
      for (let rowI = 0; rowI < 3; rowI++) {
        if (board[colI][rowI] !== 0) {
          if (
            board[colI][rowI] == board[colI - 1][rowI + 1] &&
            board[colI][rowI] == board[colI - 2][rowI + 2] &&
            board[colI][rowI] == board[colI - 3][rowI + 3]
          ) {
            setWinner(numToPlayer(board[colI][rowI]));
            setFourInaRow([
              { colI, rowI },
              { colI: colI - 1, rowI: rowI + 1 },
              { colI: colI - 2, rowI: rowI + 2 },
              { colI: colI - 3, rowI: rowI + 3 }
            ]);
            setRunningYellow(false);
            setRunningRed(false);
            // console.log("Player " + numToPlayer(board[colI][rowI]) + " won");
            return true;
          }
        }
      }
    }
  };

  const newGame = () => {
    setBoard([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ]);
    setWinner(null);
    setFourInaRow([]);
    setTurnP1(true);
    setYellowTime(false);
    setRedTime(false);
    setRunningYellow(false);
    setRunningRed(false);
  };

  const markCell = (cIndex, col = []) => {
    if (winner) return;
    if (animatingC || animatingR) return;
    let cellToMark = col.findIndex(cell => cell === 1 || cell === 2);
    if (cellToMark === -1) {
      let newBoard = [...board];
      if (turnP1) { newBoard[cIndex][5] = 3 }
      else { newBoard[cIndex][5] = 4 };
      setBoard(newBoard);
    } else {
      let newBoard = [...board];
      if (turnP1) { newBoard[cIndex][cellToMark - 1] = 3 }
      else { newBoard[cIndex][cellToMark - 1] = 4 };
      setBoard(newBoard);
    }
  };
  const unMarkCell = (cIndex, col = []) => {
    if (winner) return;
    let cellToUnMark = col.findIndex(cell => cell === 3 || cell === 4);
    let newBoard = [...board];
    newBoard[cIndex][cellToUnMark] = 0;
    setBoard(newBoard);
  };

  const check4 = (colIndex, rowIndex) => {
    if (fourInaRow.some(obj => obj.colI == colIndex && obj.rowI == rowIndex)) {
      return true;
    } return false;
  };

  return (
    <div className={styles.app}>
      <header>
        {/* טיימרים */}
        <div>
          <img src="https://stuntsoftware.com/img/4inarow/title.png" alt="4 in a row" />
          <div className={styles.timers}>
            <Timer
              title={"זמן לאדום"}
              running={runningRed}
              setTime={setRedTime}
              time={redTime}
              color={"red"}
              tag={redTag} />
            <Timer
              title={"זמן לצהוב"}
              running={runningYellow}
              setTime={setYellowTime}
              time={yellowTime}
              color={"yellow"}
              tag={yelTag} />
          </div>
        </div>
        {/* תגית ניצחון */}
        <h2 className={winner ? styles.winner : styles.hide}>
          <img src={winner == "צהוב" ? yelTag : winner == "אדום" ? redTag : ""} alt="tag" />
          <span>ניצחון ל{winner}</span>
        </h2>
        <button className={styles.newGame} onClick={newGame}>
          <img src={newGameBT2} alt="משחק חדש" />
          <span>משחק חדש</span>
        </button>
      </header>
      <main>
        <table>
          <tbody>
            <tr className={`${fourInaRow.length > 0 && styles.darker}`}></tr>
            {board.map((column, i) => (
              <tr
                key={i}
                onClick={() => dropPiece(i, column)}
                onMouseOver={() => markCell(i, column)}
                onMouseOut={() => unMarkCell(i, column)}>
                {column.map((cell, index) => (
                  <td key={index}>
                    <div
                      className={`${animatingR == index && animatingC == i && turnP1 ? styles.dropRed :
                        animatingR == index && animatingC == i && !turnP1 ? styles.dropYellow :
                          fourInaRow.length > 0 && check4(i, index) && !turnP1 ? styles.popRedPiece :
                            fourInaRow.length > 0 && check4(i, index) && turnP1 ? styles.popYelPiece :
                              ""
                        }`}></div>
                    <Cell col={i} row={index} board={board} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default App
