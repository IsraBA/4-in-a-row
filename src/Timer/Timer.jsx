import React, { useEffect } from 'react'
import styles from './Timer.module.css'

export default function Timer({ title, running, setTime, time, color, tag }) {

    // טיימר
    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime(pervTime => pervTime + 10);
            }, 10);
        }
        else if (!running) {
            clearInterval(interval);

        }
        return () => clearInterval(interval);
    }, [running])




    return (
        <div className={`${color == "red" ? styles.red : color == "yellow" ? styles.yellow : ""}`}>
            <span className={styles.title}>
                {title}:
            </span>
            <div className={styles.timeBox}>
                <img src={tag} alt="tag" />
                <span className={styles.time}>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
                </span>
            </div>
        </div>
    )
}
