let vm = new Vue({
	el: "#app",
	data: {
		isActiveTabs: {
			sex: true,
			gey: true,
			webcam: true
		}
	},
	methods: {
		activateTab(value){
			for(let i in this.isActiveTabs) this.isActiveTabs[i] = false;
			this.isActiveTabs[value] = true;
		}
	},
	created(){

		// activate the tabs area
		setTimeout(()=>{ this.activateTab('sex') }, 1500);
	}
});