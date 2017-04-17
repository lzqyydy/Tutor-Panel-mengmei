
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

      //this.objects.dummies.furoList.$init(this);
      this.methods.game.render.call(this);
    }
  });
}