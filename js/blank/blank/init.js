import base from './base.js'
import controller from './controller.js'
import objects from './objects.js'
import game from './game.js'
import network from './network.js'

var blank = {};
blank.type = 'gl';
blank.base = base;
blank.controller = controller;
blank.objects = objects;
blank.game = game;
blank.network = network;

export { blank as default };