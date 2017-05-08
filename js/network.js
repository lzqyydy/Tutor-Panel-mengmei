import { Unit } from './structures.js';

var network = new Unit();

network.socket = io('/touhou');
network.socket.emit('join');
network.socket.on('full', function(){
  this.emit('ready');
});

function socketCB(event, data){
  network.notify(null, event, data);
}

network.socket.on('start',     socketCB.bind(null,'socketStart'));
network.socket.on('draw',      socketCB.bind(null,'socketDraw'));
network.socket.on('discarded', socketCB.bind(null,'socketDiscard'));
network.socket.on('operation', socketCB.bind(null,'socketOperation'));
network.socket.on('furo',      socketCB.bind(null,'socketFuro'));
network.socket.on('roundEnd',  socketCB.bind(null,'socketRoundEnd'));
network.socket.on('gameEnd',   socketCB.bind(null,'socketGameEnd'));
network.socket.on('reconnect', function(){
  this.emit('join');
});

export { network as default };