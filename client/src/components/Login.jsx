import React, {useState} from 'react'
import './styling/login.css'
import Axios from '../axios.js'
import { useStateValue } from '../utils/StateProvider'
import {Link , useHistory} from 'react-router-dom'
import { useEffect } from 'react'


export default function Login() {
    const history = useHistory()
    const [{users} , dispatch] = useStateValue()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let user = localStorage.getItem("token")

        if(user) history.push('/dashboard')
    },[])

    function onSubmit (e){
        e.preventDefault()
        Axios.post('/api/user/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
            
            localStorage.setItem("token", response.data.token);
            dispatch({
                type: "SET_USER",
                users: response.data
                
            })
            if(response.statusText === "OK") history.push('/dashboard')
        })
    }

    return (
        <div className="login__container">

		    <form onSubmit={onSubmit}className="login__form">
                <h2 className="login">Login</h2>

                <input className="email__form" 
                type="text" 
                placeholder="email" 
                onChange={(e) => {
                    setEmail(e.target.value)}}
                />

                <input className="password__form"
                 type="password" 
                 placeholder="Password"
                 onChange={(e) => {
                     setPassword(e.target.value)
                 }}
                 />

			    <button type="submit" id="login__button">Login</button>

                <Link to='/register'>
                <button className='register__button'>Or Register Here</button>
                </Link>
		    </form>

        </div>

    )
}
