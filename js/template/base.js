import { Unit } from './structures.js';

var base = new Unit();


base.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

export { base as default }
