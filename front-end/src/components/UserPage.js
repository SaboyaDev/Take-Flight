import React, { Component } from 'react';
import socket from '../util/socket';

function sendCommand(command) {
  return function() {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
}

class UserPage extends Component {
  render() {
    return (
      <div id='container'>
        User Page With Video Feed
        <button className='rotate' onClick={sendCommand('streamon')}>
          video-on
        </button>
        <button className='rotate' onClick={sendCommand('streamoff')}>
          video-off
        </button>
        <video
          width='720'
          controls
          autoplay
          poster='images/loader-thumb.jpg'
          id='player'
        />
      </div>
    );
  }
}

export default UserPage;
