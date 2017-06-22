(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var mahjongMenu = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"scene"},[_c('div',{staticClass:"wrapper-full"},[_c('button',{on:{"click":_vm.buttonQueue}},[_vm._v("Queue")])])])},staticRenderFns: [],
  data () {
    return {
      msg: 'World Hello!!!'
    }
  },
  methods:{
	  buttonQueue () {
	  	this.$emit('notify', 'hahaha');
	  }
  }
};

Vue.component('mahjong-menu', mahjongMenu);

var menu = {};
menu.type = 'dom';
menu.overlay = false;
menu.name = 'mahjong-menu';

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
  };
}

var base = new Unit();

base.width = window.innerWidth;
base.height = window.innerHeight;
base.scene = new THREE.Scene();
base.camera = new THREE.PerspectiveCamera(75, base.width / base.height, 0.1, 1000);
base.scene.add(base.camera);
base.sceneOrtho = new THREE.Scene();
base.cameraOrtho = new THREE.OrthographicCamera(base.width/-2, base.width/2, base.height/2, base.height/-2, 0, 10);
base.sceneOrtho.add(base.cameraOrtho);


var center = new THREE.Vector3(0,0,0);
base.camera.$distance = 100;
base.camera.$theta = Math.acos(0.8); 
base.camera.$phi = 0;
base.camera.position.set(base.camera.$distance*Math.cos(base.camera.$theta)*Math.sin(base.camera.$phi),
                         base.camera.$distance*Math.sin(base.camera.$theta),
                         base.camera.$distance*Math.cos(base.camera.$theta)*Math.cos(base.camera.$phi));
base.camera.lookAt(center);

base.cameraOrtho.position.z = 10;
base.cameraOrtho.lookAt(center);

base.onNotify = function(source, event, param){
  switch(event){
    case 'move':
      base.camera.$phi -= Math.PI*param.x/base.width;
      base.camera.$theta += Math.PI*param.y/base.height;
      if(base.camera.$theta>Math.PI/2-0.01){
        base.camera.$theta = Math.PI/2-0.01;
      }
      if(base.camera.$theta<0){
        base.camera.$theta = 0;
      }
      base.camera.position.set(base.camera.$distance*Math.cos(base.camera.$theta)*Math.sin(base.camera.$phi),
                               base.camera.$distance*Math.sin(base.camera.$theta),
                               base.camera.$distance*Math.cos(base.camera.$theta)*Math.cos(base.camera.$phi));
      base.camera.lookAt(center);
      break;
    case 'resize':
      base.width = window.innerWidth;
      base.height = window.innerHeight;
      
      base.camera.aspect = base.width / base.height;
      base.camera.updateProjectionMatrix();

      base.cameraOrtho.left = - base.width / 2;
      base.cameraOrtho.right = base.width / 2;
      base.cameraOrtho.top = base.height / 2;
      base.cameraOrtho.bottom = - base.height / 2;
      base.cameraOrtho.updateProjectionMatrix();

      break;
  }
};

function cameraInit(){
  //register rayCasting camera
  var cameraList = {};
  cameraList.orthographic = base.cameraOrtho;
  cameraList.perspective = base.camera;
  base.notify('controller', 'cameraInit', cameraList);
}

// raycastList:{
//   name:    //intersect index, 
//   type:    //"orthographic" or "perspective"
//   target:  //intersect target
//   condition:   //judging condition
//   success: //on success operation
//   restore: //on rollback operation
// }
// cameraList:{
//   name: //"orthographic" or "perspective"
//   camera: //object
// }

var rayPicking = function(cameraList, raycastList, mouse, INTERSECTED){
  var raycaster = new THREE.Raycaster();
  for(var i=0;i<raycastList.length;i++){
    raycaster.setFromCamera( mouse, cameraList[raycastList[i].type] );
    var intersects = raycaster.intersectObjects( raycastList[i].target );
    if ( intersects.length > 0 ){
      if ( intersects[ 0 ].object !== INTERSECTED[raycastList[i].name]){
        if ( INTERSECTED[raycastList[i].name] ){
          raycastList[i].restore.call(INTERSECTED[raycastList[i].name]);
        }
        if( raycastList[i].condition.call(intersects[ 0 ].object) ){
          INTERSECTED[raycastList[i].name] = intersects[ 0 ].object;
          raycastList[i].success.call(intersects[ 0 ].object);
          break;
        }
        else{
          INTERSECTED[raycastList[i].name] = null;
        }
      }
    }
    else {
      if ( INTERSECTED[raycastList[i].name] ){
        raycastList[i].restore.call(INTERSECTED[raycastList[i].name]);
      }
      INTERSECTED[raycastList[i].name] = null;
    }
  }
};

var controller = new Unit();

controller.mouse = new THREE.Vector2();
controller.mouse.$clientX = 0;
controller.mouse.$clientY = 0;
controller.mouse.x = 0;
controller.mouse.y = 0;
controller.INTERSECTED = [];
controller.cameraList = {};
controller.raycastList = [];

