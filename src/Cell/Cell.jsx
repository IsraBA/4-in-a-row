import React, { useEffect, useState } from 'react'
import styles from './Cell.module.css'

export default function Cell({ board = [], col = 0, row = 0, animating }) {

    const [color, setColor] = useState();

    useEffect(() => {
        if (board[col][row] == 1) {
            setColor("red")
        } else if (board[col][row] == 2) {
            setColor("yellow")
        } else if (board[col][row] == 3) {
            setColor("lowRed")
        } else if (board[col][row] == 4) {
            setColor("lowYellow")
        } else { setColor() }
    }, [board]);



    return (
        <div
            className={styles.cell}
            id={color == "red" ? styles.red :
                color == "yellow" ? styles.yellow :
                    color == "lowRed" ? styles.lowRed :
                        color == "lowYellow" ? styles.lowYellow : ""}>
        </div>
    )
}
