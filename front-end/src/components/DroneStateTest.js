import React from 'react';

const DroneStateTest = ({ pitch, roll, yaw, altitude }) => (
  <div>
    <span>Pitch: {pitch}</span>
    <span>Roll: {roll}</span>
    <span>Yaw: {yaw}</span>
    <span>Altitude: {altitude}</span>
  </div>
);

export default DroneStateTest;
