import { Unit } from './structures.js';

var game = new Unit();

game.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

export { game as default };
