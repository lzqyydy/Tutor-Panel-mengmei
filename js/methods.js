
import blank from './blank/init.js'

function changeView(view){
  if(view===undefined){
    this.view&&(this.view.active = false);
    this.view = blank.blank;
    this.view.active = true;
    this.base = blank.blank.base;
    this.controller = blank.blank.controller;
    this.network = blank.blank.network;
  }
  else{
    switch(view.type){
      case 'gl':
        this.view&&(this.view.active = false);
        this.view = view;
        this.view.active = true;
        this.view.addObserver('dom', this.domBus);
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
          this.view&&(this.view.active = false);
          this.view = blank.blank;
          this.view.active = true;
          this.base = blank.blank.base;
          this.controller = blank.blank.controller;
          this.network = blank.blank.network;
        }
        if(!this.domBus.display[view.name]){
          this.domBus.display[view.name] = true;
        }
          console.log(this.domBus.display)
          console.log(this.domBus.display[view.name])
        break;
      default:
        break;
    }
  }
}

export { changeView };