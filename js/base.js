
var baseInit = function () {
  base.scene = new THREE.Scene();
  base.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // var cameraDistance = 100;
  // var cameraPhi = 0;
  // var cameraTheta = Math.acos(0.8); 
  // camera.position.set(cameraDistance*Math.cos(cameraTheta)*Math.sin(cameraPhi), cameraDistance*Math.sin(cameraTheta), cameraDistance*Math.cos(cameraTheta)*Math.cos(cameraPhi));
  // camera.lookAt(new THREE.Vector3(0,0,0));
  base.scene.add(base.camera);

  base.renderer = new THREE.WebGLRenderer();
  base.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(base.renderer.domElement);
}
