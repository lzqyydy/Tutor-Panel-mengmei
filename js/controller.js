import { Unit } from './structures.js';

var controller = new Unit();

controller.raycaster = new THREE.Raycaster();
controller.mouse = new THREE.Vector2();
controller.mouse.$clientX = 0;
controller.mouse.$clientY = 0;
controller.mouse.x = 0;
controller.mouse.y = 0;
controller.INTERSECTED = [];
controller.INTERSECTED.handTile = null;
controller.INTERSECTED.furoButton = null;

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


  //rayPicking(this);

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
    var value = game.tehai.haiIndex[controller.INTERSECTED.handTile.userData.index];
    controller.notify('network', 'inputDiscard', {
      value: value
    });
  }
};

// // on discard tile, update display
// cbDiscard: function(value){
//   // LATER: maybe check value's existance?
//   this.game.tehai.haiIndex.splice(this.game.tehai.haiIndex.indexOf(value), 1);
// },
// // on doing operation, update display
// cbOperationDone: function(index, tile){
//   this.objects.dummies.furoList.$hide();
// },

function windowResize() {
  controller.notify(null, 'resize', {});
};

controller.onNotify = function(source, event, param){
};

// ## mousemove event
document.addEventListener( 'mousemove', mouseMove, false );
// ## resize event
window.addEventListener("resize", windowResize, false);
// ## mousemove event
document.addEventListener( 'click', click, false );

export { controller as default }