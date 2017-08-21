
import { Unit } from '../../structures.js';

import mahjongMenu from './mahjong-menu.vue'

Vue.component('mahjong-menu', mahjongMenu);

var menu = new Unit();
menu.type = 'dom';
menu.overlay = false;
menu.name = 'mahjongMenu';

export { menu as default };