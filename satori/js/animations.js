'use strict';

function pageAnimations() {
  var controller = new ScrollMagic.Controller({
    addIndicators: false
  });

  // module-photo scenes

  var $modulePhoto = $('.module-photo');

  $modulePhoto.each(function (_index, _elem) {

    var tweenMotion = TweenMax.from($(this).find('img'), 1, { y: '-40%', ease: Power0.easeNone });
    var tweenScale = TweenMax.from($(this).find('img'), 1, { scale: 1.1, ease: Power0.Linear });

    var photoMotionScene = new ScrollMagic.Scene({
      duration: '90%',
      triggerElement: this,
      triggerHook: 'onEnter',
      reverse: true
    }).setTween(tweenMotion).addTo(controller);

    var photoScaleScene = new ScrollMagic.Scene({
      duration: '40%',
      triggerElement: this,
      triggerHook: 'onEnter',
      reverse: true
    }).setTween(tweenScale).addTo(controller);
  });
}

$(document).ready(function () {
  pageAnimations();
});