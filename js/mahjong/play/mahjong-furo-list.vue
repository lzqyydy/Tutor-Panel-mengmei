<template>
  <div class='container'>
    <div class="furoBlock">
      <div class="tile" @click="chosen(-1)">pass</div>
    </div>
    <div class="furoBlock" v-for="(furo, i) in furos" @click="chosen(i)">
      <div class="tile" v-if="furo.ops<=2">{{furo.tile-furo.ops}}</div>
      <div class="tile" v-if="furo.ops<=2">{{furo.tile-furo.ops+1}}</div>
      <div class="tile" v-if="furo.ops<=2">{{furo.tile-furo.ops+2}}</div>
      <div class="tile" v-if="furo.ops>=2&&furo.ops<=10">{{furo.tile}}</div>
      <div class="tile" v-if="furo.ops>=2&&furo.ops<=10">{{furo.tile}}</div>
      <div class="tile" v-if="furo.ops>=2&&furo.ops<=10">{{furo.tile}}</div>
      <div class="tile" v-if="furo.ops>=6&&furo.ops<=10">{{furo.tile}}</div>
      <div class="tile" v-if="furo.ops===13">agari</div>
      <div class="tile" v-if="furo.ops===14">riichi</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    display:{
      default: false
    },
    furos: null
  },
  data () {
    return {
    }
  },
  methods:{
    chosen(i){
      this.$emit('notify', 'furoList', 'playOperationChosen', i);
    }
  },
  created (){

  }
}
</script>

<style>
.container {
  position: absolute;
  width: 80vw;
  height: 100vh;
  top: 0;
  left: 10vw;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
}
.furoBlock{
  width: 20vw;
  height: 10vw;
  margin: 0;
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tile{
  display: inline-block;
  color: white;
}
</style>