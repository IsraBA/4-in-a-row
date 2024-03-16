import React from 'react'
import './WaitingGif.css'
import styles from './Waiting.module.css'
import { useNavigate } from 'react-router-dom';
import { socket } from '../gameModes/multiPlayer/socket';

export default function Waiting({ msg }) {

    const nav = useNavigate();

    const handleLeave = () => {
        let roomId = localStorage.roomId;
        socket.emit('leave', { roomId });
        socket.disconnect();
        delete localStorage.roomId;
        delete localStorage.playerId;
        nav('/');
    };

    return (
        <div className={styles.waitingScreen}>
            <img className={styles.image} src="https://stuntsoftware.com/img/4inarow/title.png" alt="4 in a row" />
            <p>{msg}</p>
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle class="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 660" stroke-dashoffset="-330" stroke-linecap="round"></circle>
                <circle class="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 220" stroke-dashoffset="-110" stroke-linecap="round"></circle>
                <circle class="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
                <circle class="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" stroke-width="20" stroke-dasharray="0 440" stroke-linecap="round"></circle>
            </svg>
            <button className="cancelBtn" onClick={handleLeave}>
                <span>ביטול</span>
            </button>
        </div>
    )
}
