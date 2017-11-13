'use strict';

function initValuesSlider() {
  var $valuesSlider = $('.ValuesSlider');

  $valuesSlider.slick({
    slide: '.ValuesSlider__item',
    variableWidth: true,
    infinite: true,
    autoplay: true,
    speed: 700,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true,
    cssEase: 'cubic-bezier(0.86, 0, 0.07, 1)'
  });
}

$(document).ready(function () {

  initValuesSlider();

  $('body').on('click', '.ReasonsToJoin__item', function () {
    if ($(this).hasClass('SlideDown')) {
      $(this).removeClass('SlideDown');
      $(this).find('.ReasonsToJoin__text').slideUp(800);
    } else {
      $('.ReasonsToJoin__item').removeClass('SlideDown');
      $('.ReasonsToJoin__text').slideUp(800);

      $(this).addClass('SlideDown');
      $(this).find('.ReasonsToJoin__text').slideDown(800);
    }
  });
});

$(window).on('load', function () {
  $('body').addClass('PageLoaded');
});