
var _game = function(){
  return {
    data: {
      game: {
        tehai: {}
      }
    },
    methods: {
      game: {
        render: function() {
          requestAnimationFrame(this.methods.game.render.bind(this));
          this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.camera );
          
          var intersects = this.controller.raycaster.intersectObjects( this.objects.dummies.hand[0].slots );
          if ( intersects.length > 0 ){
            if ( intersects[ 0 ].object !== this.controller.INTERSECTED ) { 
              if ( this.controller.INTERSECTED ) {
                if(this.controller.INTERSECTED.children.length > 0){
                  this.controller.INTERSECTED.children[0].position.y -= 1;
                }
              }
              this.controller.INTERSECTED = intersects[ 0 ].object;
              if(this.controller.INTERSECTED.children.length > 0){
                this.controller.INTERSECTED.children[0].position.y += 1;
              }
            }
          } 
          else 
          {
            if ( this.controller.INTERSECTED ) {
              if(this.controller.INTERSECTED.children.length > 0){
                this.controller.INTERSECTED.children[0].position.y -= 1;
              }
            }
            this.controller.INTERSECTED = null;
          }
          this.base.stats.update();
          this.base.renderer.clear();
          this.base.renderer.render(this.base.scene, this.base.camera);
          this.base.renderer.clearDepth();
          this.base.renderer.render(this.base.sceneOrtho, this.base.cameraOrtho);
        },
        cbStart: function(data){
          // data:{
          //  tehai: Tehai()
          // }

          //changing this object to fill hand
          this.game.tehai = data.tehai;
          //fill yama with white
          for(var i=0;i<136;i++){
            var tile = this.objects.meshes.tile[31].clone(); // clone white
            this.objects.dummies.yama[Math.floor(i/34)].slots[i%34].add(tile);
          }
          //fill others hand with white
          for(var i=13;i<4*13;i++){
            var tile = this.objects.meshes.tile[31].clone(); // clone white
            this.objects.dummies.hand[Math.floor(i/13)].slots[i%13].add(tile);
          }
        },
        cbDraw: function(data){
          // data:{
          //  turn: {number},
          //  hai: {number},
          //  kan: {bool},
          //  agari: {bool},
          //  riichi: {bool}
          // }

          if(data.turn===this.game.tehai.ji){
            if(data.hai!==null){
              // trigger refresh hand
              this.game.tehai.haiIndex.push(data.hai);
            }
          }
        },
        cbDiscard: function(value){
          // LATER: maybe check value's existance?
          if(this.controller.INTERSECTED===this.objects.dummies.hand[0].slots[this.game.tehai.haiIndex.indexOf(value)]){
            this.controller.INTERSECTED = null;
          }
          this.game.tehai.haiIndex.splice(this.game.tehai.haiIndex.indexOf(value), 1);
        },
        cbDiscarded: function(data){
          // data:{
          //  discard: {number},
          // }

          if(data&&data.hai!==null){
            // trigger refresh hand
            this.game.tehai.discard = data.discard;
          }
        },
        cbOperation: function(data){
          // data:{
          //   tile: Number,
          //   data: Array[Number]
          // }
          console.log(data);
          this.objects.dummies.furoList.$init();
          for(var i=0;i<data.data.length;i++){
            this.objects.dummies.furoList.$push(this, data.tile, data.data[i]);
          }
        },
        op_chi: function(){
          
        },
        op_pon: function(){
          
        },
        op_kan: function(){
          
        },
        op_agari: function(){
          
        },
        op_pass: function(){
          
        }
      }
    },
    watch: {
      "game.tehai": {
        handler: function(newVal, oldVal){
          //refresh hand 
          for(var i=0;i<this.objects.dummies.hand[0].slots.length;i++){
            if(this.objects.dummies.hand[0].slots[i].children.length > 0){
              this.objects.dummies.hand[0].slots[i].remove(this.objects.dummies.hand[0].slots[i].children[0]);
            }
          }
          for(var i=0;i<this.game.tehai.haiIndex.length;i++){
            var tile = this.objects.meshes.tile[Math.floor(this.game.tehai.haiIndex[i]/4)].clone(); // clone white
            this.objects.dummies.hand[0].slots[i].add(tile);
          }
          //refresh discard 
          for(var i=0;i<4*24;i++){
            if(this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].children.length > 0){
              this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].remove(this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].children[0]);
            }
          }
          for(var i=0;i<4;i++){
            for(var j=0;j<this.game.tehai.discard[i].length;j++){
              var tile = this.objects.meshes.tile[Math.floor(this.game.tehai.discard[i][j]/4)].clone(); // clone white
              this.objects.dummies.discard[i].slots[j].add(tile);
            }
          }
        },
        deep: true
      }
    },
    created: function(){
      this.game.socket = io('/touhou');
      this.game.socket.emit('join');
      this.game.socket.on('full', function(){
        this.emit('ready');
      });
      this.game.socket.on('start', this.methods.game.cbStart.bind(this));
      this.game.socket.on('draw', this.methods.game.cbDraw.bind(this));
      this.game.socket.on('discarded', this.methods.game.cbDiscarded.bind(this));
      this.game.socket.on('operation', this.methods.game.cbOperation.bind(this));
      this.game.socket.on('reconnect', function(){
        this.emit('join');
      });
    }
  };
}();
