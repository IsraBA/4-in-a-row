import React, { useState } from 'react'
import styles from './App.module.css'
import { NavLink } from 'react-router-dom';
import newGameBT2 from './assets/newGame2.png'


export default function OpenScreen() {

  const [gameMode, setgameMode] = useState();

    return (
        <header id={gameMode == "multiplayer" ? styles.multiplayer :
            gameMode == "local" ? styles.local : styles.select}>
            <img className={!gameMode && styles.bigImage}
                src="https://stuntsoftware.com/img/4inarow/title.png" alt="4 in a row" />
            <div className={styles.selectMode}>
                <NavLink className={styles.newGame} to={'/onlinePublic'}>
                    <img src={newGameBT2} alt="משחק אונליין" />
                    <span>משחק אונליין</span>
                </NavLink>
                <NavLink className={styles.newGame} to={'/onlinePrivate'}>
                    <img src={newGameBT2} alt="משחק אונליין פרטי" />
                    <span>משחק אונליין פרטי</span>
                </NavLink>
                <NavLink className={styles.newGame} to={'/local'}>
                    <img src={newGameBT2} alt="משחק מקומי" />
                    <span>משחק מקומי</span>
                </NavLink>
            </div>
        </header>
    )
}