function mouseMove(event){
  event.preventDefault();
  if(event.buttons&1){ //left button
    controller.notify('base', 'move', {
      x: event.clientX - controller.mouse.clientX,
      y: event.clientY - controller.mouse.clientY
    });
  }
  controller.mouse.clientX = event.clientX;
  controller.mouse.clientY = event.clientY;
  controller.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  controller.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;  

  rayPicking(controller.cameraList, controller.raycastList, controller.mouse, controller.INTERSECTED);

}
function click(event){
  if(controller.INTERSECTED.nextRound&&controller.INTERSECTED.nextRound.parent.visible){
    controller.notify('network', 'inputReady');
  }
  else if(controller.INTERSECTED.furoButton&&controller.INTERSECTED.furoButton.parent.visible){
    var index = controller.INTERSECTED.furoButton.userData.index;
    var tile  = controller.INTERSECTED.furoButton.userData.tile;
    controller.notify('network', 'inputOperation', {
      tile: tile,
      value: index
    });
  }
  else if(controller.INTERSECTED.handTile&&controller.INTERSECTED.handTile.children.length){
    var value = controller.INTERSECTED.handTile.children[0]._tile;
    controller.notify('network', 'inputDiscard', {
      value: value
    });
  }
}


function windowResize() {
  controller.notify(null, 'resize', {});
}

controller.onNotify = function(source, event, param){
  switch(event){
    case 'castInit':
      controller.raycastList = param;
      break;
    case 'cameraInit':
      controller.cameraList = param;
      break;
    case 'conMousemove':
      mouseMove(param);
      break;
    case 'conResize':
      windowResize(param);
      break;
    case 'conClick':
      click(param);
      break;
  }
};

var geometry = {};

const TILEWIDTH$1 = 4;
const TILEHEIGHT$1 = 5.6;
const TILETHICK$1 = 2.4;

geometry.background = new THREE.SphereGeometry( 200, 50, 50 );
geometry.background.scale( -1, 1, 1 );  


geometry.table = new THREE.PlaneGeometry( 100, 100);

geometry.tile = new THREE.BoxGeometry(TILEWIDTH$1, TILEHEIGHT$1, TILETHICK$1);

function rotateAroundObjectAxis( object, axis, radians ) {
  var rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationAxis( axis.normalize(), radians );
  object.matrix.multiply( rotationMatrix );      // post-multiply
  object.rotation.setFromRotationMatrix( object.matrix );
}
function rotateAroundWorldAxis(object, axis, radians) {
  var rotWorldMatrix = new THREE.Matrix4();
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
  rotWorldMatrix.multiply(object.matrix);        // pre-multiply
  object.rotation.setFromRotationMatrix(rotWorldMatrix);
}
function generateTextTexture(text, size, font, color){
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = size + "px "+font;
  canvas.width = ctx.measureText(text).width;
  canvas.height = size;
  ctx.font = size + "px "+font;  
  ctx.fillStyle = color;
  ctx.fillText(text, 0, size);
  var texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

var material = {};
var textures = {};

textures.tile = [];
var tileTex = document.querySelector("img");
for(var i$1=0;i$1<45;i$1++){
  var canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(tileTex, (i$1%9)*512, Math.floor(i$1/9)*512, 512, 512, 0, 0, 512, 512);
  textures.tile[i$1] = new THREE.CanvasTexture(canvas);
  textures.tile[i$1].needsUpdate = true;
}

material.background = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load( 'resources/texture/background.jpg' )
});

material.table = new THREE.MeshBasicMaterial({
  color: 0xF1E9DA,
  side: THREE.DoubleSide
});

material.tile = [];
for(var i$1=0;i$1<34;i$1++){
  material.tile[i$1] = [
    new THREE.MeshBasicMaterial( { map: textures.tile[40] } ), // right
    new THREE.MeshBasicMaterial( { map: textures.tile[39] } ), // left
    new THREE.MeshBasicMaterial( { map: textures.tile[42] } ), // top
    new THREE.MeshBasicMaterial( { map: textures.tile[41] } ), // bottom
    new THREE.MeshBasicMaterial( { map: textures.tile[43] } ), // back
    new THREE.MeshBasicMaterial( { map: textures.tile[i$1] } )   // front
  ];
}

material.invisible = new THREE.MeshBasicMaterial();
material.invisible.visible = false;


material.tileSprite = [];
for(var i$1=0;i$1<34;i$1++){
  material.tileSprite[i$1] = new THREE.MeshBasicMaterial( { map: textures.tile[i$1] });
}

textures.operations = {};
textures.operations.riichi = generateTextTexture('立直', 32, 'Arial', 'rgba(255,255,255,1)');
textures.operations.agari  = generateTextTexture('和了', 32, 'Arial', 'rgba(255,255,255,1)');
textures.operations.pass   = generateTextTexture('×', 32, 'Arial', 'rgba(255,255,255,1)');
material.riichiSprite = new THREE.MeshBasicMaterial( { map: textures.operations.riichi });
material.agariSprite  = new THREE.MeshBasicMaterial( { map: textures.operations.agari });
material.passSprite   = new THREE.MeshBasicMaterial( { map: textures.operations.pass });

textures.result = {};
textures.result.next = generateTextTexture('next', 32, 'Arial', 'rgba(255,255,255,1)');
material.result = {};
material.result.next = new THREE.MeshBasicMaterial( { map: textures.result.next } );


