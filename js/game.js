import tehaiWatcher from "./game/tehaiWatcher.js"


export default function(){
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
          // else {
          //   if ( this.controller.INTERSECTED.furoButton ) {
          //     this.controller.INTERSECTED.furoButton.material.color.g = 0;
          //   }
          //   this.controller.INTERSECTED.furoButton = null;
          // }

          // if(this.controller.INTERSECTED.furoButton===null){
          //   this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.camera );
          //   var intersects = this.controller.raycaster.intersectObjects( this.objects.dummies.hand[0].slots );
          //   if ( intersects.length > 0 ){
          //     if ( intersects[ 0 ].object !== this.controller.INTERSECTED.handTile ) { 
          //       if ( this.controller.INTERSECTED.handTile ) {
          //         if(this.controller.INTERSECTED.handTile.children.length > 0){
          //           this.controller.INTERSECTED.handTile.children[0].position.y -= 1;
          //         }
          //       }
          //       this.controller.INTERSECTED.handTile = intersects[ 0 ].object;
          //       if(this.controller.INTERSECTED.handTile.children.length > 0){
          //         this.controller.INTERSECTED.handTile.children[0].position.y += 1;
          //       }
          //     }
          //   } 
          //   else 
          //   {
          //     if ( this.controller.INTERSECTED.handTile ) {
          //       if(this.controller.INTERSECTED.handTile.children.length > 0){
          //         this.controller.INTERSECTED.handTile.children[0].position.y -= 1;
          //       }
          //     }
          //     this.controller.INTERSECTED.handTile = null;
          //   }
          // }

          this.base.stats.update();
          this.base.renderer.clear();
          this.base.renderer.render(this.base.scene, this.base.camera);
          this.base.renderer.clearDepth();
          this.base.renderer.render(this.base.sceneOrtho, this.base.cameraOrtho);
        },
        // on start the game
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
        // on draw tile
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
        // on discard tile, update display
        cbDiscard: function(value){
          // LATER: maybe check value's existance?
          if(this.controller.INTERSECTED.handTile===this.objects.dummies.hand[0].slots[this.game.tehai.haiIndex.indexOf(value)]){
            this.controller.INTERSECTED.handTile = null;
          }
          this.game.tehai.haiIndex.splice(this.game.tehai.haiIndex.indexOf(value), 1);
        },
        // on someone discard tile, update display
        cbDiscarded: function(data){
          // data:{
          //  discard: {number},
          // }

          if(data&&data.hai!==null){
            // trigger refresh hand
            this.game.tehai.discard = data.discard;
          }
        },
        // on reciving avaliable operations, then sending request
        cbOperation: function(operation){
          // data:{
          //   tile: Number, //0-132
          //   value: Number
          // }
          console.log(operation);
          //this.objects.dummies.furoList.$init(this);
          this.objects.dummies.furoList.$set(this, operation);
        },
        // on doing operation, update display
        cbOperationDone: function(index, tile){
          this.objects.dummies.furoList.$hide();
        },
        // on reciving furo, update display
        cbFuro: function(data){
          // data:{
          //   tile: Number, //0-34
          //   value: Number,
          //   player: Number //27-30
          // }
          //this.game.tehai.furo = data.furo;
          this.game.tehai = data.tehai;
        },
        cbRoundEnd: function(data){
          console.log(JSON.stringify(data));
        }
      }
    },
    watch: {
      "game.tehai": {
        handler: tehaiWatcher,
        deep: true
      }
    },
    created: function(){

      //register rayCasting objects
      this.controller.intersectList.push({
        name: 'nextRound',
        type: 'orthographic',
        target: [this.objects.sprites.result.next],
        condition: function(){
          return this.parent.visible;
        },
        success: function(){
          this.material.color.r = 0.5;
          this.material.color.g = 1;
          this.material.color.b = 0.5;
        },
        restore: function(){
          this.material.color.r = 1;
          this.material.color.g = 1;
          this.material.color.b = 1;
        }
      });
      this.controller.intersectList.push({
        name: 'furoButton',
        type: 'orthographic',
        target: this.objects.dummies.furoList.buttonList,
        condition: function(){
          return this.parent.visible;
        },
        success: function(){
          this.material.color.g = 0.5;
        },
        restore: function(){
          this.material.color.g = 0;
        }
      });
      this.controller.intersectList.push({
        name: 'handTile',
        type: 'perspective',
        target: this.objects.dummies.hand[0].slots,
        condition: function(){
          return true;
        },
        success: function(){
          if(this.children[0]){
            this.children[0].position.y += 1;
          }
        },
        restore: function(){
          if(this.children[0]){
            this.children[0].position.y -= 1;
          }
        }
      });

      this.game.socket = io('/touhou');
      this.game.socket.emit('join');
      this.game.socket.on('full', function(){
        this.emit('ready');
      });
      this.game.socket.on('start', this.methods.game.cbStart.bind(this));
      this.game.socket.on('draw', this.methods.game.cbDraw.bind(this));
      this.game.socket.on('discarded', this.methods.game.cbDiscarded.bind(this));
      this.game.socket.on('operation', this.methods.game.cbOperation.bind(this));
      this.game.socket.on('furo', this.methods.game.cbFuro.bind(this));
      this.game.socket.on('roundEnd', this.methods.game.cbRoundEnd.bind(this));
      this.game.socket.on('gameEnd', this.methods.game.cbRoundEnd.bind(this));
      this.game.socket.on('reconnect', function(){
        this.emit('join');
      });
    }
  };
};
