import React, { Component } from 'react';
import socket from '../util/socket';

function sendCommand(command) {
  return function() {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
}

class Commands extends Component {
  render() {
    return (
      <div>
        <button className='takeoff' onClick={sendCommand('takeoff')}>
          Take-off
        </button>
        <button className='land' onClick={sendCommand('land')}>
          Land
        </button>
        <button className='takeoff' onClick={sendCommand('forward 100')}>
          forward
        </button>
        <button className='land' onClick={sendCommand('back 100')}>
          back
        </button>
        <button className='land' onClick={sendCommand('up 300')}>
          up 300
        </button>
        <button className='land' onClick={sendCommand('up 200')}>
          up 200
        </button>
        <button className='land' onClick={sendCommand('down 100')}>
          down 100
        </button>
        <button className='land' onClick={sendCommand('down 300')}>
          down 300
        </button>
        <button className='land' onClick={sendCommand('ccw 90')}>
          Counter clockwise 90
        </button>
        <button className='emergency' onClick={sendCommand('emergency')}>
          emergency
        </button>
      </div>
    );
  }
}

export default Commands;
