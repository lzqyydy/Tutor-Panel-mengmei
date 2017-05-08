
export default function(){
  return {
    data: {
      base: {

      }
    },
    methods: {

    },
    created: function(){
      this.base.width = window.innerWidth;
      this.base.height = window.innerHeight;

      this.base.scene = new THREE.Scene();
      this.base.camera = new THREE.PerspectiveCamera(75, this.base.width / this.base.height, 0.1, 1000);
      this.base.scene.add(this.base.camera);

      this.base.sceneOrtho = new THREE.Scene();
      this.base.cameraOrtho = new THREE.OrthographicCamera(this.base.width / -2, this.base.width / 2, this.base.height / 2, this.base.height / -2, 0, 10);
      this.base.sceneOrtho.add(this.base.cameraOrtho);

      this.base.renderer = new THREE.WebGLRenderer();
      this.base.renderer.setSize(window.innerWidth, window.innerHeight);
      this.base.renderer.autoClear = false; // To allow render overlay on top of sprited sphere
      document.body.appendChild( this.base.renderer.domElement );
      this.base.stats = new Stats();
      this.base.stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild( this.base.stats.domElement );
    }
  }; 
};
