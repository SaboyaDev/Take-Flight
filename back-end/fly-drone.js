const express = require('express');
const dgram = require('dgram');

const drone = dgram.createSocket('udp4');
const droneState = dgram.createSocket('udp4');
const droneVideo = dgram.createSocket('udp4');

const port_cmd = 8889; // Tello Main Port
const port_status = 8890; // Tello Status Port
const port_video = 11111; // Tello Video Port
const port_websocket = 8080; // Websocket Port
const port_httpServer = 3001; // Express HTTP Server Port

const HOST = '192.168.10.1';

const app = express();

app.listen(port_httpServer, () => {
  console.log('Socket io server up and running');
});
