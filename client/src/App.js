import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import DisplayCard from './components/DisplayCard';
import Header from './components/Header'
import SwipeButtons from './components/SwipeButtons'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/chat'>
            <Header/>
            <ChatRoom/>
          </Route>
          <Route path='/'>
            {/* Header */}
            <Header/>
            {/* display cards */}
            <DisplayCard/>
            {/* buttons */}
            <SwipeButtons/>
            {/* user info */}
          </Route>
        </Switch>
    </Router>
      
  );
}

export default App;
