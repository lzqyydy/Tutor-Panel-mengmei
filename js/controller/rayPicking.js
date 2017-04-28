// intersectList:{
//   name:    //intersect index, 
//   type:    //"orthographic" or "perspective"
//   target:  //intersect target
//   condition:   //judging condition
//   success: //on success operation
//   restore: //on rollback operation
// }

export default function(vm){
  for(var i=0;i<vm.controller.intersectList.length;i++){
    if(vm.controller.intersectList[i].type==="perspective"){
      vm.controller.raycaster.setFromCamera( vm.controller.mouse, vm.base.camera );
    }
    if(vm.controller.intersectList[i].type==="orthographic"){
      vm.controller.raycaster.setFromCamera( vm.controller.mouse, vm.base.cameraOrtho );
    }
    var intersects = vm.controller.raycaster.intersectObjects( vm.controller.intersectList[i].target );
    if ( intersects.length > 0 ){
      if ( intersects[ 0 ].object !== vm.controller.INTERSECTED[vm.controller.intersectList[i].name]){
        if ( vm.controller.INTERSECTED[vm.controller.intersectList[i].name] ){
          vm.controller.intersectList[i].restore.call(vm.controller.INTERSECTED[vm.controller.intersectList[i].name]);
        }
        if( vm.controller.intersectList[i].condition.call(intersects[ 0 ].object) ){
          vm.controller.INTERSECTED[vm.controller.intersectList[i].name] = intersects[ 0 ].object;
          vm.controller.intersectList[i].success.call(intersects[ 0 ].object);
          break;
        }
        else{
          vm.controller.INTERSECTED[vm.controller.intersectList[i].name] = null;
        }
      }
    }
    else {
      if ( vm.controller.INTERSECTED[vm.controller.intersectList[i].name] ){
        vm.controller.intersectList[i].restore.call(vm.controller.INTERSECTED[vm.controller.intersectList[i].name]);
      }
      vm.controller.INTERSECTED[vm.controller.intersectList[i].name] = null;
    }
  }
}