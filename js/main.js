
import { Unit } from './structures.js'

var features = new Unit();
var main = new Unit();

import mahjong from './mahjong/init.js'

features['mahjong'] = mahjong;



import { changeView, clearDOMView, clearGLView } from './methods.js';

main.changeView = changeView;
main.clearDOMView = clearDOMView;
main.clearGLView = clearGLView;

// top-level renderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClear = false; // To allow render overlay on top of sprited sphere
renderer.domElement.className = 'three';
document.body.insertBefore( renderer.domElement, document.querySelector("#tiles") );
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.insertBefore( stats.domElement, document.querySelector("#tiles") );

var render = function() {
  requestAnimationFrame(render);

  stats.update();
  renderer.clear();
  if(main.base.scene){
    renderer.render(main.base.scene, main.base.camera);
  }
  renderer.clearDepth();
  if(main.base.sceneOrtho){
    renderer.render(main.base.sceneOrtho, main.base.cameraOrtho);
  }
};

// top-level controller

function controlCB(event, data){
  if(event==='conResize'){
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  main.controller.onNotify(null, event, data);
}
document.addEventListener( 'mousemove', controlCB.bind(null,'conMousemove'), false );
window.addEventListener( 'resize',      controlCB.bind(null,'conResize'   ), false );
document.addEventListener( 'click',     controlCB.bind(null,'conClick'    ), false );

// top-level socket

var socket = io('/touhou');
socket.on('full', function(){
  main.clearDOMView();
  main.changeView(features['mahjong']['play']);
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
  main.clearGLView();
  main.clearDOMView();
  main.changeView(features['mahjong']['menu']);
  // this.emit('join');
});

// some more work
main.socket = socket;


main.domBus = new Vue({
  'el': '#domComponents',
  'data': {
    _observer: {},
    mahjongMenu: {
      display: false,
      queueState: 0
    }
  },
  'methods': {
    notify: function(target, event, param){
      if(target!==null&&target!==undefined){
        if(this._observer[target]!==null&&this._observer[target]!==undefined){
          this._observer[target].onNotify(null, event, param);
        }
      }
      else{
        for(var tgt in this._observer){
          this._observer[tgt].onNotify(null, event, param);
        }
      }
    },
    onNotify: function(source, event, param){
      switch(event){
        case 'menuQueue' :
          socket.emit('join');
          break;
        case 'menuFetchQueueState' :
          socket.emit('queueState', null, function(data){
            main.domBus.mahjongMenu.queueState = data.queueState;
          });
          break;
        case 'playOperation':
          console.log('dom received operation', param);
          break;
      }
    },
    addObserver: function(name, unit){
      this._observer[name] = unit;
    },
    removeObserver: function(name, unit){
      this._observer[name] = null;
    }
  },
  created: function (){
    features['mahjong'].addObserver('dom', this);
  }
})
function run(){
  // RUN! 
  main.changeView();
  main.changeView(features['mahjong']['menu']);
  //main.changeView(features['mahjong']['play']);
  render();
}
run();