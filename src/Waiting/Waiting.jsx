import React from 'react'
import './WaitingGif.css'
import styles from './Waiting.module.css'
import { useNavigate } from 'react-router-dom';
import { socket } from '../gameModes/multiPlayer/socket';
import JoinLink from '../gameModes/multiPlayer/OnlinePrivate/JoinLink';

export default function Waiting({ msg, link }) {

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
            <p className={styles.message}>{msg}</p>
            <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
                <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
            </svg>
            {link && <JoinLink link={link} />}
            <button className="cancelBtn" onClick={handleLeave}>
                <span>ביטול</span>
            </button>
        </div>
    )
}
