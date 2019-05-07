const dgram = require('dgram');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');
// const sdk = require('tellojs');

// var db = require('./models');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

function parseState(state) {
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
    throw err;
  }
}

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('status', message.toString());
});

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

drone.send('battery?', 0, 'battery?'.length, PORT, HOST, handleError);

// setInterval(() => {
//   drone.send('command', 0, 'command'.length, PORT, HOST, handleError);
//   drone.send('mon', 0, 'mon'.length, PORT, HOST, handleError);
// }, 2000);

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
    console.log(formattedState);
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);

// var syncOptions = { force: false };

// db.sequelize.sync(syncOptions).then(function() {
//   http.listen(6767, () => {
//     console.log('Socket io server up and running');
//   });
// });

http.listen(6767, () => {
  console.log('Socket io server up and running');
});

// sdk.read.battery();
// sdk.read.temperature();
// sdk.read.barometer();
// setInterval(() => {
//   sdk.read.barometer();
// }, 2000);

// var telloData = formattedState => {
//   let flyingData = {
//     pitch: formattedState.pitch,
//     roll: formattedState.roll,
//     yaw: formattedState.yaw,
//     vgx: formattedState.vgx,
//     vgy: formattedState.vgy,
//     vgz: formattedState.vgz,
//     templ: formattedState.templ,
//     temph: formattedState.temph,
//     tof: formattedState.tof,
//     h: formattedState.h,
//     bat: formattedState.bat,
//     baro: formattedState.baro,
//     time: formattedState.time,
//     agx: formattedState.agx,
//     agy: formattedState.agy,
//     agz: formattedState.agz
//   };
//   db.userFlyingData.create(flyingData);
// };
