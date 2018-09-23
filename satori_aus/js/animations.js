// function scrollMagicAnimations() {
//   let controller = new ScrollMagic.Controller({
//     addIndicators: false
//   })

//   // module-photo scenes

//   let $modulePhoto = $('.module-photo')

//   $modulePhoto.each(function (_index, _elem) {

//     let tweenMotion = TweenMax.from($(this).find('img'), 1, { y: '-40%', ease: Power0.easeNone })
//     let tweenScale = TweenMax.from($(this).find('img'), 1, { scale: 1.1, ease: Power0.Linear })

//     let photoMotionScene = new ScrollMagic.Scene({
//       duration: '150%',
//       triggerElement: this,
//       triggerHook: 'onEnter',
//       reverse: true
//     })
//       .setTween(tweenMotion)
//       .addTo(controller)

//     let photoScaleScene = new ScrollMagic.Scene({
//       duration: '50%',
//       triggerElement: this,
//       triggerHook: 'onEnter',
//       reverse: true
//     })
//       .setTween(tweenScale)
//       .addTo(controller)
//   })
// }

// function smBoldAnim() {
//   let $smTimeline = $('.sm-bold-anim .timeline')

//   var tl = new TimelineMax({repeat:-1})

//   tl.to($smTimeline, 0.9, {y: '-25px', ease: Power3.easeInOut }, 1.6)
// }

// $(document).ready(function () {

//   if ($('.module-photo').length > 0)
//     scrollMagicAnimations()

//   if ($('.sm-bold-anim').length > 0)
//     smBoldAnim()

//   // if ($('.loader-icon').length > 0)
//   //   new Vivus('logo-stroke', {duration: 0})
// })
"use strict";