import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Routes/Home.tsx'
import ComingSoon from './Routes/ComingSoon.tsx'
import NowPlaying from './Routes/NowPlaying.tsx'
import Header from './Components/Header.tsx'
import Popular from './Routes/Popular.tsx'
import Footer from './Components/Footer.tsx'

function App () {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/comingsoon' element={<ComingSoon />} />
        <Route path='/nowplaying' element={<NowPlaying />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
