
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
