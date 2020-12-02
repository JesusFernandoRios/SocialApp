import React, {useState} from 'react'
import './styling/login.css'
import Axios from '../axios.js'


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function onSubmit (e){
        e.preventDefault()
        Axios.post('/api/user/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
            if(response.data){
                localStorage.setItem('token', response.data)
            }

        })
    }

    function sendData(e){
        e.preventDefault()
        
    }

    console.log(email)
    console.log(password)

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
		    </form>

            <button onClick={sendData}>get data </button>
        </div>

    )
}
