
controller.operations.mouseMove = function ( event ) {
  event.preventDefault();
  if(event.buttons&1){ //left button
    controller.camera.phi -= Math.PI * (event.clientX - controller.mouse.clientX)/window.innerWidth;
    controller.camera.theta += Math.PI * (event.clientY - controller.mouse.clientY)/window.innerHeight;
    if(controller.camera.theta>Math.PI/2-0.01){
      controller.camera.theta = Math.PI/2-0.01;
    }
    if(controller.camera.theta<0){
      controller.camera.theta = 0;
    }
    base.camera.position.set(controller.camera.distance*Math.cos(controller.camera.theta)*Math.sin(controller.camera.phi), 
                            controller.camera.distance*Math.sin(controller.camera.theta), 
                            controller.camera.distance*Math.cos(controller.camera.theta)*Math.cos(controller.camera.phi));
    base.camera.lookAt(new THREE.Vector3(0,0,0));
  }
  controller.mouse.clientX = event.clientX;
  controller.mouse.clientY = event.clientY;
  controller.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  controller.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
};

controller.operations.windowResize = function () {
  base.renderer.setSize(window.innerWidth, window.innerHeight);
  base.camera.aspect = window.innerWidth / window.innerHeight;
  base.camera.updateProjectionMatrix();
};

var controllerInit = function () {
  controller.camera.distance = 100;
  controller.camera.theta = Math.acos(0.8); 
  controller.camera.phi = 0;
  base.camera.position.set(controller.camera.distance*Math.cos(controller.camera.theta)*Math.sin(controller.camera.phi),
                            controller.camera.distance*Math.sin(controller.camera.theta),
                            controller.camera.distance*Math.cos(controller.camera.theta)*Math.cos(controller.camera.phi));
  base.camera.lookAt(new THREE.Vector3(0,0,0));
  
  controller.raycaster = new THREE.Raycaster();
  controller.mouse = new THREE.Vector2();
  controller.mouse.clientX = 0;
  controller.mouse.clientY = 0;
  controller.mouse.x = 0;
  controller.mouse.y = 0;
  controller.INTERSECTED = null;
  // ## mousemove event
  document.addEventListener( 'mousemove', controller.operations.mouseMove, false );
  // ## resize event
  window.addEventListener("resize", controller.operations.windowResize, false);
}

// 2017/3/22
// some code grabbed from threejs example about drag file as material texture
//
// document.addEventListener( 'dragover', function ( event ) {
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'copy';
// }, false );
// document.addEventListener( 'dragenter', function ( event ) {
//   document.body.style.opacity = 0.5;
// }, false );
// document.addEventListener( 'dragleave', function ( event ) {
//   document.body.style.opacity = 1;
// }, false );
// document.addEventListener( 'drop', function ( event ) {
//   event.preventDefault();
//   var reader = new FileReader();
//   reader.addEventListener( 'load', function ( event ) {
//     materialSphere.map.image.src = event.target.result;
//     console.log(event.target.result);
//     materialSphere.map.needsUpdate = true;
//   }, false );
//   reader.readAsDataURL( event.dataTransfer.files[ 0 ] );
//   document.body.style.opacity = 1;
// }, false );