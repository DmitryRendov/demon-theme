;(function( window, undefined ){ 
 'use strict'; 
/*global
 $
 */

var MainApp = function() {
  this.version = "2.1.1";
  this.phone = "+375 " + "(29) 324" + " 67 40";
  this.email = "webmaster" + "@" + "demon.of" + ".by";
  this.pathToSyntaxHighlighter = "//demon.of.by/assets/libraries/SyntaxHighlighter/scripts/";

  this.ready();
};

/**
 * Function ready() is triggered when the app is resized
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.prototype.ready = function() {
  this.hideContacts();
  this.enableSyntaxHighlighter();
  this.portfolioEngine();
  this.quipForm();
  
  // Other small changes and tweaks
  $('.carousel').carousel();
  $('.tohome').find('a').addClass('icon home');

  $(".accordion h3:first").addClass("active");
  $(".accordion div:not(:first)").hide();

  $(".accordion h3").click(function() {
    $(this).next("div").slideToggle("slow").siblings("div:visible").slideUp("slow");
    $(this).toggleClass("active");
    $(this).siblings("h3").removeClass("active");
  });
};
/**
 * Function hideContacts() hides the private data from search engines
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.prototype.hideContacts = function() {
  // Hide email and phone from spammers and search engines
  $('.hide-email').attr('href', ' mailto:' + this.email).html(this.email);
  $('.hide-phone').html(this.phone);
  $(".social-url").hover(function() {
    $(this).fadeTo("fast", 1.0);
  }, function() {
    $(this).fadeTo("fast", 0.7);
  });
};
/**
 * Function enableSyntaxHighlighter() loads all SyntaxHighlighter libraries that the project needs
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.prototype.enableSyntaxHighlighter = function() {
  function path() {
    var args = arguments, result = [];
    for(var i = 0; i < args.length; i++) {
      result.push(args[i].replace('@', MainApp.pathToSyntaxHighlighter));
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
};
/**
 * Function portfolioEngine() shows the portfolio objects
 * Deprecated and non-responsive
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.prototype.portfolioEngine = function() {
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
};
/**
 * Function quipForm() processes all Quip form additional logic
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.prototype.quipForm = function() {

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
    if(value.length === 0 && (!r_input.is(':focus') || r_input.val().length > 0)) {
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
    if(this.value.length === max) {
      e.preventDefault();
    } else if(this.value.length > max) {
      // Maximum exceeded
      this.value = this.value.substring(0, max);
    }
    //$("#input_3-limit").html(this.value.length + '/1000');
  });
};
/**
 * Function fixDropdownBehaviour() disables toggle of dropdown menus by click for desktop view
 *
 * @memberOf MainApp
 * @returns none
 */
MainApp.fixDropdownBehaviour = function() {
  if($(".navbar-toggle").is(":visible")) {
    $(".dropdown-toggle").attr({
      "data-toggle" : "dropdown"
    });
  } else {
    $(".dropdown-toggle").removeAttr("data-toggle");
  }
};
/**
 * Function isEmpty() is a part of utils
 *
 * @memberOf MainApp
 * @returns none
 */
var isEmpty = function(mixed_var) {
  var key;
  if(mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
    return true;
  }
  if( typeof mixed_var === 'object') {
    for(key in mixed_var) {
      if(key) {
        return false;
      }
    }
    return true;
  }
  return false;
};
// ********************************
// EVENTS
//

window.addEventListener('resize', function(event) {
  MainApp.fixDropdownBehaviour();
});

$(document).ready(function() {
  MainApp.fixDropdownBehaviour();
  new MainApp();
});

}( window ));