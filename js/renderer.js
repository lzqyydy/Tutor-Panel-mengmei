
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
mouse.x = 0;
mouse.y = 0;
var INTERSECTED = null;
var render = function() {
  requestAnimationFrame(render);

  raycaster.setFromCamera( mouse, camera );
  
  var intersects = raycaster.intersectObjects( hai );
  if ( intersects.length > 0 ){
    if ( intersects[ 0 ].object != INTERSECTED ) { 
      if ( INTERSECTED ) {
        INTERSECTED.position.y -= 1;
        //hover.geometry.scale(0, 0, 0);
      }
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.position.y += 1;
      //hover.position = INTERSECTED.position;
      //hover.geometry.scale(1.05, 1.05, 1.05);
    }
  } 
  else 
  {
    if ( INTERSECTED ) {
      INTERSECTED.position.y -= 1;
      //hover.geometry.scale(0, 0, 0);
    }
    INTERSECTED = null;
  }
  
  renderer.render(scene, camera);
};

render();