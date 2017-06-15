import { Unit } from '../../structures.js';

var base = new Unit();
base.scene = new THREE.Scene();
base.camera = new THREE.PerspectiveCamera();
base.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

export { base as default }
