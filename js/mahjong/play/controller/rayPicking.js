// raycastList:{
//   name:    //intersect index, 
//   type:    //"orthographic" or "perspective"
//   target:  //intersect target
//   condition:   //judging condition
//   success: //on success operation
//   restore: //on rollback operation
// }
// cameraList:{
//   name: //"orthographic" or "perspective"
//   camera: //object
// }

export default function(cameraList, raycastList, mouse, INTERSECTED){
  var raycaster = new THREE.Raycaster();
  for(var i=0;i<raycastList.length;i++){
    raycaster.setFromCamera( mouse, cameraList[raycastList[i].type] );
    var intersects = raycaster.intersectObjects( raycastList[i].target );
    if ( intersects.length > 0 ){
      if ( intersects[ 0 ].object !== INTERSECTED[raycastList[i].name]){
        if ( INTERSECTED[raycastList[i].name] ){
          raycastList[i].restore.call(INTERSECTED[raycastList[i].name]);
        }
        if( raycastList[i].condition.call(intersects[ 0 ].object) ){
          INTERSECTED[raycastList[i].name] = intersects[ 0 ].object;
          raycastList[i].success.call(intersects[ 0 ].object);
          break;
        }
        else{
          INTERSECTED[raycastList[i].name] = null;
        }
      }
    }
    else {
      if ( INTERSECTED[raycastList[i].name] ){
        raycastList[i].restore.call(INTERSECTED[raycastList[i].name]);
      }
      INTERSECTED[raycastList[i].name] = null;
    }
  }
}