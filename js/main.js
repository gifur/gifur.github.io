(function($){

  /* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

$(document).ready(function() {

  var MQL = 1170;

	/* ---------------------------------------------- /*
	 * Smooth scroll / Scroll To Top
	/* ---------------------------------------------- */

	$('a[href*=#]').bind("click", function(e){

		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
	});

	$(window).bind('resize', function (e) {
		initLayout();
		var lock = false;
		var selector = 'body>section.active';
		if (pageIndex == 0) selector = '.video .swiper-slide.active .box';
		$(selector).bind(whichTransitionEvent(), function () {
		  initLayout();
		  if (lock) return;
		   else lock = true;
		  pageSwitching();
		  $('header .menu').trigger('mouseleave');
		  $('.dock').css('top', ($(window).height() - $('.dock').height()) / 2 + 35)
		})
	  });

	  dockEvent();

	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	});



	//primary navigation slide-in effect
if ($(window).width() > MQL) {
		var headerHeight = $('#header').height();
		$(window).on('scroll', {
						previousTop: 0
				},
				function() {
						var currentTop = $(window).scrollTop();
						//check if user is scrolling up
						if (currentTop < this.previousTop) {
								//if scrolling up...
								if (currentTop > 0 && $('#header').hasClass('is-fixed')) {
										$('#header').addClass('is-visible');
								} else {
										$('#header').removeClass('is-visible is-fixed');
								}
						} else if (currentTop > this.previousTop) {
								//if scrolling down...
								$('#header').removeClass('is-visible');
								if (currentTop > headerHeight && !$('#header').hasClass('is-fixed')) $('#header').addClass('is-fixed');
						}
						this.previousTop = currentTop;
				});
}


	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();

			if (cur_pos > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}

	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

	// Mobile Navigation
	$('.nav-toggle').on('click', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});

function dockEvent() {
	$('.dock').height($('.dock ul.icons li').length * 50 + $('.dock a.switch').height() + 20).css('top', ($(window).height() - $('.dock').height()) / 2 + 0);
	$('.dock ul.icons li i').bind('mouseover click touchstart', function () {
	  $('.dock ul.icons li').removeClass('active');
	  $(this).parent().addClass('active')
	});
	$('.dock ul.icons li').bind('mouseleave', function () {
	  $('.dock ul.icons li').removeClass('active')
	});
	$('.dock ul.icons li.up i').bind('click touchstart', function () {
	  pageIndex--;
	  pageSwitching()
	});
	$('.dock ul.icons li.down i').bind('click touchstart', function () {
	  pageIndex++;
	  pageSwitching()
	});
	$('.dock a.switch').bind('click', function () {
	  if ($(this).hasClass('off')) {
		$('.dock').removeClass('closed');
		$(this).removeClass('off')
	  } else {
		$('.dock ul.icons li').removeClass('active');
		$('.dock').addClass('closed');
		$(this).addClass('off')
	  }
	})
  }

})(jQuery);
