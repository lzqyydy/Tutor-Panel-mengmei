import menu from './menu/init.js'
import play from './play/init.js'
import { Unit } from '../structures.js';

var feature = new Unit();

feature.menu = menu;
feature.play = play;

feature.onNotify = function(source, event, param){
  switch(event){
    case 'socketOperation' :
      this.notify('dom', 'playOperation', param);
      break;
  }
}

menu.addObserver('feature', feature);
play.addObserver('feature', feature);

export { feature as default }