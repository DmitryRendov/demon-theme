/**
 * Demon.of.by - The main JavaScript engine
 * (C) 2004 - 2014
 *
 * @author Dmitry Rendov
 */

$(document).ready(function() {
	$("#slider").easySlider({
		controlsBefore : '<p id="controls">',
		controlsAfter : '</p>',
		prevText : '',
		nextText : '',
		auto : true,
		speed : 1000,
		pause : 10000,
		continuous : true
	});

	// Hide my email from spammers
	var e = "webmaster";
	var t = "demon.of";
	var n = ".by";
	var r = e + '@' + t + n;
	$('.hide-email').attr('href', ' mailto:' + r).html(r);

       var e = "+375"
       var t = " (29) 324"
       var n = " 67 40"
       var r = e + t + n
       $('.hide-phone').html(r)

	$('.tohome').find('a').addClass('icon home');

	$(".accordion h3:first").addClass("active");
	$(".accordion div:not(:first)").hide();

	$(".accordion h3").click(function() {
		$(this).next("div").slideToggle("slow").siblings("div:visible").slideUp("slow");
		$(this).toggleClass("active");
		$(this).siblings("h3").removeClass("active");
	});
	if(!$(".recaptcha").is(":visible") && $.trim($("form textarea").val()).length > 0) {
		$(".recaptcha").show();
	}

	$("form textarea").focus(function() {
		var value = $.trim($(this).val());
		if(!$(".recaptcha").is(":visible") && value.length > 0) {
			$(".recaptcha").show("normal");
		}
	});
	$("form textarea").on("blur", function() {
		var value = $.trim($(this).val());
		var r_input = $('recaptcha_response_field');
		if(value.length == 0 && (!r_input.is(':focus') || r_input.val().length > 0)) {
			$(".recaptcha").hide("normal");
		}
	});

	$("form textarea").on("keyup", function(e) {
		var max = 1000;
		var value = $.trim($(this).val());
		if(value.length > 0) {
			$(".recaptcha").show("normal");
		} else {
			$(".recaptcha").hide("normal");
		}

		if(e.which < 0x20) {
			// e.which < 0x20, then it's not a printable character
			// e.which === 0 - Not a character
			return;
			// Do nothing
		}
		if(this.value.length == max) {
			e.preventDefault();
		} else if(this.value.length > max) {
			// Maximum exceeded
			this.value = this.value.substring(0, max);
		}
		//$("#input_3-limit").html(this.value.length + '/1000');
	});

	function path() {
		var args = arguments, result = [];
		for(var i = 0; i < args.length; i++)
		result.push(args[i].replace('@', '//demon.of.by/assets/libraries/syntaxhighlighter/scripts/'));
		return result;
	};


	SyntaxHighlighter.autoloader.apply(null, path(
	       'bash shell             @shBrushBash.js',
	       'css                    @shBrushCss.js',
	       'js jscript javascript  @shBrushJScript.js',
	       'php                    @shBrushPhp.js',
       	'text plain             @shBrushPlain.js',
	       'py python              @shBrushPython.js',
	       'sql                    @shBrushSql.js',
              'xml xhtml xslt html    @shBrushXml.js'
       ));

	SyntaxHighlighter.defaults['toolbar'] = false;
	SyntaxHighlighter.defaults['stripBrs'] = true;
	SyntaxHighlighter.all();

	$(".tags_small").hover(function() {
		$(this).fadeTo("fast", 0.9)
	}, function() {
		$(this).fadeTo("fast", 0.5)
	});
	$(".social-url").hover(function() {
		$(this).fadeTo("fast", 1.0)
	}, function() {
		$(this).fadeTo("fast", 0.7)
	});

	// Portfolio
	//Show Banner
	$(".portfolio .desc").show();
	//Show Banner
	$(".portfolio .block").animate({
		opacity : 0.85
	}, 1);
	//Set Opacity

	//Click and Hover events for thumbnail list
	$(".image_thumb ul li:first").addClass('active');
	$(".image_thumb ul li").click(function(event) {
		//Set Variables
		var imgAlt = $(this).find('img').attr("alt");
		//Get Alt Tag of Image
		var imgTitle = $(this).find('a').attr("href");
		//Get Main Image URL
		var imgDesc = $(this).find('.block').html();
		//Get HTML of block
		var imgDescHeight = $(".portfolio").find('.block').height();
		//Calculate height of block

		if($(this).is(".active")) {//If it's already active, then...
			return false;
			// Don't click through
		} else {
			//Animate the Teaser
			$(".portfolio .block").animate({
				opacity : 0,
				marginBottom : -imgDescHeight
			}, 250, function() {
				$(".portfolio .block").html(imgDesc).animate({
					opacity : 0.85,
					marginBottom : "0"
				}, 250);
				$(".portfolio img").attr({
					src : imgTitle,
					alt : imgAlt
				});
			});
		}

		$(".image_thumb ul li").removeClass('active');
		//Remove class of 'active' on all lists
		$(this).addClass('active');
		//add class of 'active' on this list only
		//return false;

	}).hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
	//Toggle Teaser
	$("a.collapse").click(function() {
		$(".portfolio .block").slideToggle();
		$("a.collapse").toggleClass("show");
		return false;
	});
});
//Close "ready" Function
