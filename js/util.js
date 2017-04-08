
var _util = function(){
  return {
    data: {

    },
    methods: {
      util:{
        rotateAroundObjectAxis: function ( object, axis, radians ) {
          var rotationMatrix = new THREE.Matrix4();
          rotationMatrix.makeRotationAxis( axis.normalize(), radians );
          object.matrix.multiply( rotationMatrix );                       // post-multiply
          object.rotation.setFromRotationMatrix( object.matrix );
        },
        rotateAroundWorldAxis: function (object, axis, radians) {
          var rotWorldMatrix = new THREE.Matrix4();
          rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
          rotWorldMatrix.multiply(object.matrix);        // pre-multiply
          object.rotation.setFromRotationMatrix(rotWorldMatrix);
        }
      }
    },
    created: function(){
      this.methods = this.$options.methods;
    }
  };
}();
