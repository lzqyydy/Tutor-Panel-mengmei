
var _game = function(){
  return {
    data: {
      game: {

      }
    },
    methods: {
      game: {
        render: function() {
          requestAnimationFrame(this.methods.game.render.bind(this));

          this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.camera );
          
          var intersects = this.controller.raycaster.intersectObjects( this.objects.meshes.tile );
          if ( intersects.length > 0 ){
            if ( intersects[ 0 ].object !== this.controller.INTERSECTED ) { 
              if ( this.controller.INTERSECTED ) {
                //INTERSECTED.position.y -= 1;
                //hover.scale.set(0.01, 0.01, 0.01);
              }
              this.controller.INTERSECTED = intersects[ 0 ].object;
              //INTERSECTED.position.y += 1;
              //hover.position.copy(INTERSECTED.position);
              
              //hoverDummy.rotation.set(0, Math.PI/2*Math.floor(INTERSECTED.data.index/34), 0, 'XYZ');
              //hover.rotation.set(Math.PI/2, 0, 0, 'XYZ');
              //hover.scale.set(1.1, 1.1, 1.1);
            }
          } 
          else 
          {
            if ( this.controller.INTERSECTED ) {
              //INTERSECTED.position.y -= 1;
              //hover.scale.set(0.01, 0.01, 0.01);
            }
            this.controller.INTERSECTED = null;
          }
          this.base.stats.update();
          this.base.renderer.render(this.base.scene, this.base.camera);
        }
      }
    },
    created: function(){
      this.game.socket = io('/touhou');
      this.game.socket.emit('join');
      this.game.socket.on('full', function(){
        this.emit('ready');
      });
      this.game.socket.on('start', function(data){
        // data:{
        //  tehai: Tehai()
        // }

        debugger;
      });
      this.game.socket.on('reconnect', function(){
        this.emit('join');
      });
    }
  };
}();
