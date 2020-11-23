import React from 'react'
import './styling/chatroom.css'
import Grid from '@material-ui/core/Grid';

function ChatRoom() {
    return (
        <Grid 
        container
        direction="row"
        justify="center"
        alignItems="baseline"
        className="chatRoom__container"
        >
            
            <div className="current__users">
                <h3>Current Users</h3>
                <div className="display__users">
                    <p>test</p>
                </div>
            </div>

            <div className="chatBox">
                <p>This will be the chatbox</p>
            </div>

            <div className="chatRoom__buttons">

                <textarea/>
                <button type="submit">Send</button>

            </div>

        </Grid>
    )
}

export default ChatRoom
