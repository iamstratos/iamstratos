(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _animation = require('./utils/animation.js');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}; // import startEngine from './utils/engine.js'


function replaceClassAccordMenu(myClass, newClass) {

    for (var i = 0; i < document.querySelector('.atelier-page .modal.open .' + myClass).classList.length; i++) {
        var thisClass = document.querySelector('.atelier-page .modal.open .' + myClass).classList[i];

        if (thisClass !== myClass) $('.atelier-page .modal.open .' + myClass).removeClass(thisClass).addClass(newClass);
    }
}

function disableSlickArrows() {
    var plates = $('.atelier-page .plates .plate');
    var currSlide = void 0;

    for (var i = 0; i < plates.length; i++) {
        if (plates.eq(i).hasClass('slick-current')) {
            currSlide = i;
        }
    }

    if (currSlide <= 0) {
        $('.atelier-page .plate-arrows .slick-prev').addClass('slick-disabled');
    } else if (currSlide >= plates.length - 1) {
        $('.atelier-page .plate-arrows .slick-next').addClass('slick-disabled');
    } else {
        $('.atelier-page .plate-arrows .slick-prev').removeClass('slick-disabled');
        $('.atelier-page .plate-arrows .slick-next').removeClass('slick-disabled');
    }
}

function seperateLines(textBox) {
    var $thisBox = $('.atelier-page .' + textBox),
        words = $thisBox.html().replaceAll('<br>', ' <br> ').split(' '),
        resoltHtml = '',
        sameLine = [],
        $prevElem = null;

    for (var i = 0; i < words.length; i++) {
        if (words[i] != '<br>') {
            resoltHtml += '<span>' + words[i] + '</span> ';
        } else {
            // resoltHtml += '<span class="new-line"></span>'
            resoltHtml += words[i];
        }
    }

    $thisBox.html(resoltHtml);

    var findSpan = $('.atelier-page .' + textBox).children();

    $prevElem = findSpan.eq(0);

    findSpan.each(function (index, elem) {
        if ($(elem).offset().top == $prevElem.offset().top) {
            sameLine.push($(elem));
        } else {
            $('.atelier-page .' + textBox).append('<div class="line"></div>');

            var $lastLine = $('.atelier-page .' + textBox + ' .line').last();

            if (sameLine.length == 1 && sameLine[0][0].tagName == 'BR') {
                sameLine[0].detach().appendTo($('.atelier-page .' + textBox));
            } else {
                for (var _i = 0; _i < sameLine.length; _i++) {

                    sameLine[_i].detach().appendTo($lastLine);
                }
            }

            sameLine = [$(elem)];
        }

        $prevElem = $(elem);
    });

    {
        $('.atelier-page .' + textBox).append('<div class="line"></span>');

        var $lastLine = $('.atelier-page .' + textBox + ' .line').last();

        for (var _i2 = 0; _i2 < sameLine.length; _i2++) {

            sameLine[_i2].detach().appendTo($lastLine);
        }
    }
}

$(document).ready(function () {
    var gallerySlick = false;
    var plateSlickAnim = false;
    var windowWidth = $(window).width();
    var noClick = false;

    if (windowWidth > 640) {
        seperateLines('img-boxes .section-desc');
        seperateLines('chef-grid .section-desc');
        seperateLines('place-gallery .section-desc');
    }

    $('.atelier-page .plate-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        speed: 600,
        // cssEase: 'cubic-bezier(0.19, 0.76, 0.25, 0.96)',
        cssEase: 'ease-out',
        responsive: [{
            breakpoint: 320,
            settings: {
                centerPadding: "10px"
            }
        }]
    });

    $('.atelier-page .plate-content').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        cssEase: 'cubic-bezier(0.19, 0.76, 0.25, 0.96)',
        speed: 1000
    });

    $('.atelier-page .plate-slider').on('afterChange', function () {
        disableSlickArrows();
    });

    $('.atelier-page .plate-slider').on('swipe', function () {
        var plates = $('.atelier-page .plates .plate');
        var currSlide = void 0;

        for (var i = 0; i < plates.length; i++) {

            if (plates.eq(i).hasClass('slick-current')) {
                currSlide = i;
                $('.atelier-page .plate-content').slick('slickGoTo', currSlide);
            }
        }
    });

    $(document).on('click', '.atelier-page .plate-arrows .slick-next', function () {
        if (plateSlickAnim === true) return;

        $('.atelier-page .plate-slider').on('beforeChange', function () {
            plateSlickAnim = true;
        });

        $('.atelier-page .plate-slider').on('afterChange', function () {
            plateSlickAnim = false;
        });

        $('.atelier-page .plate-slider').slick('slickNext');

        setTimeout(function () {
            $('.atelier-page .plate-content').slick('slickNext');
        }, 100);
    });

    $(document).on('click', '.atelier-page .plate-arrows .slick-prev', function () {
        if (plateSlickAnim === true) return;

        $('.atelier-page .plate-slider').on('beforeChange', function () {
            plateSlickAnim = true;
        });

        $('.atelier-page .plate-slider').on('afterChange', function () {
            plateSlickAnim = false;
        });

        $('.atelier-page .plate-slider').slick('slickPrev');

        setTimeout(function () {
            $('.atelier-page .plate-content').slick('slickPrev');
        }, 100);
    });

    // ----------------- Modal Gallery slider

    // $('.atelier-page .modal').each(function(index,elem)
    // {
    //     $(elem).find('.accord-content .gallery-area').slick({
    //         infinite: false,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         centerMode: true,
    //         variableWidth: true,
    //         appendArrows: $(elem).find('.accord-content .gallery-arrows'),
    //         cssEase: 'ease-out',
    //         speed: 700
    //     })
    // })


    // ----------------- Gallery slider

    $('.atelier-page .gallery-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: '.atelier-page .place-gallery .gallery-arrows',
        init: gallerySlick = true
    });

    $('.atelier-page .gallery-slider').on('afterChange', function () {
        var gallImgs = document.querySelectorAll('.atelier-page .place-gallery .gallery-img');
        var slideNum = 0;

        for (var i = 0; i < gallImgs.length; i++) {
            if (gallImgs[i].classList.contains('slick-active')) {
                slideNum = i + 1;
            }
        }
        document.querySelector('.atelier-page .place-gallery .gallery-arrows .curr-num').innerHTML = slideNum;
    });

    if (gallerySlick === true) {
        var gallImgs = document.querySelectorAll('.gallery-img');

        document.querySelector('.atelier-page .place-gallery .gallery-arrows .all-num').innerHTML = gallImgs.length;
    }

    // ----------------- Scroll events


    if (windowWidth > 640) {
        $('.atelier-page .modal .accord-content .prep-mod .paragraph').niceScroll({
            cursorcolor: "black",
            cursorwidth: "5px",
            cursorborderradius: "0px"
        });
    }

    // ----------------- Click events

    $(document).on('click', '.atelier-page .modal.open .accord-menu .accord-menu-item', function () {
        var thisLink = $(this).attr('data-link');

        replaceClassAccordMenu('accord-menu', thisLink);

        replaceClassAccordMenu('accord-content', thisLink);

        if (thisLink === 'gallery') $('.atelier-page .modal.open .accord-content .gallery-area').slick('setPosition');else if (thisLink === 'prep') $('.atelier-page .modal.open .accord-content .prep-mod .paragraph').getNiceScroll().resize();
    });

    $(document).on('click', '.atelier-page .modal .back', function () {
        $('body').removeClass('no-scroll');

        if ($('.atelier-page').hasClass('modal-recipe')) {
            setTimeout(function () {
                $('.atelier-page').removeClass('modal-open modal-recipe');
                $('.atelier-page .modal').removeClass('open');
            }, 1500);

            var modalTimeline = new TimelineMax();
            modalTimeline.to($('.atelier-page .modal.open'), .5, {
                css: { "scale": "1.3", "opacity": "0" },
                ease: Power2.easeOut
            }).to($('.atelier-page .plate-info .plate-stroke-svg'), .05, {
                css: { "scale": "1", "opacity": "0" }
            }, "-=.2").to($('.atelier-page .plate-info .plate-stroke-svg'), .3, {
                opacity: 1
            }, "-=.1").to($('.atelier-page .plates'), .3, {
                css: { "scale": "1", "opacity": "1" }
            }, "-=.1");
        } else if ($('.atelier-page').hasClass('modal-chef')) {
            setTimeout(function () {
                $('.atelier-page').removeClass('modal-open modal-chef');
                $('.atelier-page .modal').removeClass('open');
            }, 600);

            var _modalTimeline = new TimelineMax();
            _modalTimeline.to($('.atelier-page .modal.open'), .5, {
                css: { "scale": "1.3", "opacity": "0" },
                ease: Power2.easeOut
            });
        }
    });

    $(document).on('click', '.atelier-page .plate-info', function () {
        $('.atelier-page .plates .plate.slick-center').trigger('click');
        console.log('hey');
    });

    $(document).on('click', '.atelier-page .plates .plate.slick-center', function () {

        var thisModal = $(this).attr('data-modal') || '';
        $('.atelier-page .modal#modal-recipe-' + thisModal).addClass('open');
        $('.atelier-page').addClass('modal-open modal-recipe');
        $('body').addClass('no-scroll');

        if ($('.atelier-page .modal.open').attr('data-slider') != 'ready') {
            $('.atelier-page .modal.open .accord-content .gallery-area').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: true,
                appendArrows: $('.atelier-page .modal.open .accord-content .gallery-arrows'),
                cssEase: 'ease-out',
                speed: 700
            });
        }

        $('.atelier-page .modal#modal-recipe-' + thisModal).attr('data-slider', 'ready');

        var modalTimeline = new TimelineMax();
        modalTimeline.to($('.atelier-page .plate-info .plate-stroke-svg'), .05, {
            css: { "scale": "3", "opacity": "0" }
        }).set([$('.atelier-page .modal#modal-chef-' + thisModal + ' .modal-title'), $('.atelier-page .modal#modal-chef-' + thisModal + ' .recipe-modal'), $('.atelier-page .modal#modal-chef-' + thisModal + ' .right-col')], {
            x: -30
        }).to($('.atelier-page .plate-info .plate-stroke-svg'), .3, {
            opacity: 0
        }, "-=.05").to($('.atelier-page .plates'), .3, {
            css: { "scale": "1.05", "opacity": "0" }
        }, "-=.05").to($('.atelier-page .modal#modal-recipe-' + thisModal), .3, {
            css: { "scale": "1", "opacity": "1" },
            ease: Power2.easeOut
        }, "-=.2").to($('.atelier-page .modal#modal-recipe-' + thisModal + ' .modal-title'), 1, {
            x: 0,
            ease: Power2.easeOut
        }, "-=0.2").to($('.atelier-page .modal#modal-recipe-' + thisModal + ' .recipe-modal'), 1, {
            x: 0,
            ease: Power2.easeOut
        }, "-=0.95").to($('.atelier-page .modal#modal-recipe-' + thisModal + ' .right-col'), 1, {
            x: 0,
            ease: Power2.easeOut
        }, "-=0.9").to($('.atelier-page .modal#modal-recipe-' + thisModal + ' .back .plate-arrow-prev'), .3, {
            x: -5,
            ease: Power1.easeOut
        }, "-=0.9").to($('.atelier-page .modal#modal-recipe-' + thisModal + ' .back .plate-arrow-prev'), .3, {
            x: 0,
            ease: Power1.easeOut
        }, "-=0.4").from($('.atelier-page .modal#modal-recipe-' + thisModal + ' .col.gold'), 1.5, {
            css: { "background-position": "-120px 100px" },
            ease: Power3.easeOut
        }, "-=1");

        // Resize scrollbar
        setTimeout(function () {
            if (windowWidth > 640) $('.atelier-page .modal.open .accord-content .prep-mod .paragraph').getNiceScroll().resize();

            $('.atelier-page .modal.open .accord-content .gallery-area').slick('setPosition');
        }, 600);
    });

    $(document).on('click', '.atelier-page .chef-grid .grid-item', function () {
        if (noClick === true) {
            return;
        }

        noClick = true;

        if ($(this).hasClass('quote')) {
            return;
        }

        var thisModal = $(this).attr('data-modal') || '';

        $('.atelier-page .modal#modal-chef-' + thisModal).addClass('open');
        $('.atelier-page').addClass('modal-open modal-chef');
        $('body').addClass('no-scroll');

        if ($('.atelier-page .modal.open').attr('data-slider') != 'ready') {
            $('.atelier-page .modal.open .accord-content .gallery-area').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                variableWidth: true,
                appendArrows: $('.atelier-page .modal.open .accord-content .gallery-arrows'),
                cssEase: 'ease-out',
                speed: 700
            });
        }

        $('.atelier-page .modal#modal-chef-' + thisModal).attr('data-slider', 'ready');

        var modalTimeline = new TimelineMax();
        modalTimeline.set([$('.atelier-page .modal#modal-chef-' + thisModal + ' .modal-title'), $('.atelier-page .modal#modal-chef-' + thisModal + ' .right-col')], {
            x: -30
        }).to($('.atelier-page .modal#modal-chef-' + thisModal), .3, {
            css: { "scale": "1", "opacity": "1" },
            ease: Power2.easeOut
        }, "-=.2").to($('.atelier-page .modal#modal-chef-' + thisModal + ' .modal-title'), 1, {
            x: 0,
            ease: Power2.easeOut
        }, "-=0.2").to($('.atelier-page .modal#modal-chef-' + thisModal + ' .right-col'), 1, {
            x: 0,
            ease: Power2.easeOut
        }, "-=0.9").to($('.atelier-page .modal#modal-chef-' + thisModal + ' .back .plate-arrow-prev'), .3, {
            x: -5,
            ease: Power1.easeOut
        }, "-=0.9").to($('.atelier-page .modal#modal-chef-' + thisModal + ' .back .plate-arrow-prev'), .3, {
            x: 0,
            ease: Power1.easeOut
        }, "-=0.4").from($('.atelier-page .modal#modal-chef-' + thisModal + ' .col.gold'), 1.5, {
            css: { "background-position": "-120px 100px" },
            ease: Power3.easeOut
        }, "-=1").from($('.atelier-page .modal#modal-chef-' + thisModal + ' .col.gold'), 1.5, {
            css: { "background-position": "-120px 100px" },
            ease: Power3.easeOut
        }, "-=1");

        // Resize scrollbar
        setTimeout(function () {
            if (windowWidth > 640) $('.atelier-page .modal#modal-chef-' + thisModal + ' .accord-content .prep-mod .paragraph').getNiceScroll().resize();

            $('.atelier-page .modal#modal-chef-' + thisModal + ' .accord-content .gallery-area').slick('setPosition');
        }, 600);

        noClick = false;
    });

    $(document).on('click', '.atelier-page .img-boxes .box-4', function () {
        $('.atelier-page .video-overlay').addClass('open');
        $('body').addClass('no-scroll');

        var modalTimeline = new TimelineMax();
        modalTimeline.to($('.atelier-page .video-overlay'), .3, {
            css: { "scale": "1", "opacity": "1" },
            ease: Power2.easeOut
        }, "-=.2");
    });

    $(document).on('click', '.atelier-page .video-overlay .close-overlay', function () {
        $('body').removeClass('no-scroll');

        setTimeout(function () {
            $('.atelier-page .video-overlay').removeClass('open');
        }, 600);

        var modalTimeline = new TimelineMax();
        modalTimeline.to($('.atelier-page .video-overlay'), .5, {
            css: { "scale": "1.3", "opacity": "0" },
            ease: Power2.easeOut
        });
    });

    // ---- Run imported animation function
    if (windowWidth > 640) (0, _animation2.default)();
});

