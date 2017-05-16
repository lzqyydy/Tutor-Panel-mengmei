import { Unit } from './structures.js';


var game = new Unit();

game.tehai = {};

game.onNotify = function(source, event, param){
  switch(event){
    case 'socketStart':
      param.tehai.haiIndex.sort(function(a,b){
        return a-b;
      })
      game.tehai = param.tehai;
      game.notify('objects', 'tehaiChanged', game.tehai)
      break;
    case 'socketDraw':
      // data:{
      //  turn: {number},
      //  hai: {number},
      //  kan: {bool},
      //  agari: {bool},
      //  riichi: {bool}
      // }
      if(param.turn===game.tehai.ji){
        if(param.hai!==null){
          game.tehai.haiIndex.push(param.hai);
          // trigger refresh hand
          game.notify('objects', 'tehaiChanged', game.tehai)
        }
      }
      break;
    case 'socketDiscard':
      // data:{
      //  discard: {number},
      // }
      if(param&&param.hai!==null){
        game.tehai.discard = param.discard;
        // trigger refresh hand
        game.notify('objects', 'tehaiChanged', game.tehai)
      }
      break;
    case 'socketFuro':
      // data:{
      //   tile: Number, //0-34
      //   value: Number,
      //   player: Number //27-30
      // }
      //this.game.tehai.furo = data.furo;
      param.tehai.haiIndex.sort(function(a,b){
        return a-b;
      })
      game.tehai = param.tehai;
      game.notify('objects', 'tehaiChanged', game.tehai)
      break;
    case 'socketRoundEnd':
      break;
    case 'inputDiscard':
      game.tehai.haiIndex.splice(game.tehai.haiIndex.indexOf(param.value), 1);
      game.notify('objects', 'tehaiChanged', game.tehai)
      break;
  }
};

export { game as default };
