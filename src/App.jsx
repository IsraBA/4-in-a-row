import React, { Suspense, useEffect, useState } from 'react'
import styles from './app.module.css'
import Local from './gameModes/Local/Local'
// import OnlinePublic from './gameModes/multiPlayer/OnlinePublic/index'
import OnlinePrivate from './gameModes/multiPlayer/OnlinePrivate/index'
import { NavLink, Route, Routes } from 'react-router-dom';
import OpenScreen from './OpenScreen'

const OnlinePublic = React.lazy(() => import('./gameModes/multiPlayer/OnlinePublic/index'))

function App() {

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<OpenScreen />} />
        <Route path='/onlinePublic' element={
          <Suspense fallback={<div>טוען...</div>}>
            <OnlinePublic />
          </Suspense>} />
        <Route path='/onlinePrivate' element={<OnlinePrivate />} />
        <Route path='/local' element={<Local />} />
      </Routes>
    </div>
  )
}

export default App
