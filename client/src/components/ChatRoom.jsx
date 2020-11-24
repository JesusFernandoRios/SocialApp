import React, {useState, useEffect} from 'react'
import './styling/chatroom.css'
import Grid from '@material-ui/core/Grid';
import { io } from 'socket.io-client'
import TextField from '@material-ui/core/TextField'

const socket = io("http://localhost:3001/");


function ChatRoom() {

    const [state, setState] = useState({message: '', name: ''})
    const [chat, setChat] = useState([])

    useEffect(() => {
        
        socket.on('connect', () => {
            console.log("this is the socket id" + socket.id)
            
        })

        socket.on('message', ({name, message}) => {
            console.log("this is the socket id" + socket.id)

            setChat([...chat, {name, message}])
            
        })
    })


    // functions
    const onTextChange = (res) => {
        console.log(res)
        setState({...state, [res.target.name]: res.target.value})
    }

    const onMessageSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(state)
        
        const {name, message} = state
        socket.emit('message', {name, message})
        setState({message:'', name})
    }

    const renderChat = () => {
        return chat.map(({name, message,}, index) => (
            <div key={index}>
                <h3>{name}: <span>{message}</span></h3>
            </div>
        ))
    }


    return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        className="chatRoom__container"
        >
            <form onSubmit={onMessageSubmit}>
                <h2>ChatBox</h2>
                <div className="name__field">
                    <TextField
                    name="name"
                    onChange={ res=> onTextChange(res)}
                    value={state.name}
                    label="Name
                    "/>
                </div>
                <div>
                    <TextField
                    name="message"
                    onChange={res => onTextChange(res)}
                    value={state.message}
                    label="Message"
                    id="outlined-multiline-static"
                    variant="outlined"
                    />
                </div>
                <button> Send </button>
            </form>

            <div className="render__chat">
                <h1>ChatLog</h1>
                {renderChat()}
            </div>

        </Grid>
    )
}

export default ChatRoom
