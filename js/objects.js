
var _objects = function(){
  return {
    data: {
      objects: {
        lights: {},
        meshes: {},
        dummies: {}
      }
    },
    methods: {

    },
    created: function(){
      // soft white light
      var ambientLight = new THREE.AmbientLight( 0x404040 ); 
      var centerLight = new THREE.DirectionalLight(0xffffff, 1);
      // centerLight.position.set(0, 5, 0);
      // scene.add( ambientLight );
      // scene.add( centerLight );


      var backgroundGeo = new THREE.SphereGeometry( 200, 50, 50 );
      backgroundGeo.scale( -1, 1, 1 );  
      var backgroundMat = new THREE.MeshBasicMaterial({
        map: this.textures.background
      });
      this.objects.meshes.background = new THREE.Mesh(backgroundGeo, backgroundMat);
      this.base.scene.add(this.objects.meshes.background);

      var tableGeo = new THREE.PlaneGeometry( 100, 100);
      var tableMat = new THREE.MeshBasicMaterial({
        color: 0xF1E9DA,
        side: THREE.DoubleSide
      });
      this.objects.meshes.table = new THREE.Mesh(tableGeo, tableMat);
      this.objects.meshes.table.rotation.x+=Math.PI/2;
      this.base.scene.add(this.objects.meshes.table);

      //dummy yama
      this.objects.dummies.yama = [];
      for(var i=0;i<4;i++){
        this.objects.dummies.yama[i] = new THREE.Object3D();
        this.objects.dummies.yama[i].position.x = 0;
        this.objects.dummies.yama[i].position.y = 0;
        this.base.scene.add(this.objects.dummies.yama[i]);
      }
      //tiles
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
      //fill yama
      for(var i=0;i<136;i++){
        var tile = this.objects.meshes.tile[31].clone(); // clone white
        tile.position.x = 12+4*Math.floor((i%34)/2)-50; 
        tile.position.y = 2.4*(i%2)+1.2; 
        tile.position.z = 30.8;
        tile.data = {};
        tile.data.index = i;
        this.methods.util.rotateAroundWorldAxis(tile, new THREE.Vector3(1,0,0), -Math.PI/2);
        this.objects.dummies.yama[Math.floor(i/34)].add(tile);
      }
      // rotateAroundWorldAxis(yama[0], new THREE.Vector3(0,1,0), 0);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
      this.methods.util.rotateAroundWorldAxis(this.objects.dummies.yama[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);
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
