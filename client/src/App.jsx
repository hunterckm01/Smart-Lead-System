import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home';
import ToCheck from './pages/ToCheck';
import './App.css'
import Verified from './pages/Verified';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element = {<Home/>}></Route>
      <Route path="/to-check" element = {<ToCheck/>}></Route>
      <Route path="/verified" element = {<Verified/>}></Route>
    </Routes>
    </>
  );
}

export default App
