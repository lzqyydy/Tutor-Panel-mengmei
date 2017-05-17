var features = {
  mahjong: {}
};

import mahjong from './mahjong/init.js'

features['mahjong'] = mahjong;

var main = {};

import { changeView } from './methods.js';

main.changeView = changeView;

// top-level renderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClear = false; // To allow render overlay on top of sprited sphere
document.body.appendChild( renderer.domElement );
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.domElement );

var render = function() {
  requestAnimationFrame(render);

  stats.update();
  renderer.clear();
  renderer.render(main.base.scene, main.base.camera);
  if(main.base.sceneOrtho){
    renderer.clearDepth();
    renderer.render(main.base.sceneOrtho, main.base.cameraOrtho);
  }
};

// top-level controller

function controlCB(event, data){
  main.controller.onNotify(null, event, data);
}
document.addEventListener( 'mousemove', controlCB.bind(null,'conMousemove'), false );
window.addEventListener( 'resize',      controlCB.bind(null,'conResize'   ), false );
document.addEventListener( 'click',     controlCB.bind(null,'conClick'    ), false );

// top-level socket

var socket = io('/touhou');
socket.emit('join');
socket.on('full', function(){
  this.emit('ready');
});

function socketCB(event, data){
  main.network.onNotify(null, event, data);
}

socket.on('start',     socketCB.bind(null,'socketStart'    ));
socket.on('draw',      socketCB.bind(null,'socketDraw'     ));
socket.on('discarded', socketCB.bind(null,'socketDiscard'  ));
socket.on('operation', socketCB.bind(null,'socketOperation'));
socket.on('furo',      socketCB.bind(null,'socketFuro'     ));
socket.on('roundEnd',  socketCB.bind(null,'socketRoundEnd' ));
socket.on('gameEnd',   socketCB.bind(null,'socketGameEnd'  ));
socket.on('reconnect', function(){
  this.emit('join');
});

// some more work
main.socket = socket;


// RUN! 

main.changeView(features['mahjong']['play']);
render();