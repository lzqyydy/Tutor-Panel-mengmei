import { Unit } from './structures.js';

var base = new Unit();

base.width = window.innerWidth;
base.height = window.innerHeight;
base.scene = new THREE.Scene();
base.camera = new THREE.PerspectiveCamera(75, base.width / base.height, 0.1, 1000);
base.scene.add(base.camera);
base.sceneOrtho = new THREE.Scene();
base.cameraOrtho = new THREE.OrthographicCamera(base.width/-2, base.width/2, base.height/2, base.height/-2, 0, 10);
base.sceneOrtho.add(base.cameraOrtho);


var center = new THREE.Vector3(0,0,0);
base.camera.$distance = 100;
base.camera.$theta = Math.acos(0.8); 
base.camera.$phi = 0;
base.camera.position.set(base.camera.$distance*Math.cos(base.camera.$theta)*Math.sin(base.camera.$phi),
                         base.camera.$distance*Math.sin(base.camera.$theta),
                         base.camera.$distance*Math.cos(base.camera.$theta)*Math.cos(base.camera.$phi));
base.camera.lookAt(center);

base.cameraOrtho.position.z = 10;
base.cameraOrtho.lookAt(center);

base.onNotify = function(source, event, param){
  switch(event){
    case 'move':
      base.camera.$phi -= Math.PI*param.x/base.width;
      base.camera.$theta += Math.PI*param.y/base.height;
      if(base.camera.$theta>Math.PI/2-0.01){
        base.camera.$theta = Math.PI/2-0.01;
      }
      if(base.camera.$theta<0){
        base.camera.$theta = 0;
      }
      base.camera.position.set(base.camera.$distance*Math.cos(base.camera.$theta)*Math.sin(base.camera.$phi),
                               base.camera.$distance*Math.sin(base.camera.$theta),
                               base.camera.$distance*Math.cos(base.camera.$theta)*Math.cos(base.camera.$phi));
      base.camera.lookAt(center);
      break;
    case 'resize':
      base.width = window.innerWidth;
      base.height = window.innerHeight;
      
      base.camera.aspect = base.width / base.height;
      base.camera.updateProjectionMatrix();

      base.cameraOrtho.left = - base.width / 2;
      base.cameraOrtho.right = base.width / 2;
      base.cameraOrtho.top = base.height / 2;
      base.cameraOrtho.bottom = - base.height / 2;
      base.cameraOrtho.updateProjectionMatrix();

      base.renderer.setSize(window.innerWidth, window.innerHeight);
      break;
  }
};

export { base as default }

function cameraInit(){
  //register rayCasting camera
  var cameraList = {};
  cameraList.orthographic = base.cameraOrtho;
  cameraList.perspective = base.camera;
  base.notify('controller', 'cameraInit', cameraList);
}

export { cameraInit }
