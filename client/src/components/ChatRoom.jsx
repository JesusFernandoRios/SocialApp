import React, {useState, useEffect} from 'react'
import './styling/chatroom.css'
import { io } from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import ScrollToBottom from 'react-scroll-to-bottom'

const socket = io("http://localhost:3001/");


function ChatRoom() {
    const [yourID, setYourId] = useState()
    const [TheirID, setTheirID] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [name, setName] = useState('');

    useEffect(() => {
        
        socket.on('your id', id => {
            if( id === socket.id){
                setYourId(id)
            }else{
                setTheirID(id)
            }
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
            name: name,
            body: message,
            id: yourID
        }

        setMessage("")
        setName("")

        socket.emit('send message', messageObject)
    }


    return (
        <div className="chat__container">
            <ScrollToBottom className="render__chat">
                    {messages.map((message, index) => {
                        if(message.id === yourID){
                            return (
                                <div className="rendered__chat" key={index}>
                                    <h3 className="rendered__name">{yourID}: <span className="rendered__message">{message.body}</span></h3>
                                </div>
                                
                            )
                        }
                        return (
                            <div className="their__chat" key={index}>
                                <h3 className="rendered__name">{TheirID}: <span className="their__message">{message.body}</span></h3>
                            </div>
                        )
                    })}
            </ScrollToBottom>
            
            <form onSubmit={onMessageSubmit}>
                <h2>Messenger</h2>
                <div className="chat__name">
                    <TextField name='name'
                    onChange={ e => onTextChange(e)}
                    value={name}
                    label="Name"
                    />
                </div>
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
