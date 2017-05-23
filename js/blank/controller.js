import { Unit } from './structures.js';

var controller = new Unit();

controller.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

export { controller as default }