textures.board = {};
textures.board.round = [
  generateTextTexture('东１局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('东２局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('东３局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('东４局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('南１局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('南２局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('南３局', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('南４局', 32, 'Arial', 'rgba(255,255,255,1)')
];
textures.board.pos = [
  generateTextTexture('东', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('南', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('西', 32, 'Arial', 'rgba(255,255,255,1)'),
  generateTextTexture('北', 32, 'Arial', 'rgba(255,255,255,1)'),
];
textures.board.player = [];
textures.board.score = [];

material.board = {};
material.board.round = [
  new THREE.MeshBasicMaterial( { map: textures.board.round[0] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[1] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[2] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[3] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[4] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[5] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[6] }),
  new THREE.MeshBasicMaterial( { map: textures.board.round[7] })
];
material.board.pos = [
  new THREE.MeshBasicMaterial( { map: textures.board.pos[0] }),
  new THREE.MeshBasicMaterial( { map: textures.board.pos[1] }),
  new THREE.MeshBasicMaterial( { map: textures.board.pos[2] }),
  new THREE.MeshBasicMaterial( { map: textures.board.pos[3] }),
];
material.board.player = [];
material.board.score = [];

var objects = new Unit();
objects.meshes = {};
objects.dummies = {};
objects.sprites = {};


const TILEWIDTH = 4;
const TILEHEIGHT = 5.6;
const TILETHICK = 2.4;


// soft white light
// var ambientLight = new THREE.AmbientLight( 0x404040 ); 
// var centerLight = new THREE.DirectionalLight(0xffffff, 1);
// centerLight.position.set(0, 5, 0);
// scene.add( ambientLight );
// scene.add( centerLight );

// background ball
objects.meshes.background = new THREE.Mesh(geometry.background, material.background);

// flat table
objects.meshes.table = new THREE.Mesh(geometry.table, material.table);
objects.meshes.table.rotation.x += Math.PI/2;

// dummy yama
objects.dummies.yama = [];
for(var i=0;i<4;i++){
  objects.dummies.yama[i] = new THREE.Object3D();
  objects.dummies.yama[i].position.x = 0;
  objects.dummies.yama[i].position.y = 0;
}
objects.dummies.yama[0].position.add(new THREE.Vector3(-38,0,30.8));
objects.dummies.yama[1].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
objects.dummies.yama[2].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
objects.dummies.yama[3].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
// rotateAroundWorldAxis(objects.dummies.yama[0], new THREE.Vector3(0,1,0), 0);
rotateAroundWorldAxis(objects.dummies.yama[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
rotateAroundWorldAxis(objects.dummies.yama[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
rotateAroundWorldAxis(objects.dummies.yama[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

//fill yama with dummies
objects.dummies.yama[0].slots = [];
objects.dummies.yama[1].slots = [];
objects.dummies.yama[2].slots = [];
objects.dummies.yama[3].slots = [];
for(var i=0;i<136;i++){
  var dtile = new THREE.Object3D();
  dtile.position.x = TILEWIDTH*Math.floor((i%34)/2); 
  dtile.position.y = TILETHICK*(i%2)+TILETHICK/2; 
  dtile.position.z = 0;
  rotateAroundWorldAxis(dtile, new THREE.Vector3(1,0,0), -Math.PI/2);
  objects.dummies.yama[Math.floor(i/34)].slots[i%34] = dtile;
  objects.dummies.yama[Math.floor(i/34)].add(dtile);
}


// dummy hand
objects.dummies.hand = [];
for(var i=0;i<4;i++){
  objects.dummies.hand[i] = new THREE.Object3D();
  objects.dummies.hand[i].position.x = 0;
  objects.dummies.hand[i].position.y = 0;
}
objects.dummies.hand[0].position.add(new THREE.Vector3(-40,0,50));
objects.dummies.hand[1].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
objects.dummies.hand[2].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
objects.dummies.hand[3].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
// rotateAroundWorldAxis(objects.dummies.hand[0], new THREE.Vector3(0,1,0), 0);
rotateAroundWorldAxis(objects.dummies.hand[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
rotateAroundWorldAxis(objects.dummies.hand[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
rotateAroundWorldAxis(objects.dummies.hand[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

//fill hand with dummies
objects.dummies.hand[0].slots = [];
objects.dummies.hand[1].slots = [];
objects.dummies.hand[2].slots = [];
objects.dummies.hand[3].slots = [];
for(var i=0;i<14;i++){
  // hand dummies need to interact with raycaster, so use Mesh instead of Object3D
  var dtile = new THREE.Mesh(geometry.tile, material.invisible);
  dtile.position.x = TILEWIDTH*i; 
  dtile.position.y = TILEHEIGHT/2; 
  dtile.position.z = 0;
  // we need get index so we can know which tile should be discarded
  dtile.userData.index = i;
  rotateAroundWorldAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
  objects.dummies.hand[0].slots[i] = dtile;
  objects.dummies.hand[0].add(dtile);
}
for(var i=14;i<4*14;i++){
  var dtile = new THREE.Object3D();
  dtile.position.x = TILEWIDTH*(i%14); 
  dtile.position.y = TILEHEIGHT/2; 
  dtile.position.z = 0;
  rotateAroundWorldAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
  objects.dummies.hand[Math.floor(i/14)].slots[i%14] = dtile;
  objects.dummies.hand[Math.floor(i/14)].add(dtile);
}


// dummy discard
objects.dummies.discard = [];
for(var i=0;i<4;i++){
  objects.dummies.discard[i] = new THREE.Object3D();
  objects.dummies.discard[i].position.x = 0;
  objects.dummies.discard[i].position.y = 0;
}
objects.dummies.discard[0].position.add(new THREE.Vector3(-12,0,12.8));
objects.dummies.discard[1].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
objects.dummies.discard[2].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
objects.dummies.discard[3].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
// rotateAroundWorldAxis(objects.dummies.discard[0], new THREE.Vector3(0,1,0), 0);
rotateAroundWorldAxis(objects.dummies.discard[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
rotateAroundWorldAxis(objects.dummies.discard[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
rotateAroundWorldAxis(objects.dummies.discard[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

//fill discard with dummies
objects.dummies.discard[0].slots = [];
objects.dummies.discard[1].slots = [];
objects.dummies.discard[2].slots = [];
objects.dummies.discard[3].slots = [];
for(var i=0;i<4*24;i++){
  var dtile = new THREE.Object3D();
  dtile.position.x = TILEWIDTH*(i%6)+24*Math.floor((i%24)/18); 
  dtile.position.y = TILETHICK/2; 
  dtile.position.z = TILEHEIGHT*Math.floor((i%24)/6)-TILEHEIGHT*Math.floor((i%24)/18);
  rotateAroundObjectAxis(dtile, new THREE.Vector3(1,0,0), -Math.PI/2);
  rotateAroundObjectAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
  objects.dummies.discard[Math.floor(i/24)].slots[i%24] = dtile;
  objects.dummies.discard[Math.floor(i/24)].add(dtile);
}


// dummy furo
objects.dummies.furo = [];
for(var i=0;i<4;i++){
  objects.dummies.furo[i] = new THREE.Object3D();
  objects.dummies.furo[i].position.x = 0;
  objects.dummies.furo[i].position.y = 0;
}
objects.dummies.furo[0].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
objects.dummies.furo[1].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
objects.dummies.furo[2].position.add(new THREE.Vector3(-40,0,-50));
objects.dummies.furo[3].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
rotateAroundWorldAxis(objects.dummies.furo[0], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
rotateAroundWorldAxis(objects.dummies.furo[1], new THREE.Vector3(0,1,0), Math.PI/2 * 3);
// rotateAroundWorldAxis(objects.furo.discard[2], new THREE.Vector3(0,1,0), 0);
rotateAroundWorldAxis(objects.dummies.furo[3], new THREE.Vector3(0,1,0), Math.PI/2 * 1);

//fill furo with dummies
for(var i=0;i<4;i++){
  objects.dummies.furo[i].groups = [];
  for(var j=0;j<4;j++){
    objects.dummies.furo[i].groups[j] = new THREE.Object3D();
    objects.dummies.furo[i].groups[j].slots = [];
    objects.dummies.furo[i].groups[j].position.x = (j)*(2*TILEWIDTH+2*TILEHEIGHT);
    objects.dummies.furo[i].add(objects.dummies.furo[i].groups[j]);
    for(var k=0;k<4;k++){
      var dtile = new THREE.Object3D();
      dtile.position.y = 0.5*TILETHICK;
      objects.dummies.furo[i].groups[j].slots[k] = dtile;
      rotateAroundObjectAxis(dtile, new THREE.Vector3(1,0,0), Math.PI/2);
      objects.dummies.furo[i].groups[j].add(dtile);
    }
  }
}


//create tile meshes
objects.meshes.tile = [];
for(var i=0;i<34;i++){
  objects.meshes.tile[i] = new THREE.Mesh(geometry.tile, material.tile[i]);
}







// following objects are called 'sprite', but plane indeed
// that's because sprite's geometry is not a rectangular, but a circle, resulting in inproperate ray casting
//create furo BG sprite
objects.sprites.furoBG = new THREE.Mesh(new THREE.PlaneGeometry(100, 40), new THREE.MeshBasicMaterial( { color: 0x000000 } ));
//create riichi sprite
objects.sprites.riichi = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), material.riichiSprite);
//create agari sprite
objects.sprites.agari  = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), material.agariSprite);
//create pass sprite
objects.sprites.pass   = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), material.passSprite);
//create tile sprites
objects.sprites.tile = [];
for(var i=0;i<34;i++){
  objects.sprites.tile[i] = new THREE.Mesh(new THREE.PlaneGeometry(20, 28), material.tileSprite[i]);
}
//dummy for furo sprites 
objects.dummies.furoList = new THREE.Object3D();
objects.dummies.furoList.$set = function(furo){
  var tiles = [];
  for(var i=0;i<furo.data.length;i++){
    switch(furo.data[i]){
      case 0:
        for(var j=1;j<this.children[1].children.length;j++){
          this.children[1].remove(this.children[1].children[j]);
        }
        this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[1].children[1].position.set(-30, 0, 2);
        this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)+1].clone());
        this.children[1].children[2].position.set(0, 0, 2);
        this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)+2].clone());
        this.children[1].children[3].position.set(30, 0, 2);
        this.children[1].visible = true;
        this.buttonList[1].userData.tile = furo.tile;
        break;
      case 1:
        for(var j=1;j<this.children[2].children.length;j++){
          this.children[2].remove(this.children[2].children[j]);
        }
        this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)-1].clone());
        this.children[2].children[1].position.set(-30, 0, 2);
        this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[2].children[2].position.set(0, 0, 2);
        this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)+1].clone());
        this.children[2].children[3].position.set(30, 0, 2);
        this.children[2].visible = true;
        this.buttonList[2].userData.tile = furo.tile;
        break;
      case 2:
        for(var j=1;j<this.children[3].children.length;j++){
          this.children[3].remove(this.children[3].children[j]);
        }
        this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)-2].clone());
        this.children[3].children[1].position.set(-30, 0, 2);
        this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)-1].clone());
        this.children[3].children[2].position.set(0, 0, 2);
        this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[3].children[3].position.set(30, 0, 2);
        this.children[3].visible = true;
        this.buttonList[3].userData.tile = furo.tile;
        break;
      case 3:
      case 4:
      case 5:
        for(var j=1;j<this.children[5].children.length;j++){
          this.children[5].remove(this.children[5].children[j]);
        }
        this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[5].children[1].position.set(-30, 0, 2);
        this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[5].children[2].position.set(0, 0, 2);
        this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[5].children[3].position.set(30, 0, 2);
        this.children[5].visible = true;
        this.buttonList[5].userData.tile = furo.tile;
        break;
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        for(var j=1;j<this.children[6].children.length;j++){
          this.children[6].remove(this.children[6].children[j]);
        }
        this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[6].children[1].position.set(-36, 0, 2);
        this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[6].children[2].position.set(-12, 0, 2);
        this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[6].children[3].position.set(12, 0, 2);
        this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
        this.children[6].children[4].position.set(36, 0, 2);
        this.children[6].visible = true;
        this.buttonList[6].userData.tile = furo.tile;
        break;
      case 13:
        this.children[4].visible = true;
      case 14:
        this.children[0].visible = true;
        break;
    }
  }
  this.children[7].visible = true;
};
objects.dummies.furoList.$hide = function(){
  for(var i=0;i<this.children.length;i++){
    this.children[i].visible = false;
  }
};
objects.dummies.furoList.$reposition = function(){
  var ratio = window.innerWidth/400;
  this.position.set(0, -(window.innerHeight/2-40*0.6*ratio), 1);
  this.scale.set(0.6*ratio, 0.6*ratio, 1);
};
objects.dummies.furoList.$init = function(){
  var bg = objects.sprites.furoBG;
  bg.position.set(0,0,1);
  var txt_riichi = objects.sprites.riichi.clone();
  txt_riichi.position.set(0,0,2);
  var txt_agari = objects.sprites.agari.clone();
  txt_agari.position.set(0,0,2);
  var txt_pass = objects.sprites.pass.clone();
  txt_pass.position.set(0,0,2);

  this.buttonList = [];
  
  for(var i=0;i<8;i++){
    var group = new THREE.Group();
    group.position.set(-150+100*(i%4),20*(Math.floor(i/4)?-1:1),0);
    var bg_d = bg.clone();
    bg_d.material = bg.material.clone();
    bg_d.position.set(0,0,1);
    bg_d.userData.index = i;
    bg_d.userData.tile = null;
    this.buttonList.push(bg_d);
    group.add(bg_d);
    this.add(group);
  }
  this.children[0].add(txt_riichi);
  this.children[4].add(txt_agari);
  this.children[7].add(txt_pass);

  this.$hide();
};
objects.dummies.furoList.$init();


//center score board
objects.sprites.board = new THREE.Mesh( new THREE.PlaneGeometry(20, 20), new THREE.MeshBasicMaterial( { color: 0x000000 } ));
objects.sprites.board.position.y = 0.02;
rotateAroundWorldAxis(objects.sprites.board, new THREE.Vector3(1,0,0), - Math.PI/2);

//score board element
objects.sprites.board.round = new THREE.Mesh( new THREE.PlaneGeometry(10, 10), new THREE.MeshBasicMaterial( { color: 0xffffff } ));
objects.sprites.board.round.position.z = 0.02;
objects.sprites.board.add(objects.sprites.board.round);
objects.sprites.board.data = [];
for (var i=0;i<4;i++){
  objects.sprites.board.data[i] = new THREE.Group();
  objects.sprites.board.data[i].pos = new THREE.Mesh( new THREE.PlaneGeometry(5, 5), new THREE.MeshBasicMaterial( { color: 0xff0000 } ));
  objects.sprites.board.data[i].pos.position.x = -2.5;
  objects.sprites.board.data[i].pos.position.z = 0.03;
  objects.sprites.board.data[i].player = new THREE.Mesh( new THREE.PlaneGeometry(5, 2.5), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
  objects.sprites.board.data[i].player.position.x = 2.5;
  objects.sprites.board.data[i].player.position.y = 1.25;
  objects.sprites.board.data[i].player.position.z = 0.03;
  objects.sprites.board.data[i].score = new THREE.Mesh( new THREE.PlaneGeometry(5, 2.5), new THREE.MeshBasicMaterial( { color: 0x0000ff } ));
  objects.sprites.board.data[i].score.position.x = 2.5;
  objects.sprites.board.data[i].score.position.y = -1.25;
  objects.sprites.board.data[i].score.position.z = 0.03;
  objects.sprites.board.data[i].add(objects.sprites.board.data[i].pos);
  objects.sprites.board.data[i].add(objects.sprites.board.data[i].player);
  objects.sprites.board.data[i].add(objects.sprites.board.data[i].score);
  objects.sprites.board.data[i].position.add(new THREE.Vector3(0, -7.5, 0).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 0, 1 ), Math.PI/2*i)));
  rotateAroundWorldAxis(objects.sprites.board.data[i], new THREE.Vector3(0,0,1), Math.PI/2 * i);
  objects.sprites.board.add(objects.sprites.board.data[i]);
}

