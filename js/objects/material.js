import { generateTextTexture } from '../util.js'

var material = {};
var textures = {};

textures.tile = [];
var tileTex = document.querySelector("img");
for(var i=0;i<45;i++){
  var canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(tileTex, (i%9)*512, Math.floor(i/9)*512, 512, 512, 0, 0, 512, 512);
  textures.tile[i] = new THREE.CanvasTexture(canvas);
  textures.tile[i].needsUpdate = true;
}

material.background = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load( 'resources/texture/background.jpg' )
});

material.table = new THREE.MeshBasicMaterial({
  color: 0xF1E9DA,
  side: THREE.DoubleSide
});

material.tile = [];
for(var i=0;i<34;i++){
  material.tile[i] = new THREE.MultiMaterial( [
    new THREE.MeshBasicMaterial( { map: textures.tile[40] } ), // right
    new THREE.MeshBasicMaterial( { map: textures.tile[39] } ), // left
    new THREE.MeshBasicMaterial( { map: textures.tile[42] } ), // top
    new THREE.MeshBasicMaterial( { map: textures.tile[41] } ), // bottom
    new THREE.MeshBasicMaterial( { map: textures.tile[43] } ), // back
    new THREE.MeshBasicMaterial( { map: textures.tile[i] } )   // front
  ] );
}

material.invisible = new THREE.MeshBasicMaterial();
material.invisible.visible = false;


material.tileSprite = [];
for(var i=0;i<34;i++){
  material.tileSprite[i] = new THREE.MeshBasicMaterial( { map: textures.tile[i] });
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
material.result.next = new THREE.MeshBasicMaterial( { map: textures.result.next } )


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

export { material as default };