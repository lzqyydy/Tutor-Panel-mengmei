import { Unit } from './structures.js';

var network = new Unit();

network.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

export { network as default };