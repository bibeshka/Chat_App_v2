import React from 'react';

const HomeContainer = () => {
  return (
    <div className="login-page-container">
      <div className="login-form">
        <h1>Join</h1>
        <form action="/chat">
          <p>Display name</p>
          <input type="text" name="username" placeholder="Display name" required />
          <p>Room</p>
          <input type="text" name="room" placeholder="Room" required />
          <button>Join</button>
        </form>
      </div>
    </div>
  )
}

export default HomeContainer;
