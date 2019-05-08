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
  // console.log(typeof droneState.h === 'number');
  // console.log(typeof droneState.yaw === 'number');
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
        pitch={parseFloat(droneState.pitch)}
        roll={parseFloat(droneState.roll)}
        yaw={parseFloat(droneState.yaw)}
        altitude={parseFloat(droneState.h)}
      />
      <DroneState
        width={800} //width in px, best if >= 500
        height={400} ///height in px, best if >= 400
        pitch={parseFloat(droneState.pitch)} // ***degrees
        roll={parseFloat(droneState.roll)} // ***degrees, -ve -> left bank
        heading={parseFloat(droneState.yaw)} // ***degrees, optional
        airspeed={10} //left-side number, optional
        airspeedTickSize={5} //increments to use for vertical gauge, optional
        altitude={parseFloat(droneState.h)} // ***right-side number, optional
        altitudeTickSize={10} //optional
      />
    </div>
  );
};

export default UserPage;
