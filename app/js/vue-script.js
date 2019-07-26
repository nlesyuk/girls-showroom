let vm = new Vue({
	el: "#app",
	data: {
		isActiveTabs: {
			sex: true,
			gey: false,
			webcam: false
		}
	},
	methods: {
		activateTab(value){
			for(let i in this.isActiveTabs) this.isActiveTabs[i] = false;
			this.isActiveTabs[value] = true;
		}
	},
	created(){
		console.log("test")
	}
});