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

          // hide result (if shown)
          this.objects.sprites.result.$hide();
          //changing this object to fill hand
          data.tehai.haiIndex.sort(function(a,b){
            return a-b;
          })
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
          data.tehai.haiIndex.sort(function(a,b){
            return a-b;
          })
          this.game.tehai = data.tehai;
        },
        cbRoundEnd: function(data){
          // var result = {
          //   player: this.number,
          //   oya: this.tehai.ji-27;
          //   haiIndex: this.tehai.haiIndex,
          //   furo: this.tehai.furo,
          //   agariFrom: this.tehai.agariFrom,
          //   agariHai: this.tehai.agariHai,
          //   fu: this.tehai.agari.final.fu,
          //   han: this.tehai.agari.final.han,
          //   basePoint: this.tehai.agari.final.basePoint
          // };
          //console.log(JSON.stringify(data));
          this.objects.sprites.result.$set(data);
        },
        cbReady: function(){

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


      ///////////////
      // IMPORTANT //
      ///////////////
      // 2017/04/29
      // what the fuck was happened ?
      // if i use push() instead of set by index
      // render speed will drop to 10%
      // WHY?

      //register rayCasting objects
      this.controller.intersectList[0] = {
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
      };
      this.controller.intersectList[1] = {
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
      };
      this.controller.intersectList[2] = {
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
            this.children[0].position.y = 0;
          }
        }
      };

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