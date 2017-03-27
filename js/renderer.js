
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
        hover.scale.set(0.01, 0.01, 0.01);
      }
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.position.y += 1;
      hover.position.copy(INTERSECTED.position);
      
      hoverDummy.rotation.set(0, Math.PI/2*Math.floor(INTERSECTED.data.index/34), 0, 'XYZ');
      hover.rotation.set(Math.PI/2, 0, 0, 'XYZ');
      hover.scale.set(1.1, 1.1, 1.1);
    }
  } 
  else 
  {
    if ( INTERSECTED ) {
      INTERSECTED.position.y -= 1;
      hover.scale.set(0.01, 0.01, 0.01);
    }
    INTERSECTED = null;
  }
  
  renderer.render(scene, camera);
};

render();