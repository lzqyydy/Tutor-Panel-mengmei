import { Unit } from '../../structures.js';
import rayPicking from './controller/rayPicking.js';

var controller = new Unit();

controller.mouse = new THREE.Vector2();
controller.mouse.$clientX = 0;
controller.mouse.$clientY = 0;
controller.mouse.x = 0;
controller.mouse.y = 0;
controller.INTERSECTED = [];
controller.cameraList = {};
controller.raycastList = [];

function mouseMove(event){
  event.preventDefault();
  if(event.buttons&1){ //left button
    controller.notify('base', 'move', {
      x: event.clientX - controller.mouse.clientX,
      y: event.clientY - controller.mouse.clientY
    });
  }
  controller.mouse.clientX = event.clientX;
  controller.mouse.clientY = event.clientY;
  controller.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  controller.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;  

  rayPicking(controller.cameraList, controller.raycastList, controller.mouse, controller.INTERSECTED);

};
function click(event){
  if(controller.INTERSECTED.nextRound&&controller.INTERSECTED.nextRound.parent.visible){
    controller.notify('network', 'inputReady');
  }
  else if(controller.INTERSECTED.furoButton&&controller.INTERSECTED.furoButton.parent.visible){
    var index = controller.INTERSECTED.furoButton.userData.index;
    var tile  = controller.INTERSECTED.furoButton.userData.tile;
    controller.notify('network', 'inputOperation', {
      tile: tile,
      value: index
    });
  }
  else if(controller.INTERSECTED.handTile&&controller.INTERSECTED.handTile.children.length){
    var value = controller.INTERSECTED.handTile.children[0]._tile;
    controller.notify('network', 'inputDiscard', {
      value: value
    });
  }
};


function windowResize() {
  controller.notify(null, 'resize', {});
};

controller.onNotify = function(source, event, param){
  switch(event){
    case 'castInit':
      controller.raycastList = param;
      break;
    case 'cameraInit':
      controller.cameraList = param;
      break;
    case 'conMousemove':
      mouseMove(param);
      break;
    case 'conResize':
      windowResize(param);
      break;
    case 'conClick':
      click(param);
      break;
  }
};


export { controller as default }