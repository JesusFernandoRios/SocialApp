import React from 'react'
import './styling/header.css'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import { useAuth0 } from '@auth0/auth0-react'
import {Link} from 'react-router-dom'

export default function Header() {
    const {loginWithRedirect,logout, user } = useAuth0();
    return (
        <div className='header'>
            <IconButton onClick = { !user ?() => loginWithRedirect(): () => logout()}>
               <PersonIcon fontSize="large" className="header__icon"/> 
            </IconButton>

            <Link to="/account">
            Account
            </Link>
            
            <img 
            className="header__logo"
            src="http://pngimg.com/uploads/github/github_PNG46.png" alt="logo"
            />

            <Link to="chat">
                <IconButton>
                    <ForumIcon fontSize="large" className="header__icon"/>
                </IconButton>
            </Link>


        </div>
    )
}
