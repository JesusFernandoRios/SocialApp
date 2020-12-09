import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import DisplayCard from './components/DisplayCard';
import Header from './components/Header'
import SwipeButtons from './components/SwipeButtons'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'
import Register from './components/Register'
import { useStateValue } from './utils/StateProvider';

function App() {

  const [{ users }, dispatch] = useStateValue()

  useEffect(() => {
    let user = localStorage.getItem('LoginToken')

    if(user){
      dispatch({
        type:'SET_USER',
        users: user
      })
    }else{
      dispatch({
        type:'SET_USER',
        users:null
      })
    }

  },[])


  return (
    <Router>
        <Switch>
          <Route path={users ? '/dashboard' : '/'}>
            {/* Header */}
            <Header/>
            {/* display cards */}
            <DisplayCard/>
            {/* buttons */}
            <SwipeButtons/>
            {/* user info */}
          </Route>
          <Route path={users ? '/chat' : '/'}>
            <Header/>
            <ChatRoom/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/'>
            <Login/>
          </Route>
        </Switch>
    </Router>
      
  );
}

export default App;
