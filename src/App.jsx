import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import styles from './app.module.css'
import Local from './gameModes/Local/Local'
import OnlinePublic from './gameModes/multiPlayer/OnlinePublic/index'
import OnlinePrivate from './gameModes/multiPlayer/OnlinePrivate/index'
import { NavLink, Route, Routes } from 'react-router-dom';
import OpenScreen from './OpenScreen'

function App() {

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<OpenScreen />} />
        <Route path='/onlinePublic' element={<OnlinePublic />} />
        <Route path='/onlinePrivate' element={<OnlinePrivate />} />
        <Route path='/local' element={<Local />} />
      </Routes>
    </div>
  )
}

export default App
