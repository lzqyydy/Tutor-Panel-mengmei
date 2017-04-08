
var _base = function () {
  return {
    data: {
      base: {

      }
    },
    methods: {

    },
    created: function(){
      this.base.scene = new THREE.Scene();
      this.base.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.base.scene.add(this.base.camera);

      this.base.renderer = new THREE.WebGLRenderer();
      this.base.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild( this.base.renderer.domElement );
      this.base.stats = new Stats();
      this.base.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild( this.base.stats.domElement );
    }
  }; 
}();
