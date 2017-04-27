// intersectList:{
//   type:    //"orthographic" or "perspective"
//   target:  //intersect target
//   success: //on success operation
//   fail:    //on failure operation
//   extra:   //extra judging condition
// }

export default function(){
  for(var i=0;i<this.controller.intersectList.length;i++){

    
    // this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.cameraOrtho );
    // var intersects = this.controller.raycaster.intersectObjects( this.objects.dummies.furoList.buttonList );
    // if ( intersects.length > 0 ){
    //   if ( intersects[ 0 ].object !== this.controller.INTERSECTED.furoButton ) { 
    //     if ( this.controller.INTERSECTED.furoButton ) {
    //       this.controller.INTERSECTED.furoButton.material.color.g = 0;
    //     }
    //     if(intersects[ 0 ].object.parent.visible){
    //       this.controller.INTERSECTED.furoButton = intersects[ 0 ].object;
    //       this.controller.INTERSECTED.furoButton.material.color.g = 0.5;
    //     }
    //     else{
    //       this.controller.INTERSECTED.furoButton = null;
    //     }
    //   }
    // } 
    // else 
    // {
    //   if ( this.controller.INTERSECTED.furoButton ) {
    //     this.controller.INTERSECTED.furoButton.material.color.g = 0;
    //   }
    //   this.controller.INTERSECTED.furoButton = null;
    // }
  }
}