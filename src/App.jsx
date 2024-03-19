import React, { Suspense, useEffect, useState } from 'react'
import styles from './App.module.css'
import Local from './gameModes/Local/Local'
import { Route, Routes } from 'react-router-dom';
import OpenScreen from './OpenScreen'

const OnlinePublic = React.lazy(() => import('./gameModes/multiPlayer/OnlinePublic/index'))
const OnlinePrivate = React.lazy(() => import('./gameModes/multiPlayer/OnlinePrivate/index'))

function App() {

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<OpenScreen />} />
        <Route path='/onlinePublic' element={
          <Suspense fallback={<div>טוען...</div>}>
            <OnlinePublic />
          </Suspense>} />
        <Route path='/onlinePrivate' element={
          <Suspense fallback={<div>טוען...</div>}>
            <OnlinePrivate />
          </Suspense>} />
        <Route path='/onlinePrivate/:privateRoomId' element={
          <Suspense fallback={<div>טוען...</div>}>
            <OnlinePrivate />
          </Suspense>} />
        <Route path='/local' element={<Local />} />
      </Routes>
    </div>
  )
}

export default App
