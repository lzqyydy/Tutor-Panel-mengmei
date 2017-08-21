<template>
  <div class='container'>
    <div class="furoBlock" v-for="furo in furos"></div>
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

  },
  created (){

  }
}
</script>

<style>
.container {
  position: absolute;
  width: 60vw;
  height: 100vh;
  top: 0;
  left: 20vw;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
}
.furoBlock{
  width: 15vw;
  height: 150px;
  margin: 0 5px 5px 0;
}
</style>