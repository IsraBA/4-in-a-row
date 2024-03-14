import { useEffect, useState } from 'react'
import Cell from '../../../Cell/Cell'
import styles from '../../../app.module.css'
import redTag from '../../../assets/תג אדום.png'
import yelTag from '../../../assets/תג צהוב.png'
import newGameBT2 from '../../../assets/newGame2.png'
import OnlineTimer from '../../../Timer/OnlineTimer';
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom'
import './leave.css'
import PopUp from '../../../PopUp/PopUp'

function OnlinePublic() {

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
  const [roomId, setRoomId] = useState('');
  const [waiting, setWaiting] = useState(true);
  const [player, setPlayer] = useState('');
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    socket.connect();
    socket.emit('joinStrangersGame');

    return () => {
      socket.disconnect();
    };
  }, []);


  socket.on('strangersGameWaiting', (roomDetails) => {
    console.log(roomDetails)
    setRoomId(roomDetails.roomId);
  })

  socket.on('strangersGameJoined', (roomDetails) => {
    console.log(roomDetails)
    // בדיקה אם השחקן הנוכחי הוא היוצר של החדר
    const isCreator = roomDetails.creatorId === socket.id;
    // קביעת הצבע שלו על פי זה
    const playerColor = isCreator ? 'red' : 'yellow';
    setPlayer(playerColor);
    console.log("this player is " + playerColor);
    setRoomId(roomDetails.roomId);
    setWaiting(false);
  })

  socket.on('playerDisconnected', (playerId) => {
    // TODO: לשים כאן התראה שהשחקן השני התנתק
    if (!winner) {
      setMessage(true);
    }
  })

  socket.on('gameState', (data) => {
    // console.log(data);
    setAnimatingC(data.animatingC);
    setAnimatingR(data.animatingR);
    setTimeout(() => {
      setTurn(data.currentPlayerIndex);
      setBoard(data.newBoard);
      setAnimatingR(null);
      setAnimatingC(null);
    }, 300);
  })

  socket.on('gameOver', ({ winner, fourInaRow }) => {
    // console.log({ winner, fourInaRow });
    setWinner(winner);
    setFourInaRow(fourInaRow);
    socket.emit('leave', { roomId });
    socket.disconnect();
  });


  const dropPiece = (cIndex) => {
    if (winner) return;
    if (turn === 0 && player == 'red') {
      socket.emit('move', { roomId, cIndex });
    } else if (turn === 1 && player == 'yellow') {
      socket.emit('move', { roomId, cIndex });
    } else { return };
  };

  const exit = () => {
    if (winner) {
      nav('/');
    } else {
      socket.emit('leave', { roomId });
      socket.disconnect();
      nav('/');
    }
    // setBoard([
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0],
    // ]);
    // setWinner(null);
    // setFourInaRow([]);
    // setTurnP1(true);
    // setYellowTime(false);
    // setRedTime(false);
    // setRunningYellow(false);
    // setRunningRed(false);
  };

  const markCell = (cIndex, col = []) => {
    if (winner) return;
    if (animatingC || animatingR) return;
    if (turn === 0 && player == 'red') {
      let cellToMark = col.findIndex(cell => cell === 1 || cell === 2);
      let newBoard = [...board];
      if (cellToMark === -1) {
        newBoard[cIndex][5] = 3
        setBoard(newBoard);
      } else {
        let newBoard = [...board];
        newBoard[cIndex][cellToMark - 1] = 3
        setBoard(newBoard);
      }
    } else if (turn === 1 && player == 'yellow') {
      let cellToMark = col.findIndex(cell => cell === 1 || cell === 2);
      let newBoard = [...board];
      if (cellToMark === -1) {
        newBoard[cIndex][5] = 4
        setBoard(newBoard);
      } else {
        let newBoard = [...board];
        newBoard[cIndex][cellToMark - 1] = 4
        setBoard(newBoard);
      }
    } else { return };
  };
  const unMarkCell = (cIndex, col = []) => {
    if (winner) return;
    let cellToUnMark = col.findIndex(cell => cell === 3 || cell === 4);
    if (cellToUnMark === -1) return;
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
      {waiting ? <span style={{ color: "white" }}>ממתין לשחקן נוסף</span> : <>
        <header>
          <img src="https://stuntsoftware.com/img/4inarow/title.png" alt="4 in a row" />
          <div className={styles.headerInfo}>
            {/* // טיימרים */}
            <div className={styles.timers}>
              <OnlineTimer
                title={"זמן לאדום"}
                time={redTime}
                color={"red"}
                tag={redTag} />
              <OnlineTimer
                title={"זמן לצהוב"}
                time={yellowTime}
                color={"yellow"}
                tag={yelTag} />
            </div>
            {/* תגית ניצחון */}
            <h2 className={winner ? styles.winner : styles.hide}>
              <img src={winner == "צהוב" ? yelTag : winner == "אדום" ? redTag : ""} alt="tag" />
              <span>ניצחון ל{winner}</span>
            </h2>
            {/* כפתור יציאה דינאמי */}
            {winner ?
              <button className={styles.newGame} onClick={exit}>
                <img src={newGameBT2} alt="כפתור יציאה" />
                <span>חזרה ללובי</span>
              </button> :
              <div className='leave' onClick={exit}>
                <button className='Btn'>
                  <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                  <div class="text">יציאה</div>
                </button>
              </div>
            }
          </div>
        </header>
        <span className={styles.divider}></span>
        <main>
          {message && <PopUp msg={<span>השחקן השני התנתק,<br/> ניצחת טכנית</span>} click={()=>nav('/')} clickMsg={"חזרה לדף הבית"}/>}
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
                        className={`${animatingR == index && animatingC == i && turn === 0 ? styles.dropRed :
                          animatingR == index && animatingC == i && turn === 1 ? styles.dropYellow :
                            fourInaRow.length > 0 && check4(i, index) && winner == 'אדום' ? styles.popRedPiece :
                              fourInaRow.length > 0 && check4(i, index) && winner == 'צהוב' ? styles.popYelPiece :
                                ""
                          }`}></div>
                      <Cell col={i} row={index} board={board} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </main></>
      }
    </div>
  )
}

export default OnlinePublic
