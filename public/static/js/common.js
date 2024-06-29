$(document).on('ready', function () {
	const rtl = $('body').hasClass('rtl');
	//fancybox
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false,
			},
		},
	});
	//menu
	$('.nav-trigger').on('click', function () {
		$(this).next().slideToggle('fast');
	});
	$('.navigation-dropdown__click').on('click', function () {
		$(this).parent().find('.navigation-dropdown').toggleClass('active');
	});
	$('.dropdown-menu__button').on('click', function () {
		$(this).toggleClass('active');
		$(this).parent().find('.dropdown-menu__dropdown').toggleClass('active');
	});
	$('body').on('click', function (e) {
		if (!$(e.target).hasClass('dropdown-menu__button') && $('.dropdown-menu__button').hasClass('active')) {
			$('.dropdown-menu__button').removeClass('active');
			$('.dropdown-menu__dropdown').removeClass('active');
		}
	});
	//form
	$('.landing__hero-form .button').on('click', function () {
		$(this).parent('.landing__hero-form').addClass('landing__hero-form-success');
	});
	$('.footer-btn-submit').on('click', function () {
		$.fancybox.open({ src: '#modal-thanks', type: 'inline' });
	});
	// $('.wire-transfer-email-send').on('click', function () {
	// 	$('.wire-transfer__email-form').hide();
	// 	$('.wire-transfer__form-result').show();
	// });
	$('.show-picker-on-click').on('click', function (event) {
		try {
			event.target.showPicker();
		} catch (error) {
			console.error(error);
		}
	});

	//slider
	$('.landing__slider').slick({
		dots: true,
	});
	$('.js-slider').slick({
		dots: true,
		arrows: true,
	});
	$('.costumer-page__carousel').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		infinite: true,
		rtl: rtl ? true : false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	$('.feature-spotlight__slider-big').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.feature-spotlight__slider-small',
		rtl: rtl ? true : false,
	});
	$('.feature-spotlight__slider-small').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.feature-spotlight__slider-big',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		infinite: false,
		rtl: rtl ? true : false,
	});
	$('.property-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		centerMode: true,
		centerPadding: '0px',
		focusOnSelect: true,
		infinite: true,
		rtl: rtl ? true : false,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});
	$('.testimonials-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		centerMode: true,
		centerPadding: '0',
		focusOnSelect: true,
		infinite: true,
		rtl: rtl ? true : false,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	// Pricing plans
	$('.pricing-size__item').on('click', function () {
		$('.pricing-size__item').removeClass('active');
		$(this).addClass('active');
	});

	function updateSlideClasses(slick, init, currentSlide, nextSlide) {
		const $nodeSlides = $('.pricing-addons__slider .slick-slide');
		const $slickActiveSlides = $nodeSlides.filter('.slick-active');
		const slidesToShow = slick.options.slidesToShow;
		const slideCount = slick.slideCount;

		// Remove the existing class names for the slides
		$nodeSlides.removeClass('previous-slide next-slide');

		let firstActiveSlide = $slickActiveSlides.first();
		let lastActiveSlide = $slickActiveSlides.last();
		let prevSlideEl;
		let nextSlideEl;
		if (!init) {
			if (nextSlide === 0 && currentSlide === slideCount - 1) {
				prevSlideEl = $nodeSlides.eq(slidesToShow - 1);
				nextSlideEl = $nodeSlides.eq(slidesToShow + slidesToShow);

				prevSlideEl.addClass('previous-slide');
				nextSlideEl.addClass('next-slide');
			} else if (currentSlide === 0 && nextSlide === slideCount - 1) {
				prevSlideEl = $nodeSlides.eq(slidesToShow + slideCount - 2);
				nextSlideEl = $nodeSlides.eq(slideCount + slidesToShow + slidesToShow - 1);

				prevSlideEl.addClass('previous-slide');
				nextSlideEl.addClass('next-slide');
			} else {
				prevSlideEl = nextSlide > currentSlide ? firstActiveSlide : firstActiveSlide.prev().prev();
				nextSlideEl = nextSlide > currentSlide ? lastActiveSlide.next().next() : lastActiveSlide;
			}
		} else {
			prevSlideEl = firstActiveSlide.prev();
			nextSlideEl = lastActiveSlide.next();
		}
		prevSlideEl.addClass('previous-slide');
		nextSlideEl.addClass('next-slide');
	}

	$('.pricing-addons__slider').on('init breakpoint', function (event, slick, currentSlide, nextSlide) {
		updateSlideClasses(slick, true, currentSlide, nextSlide);
	});

	$('.pricing-addons__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		updateSlideClasses(slick, false, currentSlide, nextSlide);
	});

	$('.pricing-addons__slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		focusOnSelect: true,
		infinite: true,
		rtl: rtl ? true : false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	//wow
	new WOW().init();

	//menu
	$('.navigation__button').on('click', function () {
		$('.navigation').toggleClass('active');
		$(this).find('i').toggleClass('fa-times');
		$('.navigation__overlay').toggleClass('active');
		$('body').toggleClass('no-scroll');
	});
	// $( ".navigation__close" ).on('click', function() {
	//   $( ".navigation" ).removeClass( "active");
	//   $( ".navigation__overlay" ).hide( );
	// });
	$('.navigation__overlay').on('click', function () {
		$('.navigation').removeClass('active');
	});

	//accordion
	$('.faq_head').on('click', function () {
		$(this).next('.faq_answer').slideToggle('slow');
		$(this).toggleClass('active');
	});
	$('.landing__accordion-trigger').on('click', function () {
		$(this).next().slideToggle('slow');
		$(this).toggleClass('active');
	});
	$('.faq__trigger').on('click', function () {
		$(this).next().slideToggle('fast');
		$(this).toggleClass('active');
	});
	$('.landing__faq-question').on('click', function () {
		$(this).next().slideToggle('fast');
		$(this).parent().toggleClass('active');
	});
	$('.pricing-accordion__trigger').on('click', function () {
		$(this).next().slideToggle('fast');
		$(this).parent().toggleClass('active');
	});
	$('.segment-accordion__trigger').on('click', function () {
		$(this).next().slideToggle('fast');
		$(this).parent().toggleClass('active');
	});
	$('.add-code-button').on('click', function () {
		$('.add-code-container').slideToggle('fast');
	});

	//gallery
	$('.gallery-content__switch input').on('click', function () {
		$('.gallery-content__tab').toggleClass('active');
	});
	// gallery
	$('.thumb').fancybox({
		prevEffect: 'none',
		nextEffect: 'none',
		afterLoad: function () {
			this.title = this.title + '<a href="' + this.href + '" target="_blank">Download</a> ';
		},
		helpers: {
			thumbs: {
				width: 100,
				height: 100,
			},
			buttons: {},
		},
	});

	//floating form
	$('.floating_form_title').on('click', function () {
		$('.floating_form').toggleClass('active');
	});

	//covid
	$('.covid-more button').on('click', function () {
		$('.covid-hidden').slideDown();
		$(this).hide();
	});
	$('.covid-info__close').on('click', function () {
		$('.covid-info ').fadeOut('fast');
	});

	//myth
	$('.truth__btn').on('click', function () {
		$(this).closest('.myth-truth__block').addClass('active');
	});
	$('.myth__btn').on('click', function () {
		$(this).closest('.myth-truth__block').removeClass('active');
	});

	//tabs
	$('.integration_tabs li a').on('click', function (event) {
		event.preventDefault();
		$('.integration_tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.integration_tab').hide();
		$($(this).attr('href')).show();
	});
	$('.tour__nav a').on('click', function (event) {
		event.preventDefault();
		$('.tour__nav a').removeClass('active');
		$(this).addClass('active');
		$('.tour__item').removeClass('active');
		$($(this).attr('href')).addClass('active');
	});
	$('.customer__nav a').on('click', function (event) {
		event.preventDefault();
		$('.customer__nav li').removeClass('active');
		$(this).parent().addClass('active');
		$('.customer-top__text').removeClass('active');
		$($(this).attr('href')).addClass('active');
	});
	$('.tab a').on('click', function (event) {
		event.preventDefault();
		$('.tab li a').removeClass('active');
		$(this).addClass('active');
		$('.tab-content').hide();
		$($(this).attr('href')).show();
	});
	$('.resource-center__tabs-links a').on('click', function (event) {
		event.preventDefault();
		$('.resource-center__tabs-box .col-lg-4').removeClass('active');
		$('.resource-center__tabs-links a').removeClass('active');
		$(this).addClass('active');
		$('.resource-center__tabs-box .col-lg-4').filter($(this).attr('data-href')).addClass('active');
	});
	$('.proceed-payment').on('click', function (event) {
		event.preventDefault();
		$('.checkout-form__first-step').hide();
		$('.checkout-form__second-step').show();
	});
	$('.webinar-tabs label').on('click', function () {
		$('.webinar-tab-content').toggleClass('active');
	});
	$('.payment-method__selector label.radio__item input').on('click', function () {
		$('.payment-method__content.active').removeClass('active');
		$('.payment-method__content[data-method="' + $(this).data('paymentMethod') + '"]').addClass('active');
	});

	if ($('.calendly-button').length) {
		const urlParts = window.location.href.split('/');
		const page = urlParts[urlParts.length - 1];
		if (page) {
			changeCalendlyTab(page);
		}
	}
	$('.calendly-button').on('click', function () {
		if ($(this).hasClass('active')) return;
		const target = $(this).data('target');
		changeCalendlyTab(target);
	});

	function changeCalendlyTab(target) {
		$('.calendly-button').removeClass('active');
		$('.calendly-form__content').removeClass('active');
		$(`.calendly-button[data-target='${target}']`).addClass('active');
		$(`#${target}`).addClass('active');
	}

	//show modal
	$('body').one('mouseleave', function () {
		jQuery('.trial__not-leave-black').addClass('active');
	});
	$('.trial__not-leave-close').on('click', function () {
		$('.trial__not-leave').removeClass('active');
	});

	//scroll anchor
	$('.integration__nav li a, .totop').on('click', function () {
		$('html,body').animate({ scrollTop: $($(this).attr('href')).offset().top - 105 }, 800);
		return false;
	});

	//demo lead modal
	$('#demo-lead').submit(function () {
		$.ajax({
			type: 'POST',
			url: '', // URL to which the request is sent
			data: $(this).serialize(),
		}).done(function () {
			$('.demo-lead-modal__form').toggleClass('active');
			$('.demo-lead-modal__video').toggleClass('active');
		});
		return false;
	});

	// International Telephone Input
	if (document.querySelector('[id$=trial-phone]')) {
		var input = document.querySelector('[id$=trial-phone]');
		window.intlTelInput(input, {
			preferredCountries: ['us'],
			separateDialCode: true,
			// any initialization options go here
		});
	}

	// input number arrows
	$('.input-number button').on('click', function () {
		if ($(this).hasClass('input-number__plus')) {
			this.nextElementSibling.stepUp();
		} else if ($(this).hasClass('input-number__minus')) {
			this.previousElementSibling.stepDown();
		}
	});

	//webinar forms - get values from register buttons
	$('.webinar-register').on('click', function () {
		var webinarDate = $(this).data('webinar-month') + ' ' + $(this).data('webinar-day') + ' ' + $(this).data('webinar-time');
		$('.webinar-id input').val($(this).data('webinar-id'));
		$('.webinar-name input').val($(this).data('webinar-name'));
		$('.webinar-display-name').text($(this).data('webinar-name'));
		$('.webinar-date').text(webinarDate);
	});

	//Add new payment modal (activation page)
	$('.activation-card .add-payment').fancybox({
		// Returns the first step on modal close
		afterClose: function () {
			$('.add-payment__form').show();
			$('.add-payment-modal__thank-you').hide();
		},
	});
	// Shows Thank you section
	$('.add-payment-modal .add-payment-modal__button').on('click', function () {
		$('.add-payment__form').toggle();
		$('.add-payment-modal__thank-you').toggle();
	});
});

//fixed
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 100) {
		$('.header').addClass('fixed');
	} else {
		$('.header').removeClass('fixed');
	}
});