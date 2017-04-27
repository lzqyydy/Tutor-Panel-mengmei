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
          console.log(data);
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