//result board
objects.sprites.result = new THREE.Mesh( new THREE.PlaneGeometry(500,500), new THREE.MeshBasicMaterial( { color: 0x000000 } ));
objects.sprites.result.position.z = 0.04;
objects.sprites.result.hai = [];
for(var i=0;i<14;i++){
  objects.sprites.result.hai[i] = new THREE.Object3D();
  objects.sprites.result.hai[i].position.x = (i-7)*25;
  objects.sprites.result.hai[i].position.y = 200;
  objects.sprites.result.hai[i].position.z = 0.05;
  objects.sprites.result.add(objects.sprites.result.hai[i]);
}
objects.sprites.result.dora = [];
objects.sprites.result.han = [];
objects.sprites.result.ura = [];
objects.sprites.result.score = [];
objects.sprites.result.next = new THREE.Mesh( new THREE.PlaneGeometry(50,25), material.result.next );
objects.sprites.result.next.position.y = -200;
objects.sprites.result.next.position.z = 0.05;
objects.sprites.result.add(objects.sprites.result.next);
objects.sprites.result.$set = function(result){
  this.visible = true;
  // var result = {
  //   player: number,
  //   oya: tehai.ji-27;
  //   haiIndex: tehai.haiIndex,
  //   furo: tehai.furo,
  //   agariFrom: tehai.agariFrom,
  //   agariHai: tehai.agariHai,
  //   fu: tehai.agari.final.fu,
  //   han: tehai.agari.final.han,
  //   basePoint: tehai.agari.final.basePoint
  // };
  for(var i=0;i<result.length;i++){
    for(var j=0;j<objects.sprites.result.hai.length;j++){
      if(objects.sprites.result.hai[j].children.length){
        objects.sprites.result.hai[j].remove(objects.sprites.result.hai[j].children[0]);
      }
    }
    for(var j=0;j<result[i].data.haiIndex.length;j++){
      objects.sprites.result.hai[j].add(objects.sprites.tile[Math.floor(result[i].data.haiIndex[j]/4)].clone());
    }
  }

};
objects.sprites.result.$hide = function(){
  this.visible = false;
};
objects.sprites.result.$hide();

