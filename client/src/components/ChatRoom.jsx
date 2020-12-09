import React, {useState, useEffect} from 'react'
import './styling/chatroom.css'
import { io } from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useStateValue } from '../utils/StateProvider'

const socket = io("http://localhost:3001/");


function ChatRoom() {
    const [{users}] = useStateValue()
    const [yourID, setYourId] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('');

    useEffect(() => {
        
        let userName = localStorage.getItem('name')

        setName(userName)

        socket.on('your id', id => {
            setYourId(id)
        })

        socket.on('message', message => {
            receivedMessage(message)
        })

    },[])

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


    return (
        <div className="chat__container">
            <ScrollToBottom className="render__chat">
                    {messages.map((message, index) => {
                        if(message.id === yourID){
                            return (
                                <div className="rendered__chat" key={index}>
                                    <h3 className="rendered__name">{name}: <span className="rendered__message">{message.body}</span></h3>
                                </div>
                                
                            )
                        }
                        return (
                            <div className="their__chat" key={index}>
                                <h3 className="rendered__name">message: <span className="their__message">{message.body}</span></h3>
                            </div>
                        )
                    })}
            </ScrollToBottom>
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
