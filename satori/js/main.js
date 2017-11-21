'use strict';

window.headerScrollTop = 0;
window.contentBoxValues = [];

function setSideNav() {
  var $sideNav = $('.side-nav');

  $('[data-id]').each(function (_index, _elem) {

    var thisTitle = $(_elem).attr('data-title');
    var thisId = $(_elem).attr('id');

    var sideContent = '<a class="side-content" href="#' + thisId + '">\n    <div class="side-num">' + (_index.toString().length <= 1 ? '0' + (_index + 1) : _index + 1) + '</div>\n    <div class="sm-bold">' + thisTitle + '</div>\n    <div class="side-line">\n      <div class="side-line-bg"></div>\n    </div>\n    <div class="side-rect"></div></a>';

    $sideNav.find('.side-inner').append(sideContent);
  });
}

function hideHeaderScroll() {
  var $headerNav = $('.header-nav');
  var scrollTop = $(window).scrollTop();

  $headerNav.toggleClass('hidden', scrollTop > headerScrollTop);
  headerScrollTop = scrollTop;
}

function setServicesBoxesPos() {
  if ('.inner-content.circle-icons-text'.length === 0) return;

  var windowWidth = $(window).width();
  var divideWith = 5;

  if (windowWidth >= 961 && windowWidth < 1130) {
    divideWith = 8;
  }
  contentBoxValues = [];

  $('.inner-content.circle-icons-text').each(function () {
    var thisData = $(this).offset().top + ',' + $(this).offset().left + ',' + $(this).innerWidth() + ',' + $(this).innerHeight() + ',' + divideWith;
    contentBoxValues.push(thisData);
  });
}

$(document).ready(function () {

  if ($('html').hasClass('trident') === false && $('html').hasClass('mobile') === false) $("body").niceScroll();

  if ($('.side-nav').length > 0) setSideNav();

  setServicesBoxesPos();

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

  $(document).on('click', '.side-nav .side-content', function (e) {
    e.preventDefault();

    if ($(this).hasClass('active') === false) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
      }, 1500);
    }
  });

  $(document).on('click', '#backTop', function (e) {
    e.preventDefault();

    $('html, body').animate({
      scrollTop: 0
    }, 1500);
  });

  $(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var anchors = $('body').find('.anchor');
    var halfHeight = window.innerHeight / 2;
    $('.side-nav').removeClass('active');

    anchors.each(function (_index, _elem) {
      if (scrollTop > $(_elem).offset().top - halfHeight && scrollTop < $(_elem).offset().top + $(_elem).height() - halfHeight) {
        $('.side-nav .side-content[href="#' + $(_elem).attr('id') + '"]').addClass('active');
        $('.side-nav').addClass('active');
      } else {
        $('.side-nav .side-content[href="#' + $(_elem).attr('id') + '"]').removeClass('active');
      }
    });

    // Hide header on scroll down, show on scroll up
    // hideHeaderScroll()
  });

  $(document).on('mousemove', function (e) {
    var $box = $('.inner-content');

    if ($box.length === 0) return;

    $box.each(function (_index) {
      var values = contentBoxValues[_index].split(',');

      var boxWidth = parseInt(values[2], 10);
      var boxHeight = parseInt(values[3], 10);

      var boxTop = parseInt(values[0], 10);
      var boxBottom = boxTop + boxWidth;
      var boxLeft = parseInt(values[1], 10);
      var boxRight = boxLeft + boxHeight;

      var divideWith = parseInt(values[4], 10);

      var wx = window.innerWidth;
      var wh = window.innerHeight;

      var _x = 0;
      var _y = 0;

      if (e.pageX > boxLeft && e.pageX < boxRight && e.pageY > boxTop && e.pageY < boxBottom) {

        if (e.pageX > boxLeft && e.pageX < boxLeft + boxWidth / 2) {

          if (e.pageY > boxTop && e.pageY < boxTop + boxHeight / 2) {

            _x = (e.pageX - boxRight) / divideWith;
            _y = (e.pageY - boxBottom) / divideWith;
          } else {

            _x = (e.pageX - boxRight) / divideWith;
            _y = (e.pageY - boxTop) / divideWith;
          }
        } else if (e.pageX > boxLeft + boxWidth / 2 && e.pageX < boxRight) {

          if (e.pageY > boxTop && e.pageY < boxTop + boxHeight / 2) {

            _x = (e.pageX - boxLeft) / divideWith;
            _y = (e.pageY - boxBottom) / divideWith;
          } else {

            _x = (e.pageX - boxLeft) / divideWith;
            _y = (e.pageY - boxTop) / divideWith;
          }
        } else if (e.pageX > boxLeft + boxWidth / 2 && e.pageX < boxRight) {

          if (e.pageY > boxTop && e.pageY < boxTop + boxHeight / 2) {

            _x = (e.pageX - boxLeft) / divideWith;
            _y = (e.pageY - boxBottom) / divideWith;
          } else {

            _x = (e.pageX - boxLeft) / divideWith;
            _y = (e.pageY - boxTop) / divideWith;
          }
        }

        TweenMax.to($(this), 0.4, { x: _x, y: _y, ease: Power1.easeOut });
      } else {
        TweenMax.to($(this), 0.4, { x: 0, y: 0, ease: Power1.easeOut });
      }
    });
  });
});

$(window).on('resize', function () {
  setServicesBoxesPos();
});