objects.onNotify = function(source, event, param){
  switch(event){
    case 'resize':
      objects.dummies.furoList.$reposition();
      break;
    case 'socketStart':
      // hide result (if shown)
      objects.sprites.result.$hide();
      //fill yama with white
      for(var i=0;i<136;i++){
        var tile = objects.meshes.tile[31].clone(); // clone white
        objects.dummies.yama[Math.floor(i/34)].slots[i%34].add(tile);
      }
      //fill others hand with white
      for(var i=13;i<4*13;i++){
        var tile = objects.meshes.tile[31].clone(); // clone white
        objects.dummies.hand[Math.floor(i/13)].slots[i%13].add(tile);
      }
      break;
    case 'socketOperation':
      objects.dummies.furoList.$set(param);
      break;
    case 'socketRoundEnd':
      console.log(JSON.stringify(param));
      objects.sprites.result.$set(param);
      break;
    case 'inputOperation':
      objects.dummies.furoList.$hide();
      break;
    case 'tehaiChanged':
      //refresh hand 
      for(var i=0;i<objects.dummies.hand[0].slots.length;i++){
        if(objects.dummies.hand[0].slots[i].children.length > 0){
          objects.dummies.hand[0].slots[i].remove(objects.dummies.hand[0].slots[i].children[0]);
        }
      }
      for(var i=0;i<param.haiIndex.length;i++){
        var tile = objects.meshes.tile[Math.floor(param.haiIndex[i]/4)].clone(); // clone white
        objects.dummies.hand[0].slots[i].add(tile);
        objects.dummies.hand[0].slots[i].children[0]._tile = param.haiIndex[i];
      }
      //refresh discard 
      for(var i=0;i<4*24;i++){
        if(objects.dummies.discard[Math.floor(i/24)].slots[i%24].children.length > 0){
          objects.dummies.discard[Math.floor(i/24)].slots[i%24].remove(objects.dummies.discard[Math.floor(i/24)].slots[i%24].children[0]);
        }
      }
      for(var i=0;i<4;i++){
        for(var j=0;j<param.discard[i].length;j++){
          var tile = objects.meshes.tile[Math.floor(param.discard[i][j]/4)].clone(); // clone white
          objects.dummies.discard[i].slots[j].add(tile);
        }
      }
      //refresh furo
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          for(var k=0;k<4;k++){
            if(objects.dummies.furo[i].groups[j].slots[k].children.length > 0){
              objects.dummies.furo[i].groups[j].slots[k].remove(objects.dummies.furo[i].groups[j].slots[k].children[0]);
            }
          }
        }
      }
      for(var i=0;i<4;i++){
        for(var j=0;j<param.furo[i].length;j++){
          switch(param.furo[i][j].value){
            case 0:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile + 1].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile + 2].clone();
              t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = TILEWIDTH;
              t3.position.x = 0;
              rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 1:
              var t1 = objects.meshes.tile[param.furo[i][j].tile - 1].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile + 1].clone();
              t2.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
              t1.position.x = TILEWIDTH;
              t3.position.x = 0;
              rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 2:
              var t1 = objects.meshes.tile[param.furo[i][j].tile - 2].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile - 1].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t3.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
              t1.position.x = TILEWIDTH;
              t2.position.x = 0;
              rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 3:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = TILEWIDTH;
              t3.position.x = 0;
              rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 4:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = TILEWIDTH+TILEHEIGHT;
              t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
              t3.position.x = 0;
              rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 5:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
              t3.position.x = 0;
              rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              break;
            case 6:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 2.5*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = 2*TILEWIDTH;
              t3.position.x = TILEWIDTH;
              t4.position.x = 0;
              rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 7:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
              t2.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
              t3.position.x = TILEWIDTH;
              t4.position.x = 0;
              rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 8:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
              t2.position.x = TILEWIDTH+TILEHEIGHT;
              t3.position.x = TILEHEIGHT;
              t4.position.x = 0;
              rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 9:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 3*TILEWIDTH;
              t2.position.x = 2*TILEWIDTH;
              t3.position.x = TILEWIDTH;
              t4.position.x = 0;
              rotateAroundWorldAxis(t1, new THREE.Vector3(1,0,0), Math.PI);
              rotateAroundWorldAxis(t4, new THREE.Vector3(1,0,0), Math.PI);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 10:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = TILEWIDTH;
              t3.position.x = 0;
              t4.position.x = t1.position.x;
              t4.position.z = TILEWIDTH;
              rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 11:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = TILEWIDTH+TILEHEIGHT;
              t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
              t3.position.x = 0;
              t4.position.x = t2.position.x;
              t4.position.z = TILEWIDTH;
              rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
            case 12:
              var t1 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t2 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t3 = objects.meshes.tile[param.furo[i][j].tile].clone();
              var t4 = objects.meshes.tile[param.furo[i][j].tile].clone();
              t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
              t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
              t3.position.x = 0;
              t4.position.x = t3.position.x;
              t4.position.z = TILEWIDTH;
              rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
              objects.dummies.furo[i].groups[j].slots[0].add(t1);
              objects.dummies.furo[i].groups[j].slots[1].add(t2);
              objects.dummies.furo[i].groups[j].slots[2].add(t3);
              objects.dummies.furo[i].groups[j].slots[3].add(t4);
              break;
          }
        }
      }
      //refresh score
      objects.sprites.board.round.material = material.board.round[param.round];
      for(var i=0;i<4;i++){
        objects.sprites.board.data[i].pos.material = material.board.pos[(param.ji-27+i)%4];
        //objects.sprites.board.data[i].score.material = new THREE.MeshBasicMaterial( { map: generateTextTexture(param.point[i%4].toString(), 32, 'Arial', 'rgba(255,255,255,1)') } );
      }
      break;
  }
};

