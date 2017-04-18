

var _controller = function () {
  return {
    data: {
      controller: {
        camera: {},
        INTERSECTED: {}
      }
    },
    methods: {
      controller: {
        mouseMove: function(event){
          event.preventDefault();
          if(event.buttons&1){ //left button
            this.controller.camera.phi -= Math.PI * (event.clientX - this.controller.mouse.clientX)/window.innerWidth;
            this.controller.camera.theta += Math.PI * (event.clientY - this.controller.mouse.clientY)/window.innerHeight;
            if(this.controller.camera.theta>Math.PI/2-0.01){
              this.controller.camera.theta = Math.PI/2-0.01;
            }
            if(this.controller.camera.theta<0){
              this.controller.camera.theta = 0;
            }
            this.base.camera.position.set(this.controller.camera.distance*Math.cos(this.controller.camera.theta)*Math.sin(this.controller.camera.phi), 
                                    this.controller.camera.distance*Math.sin(this.controller.camera.theta), 
                                    this.controller.camera.distance*Math.cos(this.controller.camera.theta)*Math.cos(this.controller.camera.phi));
            this.base.camera.lookAt(new THREE.Vector3(0,0,0));
          }
          this.controller.mouse.clientX = event.clientX;
          this.controller.mouse.clientY = event.clientY;
          this.controller.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          this.controller.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        },
        click: function(event){
          if(this.controller.INTERSECTED.furoButton&&this.controller.INTERSECTED.furoButton.parent.visible){
            var index = this.controller.INTERSECTED.furoButton.userData.index;
            var tile = this.controller.INTERSECTED.furoButton.userData.tile;
            this.game.socket.emit('operation', {
              tile: tile,
              value: index
            }, this.methods.game.cbOperationDone.bind(this))
          }
          else if(this.controller.INTERSECTED.handTile&&this.controller.INTERSECTED.handTile.children.length){
            var value = this.game.tehai.haiIndex[this.controller.INTERSECTED.handTile.userData.index];
            this.game.socket.emit('discard', {
              value: value
            }, this.methods.game.cbDiscard.bind(this, value))
          }
        },
        windowResize: function () {
          this.base.width = window.innerWidth;
          this.base.height = window.innerHeight;
          
          this.base.camera.aspect = this.base.width / this.base.height;
          this.base.camera.updateProjectionMatrix();

          this.base.cameraOrtho.left = - this.base.width / 2;
          this.base.cameraOrtho.right = this.base.width / 2;
          this.base.cameraOrtho.top = this.base.height / 2;
          this.base.cameraOrtho.bottom = - this.base.height / 2;
          this.base.cameraOrtho.updateProjectionMatrix();

          this.base.renderer.setSize(window.innerWidth, window.innerHeight);

          this.objects.dummies.furoList.$reposition(this);
        }
      }
    },
    created: function(){
      this.controller.camera.distance = 100;
      this.controller.camera.theta = Math.acos(0.8); 
      this.controller.camera.phi = 0;
      this.base.camera.position.set(this.controller.camera.distance*Math.cos(this.controller.camera.theta)*Math.sin(this.controller.camera.phi),
                                this.controller.camera.distance*Math.sin(this.controller.camera.theta),
                                this.controller.camera.distance*Math.cos(this.controller.camera.theta)*Math.cos(this.controller.camera.phi));
      this.base.camera.lookAt(new THREE.Vector3(0,0,0));

      this.base.cameraOrtho.position.z = 10;
      this.base.cameraOrtho.lookAt(new THREE.Vector3(0,0,0));
      
      this.controller.raycaster = new THREE.Raycaster();
      this.controller.mouse = new THREE.Vector2();
      this.controller.mouse.clientX = 0;
      this.controller.mouse.clientY = 0;
      this.controller.mouse.x = 0;
      this.controller.mouse.y = 0;
      this.controller.INTERSECTED.handTile = null;
      this.controller.INTERSECTED.furoButton = null;
      // ## mousemove event
      document.addEventListener( 'mousemove', this.methods.controller.mouseMove.bind(this), false );
      // ## resize event
      window.addEventListener("resize", this.methods.controller.windowResize.bind(this), false);
      // ## mousemove event
      document.addEventListener( 'click', this.methods.controller.click.bind(this), false );
    }
  };
}();

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