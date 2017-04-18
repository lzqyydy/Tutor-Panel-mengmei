
var _objects = function(){
  return {
    data: {
      objects: {
        lights: {},
        meshes: {},
        dummies: {},
        sprites: {},
        consts: {
          TILEWIDTH: 4,
          TILEHEIGHT: 5.6,
          TILETHICK: 2.4
        }
      }
    },
    methods: {

    },
    created: function(){
      var TILEWIDTH = this.objects.consts.TILEWIDTH;
      var TILEHEIGHT = this.objects.consts.TILEHEIGHT;
      var TILETHICK = this.objects.consts.TILETHICK;
      // soft white light
      // var ambientLight = new THREE.AmbientLight( 0x404040 ); 
      // var centerLight = new THREE.DirectionalLight(0xffffff, 1);
      // centerLight.position.set(0, 5, 0);
      // scene.add( ambientLight );
      // scene.add( centerLight );

      // background ball
      var backgroundGeo = new THREE.SphereGeometry( 200, 50, 50 );
      backgroundGeo.scale( -1, 1, 1 );  
      var backgroundMat = new THREE.MeshBasicMaterial({
        map: this.textures.background
      });
      this.objects.meshes.background = new THREE.Mesh(backgroundGeo, backgroundMat);
      this.base.scene.add(this.objects.meshes.background);

      // flat table
      var tableGeo = new THREE.PlaneGeometry( 100, 100);
      var tableMat = new THREE.MeshBasicMaterial({
        color: 0xF1E9DA,
        side: THREE.DoubleSide
      });
      this.objects.meshes.table = new THREE.Mesh(tableGeo, tableMat);
      this.objects.meshes.table.rotation.x+=Math.PI/2;
      this.base.scene.add(this.objects.meshes.table);

      // dummy yama
      this.objects.dummies.yama = [];
      for(var i=0;i<4;i++){
        this.objects.dummies.yama[i] = new THREE.Object3D();
        this.objects.dummies.yama[i].position.x = 0;
        this.objects.dummies.yama[i].position.y = 0;
        this.base.scene.add(this.objects.dummies.yama[i]);
      }
      this.objects.dummies.yama[0].position.add(new THREE.Vector3(-38,0,30.8));
      this.objects.dummies.yama[1].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
      this.objects.dummies.yama[2].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
      this.objects.dummies.yama[3].position.add(new THREE.Vector3(-38,0,30.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
      // this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[0], new THREE.Vector3(0,1,0), 0);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

      // dummy hand
      this.objects.dummies.hand = [];
      for(var i=0;i<4;i++){
        this.objects.dummies.hand[i] = new THREE.Object3D();
        this.objects.dummies.hand[i].position.x = 0;
        this.objects.dummies.hand[i].position.y = 0;
        this.base.scene.add(this.objects.dummies.hand[i]);
      }
      this.objects.dummies.hand[0].position.add(new THREE.Vector3(-40,0,50));
      this.objects.dummies.hand[1].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
      this.objects.dummies.hand[2].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
      this.objects.dummies.hand[3].position.add(new THREE.Vector3(-40,0,50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));

      // this.methods.util.rotateAroundWorldAxis(this.objects.dummies.hand[0], new THREE.Vector3(0,1,0), 0);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.hand[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.hand[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.hand[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

      // dummy discard
      this.objects.dummies.discard = [];
      for(var i=0;i<4;i++){
        this.objects.dummies.discard[i] = new THREE.Object3D();
        this.objects.dummies.discard[i].position.x = 0;
        this.objects.dummies.discard[i].position.y = 0;
        this.base.scene.add(this.objects.dummies.discard[i]);
      }
      this.objects.dummies.discard[0].position.add(new THREE.Vector3(-12,0,12.8));
      this.objects.dummies.discard[1].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
      this.objects.dummies.discard[2].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
      this.objects.dummies.discard[3].position.add(new THREE.Vector3(-12,0,12.8).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));

      // this.methods.util.rotateAroundWorldAxis(this.objects.dummies.discard[0], new THREE.Vector3(0,1,0), 0);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.discard[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.discard[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.discard[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

      // dummy furo
      this.objects.dummies.furo = [];
      for(var i=0;i<4;i++){
        this.objects.dummies.furo[i] = new THREE.Object3D();
        this.objects.dummies.furo[i].position.x = 0;
        this.objects.dummies.furo[i].position.y = 0;
        this.base.scene.add(this.objects.dummies.furo[i]);
      }
      this.objects.dummies.furo[0].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*2)));
      this.objects.dummies.furo[1].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*3)));
      this.objects.dummies.furo[2].position.add(new THREE.Vector3(-40,0,-50));
      this.objects.dummies.furo[3].position.add(new THREE.Vector3(-40,0,-50).applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3( 0, 1, 0 ), Math.PI/2*1)));
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.furo[0], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.furo[1], new THREE.Vector3(0,1,0), Math.PI/2 * 3);
      // this.methods.util.rotateAroundWorldAxis(this.objects.furo.discard[2], new THREE.Vector3(0,1,0), 0);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.furo[3], new THREE.Vector3(0,1,0), Math.PI/2 * 1);


      //create tile meshes
      this.objects.meshes.tile = [];
      var tileGeo = new THREE.BoxGeometry(TILEWIDTH, TILEHEIGHT, TILETHICK);
      var tileMat = new THREE.MultiMaterial( [
        new THREE.MeshBasicMaterial( { map: this.textures.tile[40] } ), // right
        new THREE.MeshBasicMaterial( { map: this.textures.tile[39] } ), // left
        new THREE.MeshBasicMaterial( { map: this.textures.tile[42] } ), // top
        new THREE.MeshBasicMaterial( { map: this.textures.tile[41] } ), // bottom
        new THREE.MeshBasicMaterial( { map: this.textures.tile[43] } ), // back
        null  // front
      ] );
      for(var i=0;i<34;i++){
        tileMat.materials[5] = new THREE.MeshBasicMaterial( { map: this.textures.tile[Math.floor(i)] } );
        this.objects.meshes.tile[i] = new THREE.Mesh(tileGeo, tileMat.clone());
      }

      //fill yama with dummies
      this.objects.dummies.yama[0].slots = [];
      this.objects.dummies.yama[1].slots = [];
      this.objects.dummies.yama[2].slots = [];
      this.objects.dummies.yama[3].slots = [];
      for(var i=0;i<136;i++){
        var dtile = new THREE.Object3D();
        dtile.position.x = TILEWIDTH*Math.floor((i%34)/2); 
        dtile.position.y = TILETHICK*(i%2)+TILETHICK/2; 
        dtile.position.z = 0;
        this.methods.util.rotateAroundWorldAxis(dtile, new THREE.Vector3(1,0,0), -Math.PI/2);
        this.objects.dummies.yama[Math.floor(i/34)].slots[i%34] = dtile;
        this.objects.dummies.yama[Math.floor(i/34)].add(dtile);
      }

      var invisibleMat = new THREE.MeshBasicMaterial( );
      invisibleMat.visible = false;
      //fill hand with dummies
      this.objects.dummies.hand[0].slots = [];
      this.objects.dummies.hand[1].slots = [];
      this.objects.dummies.hand[2].slots = [];
      this.objects.dummies.hand[3].slots = [];
      for(var i=0;i<4*14;i++){
        // hand dummies need to interact with raycaster, so use Mesh instead of Object3D
        var dtile = new THREE.Mesh(tileGeo, invisibleMat);
        dtile.position.x = TILEWIDTH*(i%14); 
        dtile.position.y = TILEHEIGHT/2; 
        dtile.position.z = 0;
        // we need get this index so we can know which tile should be discarded
        dtile.userData.index = i;
        this.methods.util.rotateAroundWorldAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
        this.objects.dummies.hand[Math.floor(i/14)].slots[i%14] = dtile;
        this.objects.dummies.hand[Math.floor(i/14)].add(dtile);
      }

      //fill discard with dummies
      this.objects.dummies.discard[0].slots = [];
      this.objects.dummies.discard[1].slots = [];
      this.objects.dummies.discard[2].slots = [];
      this.objects.dummies.discard[3].slots = [];
      for(var i=0;i<4*24;i++){
        var dtile = new THREE.Object3D();
        dtile.position.x = TILEWIDTH*(i%6)+24*Math.floor((i%24)/18); 
        dtile.position.y = TILETHICK/2; 
        dtile.position.z = TILEHEIGHT*Math.floor((i%24)/6)-TILEHEIGHT*Math.floor((i%24)/18);
        this.methods.util.rotateAroundObjectAxis(dtile, new THREE.Vector3(1,0,0), -Math.PI/2);
        this.methods.util.rotateAroundObjectAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
        this.objects.dummies.discard[Math.floor(i/24)].slots[i%24] = dtile;
        this.objects.dummies.discard[Math.floor(i/24)].add(dtile);
      }

      //fill furo with dummies
      for(var i=0;i<4;i++){
        this.objects.dummies.furo[i].groups = [];
        for(var j=0;j<4;j++){
          this.objects.dummies.furo[i].groups[j] = new THREE.Group();
          this.objects.dummies.furo[i].groups[j].slots = [];
          this.objects.dummies.furo[i].groups[j].position.x = (j)*(2*TILEWIDTH+2*TILEHEIGHT);
          this.objects.dummies.furo[i].add(this.objects.dummies.furo[i].groups[j]);
        }
      }
      for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
          for(var k=0;k<4;k++){
            var dtile = new THREE.Object3D();
            //dtile.position.x = (k-1.5)*TILEWIDTH;
            dtile.position.y = 0.5*TILETHICK;
            this.objects.dummies.furo[i].groups[j].slots[k] = dtile;
            this.methods.util.rotateAroundObjectAxis(dtile, new THREE.Vector3(1,0,0), Math.PI/2);
            this.objects.dummies.furo[i].groups[j].add(dtile);
          }
        }
      }



      // following objects are called 'sprite', but plane indeed
      // that's because sprite's geometry is not a rectangular, but a circle, resulting in inproperate ray casting
      //create furo BG sprite
      this.objects.sprites.furoBG = new THREE.Mesh(new THREE.PlaneGeometry(100, 40), new THREE.MeshBasicMaterial( { color: 0x000000 } ));
      //create riichi sprite
      this.objects.sprites.riichi = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), new THREE.MeshBasicMaterial( { map: this.textures.operations.riichi } ));
      //create agari sprite
      this.objects.sprites.agari = new THREE.Mesh(new THREE.PlaneGeometry(40, 20), new THREE.MeshBasicMaterial( { map: this.textures.operations.agari } ));
      //create pass sprite
      this.objects.sprites.pass = new THREE.Mesh(new THREE.PlaneGeometry(32, 32), new THREE.MeshBasicMaterial( { map: this.textures.operations.pass } ));
      //create tile sprites
      this.objects.sprites.tile = [];
      for(var i=0;i<34;i++){
        this.objects.sprites.tile[i] = new THREE.Mesh(new THREE.PlaneGeometry(20, 28), new THREE.MeshBasicMaterial( { map: this.textures.tile[i] } ));
      }
      //dummy for furo sprites 
      this.objects.dummies.furoList = new THREE.Object3D();
      this.objects.dummies.furoList.$set = function(vm, furo){
        var tiles = [];
        for(var i=0;i<furo.data.length;i++){
          switch(furo.data[i]){
            case 0:
              for(var j=1;j<this.children[1].children.length;j++){
                this.children[1].remove(this.children[1].children[j]);
              }
              this.children[1].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[1].children[1].position.set(-30, 0, 2);
              this.children[1].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)+1]);
              this.children[1].children[2].position.set(0, 0, 2);
              this.children[1].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)+2]);
              this.children[1].children[3].position.set(30, 0, 2);
              this.children[1].visible = true;
              this.buttonList[1].userData.tile = furo.tile;
              break;
            case 1:
              for(var j=1;j<this.children[2].children.length;j++){
                this.children[2].remove(this.children[2].children[j]);
              }
              this.children[2].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)-1]);
              this.children[2].children[1].position.set(-30, 0, 2);
              this.children[2].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[2].children[2].position.set(0, 0, 2);
              this.children[2].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)+1]);
              this.children[2].children[3].position.set(30, 0, 2);
              this.children[2].visible = true;
              this.buttonList[2].userData.tile = furo.tile;
              break;
            case 2:
              for(var j=1;j<this.children[3].children.length;j++){
                this.children[3].remove(this.children[3].children[j]);
              }
              this.children[3].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)-2]);
              this.children[3].children[1].position.set(-30, 0, 2);
              this.children[3].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)-1]);
              this.children[3].children[2].position.set(0, 0, 2);
              this.children[3].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[3].children[3].position.set(-30, 0, 2);
              this.children[3].visible = true;
              this.buttonList[3].userData.tile = furo.tile;
              break;
            case 3:
            case 4:
            case 5:
              for(var j=1;j<this.children[5].children.length;j++){
                this.children[5].remove(this.children[5].children[j]);
              }
              this.children[5].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[5].children[1].position.set(-30, 0, 2);
              this.children[5].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[5].children[2].position.set(0, 0, 2);
              this.children[5].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[5].children[3].position.set(-30, 0, 2);
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
              this.children[6].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[6].children[1].position.set(-36, 0, 2);
              this.children[6].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[6].children[2].position.set(-12, 0, 2);
              this.children[6].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[6].children[3].position.set(12, 0, 2);
              this.children[6].add(vm.objects.sprites.tile[Math.floor(furo.tile/4)]);
              this.children[6].children[4].position.set(36, 0, 2);
              this.children[6].visible = true;
              this.buttonList[6].userData.tile = furo.tile;
              break;
            case 13:
              this.children[4].visible = true;
              break;
          }
        }
        this.children[7].visible = true;
        this.$reposition(vm);
      };
      this.objects.dummies.furoList.$hide = function(){
        for(var i=0;i<this.children.length;i++){
          this.children[i].visible = false;
        }
      };
      this.objects.dummies.furoList.$reposition = function(vm){
        var ratio = vm.base.width/400;
        this.position.set(0, -(vm.base.height/2-40*0.6*ratio), 1);
        this.scale.set(0.6*ratio, 0.6*ratio, 1);
      };
      this.objects.dummies.furoList.$init = function(vm){
        var bg = vm.objects.sprites.furoBG;
        bg.position.set(0,0,1);
        var txt_riichi = vm.objects.sprites.riichi.clone();
        txt_riichi.position.set(0,0,2);
        var txt_agari = vm.objects.sprites.agari.clone();
        txt_agari.position.set(0,0,2);
        var txt_pass = vm.objects.sprites.pass.clone();
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
      }.call(this.objects.dummies.furoList, this);
      this.base.sceneOrtho.add(this.objects.dummies.furoList);
    }
  };
}();

