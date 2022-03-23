import React, { useState } from 'react';
import Button from '@mui/material/Button';
import moment from 'moment';
import TextField from '@mui/material/TextField';

const containerStyle = {
    minHeight: '500px',
    width: '600px',
    border: '1px solid black',
    margin: 'auto',
    marginBottom: '10px',
    marginTop: '10px',
}

const messageContainerStyle = {
    margin: '10px',
}

const messageTitleStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: 'bold',
}

const messageBodyStyle = {
    display: 'flex',
    justifyContent: 'space-between',
}

const Viewport = ({ messages = [], sendMessage, roomID }) => {
    const [text, setText] = useState('');

    const handleInput = ({ target }) => {
        setText(target.value);
    }

    const handleSubmit = () => {
        sendMessage(text);
        setText('');
    }

    return (
        <>
            <div style={containerStyle}>
                {messages.map((message, index) => (
                    <div key={index} style={messageContainerStyle}>
                        <div style={messageTitleStyle}>
                            {message.userNickname}
                        </div>
                        <div style={messageBodyStyle}>
                            <div>
                                {message.body}
                            </div>
                            <div>
                                {moment(message.timestamp).format('DD/MM/YYYY HH:ss')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <TextField
                onChange={handleInput}
                disabled={!roomID}
                value={text}
            >
                Type a message!
            </TextField>
            <Button
                onClick={handleSubmit}
                disabled={!roomID}
            >
                Send
            </Button>
        </>
    );
}

export default Viewport;