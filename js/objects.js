
var geometryPlane = new THREE.PlaneGeometry( 100, 100);
var materialPlane = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
materialPlane.side = THREE.DoubleSide;
plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x+=Math.PI/2;
scene.add(plane);

var geometry = new THREE.BoxGeometry(4, 5.6, 2.4);

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


//dummy yama
var yama = [];
for(var i=0;i<4;i++){
  yama[i] = new THREE.Object3D();
  yama[i].position.x = 0;
  yama[i].position.y = 0;
  scene.add(yama[i]);
}
//hai
var hai = [];
for(var i=0;i<136;i++){
  var material = new THREE.MeshLambertMaterial({color:new THREE.Color(parseInt(Math.random()*16777216))});
  hai[i] = new THREE.Mesh(geometry, material);
  hai[i].position.x = 12+4*Math.floor((i%34)/2)-50; 
  hai[i].position.y = 2.4*(i%2)+1.2; 
  hai[i].position.z = 30.8;
  hai[i].data = {};
  hai[i].data.index = i;
  rotateAroundWorldAxis(hai[i], new THREE.Vector3(1,0,0), Math.PI/2);
  //cube[i].rotation.x = Math.PI/2; 
  yama[Math.floor(i/34)].add(hai[i]);
}
//rotateAroundWorldAxis(yama[0], new THREE.Vector3(0,1,0), 0);
rotateAroundWorldAxis(yama[1], new THREE.Vector3(0,1,0), Math.PI/2 * 1);
rotateAroundWorldAxis(yama[2], new THREE.Vector3(0,1,0), Math.PI/2 * 2);
rotateAroundWorldAxis(yama[3], new THREE.Vector3(0,1,0), Math.PI/2 * 3);

//2017/03/27
//JavaScript's object will reference with each other
//so when 'hover' changing it's geometry, all tile's geometry will be changed
//then the clone() was added to prevent it
var hoverDummy = new THREE.Object3D();
hoverDummy.position.x = 0;
hoverDummy.position.y = 0;
var hover = new THREE.Mesh(new THREE.BoxGeometry(4, 5.6, 2.4), new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.BackSide
}));
hover.position.x = 0;
hover.position.y = 0;
hover.scale.set(0.01, 0.01, 0.01);
hoverDummy.add(hover);
scene.add(hoverDummy);

function rotateAroundObjectAxis( object, axis, radians ) {
  var rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationAxis( axis.normalize(), radians );
  object.matrix.multiply( rotationMatrix );                       // post-multiply
  object.rotation.setFromRotationMatrix( object.matrix );
}

function rotateAroundWorldAxis(object, axis, radians) {
  var rotWorldMatrix = new THREE.Matrix4();
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
  rotWorldMatrix.multiply(object.matrix);        // pre-multiply
  object.rotation.setFromRotationMatrix(rotWorldMatrix);
}

var geometryTestBox = new THREE.BoxGeometry( 30, 30, 30 );
var materialTestBox = new THREE.MultiMaterial( [
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } ), // right
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } ), // left
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } ), // top
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } ), // bottom
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } ), // back
  new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'resources/texture/UV_Grid_Sm.jpg' ) } )  // front
] );
var testBox = new THREE.Mesh(geometryTestBox, materialTestBox);
testBox.position.y = 30;
scene.add(testBox);