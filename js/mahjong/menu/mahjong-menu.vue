<template>
  <div class='scene'>
    <div class='wrapper-full'>
    	<button @click="buttonQueue">Queue</button>
    	<span class="whiteText">Current in queue: {{queueState}}</span>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		display:{
			default: false
		},
		queueState: null
	},
  data () {
    return {
    }
  },
  methods:{
  	init () {
			this.fetchQueueState();
  	},
	  buttonQueue () {
	  	this.$emit('notify', 'menu', 'menuQueue', null);
	  },
	  fetchQueueState () {
	  	this.$emit('notify', 'menu', 'menuFetchQueueState', null);
	  	if(this.display){
	  		setTimeout(this.fetchQueueState, 2000);
	  	}
	  }
  },
  created (){
  	this.init();
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
.whiteText{
	color: white;
}
</style>