
export default function(){
  return {
    data: {

    },
    methods: {
      util:{
        rotateAroundObjectAxis: function ( object, axis, radians ) {
          var rotationMatrix = new THREE.Matrix4();
          rotationMatrix.makeRotationAxis( axis.normalize(), radians );
          object.matrix.multiply( rotationMatrix );      // post-multiply
          object.rotation.setFromRotationMatrix( object.matrix );
        },
        rotateAroundWorldAxis: function (object, axis, radians) {
          var rotWorldMatrix = new THREE.Matrix4();
          rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
          rotWorldMatrix.multiply(object.matrix);        // pre-multiply
          object.rotation.setFromRotationMatrix(rotWorldMatrix);
        },
        generateTextTexture: function(text, size, font, color){
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          ctx.font = size + "px "+font;
          canvas.width = ctx.measureText(text).width;
          canvas.height = size;
          ctx.font = size + "px "+font;  
          ctx.fillStyle = color;
          ctx.fillText(text, 0, size);
          var texture = new THREE.CanvasTexture(canvas);
          texture.needsUpdate = true;
          return texture;
        }
      }
    },
    created: function(){
      this.methods = this.$options.methods;
    }
  };
};