function rayCastInit(){//register rayCasting objects
  var castList = [];
  castList[0] = {
    name: 'nextRound',
    type: 'orthographic',
    target: [objects.sprites.result.next],
    condition: function(){
      return this.parent.visible;
    },
    success: function(){
      this.material.color.r = 0.5;
      this.material.color.g = 1;
      this.material.color.b = 0.5;
    },
    restore: function(){
      this.material.color.r = 1;
      this.material.color.g = 1;
      this.material.color.b = 1;
    }
  };
  castList[1] = {
    name: 'furoButton',
    type: 'orthographic',
    target: objects.dummies.furoList.buttonList,
    condition: function(){
      return this.parent.visible;
    },
    success: function(){
      this.material.color.g = 0.5;
    },
    restore: function(){
      this.material.color.g = 0;
    }
  };
  castList[2] = {
    name: 'handTile',
    type: 'perspective',
    target: objects.dummies.hand[0].slots,
    condition: function(){
      return true;
    },
    success: function(){
      if(this.children[0]){
        this.children[0].position.y += 1;
      }
    },
    restore: function(){
      if(this.children[0]){
        this.children[0].position.y = 0;
      }
    }
  };
  objects.notify('controller', 'castInit', castList);
}

var game = new Unit();

game.tehai = {};

