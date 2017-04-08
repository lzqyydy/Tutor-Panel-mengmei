
var _texture = function(){
  return {
    data: {
      textures: {

      }
    },
    methods: {

    },
    created: function(){
      this.textures.tile = [];
      var tileTex = document.querySelector("img");
      for(var i=0;i<45;i++){
        var canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(tileTex, (i%9)*512, Math.floor(i/9)*512, 512, 512, 0, 0, 512, 512);
        this.textures.tile[i] = new THREE.CanvasTexture(canvas);
        this.textures.tile[i].needsUpdate = true;
      }

      this.textures.background = new THREE.TextureLoader().load( 'resources/texture/background.jpg' );
    }
  };
}();
