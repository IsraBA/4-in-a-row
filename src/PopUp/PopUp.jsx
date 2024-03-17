import React from 'react'
import styles from './PopUp.module.css'

export default function PopUp({ msg, click, clickMsg }) {
  return (
    <div className={styles.PopUp}>
      <div>
        <img className={styles.image} src="https://stuntsoftware.com/img/4inarow/title.png" alt="4 in a row" />
        <p>{msg}</p>
        <button id={styles.PopUpBtn} onClick={click}><span>{clickMsg}</span></button>
      </div>
    </div>
  )
}
