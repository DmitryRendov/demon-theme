$(document).ready(function() {

  // Activate carousel on the main page
  $('.carousel').carousel();

  // Hide email and phone from spammers and search engines
  var e = "webmaster";
  var t = "demon.of";
  var n = ".by";
  var r = e + '@' + t + n;
  $('.hide-email').attr('href', ' mailto:' + r).html(r);
  e = "+375";
  t = " (29) 324";
  n = " 67 40";
  r = e + t + n;
  $('.hide-phone').html(r);

  $(".social-url").hover(function() {
    $(this).fadeTo("fast", 1.0);
  }, function() {
    $(this).fadeTo("fast", 0.7);
  });

  function path() {
    var args = arguments, result = [];
    for(var i = 0; i < args.length; i++) {
      result.push(args[i].replace('@', '//nanny.of.by/libraries/SyntaxHighlighter/scripts/'));
    }
    return result;
  }

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
  

  /*$('.dropdown').hover(function() {
    if($("body").width() > 771) {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
    }
  }, function() {
    if($("body").width() > 771) {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
    }
  });*/


});
