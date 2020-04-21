import React, { useState, useEffect } from 'react';
import qs from 'qs';
import openSocket from "socket.io-client";
import moment from 'moment';
import ChatSidebar from './ChatSidebar';

const socket = openSocket("http://localhost:5000");

const ChatContainer = () => {

  const { username, room } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const [message_save, setMessage_save] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message);
      // setMessages(messages => [...messages ,message]);
      setMessages(messages => [...messages ,message]);
    });

    socket.on('locationMessage', (message) => {
      console.log(message.url);
      setMessages(location_messages => [...location_messages, message]);
    })

    socket.emit('join', { username, room }, (error) => {
      if (error) {
        alert(error);
        window.location.href ="/";
      }  
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit('sendMessage', message_save, (error) => {
      if(error) {
        return console.log(error);
      }
  
      console.log('The message was delivered.');
    });
  }

  const sendMessageLocation = () => {
    if(!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('sendLocation', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => {
          console.log('Location shared!');
      });
    })
  }

  const showSideBar = () => {
    let sidebar = document.querySelector(".chat-sidebar");
    if(sidebar.style.display === 'none') {
      sidebar.style.display = 'block'
    } else {
      sidebar.style.display = 'none';
    }
  }

  return (
    <div className="chat-container">
        <div className="chat-sidebar">
          <ChatSidebar socket={socket} />
        </div>

        <div className="chat__main">
          <div className="open-sidebar" onClick={() => showSideBar()}>
            <i className="fas fa-bars"></i>
          </div>


          <div className="chat__messages">
            {
              messages && messages.map((message) => (
                message.text 
                  ? <div className="chat__message" key={message.createdAt}>
                      <p>
                        <span className="message__name">{message.username}</span>
                        <span className="message__meta">{moment(message.createdAt).format('LT')}</span>
                      </p>
                      <p>{message.text}</p>
                    </div>
                  : <div className="chat__message" key={message.createdAt}>
                      <p>
                        <span className="message__name">{message.username}</span>
                        <span className="message__meta">{moment(message.createdAt).format('LT')}</span>
                      </p>
                      <p><a href={message.url} target="_blank">Current position</a></p>
                    </div>  
              ))
            }
          </div>

          <div className="chat__massage-form">
            <form onSubmit={(e) => sendMessage(e)}>
              <input 
                name="message" 
                onChange={(e) => setMessage_save(e.target.value)} 
                placeholder="Message" 
                required autoComplete="off" 
              />
              <button>Send</button>
            </form>
            <button id="chat__send-location" onClick={() => sendMessageLocation()}>
              Send location
            </button>
          </div>
        </div>
    </div>
  )
}

export default ChatContainer;
