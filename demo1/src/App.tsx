import React, { useState } from 'react';
import './App.css';
import { TelepartyClient, SocketEventHandler, SocketMessageTypes } from 'teleparty-websocket-lib';
import Controls from './Controls';
import Viewport from './Viewport';

let client;

function App() {
  const [roomID, setRoomID] = useState('');
  const [messages, setMessages] = useState([]);

  const addMessage = function(message){
    setMessages((messages) => [...messages].concat(message.data));
  }

  const eventHandler: SocketEventHandler = {
      onConnectionReady: () => { console.log('Connection has been established') },
      onClose: () => { alert("Socket has been closed") },
      onMessage: (message) => {
        if (message.type !== 'userId'){
          addMessage(message);
        }
      }
  };

  if (!client) {
    client = new TelepartyClient(eventHandler);
  }

  const createRoom = async (nickname: string) => {
    const roomID = await client.createChatRoom(nickname);
    setRoomID(roomID);
  }

  const joinRoom = (roomID: string, nickname: string) => {
    client.joinChatRoom(nickname, roomID)
    .then(({ messages: newMessages }) => {
      setMessages(newMessages);
      setRoomID(roomID);
    })
    .catch(() => {
      console.log('Something went wrong!');
    });
  }

  const sendMessage = (message: string) => {
    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: message,
    });
  }

  return (
    <div className="App">
      Room ID: {roomID}
      <Viewport
        messages={messages}
        sendMessage={sendMessage}
        roomID={roomID}
        key={messages.length}
      />
      <Controls
        createRoom={createRoom}
        joinRoom={joinRoom}
      />
    </div>
  );
}

export default App;
