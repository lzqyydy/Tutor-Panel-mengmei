import base from './base.js'
import controller from './controller.js'
import objects from './objects.js'
import game from './game.js'
import network from './network.js'
import { Unit } from '../../structures.js';


import mahjongFuroList from './mahjong-furo-list.vue'


Vue.component('mahjong-furo-list', mahjongFuroList);

var play = new Unit();
play.type = 'gl';
play.base = base;
play.controller = controller;
play.objects = objects;
play.game = game;
play.network = network;

play.onNotify = function(source, event, param){
  switch(event){
    case 'socketOperation' :
      this.notify('feature', 'socketOperation', param);
      break;
  }
}

base.addObserver('view', play);
controller.addObserver('view', play);
objects.addObserver('view', play);
network.addObserver('view', play);
game.addObserver('view', play);

base.addObserver('controller', controller);
controller.addObserver('base', base);
controller.addObserver('objects', objects);
controller.addObserver('game', game);
controller.addObserver('network', network);
objects.addObserver('controller', controller);
network.addObserver('controller', controller);
network.addObserver('objects', objects);
network.addObserver('game', game);
game.addObserver('objects', objects);

import { cameraInit } from './base.js'
import { rayCastInit } from './objects.js'

cameraInit();
rayCastInit();

base.scene.add(objects.meshes.background);
base.scene.add(objects.meshes.table);

base.scene.add(objects.dummies.yama[0]);
base.scene.add(objects.dummies.yama[1]);
base.scene.add(objects.dummies.yama[2]);
base.scene.add(objects.dummies.yama[3]);
 
base.scene.add(objects.dummies.hand[0]);
base.scene.add(objects.dummies.hand[1]);
base.scene.add(objects.dummies.hand[2]);
base.scene.add(objects.dummies.hand[3]);

base.scene.add(objects.dummies.discard[0]);
base.scene.add(objects.dummies.discard[1]);
base.scene.add(objects.dummies.discard[2]);
base.scene.add(objects.dummies.discard[3]);

base.scene.add(objects.dummies.furo[0]);
base.scene.add(objects.dummies.furo[1]);
base.scene.add(objects.dummies.furo[2]);
base.scene.add(objects.dummies.furo[3]);

// base.sceneOrtho.add(objects.dummies.furoList);

base.scene.add(objects.sprites.board);

base.sceneOrtho.add(objects.sprites.result);



export { play as default };