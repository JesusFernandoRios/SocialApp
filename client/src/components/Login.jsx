import React from 'react'
import './styling/login.css'
import Axios from '../axios.js'

export default function Login() {
    return (
        <div className="login__container">

		    <form className="login__form">
                <h2 className="login">Login</h2>
                <input className="email__form"type="email" placeholder="email"/>
			    <input className="password__form" type="password" placeholder="Password"/>
			    <button type="submit" id="login__button">Login</button>
		    </form>
        </div>
    )
}
