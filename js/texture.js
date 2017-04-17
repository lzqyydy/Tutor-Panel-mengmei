
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

      this.textures.operations = {};
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = 32 + "px Arial";
      canvas.width = ctx.measureText('立直').width;
      canvas.height = 32;
      ctx.font = 32 + "px Arial";       
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.textAlign = "center";
      ctx.fillText('立直', ctx.measureText('立直').width/2, 32-4);
      this.textures.operations.riichi = new THREE.CanvasTexture(canvas);
      this.textures.operations.riichi.needsUpdate = true;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = 32 + "px Arial";
      canvas.width = ctx.measureText('和了').width;
      canvas.height = 32;
      ctx.font = 32 + "px Arial";       
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.textAlign = "center";
      ctx.fillText('和了', ctx.measureText('和了').width/2, 32-4);
      this.textures.operations.agari = new THREE.CanvasTexture(canvas);
      this.textures.operations.agari.needsUpdate = true;
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = 32 + "px Arial";
      canvas.width = ctx.measureText('×').width;
      canvas.width = 32;
      canvas.height = 32;
      ctx.font = 32 + "px Arial";       
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.textAlign = "center";
      ctx.fillText('×', 16, 32-4);
      this.textures.operations.pass = new THREE.CanvasTexture(canvas);
      this.textures.operations.pass.needsUpdate = true;
    }
  };
}();
