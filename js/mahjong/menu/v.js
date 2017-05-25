Vue.component('mahjong-menu', {
  render: function(createElement){
    if(this._display){
      return createElement('div');
    }
    else{
      return;
    }
  },
  data: function(){
    return {
      _display: false
    }
  },
  props: {
  }
})



var v = new Vue({
  'el': '#mahjong-menu',
  'methods': {
    onNotify: function(source, event, param){
      switch(event){
        case 'socketRoundEnd' :
          break;
      }
    }
  }
})

export { v as default }