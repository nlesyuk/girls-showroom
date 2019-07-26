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


$("#carousel").owlCarousel({
	loop: true,
	margin: 0,
	nav: false,
	// stagePadding: 30,
	loop: true,
	responsive:{
		0:{
			items: 1
		},
		600:{
			items: 3
		},
		1000:{
			items: 15
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
				0:{
					items: 1
				},
				600:{
					items: 3
				},
				1000:{
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
				0:{
					items: 1
				},
				600:{
					items: 3
				},
				1000:{
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
				0:{
					items: 1
				},
				600:{
					items: 3
				},
				1000:{
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



