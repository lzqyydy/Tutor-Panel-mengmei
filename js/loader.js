
var base = {};
var controller = {
	camera: {},
	operations: {}
};
var textures = {};
var objects = {
	lights: {},
	meshes: {},
	dummies: {}
};


window.onload = function () {
	// init and load all resources
  baseInit();
  controllerInit();
  textureInit();
  objectInit();
  // and set their initial value and link them here
  gameInit();
  // render and event handling 
  render();

};
