export default function(newVal, oldVal){
  var TILEWIDTH = this.objects.consts.TILEWIDTH;
  var TILEHEIGHT = this.objects.consts.TILEHEIGHT;
  var TILETHICK = this.objects.consts.TILETHICK;
  //refresh hand 
  for(var i=0;i<this.objects.dummies.hand[0].slots.length;i++){
    if(this.objects.dummies.hand[0].slots[i].children.length > 0){
      this.objects.dummies.hand[0].slots[i].remove(this.objects.dummies.hand[0].slots[i].children[0]);
    }
  }
  for(var i=0;i<this.game.tehai.haiIndex.length;i++){
    var tile = this.objects.meshes.tile[Math.floor(this.game.tehai.haiIndex[i]/4)].clone(); // clone white
    this.objects.dummies.hand[0].slots[i].add(tile);
  }
  //refresh discard 
  for(var i=0;i<4*24;i++){
    if(this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].children.length > 0){
      this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].remove(this.objects.dummies.discard[Math.floor(i/24)].slots[i%24].children[0]);
    }
  }
  for(var i=0;i<4;i++){
    for(var j=0;j<this.game.tehai.discard[i].length;j++){
      var tile = this.objects.meshes.tile[Math.floor(this.game.tehai.discard[i][j]/4)].clone(); // clone white
      this.objects.dummies.discard[i].slots[j].add(tile);
    }
  }
  //refresh furo
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      for(var k=0;k<4;k++){
        if(this.objects.dummies.furo[i].groups[j].slots[k].children.length > 0){
          this.objects.dummies.furo[i].groups[j].slots[k].remove(this.objects.dummies.furo[i].groups[j].slots[k].children[0]);
        }
      }
    }
  }
  for(var i=0;i<4;i++){
    for(var j=0;j<this.game.tehai.furo[i].length;j++){
      switch(this.game.tehai.furo[i][j].value){
        case 0:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 1].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 2].clone();
          t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = TILEWIDTH;
          t3.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 1:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 1].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile + 1].clone();
          t2.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
          t1.position.x = TILEWIDTH;
          t3.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 2:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 2].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile - 1].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t3.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
          t1.position.x = TILEWIDTH;
          t2.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 3:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = TILEWIDTH;
          t3.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 4:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = TILEWIDTH+TILEHEIGHT;
          t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
          t3.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 5:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
          t3.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          break;
        case 6:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 2.5*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = 2*TILEWIDTH;
          t3.position.x = TILEWIDTH;
          t4.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 7:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
          t2.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
          t3.position.x = TILEWIDTH;
          t4.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 8:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 2*TILEWIDTH+TILEHEIGHT;
          t2.position.x = TILEWIDTH+TILEHEIGHT;
          t3.position.x = TILEHEIGHT;
          t4.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 9:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 3*TILEWIDTH;
          t2.position.x = 2*TILEWIDTH;
          t3.position.x = TILEWIDTH;
          t4.position.x = 0;
          this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(1,0,0), Math.PI);
          this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(1,0,0), Math.PI);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 10:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 2*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = TILEWIDTH;
          t3.position.x = 0;
          t4.position.x = t1.position.x;
          t4.position.z = TILEWIDTH;
          this.methods.util.rotateAroundWorldAxis(t1, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 11:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = TILEWIDTH+TILEHEIGHT;
          t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
          t3.position.x = 0;
          t4.position.x = t2.position.x;
          t4.position.z = TILEWIDTH;
          this.methods.util.rotateAroundWorldAxis(t2, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
        case 12:
          var t1 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t2 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t3 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          var t4 = this.objects.meshes.tile[this.game.tehai.furo[i][j].tile].clone();
          t1.position.x = 1.5*TILEWIDTH+0.5*TILEHEIGHT;
          t2.position.x = 0.5*TILEWIDTH+0.5*TILEHEIGHT;
          t3.position.x = 0;
          t4.position.x = t3.position.x;
          t4.position.z = TILEWIDTH;
          this.methods.util.rotateAroundWorldAxis(t3, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.methods.util.rotateAroundWorldAxis(t4, new THREE.Vector3(0,0,1), Math.PI/2 * 1);
          this.objects.dummies.furo[i].groups[j].slots[0].add(t1);
          this.objects.dummies.furo[i].groups[j].slots[1].add(t2);
          this.objects.dummies.furo[i].groups[j].slots[2].add(t3);
          this.objects.dummies.furo[i].groups[j].slots[3].add(t4);
          break;
      }
    }
  }
  //refresh score
  this.objects.sprites.board.round.material = new THREE.MeshBasicMaterial( { map: this.textures.board.round[this.game.tehai.round] } );
  for(var i=0;i<4;i++){
    this.objects.sprites.board.data[i].pos.material = new THREE.MeshBasicMaterial( { map: this.textures.board.pos[(this.game.tehai.ji-27+i)%4] } );
    this.objects.sprites.board.data[i].score.material = new THREE.MeshBasicMaterial( { map: this.methods.util.generateTextTexture(this.game.tehai.point[i%4].toString(), 32, 'Arial', 'rgba(255,255,255,1)') } );
  }
}