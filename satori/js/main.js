'use strict';

$(document).ready(function () {

  $("body").niceScroll();

  $(document).on('mousemove', function (e) {

    var $backfaceImg = $('.intro-video .backface-img');

    if ($backfaceImg.length > 0) {

      var bfWidth = $backfaceImg.width();
      var bfHeight = $backfaceImg.height();

      $backfaceImg.css({
        left: e.pageX - bfWidth / 2,
        top: e.pageY - bfHeight / 2
      });
    }
  });

  $(document).on('click', '.goToHome', function () {
    $('body').removeClass('intro').addClass('home');
    $("body").getNiceScroll().resize();
  });

  $(document).on('click', '.burger-btn', function () {
    if ($('body').hasClass('nav-open')) {
      $('body').removeClass('nav-open');
    } else {
      $('body').addClass('nav-open');
    }

    $("body").getNiceScroll().resize();
  });
});