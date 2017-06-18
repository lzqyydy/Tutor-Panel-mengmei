<template>
  <div class='scene'>
    <div class='wrapper-full'>
    	<span style="color:yellow">{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'World Hello!!!'
    }
  }
}
</script>

<style>
.scene {
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
}
.wrapper-full{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: inline-block;
}
.wrapper-square{
	position: absolute;
	width: 100vmax;
	height: 100vmax;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>