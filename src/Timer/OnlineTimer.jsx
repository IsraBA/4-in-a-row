import React, { useEffect } from 'react'
import styles from './Timer.module.css'

export default function OnlineTimer({ title, time, color, tag }) {

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    
        return `${minutes}:${remainingSeconds}`;
    }

    return (
        <div className={`${color == "red" ? styles.red : color == "yellow" ? styles.yellow : ""}`}>
            <span className={styles.title}>
                {title}:
            </span>
            <div className={styles.timeBox}>
                <img src={tag} alt="tag" />
                <span className={styles.time}>
                    {formatTime(time)}
                </span>
            </div>
        </div>
    )
}
