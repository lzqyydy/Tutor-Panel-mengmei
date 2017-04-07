
var baseInit = function () {
  base.scene = new THREE.Scene();
  base.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  base.scene.add(base.camera);

  base.renderer = new THREE.WebGLRenderer();
  base.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( base.renderer.domElement );
  base.stats = new Stats();
  base.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( base.stats.domElement );
}
