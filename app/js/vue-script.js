let vm = new Vue({
	el: "#app",
	data: {
		isActiveTabs: {
			sex: true,
			gey: true,
			webcam: true
		},
		redirectToNewTab: false,
		isJSONrecieved: false,
		topSliderDATA: '',
		isTopSliderReady: false,
		instagramDATA: [],
		topActiveDATA: [],
		mapsDATA: '',
		mapsLocalization: '',
		isShowMapsGirls: false,
		videoDATA: '',
		videoSource: '',
		videoPoster: '',
		filterDATA: '',
		filterIam: '',
		filterLooking: '',
		tabsDATA: '',
		footerDATA: ''
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

				if ( req.responseText.length == 0 ) console.error("AJAX Error");
				var result = JSON.parse(req.responseText);
				
				callback(result);
			};
			req.send(null);

		},

		separetaJSON(json) {
			console.log('json', json);
			var self = this;

			// Redirect
			var str = json.redirect_to_new_tab;
			this.redirectToNewTab = ( str === "false") ? false : true;
				console.log('redirectToNewTab', this.redirectToNewTab);

			// top slider
			this.topSliderDATA = json.top_slider;
			this.isJSONrecieved = true;
				// console.log('topSliders', this.topSliderDATA);
			
			// instagram
			var randIndex = Math.floor(Math.random() * json.instagram.length);
			this.instagramDATA = json.instagram[randIndex];
				// console.log('instagramDATA', this.instagramDATA);
			
			// maps
			this.mapsDATA = json.maps;
			this.userIP = this.mapsDATA.user_ip.split(",");
				// console.log('IP', this.userIP );
			this.getUserLocationFromServer();

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
				// console.log('topActiveDATA', this.topActiveDATA);
			
			// video
			this.videoDATA = json.videos;
			var max = this.videoDATA.length;
			var random = this.randomNum(max);
			this.videoSource = window.location.href + this.videoDATA[random];

			var lastSlash 	 = this.videoSource.lastIndexOf('/');
			var videoName 	 = this.videoSource.substring(lastSlash);
			this.videoPoster = window.location.href + "DATA/videos" + videoName.replace("mp4","jpg");
			setTimeout(function() {
				self.initialVideo();
				console.log("VIDEO INIT");
			}, 1000);
				console.log('videoDATA:', this.videoDATA,'random', random, "videoName", videoName);
				console.log('videoDATA - POSTER', this.videoPoster );
				console.log('videoDATA - SOURCE', this.videoSource );

			// filter
			this.filterDATA = json.filter;
				// console.log('filterDATA', this.filterDATA);

			// tabs
			this.tabsDATA = json.tabs;
			// init tabs and sliders
			setTimeout(function() {

				self.initOwlSlider("#owl_sex", ".owl_sex.prev", ".owl_sex.prev");
				self.initOwlSlider("#owl_gey", ".owl_gey.prev", ".owl_gey.prev");
				self.initOwlSlider("#owl_webcam", ".owl_webcam.prev", ".owl_webcam.prev");

				setTimeout(function() {
					self.activateTab('sex');
				}, 500);

			}, 1500);
				// console.log('tabsDATA', this.tabsDATA);

			// footer
			this.footerDATA = json.footer;
				// console.log('footerDATA', this.tabsDATA);

		},
		
		topCarousel() {
			var owl = $('#carousel');
			owl.owlCarousel({
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
			owl.on('mousewheel', '.owl-stage', function (e) {
				if (e.deltaY>0) {
					owl.trigger('next.owl');
				} else {
					owl.trigger('prev.owl');
				}
				e.preventDefault();
			});
		},
		
		initOwlSlider(sliderSelector, buttonSelectorPrev, buttonSelectorNext) {
			$(sliderSelector).owlCarousel({
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
			});
			$(buttonSelectorPrev).click(function() {
				sliderSelector.trigger('prev.owl.carousel', [250]);
			});
			$(buttonSelectorNext).click(function() {
				sliderSelector.trigger('next.owl.carousel', [250]);
			});
			console.log("Owl-init", sliderSelector);
		},

		randomNum(max = 10) {
			return Math.floor(Math.random() * max)
		},

		initialVideo() {
			// https://github.com/sampotts/plyr
			const player = new Plyr('#player', {
				title: 'Example Title',
				// controls: [],
				controls: ['play-large', 'play', 'progress', 'current-time1', 'volume', 'captions'],
				muted: true,
				loop: { active: true }
			});


			var playerCont = document.querySelector(".video__cont");
			playerCont.addEventListener("mouseover", function(){
				player.play();
			});
			playerCont.addEventListener("mouseleave", function(){
				player.pause();
			});
		},

		filterRedirect(redirectToNewTab) {
			var value = this.filterIam + "-" + this.filterLooking;
			var newlink = this.filterDATA[value];

			// делать редирект на новую вкладку и в текущую загружать офер?
			if( !!redirectToNewTab ){
				// да
				var current = window.location.href;
				window.open(current);

				window.location = newlink;
			} else {
				// нет 
				window.location = newlink;
			}
		},

		initialMap(arrLocations){
			var location = ( arrLocations != undefined) ? arrLocations : [30.455, 50.414] ; // Kyiv by default

			mapboxgl.accessToken = 'pk.eyJ1IjoibmEzYXIxeSIsImEiOiJjanloM29tenQwNzRtM2hwYWw4emUyaXhlIn0.PuWkJSZ5w1Ijq-surIhTsw';

			var map = new mapboxgl.Map({
				container: 'mapBox',
				style: 'mapbox://styles/na3ar1y/cjyq06c1y1my31cpit9snzpsi',
				center: location,
				zoom: 10
			});

			// https://docs.mapbox.com/mapbox-gl-js/example/locate-user/
			// Add geolocate control to the map.
			/* map.addControl(new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: false
				},
				trackUserLocation: false
			})); */
		},
		
		isLink(value){
			return value.indexOf('http') != -1;
		},

		isImage(value){
			if( value.indexOf('jpg') != -1 || value.indexOf('png') != -1) return true
			return false
		},
		getUserLocationFromServer(){
			var req = new XMLHttpRequest();
			var url = window.location.href + "php/get_localizetion.php";
			var self = this;

			req.overrideMimeType("application/json");
			req.open('GET', url, true);
			req.onload  = function() { // запрос завершился. Тестить только на сервере
				
				if ( req.responseText.length == 0 ) console.error("AJAX Error - in getUserLocationFromServer()");
				
				var location = JSON.parse(req.responseText); // получаем JSON
					// var location = ["OK","","194.183.167.96","UA","Ukraine","Kyiv","Kiev","03150","50.4547","30.5238","+03:00"]; // test response
				
				var locationArr = [ location[9], location[8] ];
					// var locationArr = [ -0.102505, 51.501462 ]; // test london (in google maps [51.501462, -0.102505])

				console.log("AdaptiveMaps Coordinate: - all", location);
				console.log("AdaptiveMaps Coordinate: - location", locationArr);
				
				self.initialMap(locationArr);
				setTimeout(function(){
					self.isShowMapsGirls = true;
				}, 2000);
			};
			req.send(null);
		},

		openInNewTab(redirectToNewTab, event) {
			var current = window.location.href;
			var linkHref = event.target.href;

			if( redirectToNewTab ){
				// да
				window.location = linkHref;
				window.open(current);
			} else {
				// нет
				window.location = linkHref;
			}

		},

	},
	beforeMount() {},
	mounted() {
		var self = this;

		var url = window.location.href + "php/";
			// var url = window.location.href + "php/data.json"; // LOCAL DATA - for test only
		this.getJSON(url, this.separetaJSON);

		var id = setInterval(function() {
			if( self.isJSONrecieved ) {
				self.topCarousel();
				clearInterval(id);
			}
		}, 500)
			
	},
	updated(){
		console.log("UPDATED");
	}
});