//2017/03/27
//JavaScript's object will reference with each other
//so when 'hover' changing it's geometry, all tile's geometry will be changed
//then the clone() was added to prevent it
// var hoverDummy = new THREE.Object3D();
// hoverDummy.position.x = 0;
// hoverDummy.position.y = 0;
// var hover = new THREE.Mesh(new THREE.BoxGeometry(4, 5.6, 2.4), new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
//   side: THREE.BackSide
// }));
// hover.position.x = 0;
// hover.position.y = 0;
// hover.scale.set(0.01, 0.01, 0.01);
// hoverDummy.add(hover);
// scene.add(hoverDummy);

// var geometryTestBox = new THREE.BoxGeometry( 30, 30, 30 );
// var materialTestBox = new THREE.MultiMaterial( [
//   new THREE.MeshBasicMaterial( { map: textures.tile[0] } ), // right
//   new THREE.MeshBasicMaterial( { map: textures.tile[1] } ), // left
//   new THREE.MeshBasicMaterial( { map: textures.tile[2] } ), // top
//   new THREE.MeshBasicMaterial( { map: textures.tile[3] } ), // bottom
//   new THREE.MeshBasicMaterial( { map: textures.tile[4] } ), // back
//   new THREE.MeshBasicMaterial( { map: textures.tile[5] } )  // front
// ] );
// var testBox = new THREE.Mesh(geometryTestBox, materialTestBox);
// testBox.position.y = 30;
// this.base.scene.add(testBox);


//2017/3/21
//need more research at rotation
//why side tile need to rotateZ instead of rotateY
//maybe rotate property do it all in once
//and rotate method would work?

//2017/3/22
//it seems that object only rotate at it's own axis
//so a solution is create dummy object at center and append child with offset
//but this way there would be so many dummies at center
//later dive into other's code to find is there a more appropriate way to do this
