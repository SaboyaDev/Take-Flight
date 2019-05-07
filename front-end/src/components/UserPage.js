import React, { useState, useEffect } from 'react';
import DroneState from 'react-drone-hud';
import DroneStateTest from './DroneStateTest';
import Commands from './Commands';
import socket from '../util/socket';

function useDroneState() {
  const [droneState, updateDroneState] = useState({
    pitch: 0,
    roll: 0,
    yaw: 0,
    h: 0
  });
  useEffect(() => {
    socket.on('dronestate', updateDroneState);
    console.log(updateDroneState);
    return () => socket.removeListener('dronestate');
  }, []);
  return droneState;
}

function useSocket() {
  const [status, updateStatus] = useState('DISCONNECTED');
  useEffect(() => {
    socket.on('status', updateStatus);
    return () => socket.removeListener('status');
  }, []);
  return status;
}

const UserPage = () => {
  const status = useSocket();
  const droneState = useDroneState([]);
  console.log(droneState.h);
  return (
    <div id='container'>
      User Page With Video Feed
      <br />
      <br />
      <Commands />
      <br />
      <br />
      <p className='status'>Status: {status}</p>
      <DroneStateTest
        pitch={droneState.pitch}
        roll={droneState.roll}
        yaw={droneState.yaw}
        height={droneState.h}
      />
      <DroneState
        width={600} //width in px, best if >= 500
        height={400} ///height in px, best if >= 400
        pitch={droneState.pitch} // ***degrees
        roll={droneState.roll} // ***degrees, -ve -> left bank
        // heading={droneState.yaw} // ***degrees, optional
        heading={250} // ***degrees, optional
        airspeed={0} //left-side number, optional
        airspeedTickSize={5} //increments to use for vertical gauge, optional
        // altitude={droneState.h} // ***right-side number, optional
        altitude={100} // ***right-side number, optional
        altitudeTickSize={10} //optional
      />
    </div>
  );
};

export default UserPage;
