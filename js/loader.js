
window.onload = function(){
  var vm = new Vue({
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
      this.methods.game.render.call(this);
    }
  });
}