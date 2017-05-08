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
  // if(this.controller.INTERSECTED.nextRound&&this.controller.INTERSECTED.nextRound.parent.visible){
  //   this.game.socket.emit('ready', {
  //   }, this.methods.game.cbReady.bind(this));
  // }
  // else if(this.controller.INTERSECTED.furoButton&&this.controller.INTERSECTED.furoButton.parent.visible){
  //   var index = this.controller.INTERSECTED.furoButton.userData.index;
  //   var tile = this.controller.INTERSECTED.furoButton.userData.tile;
  //   this.game.socket.emit('operation', {
  //     tile: tile,
  //     value: index
  //   }, this.methods.game.cbOperationDone.bind(this, index, tile))
  // }
  // else if(this.controller.INTERSECTED.handTile&&this.controller.INTERSECTED.handTile.children.length){
  //   var value = this.game.tehai.haiIndex[this.controller.INTERSECTED.handTile.userData.index];
  //   this.game.socket.emit('discard', {
  //     value: value
  //   }, this.methods.game.cbDiscard.bind(this, value))
  // }
};
function windowResize() {
  controller.notify('base', 'resize', {});
  //this.objects.dummies.furoList.$reposition(this);
};


// ## mousemove event
document.addEventListener( 'mousemove', mouseMove, false );
// ## resize event
window.addEventListener("resize", windowResize, false);
// ## mousemove event
document.addEventListener( 'click', click, false );

export { controller as default }