import { Unit } from '../../structures.js';
import G from './objects/geometry.js'
import M from './objects/material.js'

import { rotateAroundObjectAxis, rotateAroundWorldAxis } from './util.js'

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
objects.meshes.background = new THREE.Mesh(G.background, M.background);

// flat table
objects.meshes.table = new THREE.Mesh(G.table, M.table);
objects.meshes.table.rotation.x += Math.PI/2;

// dummy yama
objects.dummies.yama = [];
for(var i=0;i<4;i++){
  objects.dummies.yama[i] = new THREE.Object3D();
  objects.dummies.yama[i].position.x = 0;
  objects.dummies.yama[i].position.y = 0;
  objects.dummies.yama[i].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*i)));
  rotateAroundWorldAxis(objects.dummies.yama[i], new THREE.Vector3(0,1,0), Math.PI/2 * i);
  objects.dummies.yama[i].slots = [];
}
//fill yama with dummies
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
  objects.dummies.hand[i].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*i)));
  rotateAroundWorldAxis(objects.dummies.hand[i], new THREE.Vector3(0,1,0), Math.PI/2 * i);
  objects.dummies.hand[i].slots = [];
}
//fill hand with dummies
for(var i=0;i<14;i++){
  // hand dummies need to interact with raycaster, so use Mesh instead of Object3D
  var dtile = new THREE.Mesh(G.tile, M.invisible);
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
  objects.dummies.discard[i].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*i)));
  rotateAroundWorldAxis(objects.dummies.discard[i], new THREE.Vector3(0,1,0), Math.PI/2 * i);
  objects.dummies.discard[i].slots = [];
}
//fill discard with dummies
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
  objects.dummies.furo[i].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*(i+2)%4)));
  rotateAroundWorldAxis(objects.dummies.furo[i], new THREE.Vector3(0,1,0), Math.PI/2 * (i+2)%4);
}
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
  objects.meshes.tile[i] = new THREE.Mesh(G.tile, M.tile[i]);
}



// following objects are called 'sprite', but plane indeed
// that's because sprite's geometry is not a rectangular, but a circle, resulting in inproperate ray casting
//create furo BG sprite
objects.sprites.furoBG = new THREE.Mesh(new THREE.PlaneGeometry(100, 40), new THREE.MeshBasicMaterial( { color: 0x000000 } ));
//create riichi sprite
objects.sprites.riichi = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), M.riichiSprite);
//create agari sprite
objects.sprites.agari  = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), M.agariSprite);
//create pass sprite
objects.sprites.pass   = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), M.passSprite);
//create tile sprites
objects.sprites.tile = [];
for(var i=0;i<34;i++){
  objects.sprites.tile[i] = new THREE.Mesh(new THREE.PlaneGeometry(20, 28), M.tileSprite[i]);
}
//dummy for furo sprites 
// objects.dummies.furoList = new THREE.Object3D();
// objects.dummies.furoList.$set = function(furo){
//   var tiles = [];
//   for(var i=0;i<furo.data.length;i++){
//     switch(furo.data[i]){
//       case 0:
//         for(var j=1;j<this.children[1].children.length;j++){
//           this.children[1].remove(this.children[1].children[j]);
//         }
//         this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[1].children[1].position.set(-30, 0, 2);
//         this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)+1].clone());
//         this.children[1].children[2].position.set(0, 0, 2);
//         this.children[1].add(objects.sprites.tile[Math.floor(furo.tile/4)+2].clone());
//         this.children[1].children[3].position.set(30, 0, 2);
//         this.children[1].visible = true;
//         this.buttonList[1].userData.tile = furo.tile;
//         break;
//       case 1:
//         for(var j=1;j<this.children[2].children.length;j++){
//           this.children[2].remove(this.children[2].children[j]);
//         }
//         this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)-1].clone());
//         this.children[2].children[1].position.set(-30, 0, 2);
//         this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[2].children[2].position.set(0, 0, 2);
//         this.children[2].add(objects.sprites.tile[Math.floor(furo.tile/4)+1].clone());
//         this.children[2].children[3].position.set(30, 0, 2);
//         this.children[2].visible = true;
//         this.buttonList[2].userData.tile = furo.tile;
//         break;
//       case 2:
//         for(var j=1;j<this.children[3].children.length;j++){
//           this.children[3].remove(this.children[3].children[j]);
//         }
//         this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)-2].clone());
//         this.children[3].children[1].position.set(-30, 0, 2);
//         this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)-1].clone());
//         this.children[3].children[2].position.set(0, 0, 2);
//         this.children[3].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[3].children[3].position.set(30, 0, 2);
//         this.children[3].visible = true;
//         this.buttonList[3].userData.tile = furo.tile;
//         break;
//       case 3:
//       case 4:
//       case 5:
//         for(var j=1;j<this.children[5].children.length;j++){
//           this.children[5].remove(this.children[5].children[j]);
//         }
//         this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[5].children[1].position.set(-30, 0, 2);
//         this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[5].children[2].position.set(0, 0, 2);
//         this.children[5].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[5].children[3].position.set(30, 0, 2);
//         this.children[5].visible = true;
//         this.buttonList[5].userData.tile = furo.tile;
//         break;
//       case 6:
//       case 7:
//       case 8:
//       case 9:
//       case 10:
//         for(var j=1;j<this.children[6].children.length;j++){
//           this.children[6].remove(this.children[6].children[j]);
//         }
//         this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[6].children[1].position.set(-36, 0, 2);
//         this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[6].children[2].position.set(-12, 0, 2);
//         this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[6].children[3].position.set(12, 0, 2);
//         this.children[6].add(objects.sprites.tile[Math.floor(furo.tile/4)].clone());
//         this.children[6].children[4].position.set(36, 0, 2);
//         this.children[6].visible = true;
//         this.buttonList[6].userData.tile = furo.tile;
//         break;
//       case 13:
//         this.children[4].visible = true;
//       case 14:
//         this.children[0].visible = true;
//         break;
//     }
//   }
//   this.children[7].visible = true;
// };
// objects.dummies.furoList.$hide = function(){
//   for(var i=0;i<this.children.length;i++){
//     this.children[i].visible = false;
//   }
// };
// objects.dummies.furoList.$reposition = function(){
//   var ratio = window.innerWidth/400;
//   this.position.set(0, -(window.innerHeight/2-40*0.6*ratio), 1);
//   this.scale.set(0.6*ratio, 0.6*ratio, 1);
// };
// objects.dummies.furoList.$init = function(){
//   var bg = objects.sprites.furoBG;
//   bg.position.set(0,0,1);
//   var txt_riichi = objects.sprites.riichi.clone();
//   txt_riichi.position.set(0,0,2);
//   var txt_agari = objects.sprites.agari.clone();
//   txt_agari.position.set(0,0,2);
//   var txt_pass = objects.sprites.pass.clone();
//   txt_pass.position.set(0,0,2);

