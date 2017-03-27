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

var clientX = 0;
var clientY = 0;
// ## Window mousemove event
document.addEventListener( 'mousemove', onMouseMove, false );
// ## Window mousemove
function onMouseMove( event ) {
  event.preventDefault();
  if(event.buttons&1){ //left button
    cameraPhi -= Math.PI * (event.clientX - clientX)/window.innerWidth;
    cameraTheta += Math.PI * (event.clientY - clientY)/window.innerHeight;
    if(cameraTheta>Math.PI/2-0.01){
      cameraTheta = Math.PI/2-0.01;
    }
    if(cameraTheta<0){
      cameraTheta = 0;
    }
    camera.position.set(cameraDistance*Math.cos(cameraTheta)*Math.sin(cameraPhi), cameraDistance*Math.sin(cameraTheta), cameraDistance*Math.cos(cameraTheta)*Math.cos(cameraPhi));
    camera.lookAt(new THREE.Vector3(0,0,0));
  }
  clientX = event.clientX;
  clientY = event.clientY;
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


// ## Window resize event
window.addEventListener("resize", onWindowResize, false);
// ## Window resize
function onWindowResize() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
}