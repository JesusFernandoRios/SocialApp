import React from 'react'
import './App.css';
import Header from './components/Header'
import DisplayCard from './components/DisplayCard'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <Header/>
      {/* display cards */}
      <DisplayCard/>
      {/* buttons */}
    </div>
  );
}

export default App;
