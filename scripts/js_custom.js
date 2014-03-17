/**
 * 	Demon.of.by - The main JavaScript engine
 *  (C) 2004 - 2014
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

	$('.tohome').find('a').addClass('icon home');
});
