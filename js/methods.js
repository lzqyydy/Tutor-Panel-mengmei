
import blank from './blank/init.js'

function changeView(view){
  if(view===undefined){
    this.base = blank.blank.base;
    this.controller = blank.blank.controller;
    this.network = blank.blank.network;
  }
  else{
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
        // switch gl scene to blank scene if dom view is top-level view
        if(!view.overlay){
          this.base = blank.blank.base;
          this.controller = blank.blank.controller;
          this.network = blank.blank.network;
        }
        if(!view.socket){
          view.socket = this.socket;
        }
        if(!view.v.display){
          view.v.display = true;
        }
        break;
      default:
        break;
    }
  }
}

export { changeView };