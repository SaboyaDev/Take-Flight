import socket from '../socket';
import React from 'react';

function sendCommand(command) {
    return function () {
        console.log(`Sending the command ${command}`);
        socket.emit('command', command);
    };
}

const amount = 100;
const Commands = () => (
    <div>
        <button className="rotate" onClick={sendCommand('ccw 90')}>
            <span className="symbol">⟲</span> 90°
    </button>
        <button onClick={sendCommand(`forward ${amount}`)}>
            <span className="symbol">↑</span> forward {amount}cm
    </button>
        <button className="rotate" onClick={sendCommand('cw 15')}>
            <span className="symbol">⟳</span> 15°
    </button>
        <button onClick={sendCommand(`left ${amount}`)}>
            <span className="symbol">←</span> left {amount}cm
    </button>
        <div className="center">
            <button className="takeoff" onClick={sendCommand('takeoff')}>
                Take Off
      </button>
            <button className="land" onClick={sendCommand('land')}>
                Land
      </button>
            <button className="emergency" onClick={sendCommand('emergency')}>
                !! emergency !!
      </button>
        </div>
        <button onClick={sendCommand(`right ${amount}`)}>
            <span className="symbol">→</span>
            right {amount}cm
    </button>
        <button className="height" onClick={sendCommand(`up ${amount}`)}>
            <span className="symbol">⤒</span> {amount}cm
    </button>
        <button onClick={sendCommand(`back ${amount}`)}>
            <span className="symbol">↓</span> back {amount}cm
    </button>
        <button className="height" onClick={sendCommand(`down ${amount}`)}>
            <span className="symbol">⤓</span> {amount}cm
    </button>
        <h2>Fancy Pants</h2>
        <button onClick={sendCommand('flip l')}>Flip Left</button>
        <button onClick={sendCommand('flip r')}>Flip Right</button>
        <button onClick={sendCommand('flip b')}>Flip Back</button>
        <button onClick={sendCommand('flip f')}>Flip Forward</button>
        <button onClick={sendCommand('go 25 25 25 25')}>Go 25 25 25 25</button>
        <button onClick={sendCommand('curve 100 100 100 150 250 350 50')}>
            Curve!
    </button>
    </div>
);

export default Commands;