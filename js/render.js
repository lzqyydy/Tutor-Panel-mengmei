

var render = function() {
  requestAnimationFrame(render);

  controller.raycaster.setFromCamera( controller.mouse, base.camera );
  
  var intersects = controller.raycaster.intersectObjects( objects.meshes.hai );
  if ( intersects.length > 0 ){
    if ( intersects[ 0 ].object != INTERSECTED ) { 
      if ( controller.INTERSECTED ) {
        //INTERSECTED.position.y -= 1;
        //hover.scale.set(0.01, 0.01, 0.01);
      }
      controller.INTERSECTED = intersects[ 0 ].object;
      //INTERSECTED.position.y += 1;
      //hover.position.copy(INTERSECTED.position);
      
      //hoverDummy.rotation.set(0, Math.PI/2*Math.floor(INTERSECTED.data.index/34), 0, 'XYZ');
      //hover.rotation.set(Math.PI/2, 0, 0, 'XYZ');
      //hover.scale.set(1.1, 1.1, 1.1);
    }
  } 
  else 
  {
    if ( controller.INTERSECTED ) {
      //INTERSECTED.position.y -= 1;
      //hover.scale.set(0.01, 0.01, 0.01);
    }
    controller.INTERSECTED = null;
  }
  
  base.renderer.render(base.scene, base.camera);
};
