
export default function(){
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
      this.textures.operations.riichi = this.methods.util.generateTextTexture('立直', 32, 'Arial', 'rgba(255,255,255,1)');
      this.textures.operations.agari = this.methods.util.generateTextTexture('和了', 32, 'Arial', 'rgba(255,255,255,1)');
      this.textures.operations.pass = this.methods.util.generateTextTexture('×', 32, 'Arial', 'rgba(255,255,255,1)');

      this.textures.board = {};
      this.textures.board.round = [
        this.methods.util.generateTextTexture('东１局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('东２局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('东３局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('东４局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('南１局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('南２局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('南３局', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('南４局', 32, 'Arial', 'rgba(255,255,255,1)')
      ];
      this.textures.board.pos = [
        this.methods.util.generateTextTexture('东', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('南', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('西', 32, 'Arial', 'rgba(255,255,255,1)'),
        this.methods.util.generateTextTexture('北', 32, 'Arial', 'rgba(255,255,255,1)'),
      ];
      this.textures.board.player = [];
      this.textures.board.score = [];

      this.textures.result = {};
    }
  };
};