$(window).on('resize', function () {
    $('.atelier-page .gallery-slider').slick('setPosition');
});

},{"./utils/animation.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function animation() {

    function showBoxShadow() {
        document.querySelector('.atelier-page .boxes-grid .box.box-3').classList.add('shadow');
    }

    // ----- First boxes

    var boxTimeline = new TimelineMax();
    boxTimeline.set([$('.atelier-page .boxes-grid .box-1'), $('.atelier-page .boxes-grid .box-2'), $('.atelier-page .boxes-grid .box-3')], {
        css: { "left": "-50px", "right": "0" }
    }).set($('.atelier-page .boxes-grid .box .mask'), {
        x: "0%"
    }).set($('.atelier-page .boxes-grid .box-4'), {
        scale: 0
    }).to([$('.atelier-page .boxes-grid .box-1'), $('.atelier-page .boxes-grid .box-2'), $('.atelier-page .boxes-grid .box-3')], 1, {
        css: { "left": "0", "right": "0" },
        ease: CustomEase.create("custom", "M0,0 C0.757,0 0.49,0.478 0.718,0.858 0.793,0.983 0.909,0.968 1,1")
    }, 0.3).to($('.atelier-page .boxes-grid .box .mask'), 1, {
        x: "100%",
        ease: CustomEase.create("custom", "M0,0 C0.757,0 0.49,0.478 0.718,0.858 0.793,0.983 0.909,0.968 1,1"),
        onComplete: showBoxShadow
    }, 0.3).to($('.atelier-page .boxes-grid .box-4'), .5, {
        scale: 1,
        ease: Power2.easeOut
    }, .8);

    // ----- Scroll Video Play button

    var controller = new ScrollMagic.Controller({
        addIndicators: true
    });

    // ----- Side-title - Section Desc Timeline 1

    var sideTitleTimeline1 = new TimelineMax();
    sideTitleTimeline1.from($('.atelier-page .img-boxes .side-title'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.8).staggerFrom($('.atelier-page .img-boxes .section-desc').find('.line'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.1, 1);

    var sideTitleScene1 = new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        reverse: false
    }).setTween(sideTitleTimeline1).addTo(controller);

    // ----- Side-title - Section Desc Timeline 2

    var sideTitleTimeline2 = new TimelineMax();
    sideTitleTimeline2.from($('.atelier-page .chef-grid .side-title'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.2).staggerFrom($('.atelier-page .chef-grid .section-desc').find('.line'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.1, 0.2);

    var sideTitleScene2 = new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '.atelier-page .chef-grid',
        reverse: false
    }).setTween(sideTitleTimeline2).addTo(controller);

    // ----- Side-title - Section Desc Timeline 3

    var sideTitleTimeline3 = new TimelineMax();
    sideTitleTimeline3.from($('.atelier-page .place-gallery .side-title'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.2).staggerFrom($('.atelier-page .place-gallery .section-desc').find('.line'), 0.8, {
        x: 50,
        autoAlpha: 0,
        ease: Power2.easeOut
    }, 0.1, 0.2);

    var sideTitleScene3 = new ScrollMagic.Scene({
        duration: 0,
        offset: 0,
        triggerElement: '.atelier-page .place-gallery',
        reverse: false
    }).setTween(sideTitleTimeline3).addTo(controller);

    // ----- Capsule Timeline

    var capsuleTimeline = new TimelineMax();
    capsuleTimeline.from($('.atelier-page .capsule'), 1, {
        top: -250,
        rotation: -17,
        ease: Power0.easeNone
    });

    var capsuleScene = new ScrollMagic.Scene({
        duration: '30%',
        triggerElement: '.atelier-page .boxes-grid',
        triggerHook: 'onLeave'
    }).setTween(capsuleTimeline).addTo(controller);

    // ----- Box3 Timeline

    var box1Timeline = new TimelineMax();
    box1Timeline.from($('.atelier-page .box-1'), 2, {
        y: -50,
        ease: Power0.easeNone
    });

    var box1Scene = new ScrollMagic.Scene({
        duration: '50%',
        triggerElement: '.atelier-page .boxes-grid'
    }).setTween(box1Timeline).addTo(controller);

    var box2Timeline = new TimelineMax();
    box2Timeline.from($('.atelier-page .box-2'), 2, {
        y: -200,
        ease: Power0.easeNone
    });

    var box2Scene = new ScrollMagic.Scene({
        duration: '80%',
        triggerElement: '.atelier-page .boxes-grid'
    }).setTween(box2Timeline).addTo(controller);

    var box4Timeline = new TimelineMax();
    box4Timeline.from($('.atelier-page .box-4'), 2, {
        y: 100,
        ease: Power0.easeNone
    });

    var box4Scene = new ScrollMagic.Scene({
        duration: '60%',
        triggerElement: '.atelier-page .boxes-grid'
    }).setTween(box4Timeline).addTo(controller);

    // ----- gridItems Timeline

    // let gridItemsTimeline = new TimelineMax();
    // gridItemsTimeline
    //     .from($('.atelier-page .grid-items'), 0.5,
    //     {
    //         y: -80,
    //         ease: Power0.easeNone
    //     })

    // let gridItemsScene = new ScrollMagic.Scene({
    //     duration: '60%',
    //     offset: -200,
    //     triggerElement: '.atelier-page .grid-items'
    // })
    // .setTween(gridItemsTimeline)
    // .addTo(controller)


    // ----- Chef Images Timeline

    var chefImgTimeline = new TimelineMax();
    chefImgTimeline.set($('.atelier-page .grid-items .chef-img'), {
        css: { "scale": "0.8", "filter": "blur(2px)" }
    }).set([$('.atelier-page .grid-items .quote-text'), $('.atelier-page .grid-items .quote-source')], {
        y: 50
    }).set($('.atelier-page .grid-items .quote-line'), {
        scale: 0
    }).to($('.atelier-page .grid-items .chef-img'), 1, {
        css: { "scale": "1", "filter": "blur(0)" },
        ease: Power2.easeOut
    }).to($('.atelier-page .grid-items .chef-stroke-rect'), 1.2, {
        css: { "stroke-dashoffset": 0 },
        ease: Power4.easeInOut
    }, "-=0.7").to([$('.atelier-page .grid-items .quote-text'), $('.atelier-page .grid-items .quote-source')], 1.2, {
        y: 0,
        ease: Power4.easeOut
    }, "-=1.2").to($('.atelier-page .grid-items .quote-line'), 1.2, {
        scale: 1,
        ease: Power4.easeOut
    }, "-=1.2");

    var chefImgScene = new ScrollMagic.Scene({
        duration: 0,
        triggerElement: '.atelier-page .chef-grid',
        reverse: false
    }).setTween(chefImgTimeline).addTo(controller);

    // ----- Plates Timeline

    var platesTimeline = new TimelineMax();
    platesTimeline.set($('.atelier-page .recipes-area .plates'), {
        y: 120
    }).set($('.atelier-page .recipes-area .plates .plate-img'), {
        rotation: 30
    }).to($('.atelier-page .recipes-area .plates'), 1, {
        y: 0,
        ease: Power4.easeInOut
    }).to($('.atelier-page .recipes-area .plates .plate-img'), 1, {
        rotation: 0,
        ease: Power4.easeInOut
    }, "-=1");

    var platesScene = new ScrollMagic.Scene({
        duration: '60%',
        triggerElement: '.atelier-page .recipes-area',
        reverse: true
    }).setTween(platesTimeline).addTo(controller);
}

exports.default = animation;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqc1xcbWFpbi5qcyIsImpzXFx1dGlsc1xcYW5pbWF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQTs7Ozs7O0FBSUEsT0FBTyxTQUFQLENBQWlCLFVBQWpCLEdBQThCLFVBQVMsTUFBVCxFQUFpQixXQUFqQixFQUE4QjtBQUN4RCxRQUFJLFNBQVMsSUFBYjtBQUNBLFdBQU8sT0FBTyxPQUFQLENBQWUsSUFBSSxNQUFKLENBQVcsTUFBWCxFQUFtQixHQUFuQixDQUFmLEVBQXdDLFdBQXhDLENBQVA7QUFDSCxDQUhELEMsQ0FMQTs7O0FBV0EsU0FBUyxzQkFBVCxDQUFnQyxPQUFoQyxFQUF3QyxRQUF4QyxFQUNBOztBQUVJLFNBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLFNBQVMsYUFBVCxDQUF1QixnQ0FBZ0MsT0FBdkQsRUFBZ0UsU0FBaEUsQ0FBMEUsTUFBN0YsRUFBcUcsR0FBckcsRUFDQTtBQUNJLFlBQUksWUFBWSxTQUFTLGFBQVQsQ0FBdUIsZ0NBQWdDLE9BQXZELEVBQWdFLFNBQWhFLENBQTBFLENBQTFFLENBQWhCOztBQUVBLFlBQUssY0FBYyxPQUFuQixFQUNJLEVBQUUsZ0NBQWdDLE9BQWxDLEVBQTJDLFdBQTNDLENBQXVELFNBQXZELEVBQWtFLFFBQWxFLENBQTJFLFFBQTNFO0FBQ1A7QUFFSjs7QUFFRCxTQUFTLGtCQUFULEdBQ0E7QUFDSSxRQUFJLFNBQVMsRUFBRSw4QkFBRixDQUFiO0FBQ0EsUUFBSSxrQkFBSjs7QUFFQSxTQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxPQUFPLE1BQTFCLEVBQWtDLEdBQWxDLEVBQ0E7QUFDSSxZQUFJLE9BQU8sRUFBUCxDQUFVLENBQVYsRUFBYSxRQUFiLENBQXNCLGVBQXRCLENBQUosRUFDQTtBQUNJLHdCQUFZLENBQVo7QUFDSDtBQUNKOztBQUVELFFBQUksYUFBYSxDQUFqQixFQUNBO0FBQ0ksVUFBRSx5Q0FBRixFQUE2QyxRQUE3QyxDQUFzRCxnQkFBdEQ7QUFDSCxLQUhELE1BSUssSUFBSSxhQUFjLE9BQU8sTUFBUCxHQUFnQixDQUFsQyxFQUNMO0FBQ0ksVUFBRSx5Q0FBRixFQUE2QyxRQUE3QyxDQUFzRCxnQkFBdEQ7QUFDSCxLQUhJLE1BSUE7QUFDRCxVQUFFLHlDQUFGLEVBQTZDLFdBQTdDLENBQXlELGdCQUF6RDtBQUNBLFVBQUUseUNBQUYsRUFBNkMsV0FBN0MsQ0FBeUQsZ0JBQXpEO0FBQ0g7QUFDSjs7QUFJRCxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFDQTtBQUNJLFFBQUksV0FBVyxFQUFFLG9CQUFvQixPQUF0QixDQUFmO0FBQUEsUUFDSSxRQUFRLFNBQVMsSUFBVCxHQUFnQixVQUFoQixDQUEyQixNQUEzQixFQUFrQyxRQUFsQyxFQUE0QyxLQUE1QyxDQUFrRCxHQUFsRCxDQURaO0FBQUEsUUFFSSxhQUFhLEVBRmpCO0FBQUEsUUFHSSxXQUFXLEVBSGY7QUFBQSxRQUlJLFlBQVksSUFKaEI7O0FBTUEsU0FBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksTUFBTSxNQUF6QixFQUFpQyxHQUFqQyxFQUNBO0FBQ0ksWUFBSSxNQUFNLENBQU4sS0FBWSxNQUFoQixFQUNBO0FBQ0ksMEJBQWMsV0FBVyxNQUFNLENBQU4sQ0FBWCxHQUFzQixVQUFwQztBQUNILFNBSEQsTUFLQTtBQUNJO0FBQ0EsMEJBQWMsTUFBTSxDQUFOLENBQWQ7QUFDSDtBQUNKOztBQUVELGFBQVMsSUFBVCxDQUFjLFVBQWQ7O0FBRUEsUUFBSSxXQUFXLEVBQUUsb0JBQW9CLE9BQXRCLEVBQStCLFFBQS9CLEVBQWY7O0FBRUEsZ0JBQVksU0FBUyxFQUFULENBQVksQ0FBWixDQUFaOztBQUVBLGFBQVMsSUFBVCxDQUFjLFVBQVMsS0FBVCxFQUFlLElBQWYsRUFDZDtBQUNJLFlBQUksRUFBRSxJQUFGLEVBQVEsTUFBUixHQUFpQixHQUFqQixJQUF3QixVQUFVLE1BQVYsR0FBbUIsR0FBL0MsRUFDQTtBQUNJLHFCQUFTLElBQVQsQ0FBZSxFQUFFLElBQUYsQ0FBZjtBQUNILFNBSEQsTUFLQTtBQUNJLGNBQUUsb0JBQW9CLE9BQXRCLEVBQStCLE1BQS9CLENBQXNDLDBCQUF0Qzs7QUFFQSxnQkFBSSxZQUFZLEVBQUUsb0JBQW9CLE9BQXBCLEdBQThCLFFBQWhDLEVBQTBDLElBQTFDLEVBQWhCOztBQUVBLGdCQUFJLFNBQVMsTUFBVCxJQUFtQixDQUFuQixJQUF3QixTQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsT0FBZixJQUEwQixJQUF0RCxFQUNBO0FBQ0kseUJBQVMsQ0FBVCxFQUFZLE1BQVosR0FBcUIsUUFBckIsQ0FBOEIsRUFBRSxvQkFBb0IsT0FBdEIsQ0FBOUI7QUFDSCxhQUhELE1BS0E7QUFDSSxxQkFBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLFNBQVMsTUFBN0IsRUFBcUMsSUFBckMsRUFDQTs7QUFFSSw2QkFBUyxFQUFULEVBQVksTUFBWixHQUFxQixRQUFyQixDQUE4QixTQUE5QjtBQUNIO0FBQ0o7O0FBRUQsdUJBQVcsQ0FBRSxFQUFFLElBQUYsQ0FBRixDQUFYO0FBQ0g7O0FBRUQsb0JBQVksRUFBRSxJQUFGLENBQVo7QUFDSCxLQTdCRDs7QUFnQ0E7QUFDSSxVQUFFLG9CQUFvQixPQUF0QixFQUErQixNQUEvQixDQUFzQywyQkFBdEM7O0FBRUEsWUFBSSxZQUFZLEVBQUUsb0JBQW9CLE9BQXBCLEdBQThCLFFBQWhDLEVBQTBDLElBQTFDLEVBQWhCOztBQUVBLGFBQUssSUFBSSxNQUFJLENBQWIsRUFBZ0IsTUFBSSxTQUFTLE1BQTdCLEVBQXFDLEtBQXJDLEVBQ0E7O0FBRUkscUJBQVMsR0FBVCxFQUFZLE1BQVosR0FBcUIsUUFBckIsQ0FBOEIsU0FBOUI7QUFDSDtBQUNKO0FBR0o7O0FBRUQsRUFBRSxRQUFGLEVBQVksS0FBWixDQUFrQixZQUNsQjtBQUNJLFFBQUksZUFBZSxLQUFuQjtBQUNBLFFBQUksaUJBQWlCLEtBQXJCO0FBQ0EsUUFBSSxjQUFjLEVBQUUsTUFBRixFQUFVLEtBQVYsRUFBbEI7QUFDQSxRQUFJLFVBQVUsS0FBZDs7QUFHQSxRQUFHLGNBQWMsR0FBakIsRUFDQTtBQUNJLHNCQUFjLHlCQUFkO0FBQ0Esc0JBQWMseUJBQWQ7QUFDQSxzQkFBYyw2QkFBZDtBQUNIOztBQUdELE1BQUUsNkJBQUYsRUFBaUMsS0FBakMsQ0FBdUM7QUFDbkMsa0JBQVUsS0FEeUI7QUFFbkMsc0JBQWMsQ0FGcUI7QUFHbkMsd0JBQWdCLENBSG1CO0FBSW5DLG9CQUFZLElBSnVCO0FBS25DLHVCQUFlLElBTG9CO0FBTW5DLGdCQUFRLEtBTjJCO0FBT25DLGVBQU8sR0FQNEI7QUFRbkM7QUFDQSxpQkFBUyxVQVQwQjtBQVVuQyxvQkFDQSxDQUNJO0FBQ0ksd0JBQVksR0FEaEI7QUFFSSxzQkFBVTtBQUNOLCtCQUFlO0FBRFQ7QUFGZCxTQURKO0FBWG1DLEtBQXZDOztBQXFCQSxNQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDO0FBQ3BDLGtCQUFVLEtBRDBCO0FBRXBDLHNCQUFjLENBRnNCO0FBR3BDLHdCQUFnQixDQUhvQjtBQUlwQyxnQkFBUSxLQUo0QjtBQUtwQyxpQkFBUyxzQ0FMMkI7QUFNcEMsZUFBTztBQU42QixLQUF4Qzs7QUFVQSxNQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLGFBQXBDLEVBQW1ELFlBQ25EO0FBQ0k7QUFDSCxLQUhEOztBQUtBLE1BQUUsNkJBQUYsRUFBaUMsRUFBakMsQ0FBb0MsT0FBcEMsRUFBNkMsWUFBVTtBQUNuRCxZQUFJLFNBQVMsRUFBRSw4QkFBRixDQUFiO0FBQ0EsWUFBSSxrQkFBSjs7QUFFQSxhQUFJLElBQUksSUFBSSxDQUFaLEVBQWUsSUFBSSxPQUFPLE1BQTFCLEVBQWtDLEdBQWxDLEVBQ0E7O0FBRUksZ0JBQUksT0FBTyxFQUFQLENBQVUsQ0FBVixFQUFhLFFBQWIsQ0FBc0IsZUFBdEIsQ0FBSixFQUNBO0FBQ0ksNEJBQVksQ0FBWjtBQUNBLGtCQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDLFdBQXhDLEVBQW9ELFNBQXBEO0FBQ0g7QUFDSjtBQUNKLEtBYkQ7O0FBZUEsTUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IseUNBQXhCLEVBQW1FLFlBQ25FO0FBQ0ksWUFBSSxtQkFBbUIsSUFBdkIsRUFDSTs7QUFFSixVQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLGNBQXBDLEVBQW9ELFlBQ3BEO0FBQ0ksNkJBQWlCLElBQWpCO0FBQ0gsU0FIRDs7QUFLQSxVQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLGFBQXBDLEVBQW1ELFlBQ25EO0FBQ0ksNkJBQWlCLEtBQWpCO0FBQ0gsU0FIRDs7QUFLQSxVQUFFLDZCQUFGLEVBQWlDLEtBQWpDLENBQXVDLFdBQXZDOztBQUVBLG1CQUFXLFlBQ1g7QUFDSSxjQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDLFdBQXhDO0FBQ0gsU0FIRCxFQUdHLEdBSEg7QUFLSCxLQXRCRDs7QUF3QkEsTUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLE9BQWYsRUFBd0IseUNBQXhCLEVBQW1FLFlBQ25FO0FBQ0ksWUFBSSxtQkFBbUIsSUFBdkIsRUFDSTs7QUFFSixVQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLGNBQXBDLEVBQW9ELFlBQ3BEO0FBQ0ksNkJBQWlCLElBQWpCO0FBQ0gsU0FIRDs7QUFLQSxVQUFFLDZCQUFGLEVBQWlDLEVBQWpDLENBQW9DLGFBQXBDLEVBQW1ELFlBQ25EO0FBQ0ksNkJBQWlCLEtBQWpCO0FBQ0gsU0FIRDs7QUFLQSxVQUFFLDZCQUFGLEVBQWlDLEtBQWpDLENBQXVDLFdBQXZDOztBQUVBLG1CQUFXLFlBQ1g7QUFDSSxjQUFFLDhCQUFGLEVBQWtDLEtBQWxDLENBQXdDLFdBQXhDO0FBQ0gsU0FIRCxFQUdHLEdBSEg7QUFLSCxLQXRCRDs7QUF5QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBOztBQUVBLE1BQUUsK0JBQUYsRUFBbUMsS0FBbkMsQ0FBeUM7QUFDckMsa0JBQVUsS0FEMkI7QUFFckMsc0JBQWMsQ0FGdUI7QUFHckMsd0JBQWdCLENBSHFCO0FBSXJDLHNCQUFjLDhDQUp1QjtBQUtyQyxjQUFNLGVBQWU7QUFMZ0IsS0FBekM7O0FBUUEsTUFBRSwrQkFBRixFQUFtQyxFQUFuQyxDQUFzQyxhQUF0QyxFQUFxRCxZQUFVO0FBQzNELFlBQUksV0FBVyxTQUFTLGdCQUFULENBQTBCLDJDQUExQixDQUFmO0FBQ0EsWUFBSSxXQUFXLENBQWY7O0FBRUEsYUFBSSxJQUFJLElBQUksQ0FBWixFQUFlLElBQUksU0FBUyxNQUE1QixFQUFvQyxHQUFwQyxFQUNBO0FBQ0ksZ0JBQUksU0FBUyxDQUFULEVBQVksU0FBWixDQUFzQixRQUF0QixDQUErQixjQUEvQixDQUFKLEVBQ0E7QUFDSSwyQkFBVyxJQUFJLENBQWY7QUFDSDtBQUNKO0FBQ0QsaUJBQVMsYUFBVCxDQUF1Qix3REFBdkIsRUFBaUYsU0FBakYsR0FBNkYsUUFBN0Y7QUFDSCxLQVpEOztBQWNBLFFBQUksaUJBQWlCLElBQXJCLEVBQ0E7QUFDSSxZQUFJLFdBQVcsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFmOztBQUVBLGlCQUFTLGFBQVQsQ0FBdUIsdURBQXZCLEVBQWdGLFNBQWhGLEdBQTRGLFNBQVMsTUFBckc7QUFDSDs7QUFHRDs7O0FBSUEsUUFBSSxjQUFjLEdBQWxCLEVBQ0E7QUFDSSxVQUFFLDJEQUFGLEVBQStELFVBQS9ELENBQTBFO0FBQ3RFLHlCQUFhLE9BRHlEO0FBRXRFLHlCQUFhLEtBRnlEO0FBR3RFLGdDQUFvQjtBQUhrRCxTQUExRTtBQUtIOztBQUVEOztBQUVBLE1BQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLDBEQUF4QixFQUFvRixZQUNwRjtBQUNJLFlBQUksV0FBVyxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsV0FBYixDQUFmOztBQUVBLCtCQUF1QixhQUF2QixFQUFxQyxRQUFyQzs7QUFFQSwrQkFBdUIsZ0JBQXZCLEVBQXdDLFFBQXhDOztBQUVBLFlBQUksYUFBYSxTQUFqQixFQUNJLEVBQUUseURBQUYsRUFBNkQsS0FBN0QsQ0FBbUUsYUFBbkUsRUFESixLQUdLLElBQUksYUFBYSxNQUFqQixFQUNELEVBQUUsZ0VBQUYsRUFBb0UsYUFBcEUsR0FBb0YsTUFBcEY7QUFFUCxLQWREOztBQWlCQSxNQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3Qiw0QkFBeEIsRUFBc0QsWUFDdEQ7QUFDSSxVQUFFLE1BQUYsRUFBVSxXQUFWLENBQXNCLFdBQXRCOztBQUdBLFlBQUksRUFBRSxlQUFGLEVBQW1CLFFBQW5CLENBQTRCLGNBQTVCLENBQUosRUFDQTtBQUNJLHVCQUFXLFlBQ1g7QUFDSSxrQkFBRSxlQUFGLEVBQW1CLFdBQW5CLENBQStCLHlCQUEvQjtBQUNBLGtCQUFFLHNCQUFGLEVBQTBCLFdBQTFCLENBQXNDLE1BQXRDO0FBQ0gsYUFKRCxFQUlHLElBSkg7O0FBT0EsZ0JBQUksZ0JBQWdCLElBQUksV0FBSixFQUFwQjtBQUNBLDBCQUNLLEVBREwsQ0FDUSxFQUFFLDJCQUFGLENBRFIsRUFDd0MsRUFEeEMsRUFFSTtBQUNJLHFCQUFLLEVBQUMsU0FBVSxLQUFYLEVBQWtCLFdBQVksR0FBOUIsRUFEVDtBQUVJLHNCQUFNLE9BQU87QUFGakIsYUFGSixFQU1LLEVBTkwsQ0FNUSxFQUFFLDZDQUFGLENBTlIsRUFNMEQsR0FOMUQsRUFPSTtBQUNJLHFCQUFLLEVBQUMsU0FBVSxHQUFYLEVBQWdCLFdBQVksR0FBNUI7QUFEVCxhQVBKLEVBU08sTUFUUCxFQVVLLEVBVkwsQ0FVUSxFQUFFLDZDQUFGLENBVlIsRUFVMEQsRUFWMUQsRUFXSTtBQUNJLHlCQUFTO0FBRGIsYUFYSixFQWFPLE1BYlAsRUFjSyxFQWRMLENBY1EsRUFBRSx1QkFBRixDQWRSLEVBY29DLEVBZHBDLEVBZUk7QUFDSSxxQkFBSyxFQUFDLFNBQVUsR0FBWCxFQUFnQixXQUFZLEdBQTVCO0FBRFQsYUFmSixFQWlCTyxNQWpCUDtBQWtCSCxTQTVCRCxNQTZCSyxJQUFJLEVBQUUsZUFBRixFQUFtQixRQUFuQixDQUE0QixZQUE1QixDQUFKLEVBQ0w7QUFDSSx1QkFBVyxZQUNYO0FBQ0ksa0JBQUUsZUFBRixFQUFtQixXQUFuQixDQUErQix1QkFBL0I7QUFDQSxrQkFBRSxzQkFBRixFQUEwQixXQUExQixDQUFzQyxNQUF0QztBQUNILGFBSkQsRUFJRyxHQUpIOztBQU1BLGdCQUFJLGlCQUFnQixJQUFJLFdBQUosRUFBcEI7QUFDQSwyQkFDSyxFQURMLENBQ1EsRUFBRSwyQkFBRixDQURSLEVBQ3dDLEVBRHhDLEVBRUk7QUFDSSxxQkFBSyxFQUFDLFNBQVUsS0FBWCxFQUFrQixXQUFZLEdBQTlCLEVBRFQ7QUFFSSxzQkFBTSxPQUFPO0FBRmpCLGFBRko7QUFNSDtBQUNKLEtBbEREOztBQXFEQSxNQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QiwyQkFBeEIsRUFBcUQsWUFDckQ7QUFDSSxVQUFFLDJDQUFGLEVBQStDLE9BQS9DLENBQXVELE9BQXZEO0FBQ0EsZ0JBQVEsR0FBUixDQUFZLEtBQVo7QUFDSCxLQUpEOztBQU9BLE1BQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLDJDQUF4QixFQUFxRSxZQUNyRTs7QUFFSSxZQUFJLFlBQVksRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLFlBQWIsS0FBOEIsRUFBOUM7QUFDQSxVQUFFLHVDQUF1QyxTQUF6QyxFQUFvRCxRQUFwRCxDQUE2RCxNQUE3RDtBQUNBLFVBQUUsZUFBRixFQUFtQixRQUFuQixDQUE0Qix5QkFBNUI7QUFDQSxVQUFFLE1BQUYsRUFBVSxRQUFWLENBQW1CLFdBQW5COztBQUVBLFlBQUksRUFBRSwyQkFBRixFQUErQixJQUEvQixDQUFvQyxhQUFwQyxLQUFzRCxPQUExRCxFQUNBO0FBQ0ksY0FBRSx5REFBRixFQUE2RCxLQUE3RCxDQUFtRTtBQUMvRCwwQkFBVSxLQURxRDtBQUUvRCw4QkFBYyxDQUZpRDtBQUcvRCxnQ0FBZ0IsQ0FIK0M7QUFJL0QsNEJBQVksSUFKbUQ7QUFLL0QsK0JBQWUsSUFMZ0Q7QUFNL0QsOEJBQWMsRUFBRSwyREFBRixDQU5pRDtBQU8vRCx5QkFBUyxVQVBzRDtBQVEvRCx1QkFBTztBQVJ3RCxhQUFuRTtBQVVIOztBQUVELFVBQUUsdUNBQXVDLFNBQXpDLEVBQW9ELElBQXBELENBQXlELGFBQXpELEVBQXVFLE9BQXZFOztBQUVBLFlBQUksZ0JBQWdCLElBQUksV0FBSixFQUFwQjtBQUNBLHNCQUNLLEVBREwsQ0FDUSxFQUFFLDZDQUFGLENBRFIsRUFDMEQsR0FEMUQsRUFFSTtBQUNJLGlCQUFLLEVBQUMsU0FBVSxHQUFYLEVBQWdCLFdBQVksR0FBNUI7QUFEVCxTQUZKLEVBS0ssR0FMTCxDQUtTLENBQ0QsRUFBRSxxQ0FBcUMsU0FBckMsR0FBaUQsZUFBbkQsQ0FEQyxFQUVELEVBQUUscUNBQXFDLFNBQXJDLEdBQWlELGdCQUFuRCxDQUZDLEVBR0QsRUFBRSxxQ0FBcUMsU0FBckMsR0FBaUQsYUFBbkQsQ0FIQyxDQUxULEVBVUk7QUFDSSxlQUFHLENBQUM7QUFEUixTQVZKLEVBYUssRUFiTCxDQWFRLEVBQUUsNkNBQUYsQ0FiUixFQWEwRCxFQWIxRCxFQWNJO0FBQ0kscUJBQVM7QUFEYixTQWRKLEVBZ0JPLE9BaEJQLEVBaUJLLEVBakJMLENBaUJRLEVBQUUsdUJBQUYsQ0FqQlIsRUFpQm9DLEVBakJwQyxFQWtCSTtBQUNJLGlCQUFLLEVBQUMsU0FBVSxNQUFYLEVBQW1CLFdBQVksR0FBL0I7QUFEVCxTQWxCSixFQW9CTyxPQXBCUCxFQXFCSyxFQXJCTCxDQXFCUSxFQUFFLHVDQUF1QyxTQUF6QyxDQXJCUixFQXFCNkQsRUFyQjdELEVBc0JJO0FBQ0ksaUJBQUssRUFBQyxTQUFVLEdBQVgsRUFBZ0IsV0FBWSxHQUE1QixFQURUO0FBRUksa0JBQU0sT0FBTztBQUZqQixTQXRCSixFQXlCTyxNQXpCUCxFQTBCSyxFQTFCTCxDQTBCUSxFQUFFLHVDQUF1QyxTQUF2QyxHQUFtRCxlQUFyRCxDQTFCUixFQTBCK0UsQ0ExQi9FLEVBMkJJO0FBQ0ksZUFBRyxDQURQO0FBRUksa0JBQU0sT0FBTztBQUZqQixTQTNCSixFQThCTyxPQTlCUCxFQStCSyxFQS9CTCxDQStCUSxFQUFFLHVDQUF1QyxTQUF2QyxHQUFtRCxnQkFBckQsQ0EvQlIsRUErQmdGLENBL0JoRixFQWdDSTtBQUNJLGVBQUcsQ0FEUDtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0FoQ0osRUFtQ08sUUFuQ1AsRUFvQ0ssRUFwQ0wsQ0FvQ1EsRUFBRSx1Q0FBdUMsU0FBdkMsR0FBbUQsYUFBckQsQ0FwQ1IsRUFvQzZFLENBcEM3RSxFQXFDSTtBQUNJLGVBQUcsQ0FEUDtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0FyQ0osRUF3Q08sT0F4Q1AsRUF5Q0ssRUF6Q0wsQ0F5Q1EsRUFBRSx1Q0FBdUMsU0FBdkMsR0FBbUQsMEJBQXJELENBekNSLEVBeUMwRixFQXpDMUYsRUEwQ0k7QUFDSSxlQUFHLENBQUMsQ0FEUjtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0ExQ0osRUE2Q08sT0E3Q1AsRUE4Q0ssRUE5Q0wsQ0E4Q1EsRUFBRSx1Q0FBdUMsU0FBdkMsR0FBbUQsMEJBQXJELENBOUNSLEVBOEMwRixFQTlDMUYsRUErQ0k7QUFDSSxlQUFHLENBRFA7QUFFSSxrQkFBTSxPQUFPO0FBRmpCLFNBL0NKLEVBa0RPLE9BbERQLEVBbURLLElBbkRMLENBbURVLEVBQUUsdUNBQXVDLFNBQXZDLEdBQW1ELFlBQXJELENBbkRWLEVBbUQ4RSxHQW5EOUUsRUFvREk7QUFDSSxpQkFBSyxFQUFDLHVCQUF3QixjQUF6QixFQURUO0FBRUksa0JBQU0sT0FBTztBQUZqQixTQXBESixFQXVETyxLQXZEUDs7QUF5REE7QUFDQSxtQkFBVyxZQUFZO0FBQ25CLGdCQUFJLGNBQWMsR0FBbEIsRUFDSSxFQUFFLGdFQUFGLEVBQW9FLGFBQXBFLEdBQW9GLE1BQXBGOztBQUVKLGNBQUUseURBQUYsRUFBNkQsS0FBN0QsQ0FBbUUsYUFBbkU7QUFDSCxTQUxELEVBS0csR0FMSDtBQU9ILEtBMUZEOztBQTZGQSxNQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixxQ0FBeEIsRUFBK0QsWUFDL0Q7QUFDSSxZQUFJLFlBQVksSUFBaEIsRUFDQTtBQUNJO0FBQ0g7O0FBRUQsa0JBQVUsSUFBVjs7QUFFQSxZQUFLLEVBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsT0FBakIsQ0FBTCxFQUNBO0FBQ0k7QUFDSDs7QUFFRCxZQUFJLFlBQVksRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLFlBQWIsS0FBOEIsRUFBOUM7O0FBRUEsVUFBRSxxQ0FBcUMsU0FBdkMsRUFBa0QsUUFBbEQsQ0FBMkQsTUFBM0Q7QUFDQSxVQUFFLGVBQUYsRUFBbUIsUUFBbkIsQ0FBNEIsdUJBQTVCO0FBQ0EsVUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixXQUFuQjs7QUFFQSxZQUFJLEVBQUUsMkJBQUYsRUFBK0IsSUFBL0IsQ0FBb0MsYUFBcEMsS0FBc0QsT0FBMUQsRUFDQTtBQUNJLGNBQUUseURBQUYsRUFBNkQsS0FBN0QsQ0FBbUU7QUFDL0QsMEJBQVUsS0FEcUQ7QUFFL0QsOEJBQWMsQ0FGaUQ7QUFHL0QsZ0NBQWdCLENBSCtDO0FBSS9ELDRCQUFZLElBSm1EO0FBSy9ELCtCQUFlLElBTGdEO0FBTS9ELDhCQUFjLEVBQUUsMkRBQUYsQ0FOaUQ7QUFPL0QseUJBQVMsVUFQc0Q7QUFRL0QsdUJBQU87QUFSd0QsYUFBbkU7QUFVSDs7QUFFRCxVQUFFLHFDQUFxQyxTQUF2QyxFQUFrRCxJQUFsRCxDQUF1RCxhQUF2RCxFQUFxRSxPQUFyRTs7QUFFQSxZQUFJLGdCQUFnQixJQUFJLFdBQUosRUFBcEI7QUFDQSxzQkFDSyxHQURMLENBQ1MsQ0FDRCxFQUFFLHFDQUFxQyxTQUFyQyxHQUFpRCxlQUFuRCxDQURDLEVBRUQsRUFBRSxxQ0FBcUMsU0FBckMsR0FBaUQsYUFBbkQsQ0FGQyxDQURULEVBS0k7QUFDSSxlQUFHLENBQUM7QUFEUixTQUxKLEVBUUssRUFSTCxDQVFRLEVBQUUscUNBQXFDLFNBQXZDLENBUlIsRUFRMkQsRUFSM0QsRUFTSTtBQUNJLGlCQUFLLEVBQUMsU0FBVSxHQUFYLEVBQWdCLFdBQVksR0FBNUIsRUFEVDtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0FUSixFQVlPLE1BWlAsRUFhSyxFQWJMLENBYVEsRUFBRSxxQ0FBcUMsU0FBckMsR0FBaUQsZUFBbkQsQ0FiUixFQWE2RSxDQWI3RSxFQWNJO0FBQ0ksZUFBRyxDQURQO0FBRUksa0JBQU0sT0FBTztBQUZqQixTQWRKLEVBaUJPLE9BakJQLEVBa0JLLEVBbEJMLENBa0JRLEVBQUUscUNBQXFDLFNBQXJDLEdBQWlELGFBQW5ELENBbEJSLEVBa0IyRSxDQWxCM0UsRUFtQkk7QUFDSSxlQUFHLENBRFA7QUFFSSxrQkFBTSxPQUFPO0FBRmpCLFNBbkJKLEVBc0JPLE9BdEJQLEVBdUJLLEVBdkJMLENBdUJRLEVBQUUscUNBQXFDLFNBQXJDLEdBQWlELDBCQUFuRCxDQXZCUixFQXVCd0YsRUF2QnhGLEVBd0JJO0FBQ0ksZUFBRyxDQUFDLENBRFI7QUFFSSxrQkFBTSxPQUFPO0FBRmpCLFNBeEJKLEVBMkJPLE9BM0JQLEVBNEJLLEVBNUJMLENBNEJRLEVBQUUscUNBQXFDLFNBQXJDLEdBQWlELDBCQUFuRCxDQTVCUixFQTRCd0YsRUE1QnhGLEVBNkJJO0FBQ0ksZUFBRyxDQURQO0FBRUksa0JBQU0sT0FBTztBQUZqQixTQTdCSixFQWdDTyxPQWhDUCxFQWlDSyxJQWpDTCxDQWlDVSxFQUFFLHFDQUFxQyxTQUFyQyxHQUFpRCxZQUFuRCxDQWpDVixFQWlDNEUsR0FqQzVFLEVBa0NJO0FBQ0ksaUJBQUssRUFBQyx1QkFBd0IsY0FBekIsRUFEVDtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0FsQ0osRUFxQ08sS0FyQ1AsRUFzQ0ssSUF0Q0wsQ0FzQ1UsRUFBRSxxQ0FBcUMsU0FBckMsR0FBaUQsWUFBbkQsQ0F0Q1YsRUFzQzRFLEdBdEM1RSxFQXVDSTtBQUNJLGlCQUFLLEVBQUMsdUJBQXdCLGNBQXpCLEVBRFQ7QUFFSSxrQkFBTSxPQUFPO0FBRmpCLFNBdkNKLEVBMENPLEtBMUNQOztBQTRDQTtBQUNBLG1CQUFXLFlBQVk7QUFDbkIsZ0JBQUksY0FBYyxHQUFsQixFQUNJLEVBQUUscUNBQXFDLFNBQXJDLEdBQWlELHVDQUFuRCxFQUE0RixhQUE1RixHQUE0RyxNQUE1Rzs7QUFFSixjQUFFLHFDQUFxQyxTQUFyQyxHQUFpRCxnQ0FBbkQsRUFBcUYsS0FBckYsQ0FBMkYsYUFBM0Y7QUFDSCxTQUxELEVBS0csR0FMSDs7QUFPQSxrQkFBVSxLQUFWO0FBQ0gsS0ExRkQ7O0FBNkZBLE1BQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGlDQUF4QixFQUEyRCxZQUMzRDtBQUNJLFVBQUUsOEJBQUYsRUFBa0MsUUFBbEMsQ0FBMkMsTUFBM0M7QUFDQSxVQUFFLE1BQUYsRUFBVSxRQUFWLENBQW1CLFdBQW5COztBQUVBLFlBQUksZ0JBQWdCLElBQUksV0FBSixFQUFwQjtBQUNBLHNCQUNLLEVBREwsQ0FDUSxFQUFFLDhCQUFGLENBRFIsRUFDMkMsRUFEM0MsRUFFSTtBQUNJLGlCQUFLLEVBQUMsU0FBVSxHQUFYLEVBQWdCLFdBQVksR0FBNUIsRUFEVDtBQUVJLGtCQUFNLE9BQU87QUFGakIsU0FGSixFQUtPLE1BTFA7QUFNSCxLQVpEOztBQWNBLE1BQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLDZDQUF4QixFQUF1RSxZQUN2RTtBQUNJLFVBQUUsTUFBRixFQUFVLFdBQVYsQ0FBc0IsV0FBdEI7O0FBRUEsbUJBQVcsWUFDWDtBQUNJLGNBQUUsOEJBQUYsRUFBa0MsV0FBbEMsQ0FBOEMsTUFBOUM7QUFDSCxTQUhELEVBR0csR0FISDs7QUFLQSxZQUFJLGdCQUFnQixJQUFJLFdBQUosRUFBcEI7QUFDQSxzQkFDSyxFQURMLENBQ1EsRUFBRSw4QkFBRixDQURSLEVBQzJDLEVBRDNDLEVBRUk7QUFDSSxpQkFBSyxFQUFDLFNBQVUsS0FBWCxFQUFrQixXQUFZLEdBQTlCLEVBRFQ7QUFFSSxrQkFBTSxPQUFPO0FBRmpCLFNBRko7QUFNSCxLQWhCRDs7QUFrQkE7QUFDQSxRQUFJLGNBQWMsR0FBbEIsRUFDSTtBQUVQLENBaGVEOztBQW1lQSxFQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixZQUN2QjtBQUNJLE1BQUUsK0JBQUYsRUFBbUMsS0FBbkMsQ0FBeUMsYUFBekM7QUFDSCxDQUhEOzs7Ozs7OztBQ2xtQkEsU0FBUyxTQUFULEdBQ0E7O0FBRUksYUFBUyxhQUFULEdBQ0E7QUFDSSxpQkFBUyxhQUFULENBQXVCLHNDQUF2QixFQUErRCxTQUEvRCxDQUF5RSxHQUF6RSxDQUE2RSxRQUE3RTtBQUNIOztBQUVEOztBQUVBLFFBQUksY0FBYyxJQUFJLFdBQUosRUFBbEI7QUFDQSxnQkFDSyxHQURMLENBQ1MsQ0FBQyxFQUFFLGtDQUFGLENBQUQsRUFBd0MsRUFBRSxrQ0FBRixDQUF4QyxFQUErRSxFQUFFLGtDQUFGLENBQS9FLENBRFQsRUFFSTtBQUNJLGFBQUssRUFBQyxRQUFPLE9BQVIsRUFBaUIsU0FBUSxHQUF6QjtBQURULEtBRkosRUFLSyxHQUxMLENBS1MsRUFBRSxzQ0FBRixDQUxULEVBTUk7QUFDSSxXQUFHO0FBRFAsS0FOSixFQVNLLEdBVEwsQ0FTUyxFQUFFLGtDQUFGLENBVFQsRUFVSTtBQUNJLGVBQU87QUFEWCxLQVZKLEVBYUssRUFiTCxDQWFRLENBQUMsRUFBRSxrQ0FBRixDQUFELEVBQXdDLEVBQUUsa0NBQUYsQ0FBeEMsRUFBK0UsRUFBRSxrQ0FBRixDQUEvRSxDQWJSLEVBYStILENBYi9ILEVBY0k7QUFDSSxhQUFLLEVBQUMsUUFBTyxHQUFSLEVBQWEsU0FBUSxHQUFyQixFQURUO0FBRUksY0FBTSxXQUFXLE1BQVgsQ0FBa0IsUUFBbEIsRUFBNEIsa0VBQTVCO0FBRlYsS0FkSixFQWlCTyxHQWpCUCxFQWtCSyxFQWxCTCxDQWtCUSxFQUFFLHNDQUFGLENBbEJSLEVBa0JtRCxDQWxCbkQsRUFtQkk7QUFDSSxXQUFHLE1BRFA7QUFFSSxjQUFNLFdBQVcsTUFBWCxDQUFrQixRQUFsQixFQUE0QixrRUFBNUIsQ0FGVjtBQUdJLG9CQUFZO0FBSGhCLEtBbkJKLEVBdUJPLEdBdkJQLEVBd0JLLEVBeEJMLENBd0JRLEVBQUUsa0NBQUYsQ0F4QlIsRUF3QitDLEVBeEIvQyxFQXlCSTtBQUNJLGVBQU8sQ0FEWDtBQUVJLGNBQU0sT0FBTztBQUZqQixLQXpCSixFQTRCTyxFQTVCUDs7QUE4QkE7O0FBRUEsUUFBSSxhQUFhLElBQUksWUFBWSxVQUFoQixDQUNiO0FBQ0ksdUJBQWU7QUFEbkIsS0FEYSxDQUFqQjs7QUFPQTs7QUFFQSxRQUFJLHFCQUFxQixJQUFJLFdBQUosRUFBekI7QUFDQSx1QkFDSyxJQURMLENBQ1UsRUFBRSxzQ0FBRixDQURWLEVBQ3FELEdBRHJELEVBRUk7QUFDSSxXQUFHLEVBRFA7QUFFSSxtQkFBVyxDQUZmO0FBR0ksY0FBTSxPQUFPO0FBSGpCLEtBRkosRUFNTyxHQU5QLEVBT0ssV0FQTCxDQU9pQixFQUFFLHdDQUFGLEVBQTRDLElBQTVDLENBQWlELE9BQWpELENBUGpCLEVBTzRFLEdBUDVFLEVBUUk7QUFDSSxXQUFHLEVBRFA7QUFFSSxtQkFBVyxDQUZmO0FBR0ksY0FBTSxPQUFPO0FBSGpCLEtBUkosRUFZTyxHQVpQLEVBWVksQ0FaWjs7QUFjQSxRQUFJLGtCQUFrQixJQUFJLFlBQVksS0FBaEIsQ0FBc0I7QUFDeEMsa0JBQVUsQ0FEOEI7QUFFeEMsZ0JBQVEsQ0FGZ0M7QUFHeEMsaUJBQVM7QUFIK0IsS0FBdEIsRUFLckIsUUFMcUIsQ0FLWixrQkFMWSxFQU1yQixLQU5xQixDQU1mLFVBTmUsQ0FBdEI7O0FBU0M7O0FBRUQsUUFBSSxxQkFBcUIsSUFBSSxXQUFKLEVBQXpCO0FBQ0EsdUJBQ0ssSUFETCxDQUNVLEVBQUUsc0NBQUYsQ0FEVixFQUNxRCxHQURyRCxFQUVJO0FBQ0ksV0FBRyxFQURQO0FBRUksbUJBQVcsQ0FGZjtBQUdJLGNBQU0sT0FBTztBQUhqQixLQUZKLEVBTU8sR0FOUCxFQU9LLFdBUEwsQ0FPaUIsRUFBRSx3Q0FBRixFQUE0QyxJQUE1QyxDQUFpRCxPQUFqRCxDQVBqQixFQU80RSxHQVA1RSxFQVFJO0FBQ0ksV0FBRyxFQURQO0FBRUksbUJBQVcsQ0FGZjtBQUdJLGNBQU0sT0FBTztBQUhqQixLQVJKLEVBWU8sR0FaUCxFQVlZLEdBWlo7O0FBY0EsUUFBSSxrQkFBa0IsSUFBSSxZQUFZLEtBQWhCLENBQXNCO0FBQ3hDLGtCQUFVLENBRDhCO0FBRXhDLGdCQUFRLENBRmdDO0FBR3hDLHdCQUFnQiwwQkFId0I7QUFJeEMsaUJBQVM7QUFKK0IsS0FBdEIsRUFNckIsUUFOcUIsQ0FNWixrQkFOWSxFQU9yQixLQVBxQixDQU9mLFVBUGUsQ0FBdEI7O0FBVUE7O0FBRUEsUUFBSSxxQkFBcUIsSUFBSSxXQUFKLEVBQXpCO0FBQ0EsdUJBQ0ssSUFETCxDQUNVLEVBQUUsMENBQUYsQ0FEVixFQUN5RCxHQUR6RCxFQUVJO0FBQ0ksV0FBRyxFQURQO0FBRUksbUJBQVcsQ0FGZjtBQUdJLGNBQU0sT0FBTztBQUhqQixLQUZKLEVBTU8sR0FOUCxFQU9LLFdBUEwsQ0FPaUIsRUFBRSw0Q0FBRixFQUFnRCxJQUFoRCxDQUFxRCxPQUFyRCxDQVBqQixFQU9nRixHQVBoRixFQVFJO0FBQ0ksV0FBRyxFQURQO0FBRUksbUJBQVcsQ0FGZjtBQUdJLGNBQU0sT0FBTztBQUhqQixLQVJKLEVBWU8sR0FaUCxFQVlZLEdBWlo7O0FBY0EsUUFBSSxrQkFBa0IsSUFBSSxZQUFZLEtBQWhCLENBQXNCO0FBQ3hDLGtCQUFVLENBRDhCO0FBRXhDLGdCQUFRLENBRmdDO0FBR3hDLHdCQUFnQiw4QkFId0I7QUFJeEMsaUJBQVM7QUFKK0IsS0FBdEIsRUFNckIsUUFOcUIsQ0FNWixrQkFOWSxFQU9yQixLQVBxQixDQU9mLFVBUGUsQ0FBdEI7O0FBVUE7O0FBRUEsUUFBSSxrQkFBa0IsSUFBSSxXQUFKLEVBQXRCO0FBQ0Esb0JBQ0ssSUFETCxDQUNVLEVBQUUsd0JBQUYsQ0FEVixFQUN1QyxDQUR2QyxFQUVJO0FBQ0ksYUFBSyxDQUFDLEdBRFY7QUFFSSxrQkFBVSxDQUFDLEVBRmY7QUFHSSxjQUFNLE9BQU87QUFIakIsS0FGSjs7QUFRQSxRQUFJLGVBQWUsSUFBSSxZQUFZLEtBQWhCLENBQXNCO0FBQ3JDLGtCQUFVLEtBRDJCO0FBRXJDLHdCQUFnQiwyQkFGcUI7QUFHckMscUJBQWE7QUFId0IsS0FBdEIsRUFLbEIsUUFMa0IsQ0FLVCxlQUxTLEVBTWxCLEtBTmtCLENBTVosVUFOWSxDQUFuQjs7QUFTQTs7QUFFQSxRQUFJLGVBQWUsSUFBSSxXQUFKLEVBQW5CO0FBQ0EsaUJBQ0ssSUFETCxDQUNVLEVBQUUsc0JBQUYsQ0FEVixFQUNxQyxDQURyQyxFQUVJO0FBQ0ksV0FBRyxDQUFDLEVBRFI7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FGSjs7QUFPQSxRQUFJLFlBQVksSUFBSSxZQUFZLEtBQWhCLENBQXNCO0FBQ2xDLGtCQUFVLEtBRHdCO0FBRWxDLHdCQUFnQjtBQUZrQixLQUF0QixFQUlmLFFBSmUsQ0FJTixZQUpNLEVBS2YsS0FMZSxDQUtULFVBTFMsQ0FBaEI7O0FBUUEsUUFBSSxlQUFlLElBQUksV0FBSixFQUFuQjtBQUNBLGlCQUNLLElBREwsQ0FDVSxFQUFFLHNCQUFGLENBRFYsRUFDcUMsQ0FEckMsRUFFSTtBQUNJLFdBQUcsQ0FBQyxHQURSO0FBRUksY0FBTSxPQUFPO0FBRmpCLEtBRko7O0FBT0EsUUFBSSxZQUFZLElBQUksWUFBWSxLQUFoQixDQUFzQjtBQUNsQyxrQkFBVSxLQUR3QjtBQUVsQyx3QkFBZ0I7QUFGa0IsS0FBdEIsRUFJZixRQUplLENBSU4sWUFKTSxFQUtmLEtBTGUsQ0FLVCxVQUxTLENBQWhCOztBQVFBLFFBQUksZUFBZSxJQUFJLFdBQUosRUFBbkI7QUFDQSxpQkFDSyxJQURMLENBQ1UsRUFBRSxzQkFBRixDQURWLEVBQ3FDLENBRHJDLEVBRUk7QUFDSSxXQUFHLEdBRFA7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FGSjs7QUFPQSxRQUFJLFlBQVksSUFBSSxZQUFZLEtBQWhCLENBQXNCO0FBQ2xDLGtCQUFVLEtBRHdCO0FBRWxDLHdCQUFnQjtBQUZrQixLQUF0QixFQUlmLFFBSmUsQ0FJTixZQUpNLEVBS2YsS0FMZSxDQUtULFVBTFMsQ0FBaEI7O0FBUUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFFBQUksa0JBQWtCLElBQUksV0FBSixFQUF0QjtBQUNBLG9CQUNLLEdBREwsQ0FDUyxFQUFFLHFDQUFGLENBRFQsRUFFSTtBQUNJLGFBQUssRUFBRSxTQUFTLEtBQVgsRUFBa0IsVUFBVSxXQUE1QjtBQURULEtBRkosRUFLSyxHQUxMLENBS1MsQ0FBQyxFQUFFLHVDQUFGLENBQUQsRUFBNkMsRUFBRSx5Q0FBRixDQUE3QyxDQUxULEVBTUk7QUFDSSxXQUFHO0FBRFAsS0FOSixFQVNLLEdBVEwsQ0FTUyxFQUFFLHVDQUFGLENBVFQsRUFVSTtBQUNJLGVBQU87QUFEWCxLQVZKLEVBYUssRUFiTCxDQWFRLEVBQUUscUNBQUYsQ0FiUixFQWFrRCxDQWJsRCxFQWNJO0FBQ0ksYUFBSyxFQUFFLFNBQVMsR0FBWCxFQUFnQixVQUFVLFNBQTFCLEVBRFQ7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FkSixFQWtCSyxFQWxCTCxDQWtCUSxFQUFFLDZDQUFGLENBbEJSLEVBa0IwRCxHQWxCMUQsRUFtQkk7QUFDSSxhQUFLLEVBQUUscUJBQXFCLENBQXZCLEVBRFQ7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FuQkosRUFzQk8sT0F0QlAsRUF1QkssRUF2QkwsQ0F1QlEsQ0FBQyxFQUFFLHVDQUFGLENBQUQsRUFBNkMsRUFBRSx5Q0FBRixDQUE3QyxDQXZCUixFQXVCb0csR0F2QnBHLEVBd0JJO0FBQ0ksV0FBRyxDQURQO0FBRUksY0FBTSxPQUFPO0FBRmpCLEtBeEJKLEVBMkJPLE9BM0JQLEVBNEJLLEVBNUJMLENBNEJRLEVBQUUsdUNBQUYsQ0E1QlIsRUE0Qm9ELEdBNUJwRCxFQTZCSTtBQUNJLGVBQU8sQ0FEWDtBQUVJLGNBQU0sT0FBTztBQUZqQixLQTdCSixFQWdDTyxPQWhDUDs7QUFrQ0EsUUFBSSxlQUFlLElBQUksWUFBWSxLQUFoQixDQUFzQjtBQUNyQyxrQkFBVSxDQUQyQjtBQUVyQyx3QkFBZ0IsMEJBRnFCO0FBR3JDLGlCQUFTO0FBSDRCLEtBQXRCLEVBS2xCLFFBTGtCLENBS1QsZUFMUyxFQU1sQixLQU5rQixDQU1aLFVBTlksQ0FBbkI7O0FBU0E7O0FBRUEsUUFBSSxpQkFBaUIsSUFBSSxXQUFKLEVBQXJCO0FBQ0EsbUJBQ0ssR0FETCxDQUNTLEVBQUUscUNBQUYsQ0FEVCxFQUVJO0FBQ0ksV0FBRztBQURQLEtBRkosRUFLSyxHQUxMLENBS1MsRUFBRSxnREFBRixDQUxULEVBTUk7QUFDSSxrQkFBVTtBQURkLEtBTkosRUFTSyxFQVRMLENBU1EsRUFBRSxxQ0FBRixDQVRSLEVBU2tELENBVGxELEVBVUk7QUFDSSxXQUFHLENBRFA7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FWSixFQWNLLEVBZEwsQ0FjUSxFQUFFLGdEQUFGLENBZFIsRUFjNkQsQ0FkN0QsRUFlSTtBQUNJLGtCQUFVLENBRGQ7QUFFSSxjQUFNLE9BQU87QUFGakIsS0FmSixFQWtCTyxLQWxCUDs7QUFvQkEsUUFBSSxjQUFjLElBQUksWUFBWSxLQUFoQixDQUFzQjtBQUNwQyxrQkFBVSxLQUQwQjtBQUVwQyx3QkFBZ0IsNkJBRm9CO0FBR3BDLGlCQUFTO0FBSDJCLEtBQXRCLEVBS2pCLFFBTGlCLENBS1IsY0FMUSxFQU1qQixLQU5pQixDQU1YLFVBTlcsQ0FBbEI7QUFTSDs7a0JBRWMsUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBpbXBvcnQgc3RhcnRFbmdpbmUgZnJvbSAnLi91dGlscy9lbmdpbmUuanMnXHJcbmltcG9ydCBhbmltYXRpb24gZnJvbSAnLi91dGlscy9hbmltYXRpb24uanMnXHJcblxyXG5cclxuXHJcblN0cmluZy5wcm90b3R5cGUucmVwbGFjZUFsbCA9IGZ1bmN0aW9uKHNlYXJjaCwgcmVwbGFjZW1lbnQpIHtcclxuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xyXG4gICAgcmV0dXJuIHRhcmdldC5yZXBsYWNlKG5ldyBSZWdFeHAoc2VhcmNoLCAnZycpLCByZXBsYWNlbWVudCk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZUNsYXNzQWNjb3JkTWVudShteUNsYXNzLG5ld0NsYXNzKVxyXG57XHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLicgKyBteUNsYXNzKS5jbGFzc0xpc3QubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRoaXNDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLicgKyBteUNsYXNzKS5jbGFzc0xpc3RbaV1cclxuXHJcbiAgICAgICAgaWYgKCB0aGlzQ2xhc3MgIT09IG15Q2xhc3MpXHJcbiAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLicgKyBteUNsYXNzKS5yZW1vdmVDbGFzcyh0aGlzQ2xhc3MpLmFkZENsYXNzKG5ld0NsYXNzKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGlzYWJsZVNsaWNrQXJyb3dzKClcclxue1xyXG4gICAgbGV0IHBsYXRlcyA9ICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlcyAucGxhdGUnKVxyXG4gICAgbGV0IGN1cnJTbGlkZVxyXG5cclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwbGF0ZXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBsYXRlcy5lcShpKS5oYXNDbGFzcygnc2xpY2stY3VycmVudCcpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3VyclNsaWRlID0gaVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY3VyclNsaWRlIDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtYXJyb3dzIC5zbGljay1wcmV2JykuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJylcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGN1cnJTbGlkZSA+PSAocGxhdGVzLmxlbmd0aCAtIDEpKVxyXG4gICAge1xyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWFycm93cyAuc2xpY2stbmV4dCcpLmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1hcnJvd3MgLnNsaWNrLXByZXYnKS5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKVxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWFycm93cyAuc2xpY2stbmV4dCcpLnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc2VwZXJhdGVMaW5lcyh0ZXh0Qm94KVxyXG57XHJcbiAgICBsZXQgJHRoaXNCb3ggPSAkKCcuYXRlbGllci1wYWdlIC4nICsgdGV4dEJveCksXHJcbiAgICAgICAgd29yZHMgPSAkdGhpc0JveC5odG1sKCkucmVwbGFjZUFsbCgnPGJyPicsJyA8YnI+ICcpLnNwbGl0KCcgJyksXHJcbiAgICAgICAgcmVzb2x0SHRtbCA9ICcnLFxyXG4gICAgICAgIHNhbWVMaW5lID0gW10sXHJcbiAgICAgICAgJHByZXZFbGVtID0gbnVsbFxyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB3b3Jkcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBpZiAod29yZHNbaV0gIT0gJzxicj4nIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlc29sdEh0bWwgKz0gJzxzcGFuPicgKyB3b3Jkc1tpXSArICc8L3NwYW4+ICdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gcmVzb2x0SHRtbCArPSAnPHNwYW4gY2xhc3M9XCJuZXctbGluZVwiPjwvc3Bhbj4nXHJcbiAgICAgICAgICAgIHJlc29sdEh0bWwgKz0gd29yZHNbaV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHRoaXNCb3guaHRtbChyZXNvbHRIdG1sKVxyXG5cclxuICAgIGxldCBmaW5kU3BhbiA9ICQoJy5hdGVsaWVyLXBhZ2UgLicgKyB0ZXh0Qm94KS5jaGlsZHJlbigpXHJcblxyXG4gICAgJHByZXZFbGVtID0gZmluZFNwYW4uZXEoMClcclxuXHJcbiAgICBmaW5kU3Bhbi5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoICQoZWxlbSkub2Zmc2V0KCkudG9wID09ICRwcmV2RWxlbS5vZmZzZXQoKS50b3ApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYW1lTGluZS5wdXNoKCAkKGVsZW0pIClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAuJyArIHRleHRCb3gpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxpbmVcIj48L2Rpdj4nKVxyXG5cclxuICAgICAgICAgICAgbGV0ICRsYXN0TGluZSA9ICQoJy5hdGVsaWVyLXBhZ2UgLicgKyB0ZXh0Qm94ICsgJyAubGluZScpLmxhc3QoKVxyXG5cclxuICAgICAgICAgICAgaWYgKHNhbWVMaW5lLmxlbmd0aCA9PSAxICYmIHNhbWVMaW5lWzBdWzBdLnRhZ05hbWUgPT0gJ0JSJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FtZUxpbmVbMF0uZGV0YWNoKCkuYXBwZW5kVG8oJCgnLmF0ZWxpZXItcGFnZSAuJyArIHRleHRCb3gpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzYW1lTGluZS5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2FtZUxpbmVbaV0uZGV0YWNoKCkuYXBwZW5kVG8oJGxhc3RMaW5lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzYW1lTGluZSA9IFsgJChlbGVtKSBdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICRwcmV2RWxlbSA9ICQoZWxlbSlcclxuICAgIH0pXHJcblxyXG4gICAgXHJcbiAgICB7XHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAuJyArIHRleHRCb3gpLmFwcGVuZCgnPGRpdiBjbGFzcz1cImxpbmVcIj48L3NwYW4+JylcclxuXHJcbiAgICAgICAgbGV0ICRsYXN0TGluZSA9ICQoJy5hdGVsaWVyLXBhZ2UgLicgKyB0ZXh0Qm94ICsgJyAubGluZScpLmxhc3QoKVxyXG5cclxuICAgICAgICBmb3IoIGxldCBpID0gMDsgaSA8IHNhbWVMaW5lLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHNhbWVMaW5lW2ldLmRldGFjaCgpLmFwcGVuZFRvKCRsYXN0TGluZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKClcclxue1xyXG4gICAgbGV0IGdhbGxlcnlTbGljayA9IGZhbHNlXHJcbiAgICBsZXQgcGxhdGVTbGlja0FuaW0gPSBmYWxzZVxyXG4gICAgbGV0IHdpbmRvd1dpZHRoID0gJCh3aW5kb3cpLndpZHRoKClcclxuICAgIGxldCBub0NsaWNrID0gZmFsc2VcclxuXHJcblxyXG4gICAgaWYod2luZG93V2lkdGggPiA2NDApXHJcbiAgICB7XHJcbiAgICAgICAgc2VwZXJhdGVMaW5lcygnaW1nLWJveGVzIC5zZWN0aW9uLWRlc2MnKVxyXG4gICAgICAgIHNlcGVyYXRlTGluZXMoJ2NoZWYtZ3JpZCAuc2VjdGlvbi1kZXNjJylcclxuICAgICAgICBzZXBlcmF0ZUxpbmVzKCdwbGFjZS1nYWxsZXJ5IC5zZWN0aW9uLWRlc2MnKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1zbGlkZXInKS5zbGljayh7XHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcclxuICAgICAgICBzcGVlZDogNjAwLFxyXG4gICAgICAgIC8vIGNzc0Vhc2U6ICdjdWJpYy1iZXppZXIoMC4xOSwgMC43NiwgMC4yNSwgMC45NiknLFxyXG4gICAgICAgIGNzc0Vhc2U6ICdlYXNlLW91dCcsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDMyMCxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogXCIxMHB4XCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWNvbnRlbnQnKS5zbGljayh7XHJcbiAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgIGNzc0Vhc2U6ICdjdWJpYy1iZXppZXIoMC4xOSwgMC43NiwgMC4yNSwgMC45NiknLFxyXG4gICAgICAgIHNwZWVkOiAxMDAwLFxyXG4gICAgfSlcclxuXHJcbiAgICBcclxuICAgICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLXNsaWRlcicpLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICBkaXNhYmxlU2xpY2tBcnJvd3MoKVxyXG4gICAgfSlcclxuXHJcbiAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1zbGlkZXInKS5vbignc3dpcGUnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwbGF0ZXMgPSAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZXMgLnBsYXRlJylcclxuICAgICAgICBsZXQgY3VyclNsaWRlXHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwbGF0ZXMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHBsYXRlcy5lcShpKS5oYXNDbGFzcygnc2xpY2stY3VycmVudCcpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJyU2xpZGUgPSBpXHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1jb250ZW50Jykuc2xpY2soJ3NsaWNrR29UbycsY3VyclNsaWRlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWFycm93cyAuc2xpY2stbmV4dCcsIGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBsYXRlU2xpY2tBbmltID09PSB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICBcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1zbGlkZXInKS5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGxhdGVTbGlja0FuaW0gPSB0cnVlXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtc2xpZGVyJykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGxhdGVTbGlja0FuaW0gPSBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtc2xpZGVyJykuc2xpY2soJ3NsaWNrTmV4dCcpXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtY29udGVudCcpLnNsaWNrKCdzbGlja05leHQnKVxyXG4gICAgICAgIH0sIDEwMClcclxuICAgICAgICBcclxuICAgIH0pXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWFycm93cyAuc2xpY2stcHJldicsIGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHBsYXRlU2xpY2tBbmltID09PSB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuXHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtc2xpZGVyJykub24oJ2JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBsYXRlU2xpY2tBbmltID0gdHJ1ZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLXNsaWRlcicpLm9uKCdhZnRlckNoYW5nZScsIGZ1bmN0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBsYXRlU2xpY2tBbmltID0gZmFsc2VcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1zbGlkZXInKS5zbGljaygnc2xpY2tQcmV2JylcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1jb250ZW50Jykuc2xpY2soJ3NsaWNrUHJldicpXHJcbiAgICAgICAgfSwgMTAwKVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxuICAgIFxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tIE1vZGFsIEdhbGxlcnkgc2xpZGVyXHJcblxyXG4gICAgLy8gJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LGVsZW0pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgJChlbGVtKS5maW5kKCcuYWNjb3JkLWNvbnRlbnQgLmdhbGxlcnktYXJlYScpLnNsaWNrKHtcclxuICAgIC8vICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgLy8gICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXHJcbiAgICAvLyAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgLy8gICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBhcHBlbmRBcnJvd3M6ICQoZWxlbSkuZmluZCgnLmFjY29yZC1jb250ZW50IC5nYWxsZXJ5LWFycm93cycpLFxyXG4gICAgLy8gICAgICAgICBjc3NFYXNlOiAnZWFzZS1vdXQnLFxyXG4gICAgLy8gICAgICAgICBzcGVlZDogNzAwXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0pXHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0gR2FsbGVyeSBzbGlkZXJcclxuXHJcbiAgICAkKCcuYXRlbGllci1wYWdlIC5nYWxsZXJ5LXNsaWRlcicpLnNsaWNrKHtcclxuICAgICAgICBpbmZpbml0ZTogZmFsc2UsXHJcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgIGFwcGVuZEFycm93czogJy5hdGVsaWVyLXBhZ2UgLnBsYWNlLWdhbGxlcnkgLmdhbGxlcnktYXJyb3dzJyxcclxuICAgICAgICBpbml0OiBnYWxsZXJ5U2xpY2sgPSB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5hdGVsaWVyLXBhZ2UgLmdhbGxlcnktc2xpZGVyJykub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZ2FsbEltZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXRlbGllci1wYWdlIC5wbGFjZS1nYWxsZXJ5IC5nYWxsZXJ5LWltZycpXHJcbiAgICAgICAgbGV0IHNsaWRlTnVtID0gMFxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZ2FsbEltZ3MubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoZ2FsbEltZ3NbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdzbGljay1hY3RpdmUnKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVOdW0gPSBpICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdGVsaWVyLXBhZ2UgLnBsYWNlLWdhbGxlcnkgLmdhbGxlcnktYXJyb3dzIC5jdXJyLW51bScpLmlubmVySFRNTCA9IHNsaWRlTnVtXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZ2FsbGVyeVNsaWNrID09PSB0cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBnYWxsSW1ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5LWltZycpXHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdGVsaWVyLXBhZ2UgLnBsYWNlLWdhbGxlcnkgLmdhbGxlcnktYXJyb3dzIC5hbGwtbnVtJykuaW5uZXJIVE1MID0gZ2FsbEltZ3MubGVuZ3RoXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tIFNjcm9sbCBldmVudHNcclxuXHJcblxyXG5cclxuICAgIGlmICh3aW5kb3dXaWR0aCA+IDY0MClcclxuICAgIHtcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCAuYWNjb3JkLWNvbnRlbnQgLnByZXAtbW9kIC5wYXJhZ3JhcGgnKS5uaWNlU2Nyb2xsKHtcclxuICAgICAgICAgICAgY3Vyc29yY29sb3I6IFwiYmxhY2tcIixcclxuICAgICAgICAgICAgY3Vyc29yd2lkdGg6IFwiNXB4XCIsXHJcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcnJhZGl1czogXCIwcHhcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0gQ2xpY2sgZXZlbnRzXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLmFjY29yZC1tZW51IC5hY2NvcmQtbWVudS1pdGVtJywgZnVuY3Rpb24oKVxyXG4gICAge1xyXG4gICAgICAgIGxldCB0aGlzTGluayA9ICQodGhpcykuYXR0cignZGF0YS1saW5rJylcclxuXHJcbiAgICAgICAgcmVwbGFjZUNsYXNzQWNjb3JkTWVudSgnYWNjb3JkLW1lbnUnLHRoaXNMaW5rKVxyXG5cclxuICAgICAgICByZXBsYWNlQ2xhc3NBY2NvcmRNZW51KCdhY2NvcmQtY29udGVudCcsdGhpc0xpbmspXHJcblxyXG4gICAgICAgIGlmICh0aGlzTGluayA9PT0gJ2dhbGxlcnknKVxyXG4gICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbC5vcGVuIC5hY2NvcmQtY29udGVudCAuZ2FsbGVyeS1hcmVhJykuc2xpY2soJ3NldFBvc2l0aW9uJylcclxuXHJcbiAgICAgICAgZWxzZSBpZiAodGhpc0xpbmsgPT09ICdwcmVwJylcclxuICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwub3BlbiAuYWNjb3JkLWNvbnRlbnQgLnByZXAtbW9kIC5wYXJhZ3JhcGgnKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKClcclxuXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmF0ZWxpZXItcGFnZSAubW9kYWwgLmJhY2snLCBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnbm8tc2Nyb2xsJylcclxuXHJcbiAgICBcclxuICAgICAgICBpZiAoJCgnLmF0ZWxpZXItcGFnZScpLmhhc0NsYXNzKCdtb2RhbC1yZWNpcGUnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlJykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4gbW9kYWwtcmVjaXBlJylcclxuICAgICAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICAgICB9LCAxNTAwKVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBtb2RhbFRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgICAgIG1vZGFsVGltZWxpbmVcclxuICAgICAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5tb2RhbC5vcGVuJyksIC41LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNzczoge1wic2NhbGVcIiA6IFwiMS4zXCIsIFwib3BhY2l0eVwiIDogXCIwXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5wbGF0ZS1pbmZvIC5wbGF0ZS1zdHJva2Utc3ZnJyksIC4wNSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjc3M6IHtcInNjYWxlXCIgOiBcIjFcIiwgXCJvcGFjaXR5XCIgOiBcIjBcIiB9LFxyXG4gICAgICAgICAgICAgICAgfSwgXCItPS4yXCIpXHJcbiAgICAgICAgICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtaW5mbyAucGxhdGUtc3Ryb2tlLXN2ZycpLCAuMyxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgICAgICB9LCBcIi09LjFcIilcclxuICAgICAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5wbGF0ZXMnKSwgLjMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzOiB7XCJzY2FsZVwiIDogXCIxXCIsIFwib3BhY2l0eVwiIDogXCIxXCIgfSxcclxuICAgICAgICAgICAgICAgIH0sIFwiLT0uMVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgkKCcuYXRlbGllci1wYWdlJykuaGFzQ2xhc3MoJ21vZGFsLWNoZWYnKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlJykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4gbW9kYWwtY2hlZicpXHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCcpLnJlbW92ZUNsYXNzKCdvcGVuJylcclxuICAgICAgICAgICAgfSwgNjAwKVxyXG5cclxuICAgICAgICAgICAgbGV0IG1vZGFsVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICAgICAgbW9kYWxUaW1lbGluZVxyXG4gICAgICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4nKSwgLjUsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3NzOiB7XCJzY2FsZVwiIDogXCIxLjNcIiwgXCJvcGFjaXR5XCIgOiBcIjBcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmF0ZWxpZXItcGFnZSAucGxhdGUtaW5mbycsIGZ1bmN0aW9uICgpXHJcbiAgICB7XHJcbiAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAucGxhdGVzIC5wbGF0ZS5zbGljay1jZW50ZXInKS50cmlnZ2VyKCdjbGljaycpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hleScpXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmF0ZWxpZXItcGFnZSAucGxhdGVzIC5wbGF0ZS5zbGljay1jZW50ZXInLCBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG5cclxuICAgICAgICBsZXQgdGhpc01vZGFsID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1vZGFsJykgfHwgJydcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1yZWNpcGUtJyArIHRoaXNNb2RhbCkuYWRkQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UnKS5hZGRDbGFzcygnbW9kYWwtb3BlbiBtb2RhbC1yZWNpcGUnKVxyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbm8tc2Nyb2xsJylcclxuXHJcbiAgICAgICAgaWYoICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4nKS5hdHRyKCdkYXRhLXNsaWRlcicpICE9ICdyZWFkeScpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbC5vcGVuIC5hY2NvcmQtY29udGVudCAuZ2FsbGVyeS1hcmVhJykuc2xpY2soe1xyXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwub3BlbiAuYWNjb3JkLWNvbnRlbnQgLmdhbGxlcnktYXJyb3dzJyksXHJcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnZWFzZS1vdXQnLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDcwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1yZWNpcGUtJyArIHRoaXNNb2RhbCkuYXR0cignZGF0YS1zbGlkZXInLCdyZWFkeScpXHJcbiAgICBcclxuICAgICAgICBsZXQgbW9kYWxUaW1lbGluZSA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgICAgIG1vZGFsVGltZWxpbmVcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLnBsYXRlLWluZm8gLnBsYXRlLXN0cm9rZS1zdmcnKSwgLjA1LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjc3M6IHtcInNjYWxlXCIgOiBcIjNcIiwgXCJvcGFjaXR5XCIgOiBcIjBcIiB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc2V0KFtcclxuICAgICAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLm1vZGFsLXRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1jaGVmLScgKyB0aGlzTW9kYWwgKyAnIC5yZWNpcGUtbW9kYWwnKSxcclxuICAgICAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLnJpZ2h0LWNvbCcpXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IC0zMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAucGxhdGUtaW5mbyAucGxhdGUtc3Ryb2tlLXN2ZycpLCAuMyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9LCBcIi09LjA1XCIpXHJcbiAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5wbGF0ZXMnKSwgLjMsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNzczoge1wic2NhbGVcIiA6IFwiMS4wNVwiLCBcIm9wYWNpdHlcIiA6IFwiMFwiIH0sXHJcbiAgICAgICAgICAgIH0sIFwiLT0uMDVcIilcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLXJlY2lwZS0nICsgdGhpc01vZGFsKSwgLjMsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNzczoge1wic2NhbGVcIiA6IFwiMVwiLCBcIm9wYWNpdHlcIiA6IFwiMVwiIH0sXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09LjJcIilcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLXJlY2lwZS0nICsgdGhpc01vZGFsICsgJyAubW9kYWwtdGl0bGUnKSwgMSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XHJcbiAgICAgICAgICAgIH0sIFwiLT0wLjJcIilcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLXJlY2lwZS0nICsgdGhpc01vZGFsICsgJyAucmVjaXBlLW1vZGFsJyksIDEsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09MC45NVwiKVxyXG4gICAgICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwjbW9kYWwtcmVjaXBlLScgKyB0aGlzTW9kYWwgKyAnIC5yaWdodC1jb2wnKSwgMSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XHJcbiAgICAgICAgICAgIH0sIFwiLT0wLjlcIilcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLXJlY2lwZS0nICsgdGhpc01vZGFsICsgJyAuYmFjayAucGxhdGUtYXJyb3ctcHJldicpLCAuMyxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeDogLTUsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09MC45XCIpXHJcbiAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1yZWNpcGUtJyArIHRoaXNNb2RhbCArICcgLmJhY2sgLnBsYXRlLWFycm93LXByZXYnKSwgLjMsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09MC40XCIpXHJcbiAgICAgICAgICAgIC5mcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLXJlY2lwZS0nICsgdGhpc01vZGFsICsgJyAuY29sLmdvbGQnKSwgMS41LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjc3M6IHtcImJhY2tncm91bmQtcG9zaXRpb25cIiA6IFwiLTEyMHB4IDEwMHB4XCJ9LFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIzLmVhc2VPdXRcclxuICAgICAgICAgICAgfSwgXCItPTFcIilcclxuXHJcbiAgICAgICAgLy8gUmVzaXplIHNjcm9sbGJhclxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93V2lkdGggPiA2NDApXHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbC5vcGVuIC5hY2NvcmQtY29udGVudCAucHJlcC1tb2QgLnBhcmFncmFwaCcpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLmFjY29yZC1jb250ZW50IC5nYWxsZXJ5LWFyZWEnKS5zbGljaygnc2V0UG9zaXRpb24nKTtcclxuICAgICAgICB9LCA2MDApXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmF0ZWxpZXItcGFnZSAuY2hlZi1ncmlkIC5ncmlkLWl0ZW0nLCBmdW5jdGlvbiAoKVxyXG4gICAge1xyXG4gICAgICAgIGlmIChub0NsaWNrID09PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9DbGljayA9IHRydWVcclxuXHJcbiAgICAgICAgaWYgKCAkKHRoaXMpLmhhc0NsYXNzKCdxdW90ZScpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRoaXNNb2RhbCA9ICQodGhpcykuYXR0cignZGF0YS1tb2RhbCcpIHx8ICcnXHJcblxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCkuYWRkQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UnKS5hZGRDbGFzcygnbW9kYWwtb3BlbiBtb2RhbC1jaGVmJylcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ25vLXNjcm9sbCcpXHJcblxyXG4gICAgICAgIGlmKCAkKCcuYXRlbGllci1wYWdlIC5tb2RhbC5vcGVuJykuYXR0cignZGF0YS1zbGlkZXInKSAhPSAncmVhZHknKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwub3BlbiAuYWNjb3JkLWNvbnRlbnQgLmdhbGxlcnktYXJlYScpLnNsaWNrKHtcclxuICAgICAgICAgICAgICAgIGluZmluaXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxyXG4gICAgICAgICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhcHBlbmRBcnJvd3M6ICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsLm9wZW4gLmFjY29yZC1jb250ZW50IC5nYWxsZXJ5LWFycm93cycpLFxyXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2Utb3V0JyxcclxuICAgICAgICAgICAgICAgIHNwZWVkOiA3MDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCkuYXR0cignZGF0YS1zbGlkZXInLCdyZWFkeScpXHJcblxyXG4gICAgICAgIGxldCBtb2RhbFRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgbW9kYWxUaW1lbGluZVxyXG4gICAgICAgICAgICAuc2V0KFtcclxuICAgICAgICAgICAgICAgICQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLm1vZGFsLXRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1jaGVmLScgKyB0aGlzTW9kYWwgKyAnIC5yaWdodC1jb2wnKVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAtMzBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCksIC4zLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjc3M6IHtcInNjYWxlXCIgOiBcIjFcIiwgXCJvcGFjaXR5XCIgOiBcIjFcIiB9LFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICAgICAgfSwgXCItPS4yXCIpXHJcbiAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1jaGVmLScgKyB0aGlzTW9kYWwgKyAnIC5tb2RhbC10aXRsZScpLCAxLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICAgICAgfSwgXCItPTAuMlwiKVxyXG4gICAgICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwjbW9kYWwtY2hlZi0nICsgdGhpc01vZGFsICsgJyAucmlnaHQtY29sJyksIDEsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09MC45XCIpXHJcbiAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1jaGVmLScgKyB0aGlzTW9kYWwgKyAnIC5iYWNrIC5wbGF0ZS1hcnJvdy1wcmV2JyksIC4zLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4OiAtNSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlT3V0XHJcbiAgICAgICAgICAgIH0sIFwiLT0wLjlcIilcclxuICAgICAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLmJhY2sgLnBsYXRlLWFycm93LXByZXYnKSwgLjMsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICBlYXNlOiBQb3dlcjEuZWFzZU91dFxyXG4gICAgICAgICAgICB9LCBcIi09MC40XCIpXHJcbiAgICAgICAgICAgIC5mcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLmNvbC5nb2xkJyksIDEuNSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3NzOiB7XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcIi0xMjBweCAxMDBweFwifSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcbiAgICAgICAgICAgIH0sIFwiLT0xXCIpXHJcbiAgICAgICAgICAgIC5mcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLm1vZGFsI21vZGFsLWNoZWYtJyArIHRoaXNNb2RhbCArICcgLmNvbC5nb2xkJyksIDEuNSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3NzOiB7XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcIi0xMjBweCAxMDBweFwifSxcclxuICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMy5lYXNlT3V0XHJcbiAgICAgICAgICAgIH0sIFwiLT0xXCIpXHJcblxyXG4gICAgICAgIC8vIFJlc2l6ZSBzY3JvbGxiYXJcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvd1dpZHRoID4gNjQwKVxyXG4gICAgICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAubW9kYWwjbW9kYWwtY2hlZi0nICsgdGhpc01vZGFsICsgJyAuYWNjb3JkLWNvbnRlbnQgLnByZXAtbW9kIC5wYXJhZ3JhcGgnKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuYXRlbGllci1wYWdlIC5tb2RhbCNtb2RhbC1jaGVmLScgKyB0aGlzTW9kYWwgKyAnIC5hY2NvcmQtY29udGVudCAuZ2FsbGVyeS1hcmVhJykuc2xpY2soJ3NldFBvc2l0aW9uJyk7XHJcbiAgICAgICAgfSwgNjAwKVxyXG5cclxuICAgICAgICBub0NsaWNrID0gZmFsc2VcclxuICAgIH0pXHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYXRlbGllci1wYWdlIC5pbWctYm94ZXMgLmJveC00JywgZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICAkKCcuYXRlbGllci1wYWdlIC52aWRlby1vdmVybGF5JykuYWRkQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbm8tc2Nyb2xsJylcclxuXHJcbiAgICAgICAgbGV0IG1vZGFsVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgICAgICBtb2RhbFRpbWVsaW5lXHJcbiAgICAgICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC52aWRlby1vdmVybGF5JyksIC4zLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjc3M6IHtcInNjYWxlXCIgOiBcIjFcIiwgXCJvcGFjaXR5XCIgOiBcIjFcIiB9LFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICAgICAgfSwgXCItPS4yXCIpXHJcbiAgICB9KVxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuYXRlbGllci1wYWdlIC52aWRlby1vdmVybGF5IC5jbG9zZS1vdmVybGF5JywgZnVuY3Rpb24gKClcclxuICAgIHtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ25vLXNjcm9sbCcpXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJCgnLmF0ZWxpZXItcGFnZSAudmlkZW8tb3ZlcmxheScpLnJlbW92ZUNsYXNzKCdvcGVuJylcclxuICAgICAgICB9LCA2MDApXHJcblxyXG4gICAgICAgIGxldCBtb2RhbFRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICAgICAgbW9kYWxUaW1lbGluZVxyXG4gICAgICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAudmlkZW8tb3ZlcmxheScpLCAuNSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3NzOiB7XCJzY2FsZVwiIDogXCIxLjNcIiwgXCJvcGFjaXR5XCIgOiBcIjBcIiB9LFxyXG4gICAgICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgLy8gLS0tLSBSdW4gaW1wb3J0ZWQgYW5pbWF0aW9uIGZ1bmN0aW9uXHJcbiAgICBpZiAod2luZG93V2lkdGggPiA2NDApXHJcbiAgICAgICAgYW5pbWF0aW9uKClcclxuXHJcbn0pO1xyXG5cclxuXHJcbiQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24gKClcclxue1xyXG4gICAgJCgnLmF0ZWxpZXItcGFnZSAuZ2FsbGVyeS1zbGlkZXInKS5zbGljaygnc2V0UG9zaXRpb24nKTsgICAgXHJcbn0pIiwiZnVuY3Rpb24gYW5pbWF0aW9uKClcclxue1xyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dCb3hTaGFkb3coKVxyXG4gICAge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQgLmJveC5ib3gtMycpLmNsYXNzTGlzdC5hZGQoJ3NoYWRvdycpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0gRmlyc3QgYm94ZXNcclxuXHJcbiAgICBsZXQgYm94VGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIGJveFRpbWVsaW5lXHJcbiAgICAgICAgLnNldChbJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94LTEnKSwgJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94LTInKSwgJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94LTMnKV0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjc3M6IHtcImxlZnRcIjpcIi01MHB4XCIsIFwicmlnaHRcIjpcIjBcIn1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZXQoJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94IC5tYXNrJyksXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4OiBcIjAlXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zZXQoJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94LTQnKSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudG8oWyQoJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQgLmJveC0xJyksICQoJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQgLmJveC0yJyksICQoJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQgLmJveC0zJyldLCAxLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3NzOiB7XCJsZWZ0XCI6XCIwXCIsIFwicmlnaHRcIjpcIjBcIn0sXHJcbiAgICAgICAgICAgIGVhc2U6IEN1c3RvbUVhc2UuY3JlYXRlKFwiY3VzdG9tXCIsIFwiTTAsMCBDMC43NTcsMCAwLjQ5LDAuNDc4IDAuNzE4LDAuODU4IDAuNzkzLDAuOTgzIDAuOTA5LDAuOTY4IDEsMVwiKVxyXG4gICAgICAgIH0sIDAuMylcclxuICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCAuYm94IC5tYXNrJyksIDEsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4OiBcIjEwMCVcIixcclxuICAgICAgICAgICAgZWFzZTogQ3VzdG9tRWFzZS5jcmVhdGUoXCJjdXN0b21cIiwgXCJNMCwwIEMwLjc1NywwIDAuNDksMC40NzggMC43MTgsMC44NTggMC43OTMsMC45ODMgMC45MDksMC45NjggMSwxXCIpLFxyXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBzaG93Qm94U2hhZG93XHJcbiAgICAgICAgfSwgMC4zKVxyXG4gICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5ib3hlcy1ncmlkIC5ib3gtNCcpLCAuNSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNjYWxlOiAxLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dCxcclxuICAgICAgICB9LCAuOClcclxuXHJcbiAgICAvLyAtLS0tLSBTY3JvbGwgVmlkZW8gUGxheSBidXR0b25cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYWRkSW5kaWNhdG9yczogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgXHJcbiAgICAvLyAtLS0tLSBTaWRlLXRpdGxlIC0gU2VjdGlvbiBEZXNjIFRpbWVsaW5lIDFcclxuXHJcbiAgICBsZXQgc2lkZVRpdGxlVGltZWxpbmUxID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBzaWRlVGl0bGVUaW1lbGluZTFcclxuICAgICAgICAuZnJvbSgkKCcuYXRlbGllci1wYWdlIC5pbWctYm94ZXMgLnNpZGUtdGl0bGUnKSwgMC44LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogNTAsXHJcbiAgICAgICAgICAgIGF1dG9BbHBoYTogMCxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9LCAwLjgpXHJcbiAgICAgICAgLnN0YWdnZXJGcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLmltZy1ib3hlcyAuc2VjdGlvbi1kZXNjJykuZmluZCgnLmxpbmUnKSwgMC44LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogNTAsXHJcbiAgICAgICAgICAgIGF1dG9BbHBoYTogMCxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9LCAwLjEsIDEpXHJcbiAgICAgICAgXHJcbiAgICBsZXQgc2lkZVRpdGxlU2NlbmUxID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgcmV2ZXJzZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICAuc2V0VHdlZW4oc2lkZVRpdGxlVGltZWxpbmUxKVxyXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpXHJcblxyXG5cclxuICAgICAvLyAtLS0tLSBTaWRlLXRpdGxlIC0gU2VjdGlvbiBEZXNjIFRpbWVsaW5lIDJcclxuXHJcbiAgICBsZXQgc2lkZVRpdGxlVGltZWxpbmUyID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBzaWRlVGl0bGVUaW1lbGluZTJcclxuICAgICAgICAuZnJvbSgkKCcuYXRlbGllci1wYWdlIC5jaGVmLWdyaWQgLnNpZGUtdGl0bGUnKSwgMC44LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogNTAsXHJcbiAgICAgICAgICAgIGF1dG9BbHBoYTogMCxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9LCAwLjIpXHJcbiAgICAgICAgLnN0YWdnZXJGcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLmNoZWYtZ3JpZCAuc2VjdGlvbi1kZXNjJykuZmluZCgnLmxpbmUnKSwgMC44LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogNTAsXHJcbiAgICAgICAgICAgIGF1dG9BbHBoYTogMCxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9LCAwLjEsIDAuMilcclxuXHJcbiAgICBsZXQgc2lkZVRpdGxlU2NlbmUyID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6ICcuYXRlbGllci1wYWdlIC5jaGVmLWdyaWQnLFxyXG4gICAgICAgIHJldmVyc2U6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgLnNldFR3ZWVuKHNpZGVUaXRsZVRpbWVsaW5lMilcclxuICAgIC5hZGRUbyhjb250cm9sbGVyKVxyXG5cclxuICAgIFxyXG4gICAgLy8gLS0tLS0gU2lkZS10aXRsZSAtIFNlY3Rpb24gRGVzYyBUaW1lbGluZSAzXHJcblxyXG4gICAgbGV0IHNpZGVUaXRsZVRpbWVsaW5lMyA9IG5ldyBUaW1lbGluZU1heCgpO1xyXG4gICAgc2lkZVRpdGxlVGltZWxpbmUzXHJcbiAgICAgICAgLmZyb20oJCgnLmF0ZWxpZXItcGFnZSAucGxhY2UtZ2FsbGVyeSAuc2lkZS10aXRsZScpLCAwLjgsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4OiA1MCxcclxuICAgICAgICAgICAgYXV0b0FscGhhOiAwLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxyXG4gICAgICAgIH0sIDAuMilcclxuICAgICAgICAuc3RhZ2dlckZyb20oJCgnLmF0ZWxpZXItcGFnZSAucGxhY2UtZ2FsbGVyeSAuc2VjdGlvbi1kZXNjJykuZmluZCgnLmxpbmUnKSwgMC44LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeDogNTAsXHJcbiAgICAgICAgICAgIGF1dG9BbHBoYTogMCxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9LCAwLjEsIDAuMilcclxuXHJcbiAgICBsZXQgc2lkZVRpdGxlU2NlbmUzID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6ICcuYXRlbGllci1wYWdlIC5wbGFjZS1nYWxsZXJ5JyxcclxuICAgICAgICByZXZlcnNlOiBmYWxzZVxyXG4gICAgfSlcclxuICAgIC5zZXRUd2VlbihzaWRlVGl0bGVUaW1lbGluZTMpXHJcbiAgICAuYWRkVG8oY29udHJvbGxlcilcclxuICAgIFxyXG5cclxuICAgIC8vIC0tLS0tIENhcHN1bGUgVGltZWxpbmVcclxuXHJcbiAgICBsZXQgY2Fwc3VsZVRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBjYXBzdWxlVGltZWxpbmVcclxuICAgICAgICAuZnJvbSgkKCcuYXRlbGllci1wYWdlIC5jYXBzdWxlJyksIDEsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0b3A6IC0yNTAsXHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAtMTcsXHJcbiAgICAgICAgICAgIGVhc2U6IFBvd2VyMC5lYXNlTm9uZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgbGV0IGNhcHN1bGVTY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICAgICAgZHVyYXRpb246ICczMCUnLFxyXG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiAnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCcsXHJcbiAgICAgICAgdHJpZ2dlckhvb2s6ICdvbkxlYXZlJ1xyXG4gICAgfSlcclxuICAgIC5zZXRUd2VlbihjYXBzdWxlVGltZWxpbmUpXHJcbiAgICAuYWRkVG8oY29udHJvbGxlcilcclxuICAgIFxyXG5cclxuICAgIC8vIC0tLS0tIEJveDMgVGltZWxpbmVcclxuXHJcbiAgICBsZXQgYm94MVRpbWVsaW5lID0gbmV3IFRpbWVsaW5lTWF4KCk7XHJcbiAgICBib3gxVGltZWxpbmVcclxuICAgICAgICAuZnJvbSgkKCcuYXRlbGllci1wYWdlIC5ib3gtMScpLCAyLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeTogLTUwLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjAuZWFzZU5vbmVcclxuICAgICAgICB9KVxyXG5cclxuICAgIGxldCBib3gxU2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiAnNTAlJyxcclxuICAgICAgICB0cmlnZ2VyRWxlbWVudDogJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQnXHJcbiAgICB9KVxyXG4gICAgLnNldFR3ZWVuKGJveDFUaW1lbGluZSlcclxuICAgIC5hZGRUbyhjb250cm9sbGVyKVxyXG4gICAgXHJcbiAgICBcclxuICAgIGxldCBib3gyVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIGJveDJUaW1lbGluZVxyXG4gICAgICAgIC5mcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLmJveC0yJyksIDIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiAtMjAwLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjAuZWFzZU5vbmVcclxuICAgICAgICB9KVxyXG5cclxuICAgIGxldCBib3gyU2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoe1xyXG4gICAgICAgIGR1cmF0aW9uOiAnODAlJyxcclxuICAgICAgICB0cmlnZ2VyRWxlbWVudDogJy5hdGVsaWVyLXBhZ2UgLmJveGVzLWdyaWQnXHJcbiAgICB9KVxyXG4gICAgLnNldFR3ZWVuKGJveDJUaW1lbGluZSlcclxuICAgIC5hZGRUbyhjb250cm9sbGVyKVxyXG4gICAgXHJcbiAgICBcclxuICAgIGxldCBib3g0VGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIGJveDRUaW1lbGluZVxyXG4gICAgICAgIC5mcm9tKCQoJy5hdGVsaWVyLXBhZ2UgLmJveC00JyksIDIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiAxMDAsXHJcbiAgICAgICAgICAgIGVhc2U6IFBvd2VyMC5lYXNlTm9uZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgbGV0IGJveDRTY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICAgICAgZHVyYXRpb246ICc2MCUnLFxyXG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiAnLmF0ZWxpZXItcGFnZSAuYm94ZXMtZ3JpZCdcclxuICAgIH0pXHJcbiAgICAuc2V0VHdlZW4oYm94NFRpbWVsaW5lKVxyXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpXHJcbiAgICBcclxuXHJcbiAgICAvLyAtLS0tLSBncmlkSXRlbXMgVGltZWxpbmVcclxuXHJcbiAgICAvLyBsZXQgZ3JpZEl0ZW1zVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIC8vIGdyaWRJdGVtc1RpbWVsaW5lXHJcbiAgICAvLyAgICAgLmZyb20oJCgnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcycpLCAwLjUsXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICB5OiAtODAsXHJcbiAgICAvLyAgICAgICAgIGVhc2U6IFBvd2VyMC5lYXNlTm9uZVxyXG4gICAgLy8gICAgIH0pXHJcblxyXG4gICAgLy8gbGV0IGdyaWRJdGVtc1NjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKHtcclxuICAgIC8vICAgICBkdXJhdGlvbjogJzYwJScsXHJcbiAgICAvLyAgICAgb2Zmc2V0OiAtMjAwLFxyXG4gICAgLy8gICAgIHRyaWdnZXJFbGVtZW50OiAnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcydcclxuICAgIC8vIH0pXHJcbiAgICAvLyAuc2V0VHdlZW4oZ3JpZEl0ZW1zVGltZWxpbmUpXHJcbiAgICAvLyAuYWRkVG8oY29udHJvbGxlcilcclxuICAgICAgICBcclxuXHJcbiAgICAvLyAtLS0tLSBDaGVmIEltYWdlcyBUaW1lbGluZVxyXG5cclxuICAgIGxldCBjaGVmSW1nVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIGNoZWZJbWdUaW1lbGluZVxyXG4gICAgICAgIC5zZXQoJCgnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcyAuY2hlZi1pbWcnKSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNzczogeyBcInNjYWxlXCI6IFwiMC44XCIgLFwiZmlsdGVyXCI6IFwiYmx1cigycHgpXCIgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNldChbJCgnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcyAucXVvdGUtdGV4dCcpLCAkKCcuYXRlbGllci1wYWdlIC5ncmlkLWl0ZW1zIC5xdW90ZS1zb3VyY2UnKV0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiA1MFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnNldCgkKCcuYXRlbGllci1wYWdlIC5ncmlkLWl0ZW1zIC5xdW90ZS1saW5lJyksXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzY2FsZTogMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLmdyaWQtaXRlbXMgLmNoZWYtaW1nJyksIDEsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjc3M6IHsgXCJzY2FsZVwiOiBcIjFcIiAsXCJmaWx0ZXJcIjogXCJibHVyKDApXCIgfSxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50bygkKCcuYXRlbGllci1wYWdlIC5ncmlkLWl0ZW1zIC5jaGVmLXN0cm9rZS1yZWN0JyksIDEuMixcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNzczogeyBcInN0cm9rZS1kYXNob2Zmc2V0XCI6IDAgfSxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXI0LmVhc2VJbk91dFxyXG4gICAgICAgIH0sIFwiLT0wLjdcIilcclxuICAgICAgICAudG8oWyQoJy5hdGVsaWVyLXBhZ2UgLmdyaWQtaXRlbXMgLnF1b3RlLXRleHQnKSwgJCgnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcyAucXVvdGUtc291cmNlJyldLCAxLjIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjQuZWFzZU91dFxyXG4gICAgICAgIH0sIFwiLT0xLjJcIilcclxuICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAuZ3JpZC1pdGVtcyAucXVvdGUtbGluZScpLCAxLjIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzY2FsZTogMSxcclxuICAgICAgICAgICAgZWFzZTogUG93ZXI0LmVhc2VPdXRcclxuICAgICAgICB9LCBcIi09MS4yXCIpXHJcblxyXG4gICAgbGV0IGNoZWZJbWdTY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6ICcuYXRlbGllci1wYWdlIC5jaGVmLWdyaWQnLFxyXG4gICAgICAgIHJldmVyc2U6IGZhbHNlXHJcbiAgICB9KVxyXG4gICAgLnNldFR3ZWVuKGNoZWZJbWdUaW1lbGluZSlcclxuICAgIC5hZGRUbyhjb250cm9sbGVyKVxyXG5cclxuXHJcbiAgICAvLyAtLS0tLSBQbGF0ZXMgVGltZWxpbmVcclxuXHJcbiAgICBsZXQgcGxhdGVzVGltZWxpbmUgPSBuZXcgVGltZWxpbmVNYXgoKTtcclxuICAgIHBsYXRlc1RpbWVsaW5lXHJcbiAgICAgICAgLnNldCgkKCcuYXRlbGllci1wYWdlIC5yZWNpcGVzLWFyZWEgLnBsYXRlcycpLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgeTogMTIwXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc2V0KCQoJy5hdGVsaWVyLXBhZ2UgLnJlY2lwZXMtYXJlYSAucGxhdGVzIC5wbGF0ZS1pbWcnKSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uOiAzMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvKCQoJy5hdGVsaWVyLXBhZ2UgLnJlY2lwZXMtYXJlYSAucGxhdGVzJyksIDEsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICBlYXNlOiBQb3dlcjQuZWFzZUluT3V0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudG8oJCgnLmF0ZWxpZXItcGFnZSAucmVjaXBlcy1hcmVhIC5wbGF0ZXMgLnBsYXRlLWltZycpLCAxLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcm90YXRpb246IDAsXHJcbiAgICAgICAgICAgIGVhc2U6IFBvd2VyNC5lYXNlSW5PdXRcclxuICAgICAgICB9LCBcIi09MVwiKVxyXG5cclxuICAgIGxldCBwbGF0ZXNTY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZSh7XHJcbiAgICAgICAgZHVyYXRpb246ICc2MCUnLFxyXG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiAnLmF0ZWxpZXItcGFnZSAucmVjaXBlcy1hcmVhJyxcclxuICAgICAgICByZXZlcnNlOiB0cnVlXHJcbiAgICB9KVxyXG4gICAgLnNldFR3ZWVuKHBsYXRlc1RpbWVsaW5lKVxyXG4gICAgLmFkZFRvKGNvbnRyb2xsZXIpXHJcblxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0aW9uIl19
