$(document).ready(function() {
	//scroll add .scroll to buttons for slowly move to anchor
	$('.scroll').bind('click.smoothscroll',function (e) {
			e.preventDefault();
		
			var target = this.hash,
			$target = $(target);
		
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
	});

// top slider
$("#carousel").owlCarousel({
	loop: true,
	margin: 0,
	nav: false,
	// stagePadding: 30,
	loop: true,
	responsive:{
		320:{
			items: 5
		},
		546:{
			items: 10
		},
		768:{
			items: 12
		},
		992:{
			items: 10
		},
		1140:{
			items: 15
		}
	}
});


// Video
// const player = new Plyr('#player');
const player = new Plyr(document.getElementById('player'));



// 3 sliders
owl_sex();
owl_gey();
owl_webcam();

// sliders
// 1
	function owl_sex(){
		$("#owl_sex").owlCarousel({
			loop: true,
			margin: 0,
			nav: false,
			// stagePadding: 30,
			loop: true,
			responsive:{
				320:{
					items: 3
				},
				546:{
					items: 4
				},
				768:{
					items: 5
				},
				992:{
					items: 6
				},
				1140:{
					items: 6
				}
			}
		});
		var owl = $('#owl_sex');
		$('.owl_sex.prev').click(function() {
			owl.trigger('prev.owl.carousel', [250]);
		});
		$('.owl_sex.next').click(function() {
			owl.trigger('next.owl.carousel', [250]);
		});
	}

// 2
	function owl_gey(){
		$("#owl_gey").owlCarousel({
			loop: true,
			margin: 0,
			nav: false,
			// stagePadding: 30,
			loop: true,
			responsive:{
				320:{
					items: 3
				},
				546:{
					items: 4
				},
				768:{
					items: 5
				},
				992:{
					items: 6
				},
				1140:{
					items: 6
				}
			}
		});
		var owl = $('#owl_gey');
		$('.owl_sex.prev').click(function() {
			owl.trigger('prev.owl.carousel', [250]);
		});
		$('.owl_sex.next').click(function() {
			owl.trigger('next.owl.carousel', [250]);
		});
	}
// 3
	function owl_webcam(){
		$("#owl_webcam").owlCarousel({
			loop: true,
			margin: 0,
			nav: false,
			// stagePadding: 30,
			loop: true,
			responsive:{
				320:{
					items: 3
				},
				546:{
					items: 4
				},
				768:{
					items: 5
				},
				992:{
					items: 6
				},
				1140:{
					items: 6
				}
			}
		});
		var owl = $('#owl_webcam');
		$('.owl_sex.prev').click(function() {
			owl.trigger('prev.owl.carousel', [250]);
		});
		$('.owl_sex.next').click(function() {
			owl.trigger('next.owl.carousel', [250]);
		});
	}


//end ready
});







































// function declarations:
// cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0) == ' ') {
		c = c.substring(1);
	}
	if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	}
	}
	return ;
}

function checkCookie() {
	var user = getCookie("username");
	if (user != "") {
	alert("Welcome again " + user);
	} else {
	user = prompt("Please enter your name:", "");
	if (user != "" && user != null) {
		setCookie("username", user, 365);
	}
	}
}



// class countDownTimer
function CountdownTimer(elm, tl, mes){
	this.initialize.apply(this,arguments);
}
CountdownTimer.prototype = {
	initialize: function(elm, tl, mes) {
		this.elem 	= document.getElementById(elm);
		this.tl 	= tl;
		this.mes 	= mes;
	},
	countDown: function(){
		var timer = '';
		var today = new Date();
		var day   = Math.floor((this.tl-today)/(24*60*60*1000));
		var hour  = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
		var min   = Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
		var sec   = Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
		var me    = this;

		if( ( this.tl - today ) > 0 ){

			timer = '<div class="number-wrapper">\
							<div class="line">	</div>\
							<span class="number">'+this.addZero(hour)+'</span>\
							<div class="caption">час</div>\
						</div>';
			timer += '<div class="number-wrapper">\
							<div class="line">	</div>\
							<span class="number">'+this.addZero(min)+'</span>\
							<div class="caption">мин</div>\
						</div>';
			timer += '<div class="number-wrapper last">\
							<div class="line">	</div>\
							<span class="number">'+this.addZero(sec)+'</span>\
							<div class="caption">сек</div>\
						</div>';

			this.elem.innerHTML = timer;

			var tid = setTimeout( function(){
					me.countDown();
				}, 10);

		} else {

			this.elem.innerHTML = this.mes.html;
			this.mes.userAction();
			return;

		}
	},
	addZero: function(num){ 
		return ('0'+num).slice(-2); 
	}
}