game.onNotify = function(source, event, param){
  switch(event){
    case 'socketStart':
      param.tehai.haiIndex.sort(function(a,b){
        return a-b;
      });
      game.tehai = param.tehai;
      game.notify('objects', 'tehaiChanged', game.tehai);
      break;
    case 'socketDraw':
      // data:{
      //  turn: {number},
      //  hai: {number},
      //  kan: {bool},
      //  agari: {bool},
      //  riichi: {bool}
      // }
      if(param.turn===game.tehai.ji){
        if(param.hai!==null){
          game.tehai.haiIndex.push(param.hai);
          // trigger refresh hand
          game.notify('objects', 'tehaiChanged', game.tehai);
        }
      }
      break;
    case 'socketDiscard':
      // data:{
      //  discard: {number},
      // }
      if(param&&param.hai!==null){
        game.tehai.discard = param.discard;
        // trigger refresh hand
        game.notify('objects', 'tehaiChanged', game.tehai);
      }
      break;
    case 'socketFuro':
      // data:{
      //   tile: Number, //0-34
      //   value: Number,
      //   player: Number //27-30
      // }
      //this.game.tehai.furo = data.furo;
      param.tehai.haiIndex.sort(function(a,b){
        return a-b;
      });
      game.tehai = param.tehai;
      game.notify('objects', 'tehaiChanged', game.tehai);
      break;
    case 'socketRoundEnd':
      break;
    case 'inputDiscard':
      game.tehai.haiIndex.splice(game.tehai.haiIndex.indexOf(param.value), 1);
      game.notify('objects', 'tehaiChanged', game.tehai);
      break;
  }
};

