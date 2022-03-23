import React from 'react';
import Button from '@mui/material/Button';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
};

const buttonStyle = {
    height: '30px',
    margin: '10px',
}

const Controls = ({ createRoom, joinRoom }) => {
    const handleCreateRoom = () => {
        const nickname = window.prompt('Enter a nickname', 'Billy Bob');
        createRoom(nickname);
    }
    
    const handleJoinRoom = () => {
        const nickname = window.prompt('Enter a nickname', 'Billy Bob');
        const roomID = window.prompt(`Enter a room ID, ${nickname}`);
        joinRoom(roomID, nickname);
    }

    return (
        <div style={containerStyle}>
            <Button
                style={buttonStyle}
                onClick={handleCreateRoom}
                variant='contained'
            >
                Create New Chat Room
            </Button>
            <Button
                style={buttonStyle}
                onClick={handleJoinRoom}
                variant='contained'
            >
                Join Existing Chat Room
            </Button>
        </div>
    )
}

export default Controls;