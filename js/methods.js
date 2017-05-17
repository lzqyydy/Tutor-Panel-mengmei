function changeView(view){
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
}

export { changeView };