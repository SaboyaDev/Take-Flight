const dgram = require('dgram');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');

var db = require('./models');

const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('status', message.toString());
});

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

const commands = ['command', 'battery?', 'takeoff', 'land'];
// const commands = ['command', 'battery?'];

const i = 0;

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

// async function go() {
//   const command = commands[i];
//   const delay = commandDelays[command];
//   console.log(`running command: ${command}`);
//   drone.send(command, 0, command.length, PORT, HOST, handleError);
//   await wait(delay);
//   i += 1;
//   if (i < commands.length) {
//     return go();
//   }
//   console.log('done!');
// }

// go();

io.on('connection', socket => {
  socket.on('command', command => {
    console.log('command Sent from browser');
    console.log(command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  socket.emit('status', 'CONNECTED');
});

var telloData = formattedState => {
  let flyingData = {
    pitch: formattedState.pitch,
    roll: formattedState.roll,
    yaw: formattedState.yaw,
    vgx: formattedState.vgx,
    vgy: formattedState.vgy,
    vgz: formattedState.vgz,
    h: formattedState.h
  };
  db.userFlyingData.create(flyingData);
};

droneState.on(
  'message',
  throttle(state => {
    const formattedState = parseState(state.toString());
    console.log(formattedState);
    telloData(formattedState);
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);

var syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  http.listen(6767, () => {
    console.log('Socket io server up and running');
  });
});