//   this.buttonList = [];
  
//   for(var i=0;i<8;i++){
//     var group = new THREE.Group();
//     group.position.set(-150+100*(i%4),20*(Math.floor(i/4)?-1:1),0);
//     var bg_d = bg.clone();
//     bg_d.material = bg.material.clone();
//     bg_d.position.set(0,0,1);
//     bg_d.userData.index = i;
//     bg_d.userData.tile = null;
//     this.buttonList.push(bg_d);
//     group.add(bg_d);
//     this.add(group);
//   }
//   this.children[0].add(txt_riichi);
//   this.children[4].add(txt_agari);
//   this.children[7].add(txt_pass);

//   this.$hide();
// }
// objects.dummies.furoList.$init();


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
objects.sprites.result.next = new THREE.Mesh( new THREE.PlaneGeometry(50,25), M.result.next );
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
        objects.sprites.result.hai[j].remove(objects.sprites.result.hai[j].children[0])
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
    // case 'resize':
    //   objects.dummies.furoList.$reposition();
    //   break;
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
    // case 'socketOperation':
    //   // objects.dummies.furoList.$set(param);
    //   objects.notify('view', 'socketOperation', param);
    //   console.log('operation on object');
    //   break;
    case 'socketRoundEnd':
      console.log(JSON.stringify(param));
      objects.sprites.result.$set(param);
      break;
    // case 'inputOperation':
    //   objects.dummies.furoList.$hide();
    //   break;
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
      objects.sprites.board.round.material = M.board.round[param.round];
      for(var i=0;i<4;i++){
        objects.sprites.board.data[i].pos.material = M.board.pos[(param.ji-27+i)%4];
        //objects.sprites.board.data[i].score.material = new THREE.MeshBasicMaterial( { map: generateTextTexture(param.point[i%4].toString(), 32, 'Arial', 'rgba(255,255,255,1)') } );
      }
      break;
  }
};

export { objects as default }

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
  // castList[2] = {
  //   name: 'furoButton',
  //   type: 'orthographic',
  //   target: objects.dummies.furoList.buttonList,
  //   condition: function(){
  //     return this.parent.visible;
  //   },
  //   success: function(){
  //     this.material.color.g = 0.5;
  //   },
  //   restore: function(){
  //     this.material.color.g = 0;
  //   }
  // };
  objects.notify('controller', 'castInit', castList);
}

export { rayCastInit }
