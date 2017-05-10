import base from './base.js'
import controller from './controller.js'
import objects from './objects.js'
import game from './game.js'
import network from './network.js'

controller.addObserver('base', base);
controller.addObserver('objects', objects);
controller.addObserver('game', game);
controller.addObserver('network', network);
network.addObserver('controller', controller);
network.addObserver('objects', objects);
network.addObserver('game', game);
game.addObserver('objects', objects);


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
