import React, {useState, useEffect} from 'react'
import './styling/chatroom.css'
import { io } from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

const socket = io("http://localhost:3001/");


function ChatRoom() {
    const [yourID, setYourId] = useState()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        
        socket.on('your id', id => {
            setYourId(id)
        })

        socket.on('message', message => {
            receivedMessage(message)
        })
    })


    // functions

    function receivedMessage (message) {
        setMessages( oldMsgs => [...oldMsgs, message])
    }

    function onTextChange(res) {
        setMessage(res.target.value)
    }

    function onMessageSubmit(e) {
        e.preventDefault()
        
        const messageObject = {
            body: message,
            id: yourID
        }

        setMessage("")

        socket.emit('send message', messageObject)
    }

    // function renderChat() {
    //     return messages.map((message, index) => (
    //         <div className="rendered__chat" key={index}>
    //             <h3 className="rendered__name">Name: <span className="rendered__message">{message.body}</span></h3>
    //         </div>
    //     ))
    // }


    return (
        <div className="chat__container">
            <div className="render__chat">
                {messages.map((message, index) => {
                    if(message.id === yourID){
                        return (
                            <div className="rendered__chat" key={index}>
                                <h3 className="rendered__name">Name: <span className="rendered__message">{message.body}</span></h3>
                            </div>
                        )
                    }
                    return (
                        <div className="rendered__chat" key={index}>
                            <h3 className="rendered__name">Name: <span className="their__message">{message.body}</span></h3>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={onMessageSubmit}>
                <h2>ChatBox</h2>
                <div className="chat__message">
                    <TextField
                    name="message"
                    onChange={onTextChange}
                    value={message}
                    label="Say something..."
                    id="outlined-multiline-static"
                    variant="outlined"
                    fullWidth
                    />
                </div>
                <button> Send </button>
            </form>

        </div>
    )
}

export default ChatRoom
