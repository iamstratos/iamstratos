'use strict';

window.headerScrollTop = 0;
// window.contentBoxValues = []
window.mouseDown = [false, 0];

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
  // contentBoxValues = []

  // $('.inner-content.circle-icons-text').each(function () {
  //   let thisData = $(this).offset().top + ',' + $(this).offset().left + ',' + $(this).innerWidth() + ',' + $(this).innerHeight() + ',' + divideWith
  //   contentBoxValues.push(thisData)
  // })
}

function setWorkSlideHeight() {
  var $dragTl = $('.drag-timeline');
  // let $dragTextTl = $('.drag-text-timeline')
  var dragTlHeight = 0;

  $dragTl.each(function () {
    dragTlHeight += $(this).height();
  });

  $('.custom-content').css('height', dragTlHeight);
}

$(document).ready(function () {

  if ($('html').hasClass('trident') === false && $('html').hasClass('mobile') === false) $("body").niceScroll();

  if ($('.side-nav').length > 0) setSideNav();

  setServicesBoxesPos();

  if ($('.work-slides').length > 0) {

    setWorkSlideHeight();
  }

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

  // mousemoves for Work slider

  $(document).on('mousedown', '.work-slides', function (e) {

    window.mouseDown = [true, e.pageX];
  });

  $(document).on('mousemove', '.work-slides', function (e) {
    var timelineX = $('.drag-timeline').attr('data-x');
    var timelineWidth = $('.drag-timeline').width();
    var totalSlidesWidth = 0;
    var maxX = 0;

    if (mouseDown[0]) {

      if ($('html').hasClass('mobile') || $('html').hasClass('tablet')) return;

      $('.slide-item').each(function () {
        var padding = 20;
        var finalWidth = parseInt($(this).width(), 10) + padding;

        totalSlidesWidth += finalWidth;
        maxX = totalSlidesWidth / 2 / 1.5;
      });

      var firstClick = mouseDown[1];
      var newX = 0;

      if (e.pageX <= firstClick) {
        newX = (firstClick - e.pageX) / 15;

        if (maxX >= -(timelineX - newX)) {

          $('.drag-timeline').attr('data-x', timelineX - newX);
          TweenMax.to($('.drag-img-timeline'), 0.52, { x: timelineX - newX, ease: Power2.easeOut, delay: 0 });
          TweenMax.to($('.drag-text-timeline'), 0.4, { x: timelineX - newX, ease: Power2.easeOut });
        }
      } else {
        newX = (e.pageX - firstClick) / 15;

        if (timelineX - -newX <= 0) {
          $('.drag-timeline').attr('data-x', timelineX - -newX);
          TweenMax.to($('.drag-img-timeline'), 0.52, { x: timelineX - -newX, ease: Power2.easeOut, delay: 0 });
          TweenMax.to($('.drag-text-timeline'), 0.4, { x: timelineX - -newX, ease: Power2.easeOut });
        } else if (timelineX - -newX > 0) {
          TweenMax.to($('.drag-img-timeline'), 0.52, { x: 0, ease: Power2.easeOut, delay: 0 });
          TweenMax.to($('.drag-text-timeline'), 0.4, { x: 0, ease: Power2.easeOut });
        }
      }
    }
  });

  $(document).on('mouseup', '.work-slides', function () {

    window.mouseDown = [false, 0];
  });

  // blogs categories btn

  $(document).on('click', '.categories-dropdown', function (e) {
    e.preventDefault();

    $('body').addClass('modal-open');
  });

  $(document).on('click', '.close-modal, .modal-bg', function () {
    $('body').removeClass('modal-open');
  });

  $(document).on('click', '.iframe-layer', function () {
    var _this = this;

    var thisSrc = $(this).siblings('iframe').attr('src');
    $(this).siblings('iframe').attr('src', thisSrc + '&autoplay=1');

    setTimeout(function () {
      $(_this).remove();
    }, 200);
  });
});

$(window).on('resize', function () {
  setServicesBoxesPos();
});