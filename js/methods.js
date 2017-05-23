
import blank from './blank/init.js'

function changeView(view){
  switch(view.type){
    case 'gl':
      if(view.base){
        this.base = view.base;
      }
      if(view.controller){
        this.controller = view.controller;
      }
      if(view.network){
        if(!view.network.socket){
          view.network.socket = this.socket;
        }
        this.network = view.network;
      }
      break;
    case 'dom':
      if(!view.overlay){
        this.base = blank.base;
        this.controller = blank.controller;
        this.network = blank.network;
      }
      break;
    default:
      break;
  }
}

export { changeView };