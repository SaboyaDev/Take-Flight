const express = require('express');
const WebSocket = require('ws');
const dgram = require('dgram');
const app = express();

// const http = require('http').Server(app);

const throttle = require('lodash/throttle');

const drone = dgram.createSocket('udp4');
const droneState = dgram.createSocket('udp4');
const droneVideo = dgram.createSocket('udp4');

const port_cmd = 8889; // Tello Main Port
const port_status = 8890; // Tello Status Port
const port_video = 11111; // Tello Video Port
const port_websocket = 8080; // Websocket Port
const port_httpServer = 3001; // Express HTTP Server Port

const HOST = '192.168.10.1';

const server = app.listen(port_httpServer, () => {
  console.log('Socket io server up and running');
});

const io = require('socket.io').listen(server);

let videoBuff = []; //VIDEO BUFFER
let counter = 0; //COUNTER FOR VIDEO BUFFER FRAMES

drone.bind(port_cmd);
droneState.bind(port_status);

function parseState(state) {
  console.log(state);
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('status', message.toString());
});

io.on('connection', socket => {
  socket.on('command', command => {
    console.log('command Sent from browser');
    console.log(command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  socket.emit('status', 'CONNECTED');
});

droneState.on(
  'message',
  throttle(state => {
    const formattedState = parseState(state.toString());
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);

//###WEBSOCKET### SERVER
let websocket = new WebSocket.Server({ port: port_websocket });
websocket.on('connection', function connection(websocket) {
  console.log('Socket connected. sending data...');
  websocket.on('error', function error(error) {
    console.log('WebSocket error');
  });
  websocket.on('close', function close(msg) {
    console.log('WebSocket close');
  });
});

//###UDP### VIDEO
//INPUT
//RAW RAW H264 DIVIDED IN MULTIPLE MESSAGES PER FRAME
droneVideo.on('error', err => {
  console.log(`server error:\n${err.stack}`);
  droneVideo.close();
});
droneVideo.on('message', (msg, rinfo) => {
  let buf = Buffer.from(msg);
  if (buf.indexOf(Buffer.from([0, 0, 0, 1])) != -1) {
    //FIND IF FIRST PART OF FRAME
    counter++;
    if (counter == 3) {
      //COLLECT 3 FRAMES AND SEND TO WEBSOCKET
      let temp = Buffer.concat(videoBuff);
      counter = 0;
      websocket.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          try {
            client.send(temp); //SEND OVER WEBSOCKET
          } catch (e) {
            console.log(`Sending failed:`, e);
          }
        }
      });
      videoBuff.length = 0;
      videoBuff = [];
    }
    videoBuff.push(buf);
  } else {
    videoBuff.push(buf);
  }
});
droneVideo.on('listening', () => {
  let address = droneVideo.address();
  console.log(`UDP VIDEO SERVER - ${address.address}:${address.port}`);
});
droneVideo.bind(port_video);
