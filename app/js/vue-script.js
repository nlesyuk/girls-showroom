let vm = new Vue({
	el: "#app",
	data: {
		isActiveTabs: {
			sex: true,
			gey: true,
			webcam: true
		},
		topSliderDATA: '',
		instagramDATA: '',
		topActiveDATA: '',
		filterDATA: '',
		tabsDATA: '',
		footerDATA: '',
		filterIam: '',
		filterLooking: '',
		owlInit: {
			loop: true,
			margin: 0,
			nav: false,
			loop: true,
			responsive: {
				320:{items: 3},
				546:{items: 4},
				768:{items: 5},
				992:{items: 6},
				1140:{items: 6}
			}
		},

	},
	methods: {

		activateTab(value) {
			for(let i in this.isActiveTabs) this.isActiveTabs[i] = false;
			this.isActiveTabs[value] = true;
		},

		getJSON(url, callback) {
 			var req = new XMLHttpRequest();
			// req.responseType = 'json'; // not support in IE11
			req.overrideMimeType("application/json");
			req.open('GET', url, true);
			req.onload  = function() { // запрос завершился
				var result = JSON.parse(req.responseText);

				if ( req.responseText.length == 0 ) {
					console.error(" AJAX Error");
				}

				console.log("result", result);
				callback(result);
			};
			req.send(null);

		},

		separetaJSON(json) {
			console.log('json', json);
			// top slider
			this.topSliderDATA = json.top_slider;
			console.log('topSliders', this.topSliderDATA);
			
			// instagram
			var randIndex = Math.floor(Math.random() * json.instagram.length);
			this.instagramDATA = json.instagram[randIndex];
			console.log('instagramDATA', this.instagramDATA);
			
			// maps
			
			// top active
			for (var i = 0; i < json.top_active.length; i++) {
				var random = Math.floor(Math.random() * json.top_active.length);
				var item = json.top_active[random];
				
				if( this.topActiveDATA.indexOf(item) === -1 &&
				this.topActiveDATA.length < 4 
				){
					this.topActiveDATA.push(item);
				}
			}
			console.log('topActiveDATA', this.topActiveDATA);
			
			// video
			// filter
			this.tabsDATA = json.tabs;
			console.log('tabsDATA', this.tabsDATA);

			// tabs
			this.tabsDATA = json.tabs;
			console.log('tabsDATA', this.tabsDATA);
			
			// footer
			this.footerDATA = json.footer;
			console.log('footerDATA', this.tabsDATA);

		},
		
		topCarousel() {
			$("#carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				loop: true,
				responsive:{
					320:{items: 5},
					546:{items: 10},
					768:{items: 12},
					992:{items: 10},
					1140:{items: 15}
				}
			});
		},
		
		owl_sex() {
			$("#owl_sex").owlCarousel(this.owlInit);
			var owl = $('#owl_sex');
			$('.owl_sex.prev').click(function() {
				owl.trigger('prev.owl.carousel', [250]);
			});
			$('.owl_sex.next').click(function() {
				owl.trigger('next.owl.carousel', [250]);
			});
		},
		
		owl_gey() {
			$("#owl_gey").owlCarousel(this.owlInit);
			var owl = $('#owl_gey');
			$('.owl_sex.prev').click(function() {
				owl.trigger('prev.owl.carousel', [250]);
			});
			$('.owl_sex.next').click(function() {
				owl.trigger('next.owl.carousel', [250]);
			});
		},
		
		owl_webcam() {
			$("#owl_webcam").owlCarousel(this.owlInit);
			var owl = $('#owl_webcam');
			$('.owl_sex.prev').click(function() {
				owl.trigger('prev.owl.carousel', [250]);
			});
			$('.owl_sex.next').click(function() {
				owl.trigger('next.owl.carousel', [250]);
			});
		},


		randomNum() {
			return Math.floor(Math.random() * 10)
		},

		initialVideo() {
			const player = new Plyr('#player', {
				title: 'Example Title',
				controls: [],
				muted: true,
				loop: { active: true }
			});

			var playerCont = document.querySelector(".video__cont");
			playerCont.addEventListener("mouseover", function(){
				player.play();
				player.style.filter = "blur(0px)"
			});
			playerCont.addEventListener("mouseleave", function(){
				player.pause();
				player.style.filter = "blur(0px)"
			});
		},

		filterRedirect(iam, looking) {
			var iam
		}
		
	},
	beforeMount(){
		
		// activate the tabs area
		


		
	},
	mounted(){
		
		// this.getJSON("http://192.168.0.104:3000/data.json", this.separetaJSON);
		this.getJSON("http://pronazvo.beget.tech/CORS/", this.separetaJSON);

		setTimeout(()=>{ 
			this.topCarousel();
			this.owl_sex();
			this.owl_gey();
			this.owl_webcam();
		}, 500);
		setTimeout(()=>{ this.activateTab('sex') }, 500);
		
		this.initialVideo();
	}
});