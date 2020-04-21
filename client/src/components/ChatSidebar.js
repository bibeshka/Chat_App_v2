import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatSidebar = ({ socket }) => {

  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.on('roomData', ({room, users}) => {
      setUsers(users);
      setRoom(room);
    });
  }, []);


  return (
    <div className="sidebar-container">
      <div className="room-container">
        <h2 className="room-title">{room}</h2>
        <h3 className="list-title">Users</h3>
        <ul className="users">
          {
            users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))
          }
        </ul>
      </div>
      <div className="sidebar-functional">
        <Link to="/"><button className="back-button">Back</button></Link>
      </div>
    </div>
  )
}

export default ChatSidebar;
