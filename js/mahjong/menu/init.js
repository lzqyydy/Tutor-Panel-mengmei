

import mahjongMenu from './mahjong-menu.vue'

Vue.component('mahjong-menu', mahjongMenu);

var menu = {};
menu.type = 'dom';
menu.overlay = false;
menu.name = 'mahjong-menu';

export { menu as default };