function Unit (){
  this._observer = {};
  this.onNotify = function(source, event, param){

  };
  this.notify = function(target, event, param){
    if(target!==null&&target!==undefined){
      if(this._observer[target]!==null&&this._observer[target]!==undefined){
        this._observer[target].onNotify(null, event, param);
      }
    }
    else{
      for(var tgt in this._observer){
        this._observer[tgt].onNotify(null, event, param);
      }
    }
  };
  this.addObserver = function(name, unit){
    this._observer[name] = unit;
  };
  this.removeObserver = function(name, unit){
    this._observer[name] = null;
  }
}

var vUnit = {
  data: {
    _observer: {},
    display: false,
    socket: undefined
  },
  methods: {
    notify: function(target, event, param){
      if(target!==null&&target!==undefined){
        if(this._observer[target]!==null&&this._observer[target]!==undefined){
          this._observer[target].onNotify(null, event, param);
        }
      }
      else{
        for(var tgt in this._observer){
          this._observer[tgt].onNotify(null, event, param);
        }
      }
    },
    addObserver: function(name, unit){
      this._observer[name] = unit;
    },
    removeObserver: function(name, unit){
      this._observer[name] = null;
    }
  }
}

export { Unit, vUnit };