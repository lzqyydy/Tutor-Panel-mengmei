import base from './base.js'
import controller from './controller.js'
import objects from './objects.js'
import game from './game.js'
import network from './network.js'

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

base.sceneOrtho.add(objects.dummies.furoList);

base.scene.add(objects.sprites.board);

base.sceneOrtho.add(objects.sprites.result);


var view = {};
view.base = base;
view.controller = controller;
view.objects = objects;
view.game = game;
view.network = network;

export { view as default };