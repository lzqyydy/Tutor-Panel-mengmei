
import _util        from "./util.js";
import _base        from "./base.js";
import _controller  from "./controller.js";
import _texture     from "./texture.js";
import _objects     from "./objects.js";
import _game        from "./game.js";

var vm;
window.onload = function(){
  vm = new Vue({
    mixins: [_util(), _base(), _controller(), _texture(), _objects(), _game()],
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
      //var result = '[{"operation":"agari","data":{"player":0,"oya":0,"haiIndex":[0,1,2,3,4,5,6,7,8,10,9,11,12,14],"agariFrom":0,"agariHai":3,"fu":{"base":20,"kotsu":0,"jyan":2,"machi":0,"menzen":0,"tsumo":2,"chitoi":0,"pinfu":0,"count":30},"han":{"dora":false,"riichi":false,"ippatsu":false,"menzentsumo":1,"tanyao":false,"pinfu":false,"ipeiko":false,"yaku_haku":false,"yaku_hatsu":false,"yaku_chun":false,"yaku_jikaze":false,"yaku_bakaze":false,"rinsyan":false,"chankan":false,"haitei":false,"hotei":false,"sansyoku":false,"ikki":false,"honchantai":false,"chitoi":false,"toitoi":false,"sananko":false,"honro":false,"santoko":false,"sankan":false,"syousangen":false,"double":false,"honitsu":false,"junchantai":false,"ryanpei":3,"chinitsu":6,"kokushi":false,"suanko":false,"daisangen":false,"tsuiso":false,"syousushi":false,"daisushi":false,"ryuiso":false,"chinroto":false,"sukantsu":false,"churen":false,"tenhou":false,"chihou":false,"nakashi":false,"count":10},"basePoint":4000}}]';
      //var result = '[{"operation":"agari","data":{"player":3,"oya":0,"haiIndex":[0,1,2,3,4,5,6,7,8,10,9,11,12,14],"agariFrom":0,"agariHai":3,"fu":{"base":20,"kotsu":0,"jyan":2,"machi":0,"menzen":0,"tsumo":2,"chitoi":0,"pinfu":0,"count":30},"han":{"dora":false,"riichi":false,"ippatsu":false,"menzentsumo":1,"tanyao":false,"pinfu":false,"ipeiko":false,"yaku_haku":false,"yaku_hatsu":false,"yaku_chun":false,"yaku_jikaze":false,"yaku_bakaze":false,"rinsyan":false,"chankan":false,"haitei":false,"hotei":false,"sansyoku":false,"ikki":false,"honchantai":false,"chitoi":false,"toitoi":false,"sananko":false,"honro":false,"santoko":false,"sankan":false,"syousangen":false,"double":false,"honitsu":false,"junchantai":false,"ryanpei":3,"chinitsu":6,"kokushi":false,"suanko":false,"daisangen":false,"tsuiso":false,"syousushi":false,"daisushi":false,"ryuiso":false,"chinroto":false,"sukantsu":false,"churen":false,"tenhou":false,"chihou":false,"nakashi":false,"count":10},"basePoint":4000}}]';

      this.methods.game.render.call(this);
    }
  });
}