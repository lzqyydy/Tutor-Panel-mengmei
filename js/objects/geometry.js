var geometry = {};

const TILEWIDTH = 4;
const TILEHEIGHT = 5.6;
const TILETHICK = 2.4;

geometry.background = new THREE.SphereGeometry( 200, 50, 50 );
geometry.background.scale( -1, 1, 1 );  


geometry.table = new THREE.PlaneGeometry( 100, 100);

geometry.tile = new THREE.BoxGeometry(TILEWIDTH, TILEHEIGHT, TILETHICK);

export { geometry as default };
