
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

          
          this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.cameraOrtho );
          var intersects = this.controller.raycaster.intersectObjects( this.objects.dummies.furoList.buttonList );
          if ( intersects.length > 0 ){
            if ( intersects[ 0 ].object !== this.controller.INTERSECTED.furoButton ) { 
              if ( this.controller.INTERSECTED.furoButton ) {
                this.controller.INTERSECTED.furoButton.material.color.g = 0;
              }
              if(intersects[ 0 ].object.visible){
                this.controller.INTERSECTED.furoButton = intersects[ 0 ].object;
                this.controller.INTERSECTED.furoButton.material.color.g = 0.5;
              }
              else{
                this.controller.INTERSECTED.furoButton = null;
              }
            }
          } 
          else 
          {
            if ( this.controller.INTERSECTED.furoButton ) {
              this.controller.INTERSECTED.furoButton.material.color.g = 0;
            }
            this.controller.INTERSECTED.furoButton = null;
          }

          if(this.controller.INTERSECTED.furoButton===null){
            this.controller.raycaster.setFromCamera( this.controller.mouse, this.base.camera );
            var intersects = this.controller.raycaster.intersectObjects( this.objects.dummies.hand[0].slots );
            if ( intersects.length > 0 ){
              if ( intersects[ 0 ].object !== this.controller.INTERSECTED.handTile ) { 
                if ( this.controller.INTERSECTED.handTile ) {
                  if(this.controller.INTERSECTED.handTile.children.length > 0){
                    this.controller.INTERSECTED.handTile.children[0].position.y -= 1;
                  }
                }
                this.controller.INTERSECTED.handTile = intersects[ 0 ].object;
                if(this.controller.INTERSECTED.handTile.children.length > 0){
                  this.controller.INTERSECTED.handTile.children[0].position.y += 1;
                }
              }
            } 
            else 
            {
              if ( this.controller.INTERSECTED.handTile ) {
                if(this.controller.INTERSECTED.handTile.children.length > 0){
                  this.controller.INTERSECTED.handTile.children[0].position.y -= 1;
                }
              }
              this.controller.INTERSECTED.handTile = null;
            }
          }

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
        cbOperation: function(data){
          // data:{
          //   tile: Number, //0-132
          //   value: Number
          // }
          console.log(data);
          //this.objects.dummies.furoList.$init(this);
          this.objects.dummies.furoList.$set(this, data);
        },
        // on doing operation, update display
        cbOperationDone: function(){
          //TODO: 减少手牌
          this.objects.dummies.furoList.$hide();
        },
        // on reciving furo, update display
        cbFuro: function(data){
          // data:{
          //   tile: Number, //0-34
          //   value: Number,
          //   player: Number //27-30
          // }
          this.game.tehai.furo = data.furo;
        }
      }
    },
    watch: {
      "game.tehai": {
        handler: function(newVal, oldVal){
          var TILEWIDTH = this.objects.consts.TILEWIDTH;
          var TILEHEIGHT = this.objects.consts.TILEHEIGHT;
          var TILETHICK = this.objects.consts.TILETHICK;
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
          //refresh furo
          for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
              for(var k=0;k<4;k++){
                if(this.objects.dummies.furo[i].groups[j].slots[k].children.length > 0){
                  this.objects.dummies.furo[i].groups[j].slots[k].remove(this.objects.dummies.furo[i].groups[j].slots[k].children[0]);
                }
              }
            }
          }
          for(var i=0;i<4;i++){
            for(var j=0;j<this.game.tehai.furo[i].length;j++){
              switch(this.game.tehai.furo[i][j].value){
                case 0:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 1].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 2].clone();
                  t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = TILEWIDTH;
                  t3.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 1:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 1].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 1].clone();
                  t2.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
                  t1.position.x = TILEWIDTH;
                  t3.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 2:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 2].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 1].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t3.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
                  t1.position.x = TILEWIDTH;
                  t2.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 3:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = TILEWIDTH;
                  t3.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 4:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = TILEWIDTH+TILEHEIGHT;
                  t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t3.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 5:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t3.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  break;
                case 6:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 2.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = 2*TILEWIDTH;
                  t3.position.x = TILEWIDTH;
                  t4.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 7:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
                  t2.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t3.position.x = TILEWIDTH;
                  t4.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 8:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
                  t2.position.x = TILEWIDTH+TILEHEIGHT;
                  t3.position.x = TILEHEIGHT;
                  t4.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 9:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 3*TILEWIDTH;
                  t2.position.x = 2*TILEWIDTH;
                  t3.position.x = TILEWIDTH;
                  t4.position.x = 0;
                  this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(1,0,0), Math.PI);
                  this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(1,0,0), Math.PI);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 10:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = TILEWIDTH;
                  t3.position.x = 0;
                  t4.position.x = t1.position.x;
                  t4.position.z = TILEWIDTH;
                  this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 11:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = TILEWIDTH+TILEHEIGHT;
                  t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t3.position.x = 0;
                  t4.position.x = t2.position.x;
                  t4.position.z = TILEWIDTH;
                  this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
                case 12:
                  var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
                  t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
                  t3.position.x = 0;
                  t4.position.x = t3.position.x;
                  t4.position.z = TILEWIDTH;
                  this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
                  this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
                  this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
                  this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
                  this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
                  break;
              }
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
      this.game.socket.on('furo', this.methods.game.cbFuro.bind(this));
      this.game.socket.on('reconnect', function(){
        this.emit('join');
      });
    }
  };
};
