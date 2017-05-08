import { Unit } from './structures.js';


var game = new Unit();

game.onNotify = function(source, event, param){
  switch(event){
    case 'socketStart':
      param.tehai.haiIndex.sort(function(a,b){
        return a-b;
      })
      game.tehai = param.tehai;
      break;
  }
};

export { game as default };

// // on start the game
// cbStart: function(data){
// },
// // on draw tile
// cbDraw: function(data){
//   // data:{
//   //  turn: {number},
//   //  hai: {number},
//   //  kan: {bool},
//   //  agari: {bool},
//   //  riichi: {bool}
//   // }

//   if(data.turn===this.game.tehai.ji){
//     if(data.hai!==null){
//       // trigger refresh hand
//       this.game.tehai.haiIndex.push(data.hai);
//     }
//   }
// },
// // on discard tile, update display
// cbDiscard: function(value){
//   // LATER: maybe check value's existance?
//   if(this.controller.INTERSECTED.handTile===this.objects.dummies.hand[0].slots[this.game.tehai.haiIndex.indexOf(value)]){
//     this.controller.INTERSECTED.handTile = null;
//   }
//   this.game.tehai.haiIndex.splice(this.game.tehai.haiIndex.indexOf(value), 1);
// },
// // on someone discard tile, update display
// cbDiscarded: function(data){
//   // data:{
//   //  discard: {number},
//   // }

//   if(data&&data.hai!==null){
//     // trigger refresh hand
//     this.game.tehai.discard = data.discard;
//   }
// },
// // on reciving avaliable operations, then sending request
// cbOperation: function(operation){
//   // data:{
//   //   tile: Number, //0-132
//   //   value: Number
//   // }
//   console.log(operation);
//   //this.objects.dummies.furoList.$init(this);
//   this.objects.dummies.furoList.$set(this, operation);
// },
// // on doing operation, update display
// cbOperationDone: function(index, tile){
//   this.objects.dummies.furoList.$hide();
// },
// // on reciving furo, update display
// cbFuro: function(data){
//   // data:{
//   //   tile: Number, //0-34
//   //   value: Number,
//   //   player: Number //27-30
//   // }
//   //this.game.tehai.furo = data.furo;
//   data.tehai.haiIndex.sort(function(a,b){
//     return a-b;
//   })
//   this.game.tehai = data.tehai;
// },
// cbRoundEnd: function(data){
//   // var result = {
//   //   player: this.number,
//   //   oya: this.tehai.ji-27;
//   //   haiIndex: this.tehai.haiIndex,
//   //   furo: this.tehai.furo,
//   //   agariFrom: this.tehai.agariFrom,
//   //   agariHai: this.tehai.agariHai,
//   //   fu: this.tehai.agari.final.fu,
//   //   han: this.tehai.agari.final.han,
//   //   basePoint: this.tehai.agari.final.basePoint
//   // };
//   //console.log(JSON.stringify(data));
//   this.objects.sprites.result.$set(data);
// },