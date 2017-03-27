var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraDistance = 100;
var cameraPhi = 0;
var cameraTheta = Math.acos(0.8); 
camera.position.set(cameraDistance*Math.cos(cameraTheta)*Math.cos(cameraPhi), cameraDistance*Math.sin(cameraTheta), cameraDistance*Math.cos(cameraTheta)*Math.sin(cameraPhi));
camera.lookAt(new THREE.Vector3(0,0,0));
scene.add(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// soft white light
var ambientLight = new THREE.AmbientLight( 0x404040 ); 
scene.add( ambientLight );
var centerLight = new THREE.DirectionalLight(0xffffff, 1);
centerLight.position.set(0, 5, 0);
scene.add(centerLight);

var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = '';

var geometrySphere = new THREE.SphereGeometry( 200, 50, 50 );
geometrySphere.scale( -1, 1, 1 );
var materialSphere = new THREE.MeshBasicMaterial({
  map: textureLoader.load( 'https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg' )
});
sphere = new THREE.Mesh(geometrySphere, materialSphere);
scene.add(sphere);
