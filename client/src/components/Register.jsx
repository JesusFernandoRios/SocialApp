
import React, {useState} from 'react'
import './styling/register.css'
import Axios from '../axios.js'
import { useStateValue } from '../utils/StateProvider'
import {useHistory} from 'react-router-dom'
import { useEffect } from 'react'


export default function Register() {

    const history = useHistory()
    const [{users} , dispatch] = useStateValue()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    

    function onSubmit (e){
        e.preventDefault()
        Axios.post('/api/user/register', {
            name: name,
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
            
            localStorage.setItem("name", response.data.user)
            dispatch({
                type: "SET_USER",
                users:response.data.user,
                
            })
            if(response.statusText === "OK") history.push('/dashboard')
        })
    }

return (
    <div>
        <div className="register__container">

            <form onSubmit={onSubmit}className="login__form">
                <h2 className="login">Register</h2>

                <input className="email__form" 
                type="text" 
                placeholder="name" 
                onChange={(e) => {
                setName(e.target.value)}}
                />

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

                <button type="submit" id="login__button">Register</button>

            </form>
        </div>
    </div>
    )
}