var network = new Unit();


network.onNotify = function(source, event, param){
  switch(event){
    case 'inputReady':
      network.socket.emit('ready');
      break;
    case 'inputOperation':
      network.socket.emit('operation', param, function(){
        network.notify('objects', 'inputOperation');
      });
      break;
    case 'inputDiscard':
      network.socket.emit('discard', param, function(){
        network.notify('game', 'inputDiscard', param);
      });
      break;
    case 'socketStart'    :
    case 'socketDraw'     :
    case 'socketDiscard'  :
    case 'socketOperation':
    case 'socketFuro'     :
    case 'socketRoundEnd' :
    case 'socketGameEnd'  :
      network.notify(null, event, param);
      break;
  }
};

var play = new Unit();
play.type = 'gl';
play.base = base;
play.controller = controller;
play.objects = objects;
play.game = game;
play.network = network;

play.onNotify = function(source, event, param){
	switch(event){
    case 'socketGameEnd'  :
      break;
  }
};

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

var views = {};
views.menu = menu;

views.play = play;

var base$1 = new Unit();
base$1.scene = new THREE.Scene();
base$1.camera = new THREE.PerspectiveCamera();
base$1.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

var controller$1 = new Unit();

controller$1.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

var objects$1 = new Unit();

objects$1.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

var game$1 = new Unit();

game$1.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

var network$1 = new Unit();

network$1.onNotify = function(source, event, param){
  switch(event){
    default:
      break;
  }
};

var blank = {};
blank.type = 'gl';
blank.base = base$1;
blank.controller = controller$1;
blank.objects = objects$1;
blank.game = game$1;
blank.network = network$1;

var views$1 = {};
views$1.blank = blank;

function changeView(view){
  if(view===undefined){
    this.view&&(this.view.active = false);
    this.view = views$1.blank;
    this.view.active = true;
    this.base = views$1.blank.base;
    this.controller = views$1.blank.controller;
    this.network = views$1.blank.network;
  }
  else{
    switch(view.type){
      case 'gl':
        this.view&&(this.view.active = false);
        this.view = view;
        this.view.active = true;
        this.view.addObserver('dom', this.domBus);
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
        break;
      case 'dom':
        // switch gl scene to blank scene if dom view is top-level view
        if(!view.overlay){
          this.view&&(this.view.active = false);
          this.view = views$1.blank;
          this.view.active = true;
          this.base = views$1.blank.base;
          this.controller = views$1.blank.controller;
          this.network = views$1.blank.network;
        }
        if(!this.domBus.display[view.name]){
          this.domBus.display[view.name] = true;
        }
          console.log(this.domBus.display);
          console.log(this.domBus.display[view.name]);
        break;
      default:
        break;
    }
  }
}

var features = {
  mahjong: {}
};

features['mahjong'] = views;

var main = new Unit();

main.changeView = changeView;

// top-level renderer

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClear = false; // To allow render overlay on top of sprited sphere
renderer.domElement.className = 'three';
document.body.insertBefore( renderer.domElement, document.querySelector("#tiles") );
var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.insertBefore( stats.domElement, document.querySelector("#tiles") );

var render = function() {
  requestAnimationFrame(render);

  stats.update();
  renderer.clear();
  if(main.base.scene){
    renderer.render(main.base.scene, main.base.camera);
  }
  renderer.clearDepth();
  if(main.base.sceneOrtho){
    renderer.render(main.base.sceneOrtho, main.base.cameraOrtho);
  }
};

// top-level controller

function controlCB(event, data){
  if(event==='conResize'){
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  main.controller.onNotify(null, event, data);
}
document.addEventListener( 'mousemove', controlCB.bind(null,'conMousemove'), false );
window.addEventListener( 'resize',      controlCB.bind(null,'conResize'   ), false );
document.addEventListener( 'click',     controlCB.bind(null,'conClick'    ), false );

// top-level socket

var socket = io('/touhou');
socket.emit('join');
socket.on('full', function(){
  this.emit('ready');
});

function socketCB(event, data){
  main.network.onNotify(null, event, data);
}

socket.on('start',     socketCB.bind(null,'socketStart'    ));
socket.on('draw',      socketCB.bind(null,'socketDraw'     ));
socket.on('discarded', socketCB.bind(null,'socketDiscard'  ));
socket.on('operation', socketCB.bind(null,'socketOperation'));
socket.on('furo',      socketCB.bind(null,'socketFuro'     ));
socket.on('roundEnd',  socketCB.bind(null,'socketRoundEnd' ));
socket.on('gameEnd',   socketCB.bind(null,'socketGameEnd'  ));
socket.on('reconnect', function(){
  this.emit('join');
});

// some more work
main.socket = socket;


main.domBus = new Vue({
  'el': '#domComponents',
  'data': {
    _observer: {},
    display: {
      'mahjong-menu': false
    }
  },
  'methods': {
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
    onNotify: function(source, event, param){
      switch(event){
        case 'socketRoundEnd' :
          break;
      }
    },
    addObserver: function(name, unit){
      this._observer[name] = unit;
    },
    removeObserver: function(name, unit){
      this._observer[name] = null;
    }
  }
});
// RUN! 
main.changeView();
main.changeView(features['mahjong']['menu']);
//main.changeView(features['mahjong']['play']);
render();

})));
//# sourceMappingURL=main.bundle.js.map
