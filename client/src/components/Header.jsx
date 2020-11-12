import React from 'react'
import './styling/header.css'
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import ForumIcon from '@material-ui/icons/Forum';
import {useAuth0} from '@auth0/auth0-react'


export default function Header() {
    return (
        <div className='header'>
            <IconButton onClick = {() => loginWithRedirect()}>
               <PersonIcon fontSize="large" className="header__icon"/> 
            </IconButton>
            
            <img 
            className="header__logo"
            src="http://pngimg.com/uploads/github/github_PNG46.png" alt="logo"
            />

            <IconButton>
                <ForumIcon fontSize="large" className="header__icon"/>
            </IconButton>


        </div>
    )
}
