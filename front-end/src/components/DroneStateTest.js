import React from 'react';

const DroneStateTest = ({ pitch, roll, yaw, height }) => (
  <div>
    <span>Pitch: {pitch}</span>
    <span>Roll: {roll}</span>
    <span>Yaw: {yaw}</span>
    <span>Height: {height / 100}</span>
  </div>
);

export default DroneStateTest;
