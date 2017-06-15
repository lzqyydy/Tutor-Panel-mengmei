import { vUnit } from '../../structures.js'
import mahjongMenu from '../../dom/mahjong-menu.vue'

Vue.component('mahjong-menu', mahjongMenu);

var v = new Vue({
  'el': '#mahjong-menu',
  'mixins': [vUnit],
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