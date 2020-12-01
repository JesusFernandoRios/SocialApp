import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import DisplayCard from './components/DisplayCard';
import Header from './components/Header'
import SwipeButtons from './components/SwipeButtons'
import User from './components/User'
import Account from './components/Account'
import ChatRoom from './components/ChatRoom'

function App() {
  return (
    <Router>
        <Switch>
          <Route path='/account'>
            <Account/>
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
            <User/>
          </Route>
        </Switch>
    </Router>
      
  );
}

export default App;
