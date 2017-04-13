
var _objects = function(){
  return {
    data: {
      objects: {
        lights: {},
        meshes: {},
        dummies: {},
        sprites: {}
      }
    },
    methods: {

    },
    created: function(){
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


      //create tile meshes
      this.objects.meshes.tile = [];
      var tileGeo = new THREE.BoxGeometry(4, 5.6, 2.4);
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
        dtile.position.x = 4*Math.floor((i%34)/2); 
        dtile.position.y = 2.4*(i%2)+1.2; 
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
        dtile.position.x = 4*(i%14); 
        dtile.position.y = 2.8; 
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
        dtile.position.x = 4*(i%6)+24*Math.floor((i%24)/18); 
        dtile.position.y = 1.2; 
        dtile.position.z = 5.6*Math.floor((i%24)/6)-5.6*Math.floor((i%24)/18);
        this.methods.util.rotateAroundObjectAxis(dtile, new THREE.Vector3(1,0,0), -Math.PI/2);
        this.methods.util.rotateAroundObjectAxis(dtile, new THREE.Vector3(0,1,0), Math.PI);
        this.objects.dummies.discard[Math.floor(i/24)].slots[i%24] = dtile;
        this.objects.dummies.discard[Math.floor(i/24)].add(dtile);
      }


      //dummy for furo sprites 
      this.objects.dummies.furoList = new THREE.Object3D();
      this.objects.dummies.furoList.$init = function(vm){
        for(var i=0;i<this.children.length;i++){
          this.remove(this.children[i]);
        }
      };
      this.objects.dummies.furoList.$push = function(vm, tile, value){
        var bg = vm.objects.sprites.furoBG.clone();
        var tiles = [];
        switch(value){
          case 0:
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)+1]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)+2]);
            break;
          case 1:
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)-1]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)+1]);
            break;
          case 2:
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)-2]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)-1]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            break;
          case 3:
          case 4:
          case 5:
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            break;
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            tiles.push(vm.objects.sprites.tile[Math.floor(tile/4)]);
            break;
          case 13:
            break;
        }
        var group = new THREE.Group();
        vm.base.sceneOrtho.add(bg);
        if(tiles.length===3){
          tiles[0].position.set(-80,0,1);
          vm.base.sceneOrtho.add(tiles[0]);
          tiles[1].position.set(0,0,1);
          vm.base.sceneOrtho.add(tiles[1]);
          tiles[2].position.set(80,0,1);
          vm.base.sceneOrtho.add(tiles[2]);
        }
        else{
          tiles[0].position.set(-110,0,1);
          vm.base.sceneOrtho.add(tiles[0]);
          tiles[1].position.set(-30,0,1);
          vm.base.sceneOrtho.add(tiles[1]);
          tiles[2].position.set(30,0,1);
          vm.base.sceneOrtho.add(tiles[2]);
          tiles[3].position.set(110,0,1);
          vm.base.sceneOrtho.add(tiles[3]);
        }
        this.add(group);
        this.$reposition(vm);
      };
      this.objects.dummies.furoList.$reposition = function(vm){
        this.position.set(0, 0, 0);
        this.scale.set(100, 100, 1);
        //this.position.set(-120*this.children.length, vm.base.height-60, 0);
      };
      this.base.sceneOrtho.add(this.objects.dummies.furoList);
      //create furo BG sprite
      this.objects.sprites.furoBG = new THREE.Sprite(new THREE.SpriteMaterial( { color: 0x000000 } ));
      this.objects.sprites.furoBG.scale.set(240,120,1);
      //create tile sprites
      this.objects.sprites.tile = [];
      for(var i=0;i<34;i++){
        this.objects.sprites.tile[i] = new THREE.Sprite(new THREE.SpriteMaterial( { map: this.textures.tile[i] } ))
        this.objects.sprites.tile[i].scale.set(60,84,1);
      }
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
