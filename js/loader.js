
var vm;
window.onload = function(){
  vm = new Vue({
    mixins: [_util, _base, _controller, _texture, _objects, _game],
    data: {

    },
    methods: {

    },
    calculated: {

    },
    watch: {

    },
    created: function(){
      this.controller.gui = new dat.GUI();
      var f1 = this.controller.gui.addFolder('position');
      f1.add(this.objects.dummies.furoList.position, 'x');
      f1.add(this.objects.dummies.furoList.position, 'y');
      f1.add(this.objects.dummies.furoList.position, 'z');
      f1.open();
      var f2 = this.controller.gui.addFolder('scale');
      f2.add(this.objects.sprites.pass.scale, 'x');
      f2.add(this.objects.sprites.pass.scale, 'y');
      f2.add(this.objects.sprites.pass.scale, 'z');
      f2.open();


      // var furo = [[],[],[],[]];
      // furo[0][0] = {tile: 30, value: 0};
      // furo[0][1] = {tile: 30, value: 1};
      // furo[0][2] = {tile: 30, value: 2};
      // furo[1][0] = {tile: 30, value: 3};
      // furo[1][1] = {tile: 30, value: 4};
      // furo[1][2] = {tile: 30, value: 5};
      // furo[2][0] = {tile: 30, value: 6};
      // furo[2][1] = {tile: 30, value: 7};
      // furo[2][2] = {tile: 30, value: 8};
      // furo[3][0] = {tile: 30, value: 9};
      // furo[3][1] = {tile: 30, value: 10};
      // furo[3][2] = {tile: 30, value: 11};
      // furo[3][3] = {tile: 30, value: 12};
      // this.game.tehai.furo = furo;
      // for(var i=0;i<4;i++){
      //   for(var j=0;j<4;j++){
      //     for(var k=0;k<4;k++){
      //       this.objects.dummies.furo[i].groups[j].slot[k].add(this.objects.meshes.tile[30].clone());
      //     }
      //   }
      // }

      this.methods.game.render.call(this);
    }
  });
}