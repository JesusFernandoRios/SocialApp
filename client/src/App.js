import React from 'react'
import './App.css';
import Header from './components/Header'
import DisplayCard from './components/DisplayCard'
import SwipeButtons from './components/SwipeButtons'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <Header/>
      {/* display cards */}
      <DisplayCard/>
      {/* buttons */}
      <SwipeButtons/>
    </div>
  );
}

export default App;
