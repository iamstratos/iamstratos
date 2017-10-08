//-------------- global vars

var pageId = 0,
    prevPageId,
    maxId = 0,
    userReturn = false,
    menuReady = false,
    fontSize = 16,
    // mainBoxWidth = 638,
    mainBoxWidth = (638 / fontSize) + 'rem',
    // sidebarBoxWidth = 690,
    sidebarBoxWidth = (690 / fontSize) + 'rem',
    isAnswered = null,
    lastSubmitClickTime = (new Date()).getTime(),
    optionsData = [null, null, null, null, null, null, null]; // 7 nulls for 7 questions

//--------------

function changeQuizMenuPosition() {
    var wHeight = $(window).height(),
        maxHeight = 1020;

    if (wHeight < maxHeight) {
        $('body').addClass('left-menu');
    } else {
        $('body').removeClass('left-menu');
    }
}

function isValid(day, month, year) {
    if (day < 10)
        day = '0' + day;
    if (month < 10)
        month = '0' + month;
    //return (typeof day !== "undefined" && day != "");
    var dateFormat = 'YYYY-MM-DD';
    return moment(moment(year + '-' + month + '-' + day).format(dateFormat), dateFormat, true).isValid();
}

function LoadResults(index) {
    $.ajax({
        url: '/ajax.aspx?m=Isobar.Loreal.SkinExpert.Modules.Results&view=~/Views/SkinexpertRevamp/Results.cshtml&la=1',
        success: function (data) {
            $(data).insertAfter($('.sidebar-box'));
            $('.bg-video').hide();
            prevPageId = pageId;
            if (index) {
                pageId = index;
            } else {
                pageId++;
            }
            animateOutro();
        }
    });
}

function LabelAnimation($this) {
    var val = $this.val() || '';
    val = val.trim();
    if (val.length > 0)
        $this.addClass('has-value');
    else
        $this.removeClass('has-value');
    $this.removeClass('focused');
}

function setupInputs() {
    $('body')
        .on('focus', 'input', function (e) {
            $(this).addClass('focused');
        })
        .on('blur', 'input', function (e) {
            LabelAnimation($(this));
        });
}

function openSidebar() {
    if ($('.page-intro').is(":visible")) {
        $('.sidebar-box').addClass('side-open side-intro-open');
    } else if ($('.page-return').is(":visible")) {
        $('.sidebar-box').addClass('side-open side-return-open');
    }


}

function closeSidebar() {
    if ($('.page-intro').is(":visible")) {
        $('.sidebar-box').removeClass('side-open side-intro-open');
    } else if ($('.page-return').is(":visible")) {
        $('.sidebar-box').removeClass('side-open side-return-open');
    }
}

function setMenuIntro() {

    if (menuReady === false) {
        $('.open-menu').addClass('close');

        menuReady = true;
    } else {
        // $('.open-menu').removeClass('intro intro-mobile');
    }

}

function seperateLines(element) {
    $('.page').find(element).each(function () {
        var elemArr = $(this).html().split('<span class="spacing"></span>');
        $(this).html('');

        for (var i = 0; i < elemArr.length; i++) {
            $(this).append('<div class="sep-line">' + elemArr[i] + '</div>')
        }
    });

}

function animateIntro() {
    var tlIntro = new TimelineLite({
            onComplete: function () {
                $('.closed')
                    .css('opacity', '')
                    .css('transform', '');

                $('.transition').removeClass('transition');

                $('.page-' + pageId).getNiceScroll().resize();

                $('.nicescroll-cursors').removeClass('hide');
            }
        }),

        $mainBox = $('.main-box'),
        $mainBoxBg = $('.main-box-bg')
        $sidebarBox = $('.sidebar-box'),
        $sidebarClosed = $('.sidebar-box .closed'),
        $sidebarBoxBg = $('.sidebar-box-bg'),
        $animParent = $('.page-' + pageId).find('.anim-parent'),
        $animSolo = $('.page-' + pageId).find('.anim-solo'),

        // page specific
        $bigTitle = $('.page-' + pageId).find('.big-title'),
        $descText = $('.page-' + pageId).find('.desc-text'),
        $circleBtn = $('.page-' + pageId).find('.circle-btn'),
        $circleBtnText = $('.page-' + pageId).find('.circle-btn .btn-text'),
        $circleBtnArrow = $('.page-' + pageId).find('.circle-btn .stroke-arrow-shape'),
        $circleBtnShape = $('.page-' + pageId).find('.circle-btn .circle-shape svg'),
        $searchBlog = $('.page-' + pageId).find('.search-blog'),
        $searchBlogInput = $('.page-' + pageId).find('.search-blog-input'),
        $latestPosts = $('.page-' + pageId).find('.latest-posts'),
        $latestPostsTitle = $('.page-' + pageId).find('.latest-posts .latest-title'),
        $latestPostsPost = $('.page-' + pageId).find('.latest-posts .post'),
        $quizBigIcon = $('.page-' + pageId).find('.quiz-big-icon'),
        $quizListAnswers = $('.page-' + pageId).find('.quiz-list-answers'),
        $quizMenu = $('.quiz-menu');

    if (pageId === 0) {

        if ($('html').hasClass('mobile') || $('html').hasClass('tablet')) {

            // ----- MOBILE PAGE INTRO ANIMATION
            tlIntro.add(TweenMax.set($mainBoxBg, {
                    width: 0
                }))
                .add(TweenMax.to($mainBoxBg, 1.3, {
                    width: mainBoxWidth,
                    ease: Power3.easeOut
                }), 1)
                .add(TweenMax.set($mainBox, {
                    width: mainBoxWidth
                }))
                .add(TweenMax.set($sidebarBoxBg, {
                    autoAlpha: 0,
                    width: '0%'
                }))
                .add(TweenMax.to($sidebarBoxBg, 1.3, {
                    autoAlpha: 1,
                    width: '100%',
                    ease: Power3.easeInOut
                }), 1)
                .add(TweenMax.set($sidebarClosed, {
                    autoAlpha: 0,
                    x: -200
                }))
                .add(TweenMax.to($sidebarClosed, 1, {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power3.easeOut
                }), 1.6);

            if ($bigTitle.length > 0) {
                tlIntro.add(TweenMax.set($bigTitle, {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.to($bigTitle, 1, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }), 1.5);
            }

            if ($descText.length > 0) {
                tlIntro.add(TweenMax.set($descText, {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.to($descText, 1, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }), 2);
            }

            if ($circleBtn.length > 0) {
                tlIntro.add(TweenMax.to($circleBtnText, .8, {
                        css: {
                            "line-height": "25px"
                        },
                        ease: Power3.easeOut
                    }), 2)
                    .add(TweenMax.to($circleBtnArrow, .8, {
                        css: {
                            "stroke-dashoffset": "0"
                        },
                        ease: Power3.easeOut
                    }), 2)
                    .add(TweenMax.set($circleBtnShape, {
                        autoAlpha: 0,
                        scale: 0
                    }))
                    .add(TweenMax.to($circleBtnShape, .4, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Back.easeOut.config(1.2)
                    }), 2);
            }
        } else {

            // ----- DESKTOP - PAGE INTRO ANIMATION

            tlIntro.add(TweenMax.set($('.main-header .logo'), {
                    autoAlpha: 0,
                    y: 50
                }))
                .add(TweenMax.to($('.main-header .logo'), 1, {
                    autoAlpha: 1,
                    y: 0,
                    ease: Power3.easeOut
                }), 2);

            tlIntro.add(TweenMax.set($mainBoxBg, {
                    width: 0
                }))
                .add(TweenMax.to($mainBoxBg, 1.3, {
                    width: mainBoxWidth,
                    ease: Power3.easeOut
                }), 3.3)
                .add(TweenMax.set($mainBox, {
                    width: mainBoxWidth
                }))
                .add(TweenMax.set($sidebarBoxBg, {
                    autoAplha: 0,
                    width: '0%'
                }))
                .add(TweenMax.to($sidebarBoxBg, 1.3, {
                    autoAplha: 1,
                    width: '100%',
                    ease: Power3.easeInOut
                }), 3.3)
                .add(TweenMax.set($sidebarClosed, {
                    autoAlpha: 0,
                    x: -200
                }))
                .add(TweenMax.to($sidebarClosed, 1, {
                    autoAlpha: 1,
                    x: 0,
                    ease: Power3.easeOut
                }), 3.8);

            if ($bigTitle.length > 0) {
                tlIntro.add(TweenMax.set($bigTitle.children(), {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.staggerTo($bigTitle.children(), .8, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }, .1), 3.5);
            }

            if ($descText.length > 0) {
                tlIntro.add(TweenMax.set($descText.children(), {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.staggerTo($descText.children(), .8, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }, .1), 3.5);
            }

            if ($circleBtn.length > 0) {
                tlIntro.add(TweenMax.to($circleBtnText, .8, {
                        css: {
                            "line-height": "25px"
                        },
                        ease: Power3.easeOut
                    }), 3.8)
                    .add(TweenMax.to($circleBtnArrow, .8, {
                        css: {
                            "stroke-dashoffset": "0"
                        },
                        ease: Power3.easeOut
                    }), 3.4)
                    .add(TweenMax.set($circleBtnShape, {
                        autoAlpha: 0,
                        scale: 0
                    }))
                    .add(TweenMax.to($circleBtnShape, .4, {
                        autoAlpha: 1,
                        scale: 1,
                        ease: Back.easeOut.config(1.2)
                    }), 3.4);

            }

            if ($latestPosts.length > 0) {
                tlIntro.add(TweenMax.set([$searchBlogInput, $latestPostsTitle, $latestPostsPost.children()], {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.staggerTo([$searchBlogInput, $latestPostsTitle, $latestPostsPost.children()], .8, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }, .1), '3');
            }
        }

    } else {
        
        //-------------- ALL OTHER PAGES (NO INTRO)

        tlIntro.add(TweenMax.to($mainBoxBg, 1.3, {
                width: mainBoxWidth,
                ease: Power3.easeOut
            }), '0')
            .add(TweenMax.to($mainBox, 1.3, {
                width: mainBoxWidth,
                ease: Power3.easeOut
            }), '0');

        if ($bigTitle.length > 0) {
            tlIntro.add(TweenMax.set($bigTitle.children(), {
                    autoAlpha: 0,
                    top: 50
                }))
                .add(TweenMax.staggerTo($bigTitle.children(), .8, {
                    autoAlpha: 1,
                    top: 0,
                    ease: Power3.easeOut
                }, .1), 0);
        }

        if ($animSolo.length > 0) {
            tlIntro.add(TweenMax.set($animSolo, {
                    autoAlpha: 0,
                    top: 50
                }))
                .add(TweenMax.staggerTo($animSolo, .8, {
                    autoAlpha: 1,
                    top: 0,
                    ease: Power3.easeOut
                }, .1), 0);
        }

        if ($circleBtn.length > 0) {
            tlIntro.add(TweenMax.to($circleBtnText, .8, {
                    css: {
                        "line-height": "25px"
                    },
                    ease: Power3.easeOut
                }), 0)
                .add(TweenMax.to($circleBtnArrow, .8, {
                    autoAlpha: 1,
                    css: {
                        "stroke-dashoffset": "0"
                    },
                    ease: Power3.easeOut
                }), 0)
                .add(TweenMax.set($circleBtnShape, {
                    autoAlpha: 0,
                    scale: 0
                }))
                .add(TweenMax.to($circleBtnShape, .4, {
                    autoAlpha: 1,
                    scale: 1,
                    ease: Back.easeOut.config(1.2)
                }), 0);
        }

        if ($('.quiz-grid-box').length > 0) {
            tlIntro.add(TweenMax.set([$('.quiz-grid-box .front'), $('.quiz-grid-box .back')], {
                autoAlpha: 0,
                top: 50
            }))
            .add(TweenMax.staggerTo([$('.quiz-grid-box .front'), $('.quiz-grid-box .back')], .8, {
                autoAlpha: 1,
                top: 0,
                ease: Power3.easeOut
            }, .1), 0);
        }

        if ($('html').hasClass('mobile')) {
            if ($bigTitle.length > 0) {
                tlIntro.add(TweenMax.set($bigTitle, {
                        autoAlpha: 0,
                        top: 50
                    }))
                    .add(TweenMax.to($bigTitle, .8, {
                        autoAlpha: 1,
                        top: 0,
                        ease: Power3.easeOut
                    }), 0);
            }
        }
    }

    if ($animParent.length > 0) {
        tlIntro.add(TweenMax.set($animParent.children(), {
                autoAlpha: 0,
                top: 50
            }))
            .add(TweenMax.staggerTo($animParent.children(), .8, {
                autoAlpha: 1,
                top: 0,
                ease: Power3.easeOut
            }, .1), 0);
    }

    if ($quizBigIcon.length > 0) {
        tlIntro.add(TweenMax.set($quizBigIcon, {
            autoAlpha: 1,
            top: 0
        }));

        var svgID = $quizBigIcon.find('svg').attr('id') || '',
            svgDuration = $quizBigIcon.attr('data-dur') || 250,
            svgDelay = $quizBigIcon.attr('data-delay') || 0;

        if (svgID) {
            new Vivus(svgID, {
                type: 'delayed',
                duration: svgDuration,
                delay: svgDelay,
                animTimingFunction: Vivus.EASE_IN_OUT
            });
        }
    }
}


function animateOutro(prevNum) {
    var tlOutro = new TimelineLite({

            onStart: function () {
                $('body').addClass('transition');

                $('.nicescroll-cursors').addClass('hide');
            },

            onComplete: function () {
                setPage();
            }
        }),

        $mainBox = $('.main-box'),
        $mainBoxBg = $('.main-box-bg')
        $sidebarBox = $('.sidebar-box'),
        $sidebarClosed = $('.sidebar-box .closed'),
        $sidebarBoxBg = $('.sidebar-box-bg'),
        $animParent = $('.page-' + prevPageId).find('.anim-parent'),
        $animSolo = $('.page-' + prevPageId).find('.anim-solo'),

        // page specific
        $bigTitle = $('.page-' + prevPageId).find('.big-title'),
        $descText = $('.page-' + prevPageId).find('.desc-text'),
        $circleBtn = $('.page-' + prevPageId).find('.circle-btn'),
        $circleBtnText = $('.page-' + prevPageId).find('.circle-btn .btn-text'),
        $circleBtnArrow = $('.page-' + prevPageId).find('.circle-btn .stroke-arrow-shape'),
        $circleBtnShape = $('.page-' + prevPageId).find('.circle-btn .circle-shape svg'),
        $searchBlog = $('.page-' + prevPageId).find('.search-blog'),
        $searchBlogInput = $('.page-' + prevPageId).find('.search-blog-input'),
        $latestPosts = $('.page-' + prevPageId).find('.latest-posts'),
        $latestPostsTitle = $('.page-' + prevPageId).find('.latest-posts .latest-title'),
        $latestPostsPost = $('.page-' + prevPageId).find('.latest-posts .post'),
        $quizBigIcon = $('.page-' + prevPageId).find('.quiz-big-icon'),
        $quizListAnswers = $('.page-' + prevPageId).find('.quiz-list-answers');

    if ($('html').hasClass('mobile') || $('html').hasClass('tablet')) {
        if ($bigTitle.length > 0) {
            tlOutro.add(TweenMax.set($bigTitle, {
                    autoAlpha: 1,
                    top: 0
                }))
                .add(TweenMax.to($bigTitle, .45, {
                    autoAlpha: 0,
                    top: -50,
                    ease: Power3.easeOut
                }), 0);
        }

        if ($descText.length > 0) {
            tlOutro.add(TweenMax.set($descText, {
                    autoAlpha: 1,
                    top: 0
                }))
                .add(TweenMax.to($descText, .45, {
                    autoAlpha: 0,
                    top: -50,
                    ease: Power3.easeOut
                }), 0);
        }
    } else {
        if ($bigTitle.length > 0) {
            tlOutro.add(TweenMax.set($bigTitle.children(), {
                    autoAlpha: 1,
                    top: 0
                }))
                .add(TweenMax.staggerTo($bigTitle.children(), .45, {
                    autoAlpha: 0,
                    top: -50,
                    ease: Power3.easeOut
                }, .1), 0);
        }

        if ($descText.length > 0) {
            tlOutro.add(TweenMax.set($descText.children(), {
                    autoAlpha: 1,
                    top: 0
                }))
                .add(TweenMax.staggerTo($descText.children(), .8, {
                    autoAlpha: 0,
                    top: -50,
                    ease: Power3.easeOut
                }, .1), 0);
        }
    }

    if ($('.quiz-grid-box').length > 0) {
        tlOutro.add(TweenMax.set([$('.quiz-grid-box .front'), $('.quiz-grid-box .back')], {
            autoAlpha: 1,
            top: 0
        }))
        .add(TweenMax.staggerTo([$('.quiz-grid-box .front'), $('.quiz-grid-box .back')], .8, {
            autoAlpha: 0,
            top: -50,
            ease: Power3.easeOut
        }, .1), 0);
    }

    if ($animParent.length > 0) {
        tlOutro.add(TweenMax.set($animParent.children(), {
                autoAlpha: 1,
                top: 0
            }))
            .add(TweenMax.staggerTo($animParent.children(), .25, {
                autoAlpha: 0,
                top: -50,
                ease: Power3.easeOut
            }, .1), 0);
    }

    if ($animSolo.length > 0) {
        tlOutro.add(TweenMax.set($animSolo, {
                autoAlpha: 1,
                top: 0
            }))
            .add(TweenMax.staggerTo($animSolo, .45, {
                autoAlpha: 0,
                top: -50,
                ease: Power3.easeOut
            }, .1), 0);
    }

    if ($latestPosts.length > 0) {
        tlOutro.add(TweenMax.set([$searchBlogInput, $latestPostsTitle, $latestPostsPost.children()], {
                autoAlpha: 1,
                top: 0
            }))
            .add(TweenMax.staggerTo([$searchBlogInput, $latestPostsTitle, $latestPostsPost.children()], .45, {
                autoAlpha: 0,
                top: -50,
                ease: Power3.easeOut
            }, .1), 0);
    }

    if ($quizBigIcon.length > 0) {
        tlOutro.add(TweenMax.set($quizBigIcon, {
                autoAlpha: 1,
                top: 0
            }))
            .add(TweenMax.staggerTo($quizBigIcon, .45, {
                autoAlpha: 0,
                top: -50,
                ease: Power3.easeOut
            }, .1), '-.2');
    }

    if ($circleBtn.length > 0) {
        if (typeof $circleBtn !== 'underfined') {
            tlOutro.add(TweenMax.to($circleBtnText, .5, {
                    css: {
                        "line-height": "105px"
                    },
                    ease: Power3.easeOut
                }), .25)
                .add(TweenMax.to($circleBtnArrow, .2, {
                    autoAlpha: 0,
                    ease: Power3.easeOut
                }), .3)
                .add(TweenMax.set($circleBtnShape, {
                    autoAlpha: 1,
                    scale: 1
                }))
                .add(TweenMax.to($circleBtnShape, .2, {
                    autoAlpha: 0,
                    scale: 0,
                    ease: Power3.easeOut
                }), .4);
        }
    }
}

function setMaxId() {
    if (pageId > maxId) {
        maxId = pageId;
    }
}

function ShowSliderItem(option) {

    var value = $('.quiz-inner-circle .text-' + option);

    $('.page-' + pageId + ' .next-page')
        .attr('data-option', value.attr('data-answerid'))
        .attr('data-answer', $('.page-' + pageId).find('.quiz-inner-circle .text-' + option).text());

    $('.page-' + pageId + ' .next-page-mobile')
        .attr('data-option', value.attr('data-answerid'))
        .attr('data-answer', $('.page-' + pageId).find('.quiz-inner-circle .text-' + option).text());

    $('.quiz-inner-circle').removeClass().addClass('quiz-inner-circle show-' + option);
}


function setSliderText(sliderValue) {
    var singleValue = (734 / 4);
    var sliderIndex = 1;

    if (sliderValue <= (734 - (singleValue * 3))) {
        sliderIndex = 1;
    } else if (sliderValue <= (734 - (singleValue * 2))) {
        sliderIndex = 2;
    } else if (sliderValue <= (734 - singleValue)) {
        sliderIndex = 3;
    } else if (sliderValue <= 734) {
        sliderIndex = 4;
    }

    ShowSliderItem(sliderIndex);
}

function setQuizBigIconClass(that) {
    var thatIndex = $('.page-' + pageId).find('.quiz-list-answers li.active').index();

    if ($('.page-' + pageId + ' .quiz-big-icon').hasClass('answer-' + (thatIndex + 1))) {
        return;
    }

    $('.page-' + pageId + ' .quiz-big-icon').removeClass().addClass('quiz-big-icon');
    $('.page-' + pageId + ' .quiz-big-icon').addClass('answer-' + (thatIndex + 1));

    if (pageId === 2) {
        var svgDuration = $('.page-' + pageId).find('.quiz-big-icon').attr('data-dur') || 80,
            svgDelay = $('.page-' + pageId).find('.quiz-big-icon').attr('data-delay') || 0;

        if ($('#q_b_i_' + (thatIndex + 1)).length > 0) {
            new Vivus('q_b_i_' + (thatIndex + 1), {
                type: 'delayed',
                duration: svgDuration,
                delay: svgDelay,
                animTimingFunction: Vivus.EASE_IN_OUT
            });
            vivusPlayed = true;
        }
    }
}

function initSlider() {
    $('.quiz-plugin').roundSlider({
        startAngle: 90,
        endAngle: "+360",
        radius: 143,
        width: 50,
        sliderType: "min-range",
        value: 164,
        editableTooltip: false,
        showTooltip: false,
        max: 734,
        create: function (e) {
            setSliderText(e.value);
        },
        drag: function (e) {
            $('.quiz-cover svg circle').css('stroke-dashoffset', -e.value + "px");
            setSliderText(e.value);
        }
    });
}

function addQuizMenuIcons(answerNum) {
    if (answerNum) {
        setTimeout(function () {
            $('.quiz-menu li').eq(prevPageId - 1).removeClass();
            $('.quiz-menu li').eq(prevPageId - 1).addClass('done done-' + prevPageId + ' done-' + prevPageId + '-' + answerNum);
        }, 700);
    } else {
        setTimeout(function () {
            $('.quiz-menu li').eq(prevPageId - 1).removeClass();
            $('.quiz-menu li').eq(prevPageId - 1).addClass('done done-' + prevPageId + ' done-' + prevPageId);
        }, 700);
    }
    
    // setQuizMenuDot()
}

function setQuizMenuDot() {
    $('.quiz-menu li').siblings().removeClass('active');

    if (pageId < 1 || pageId > 7) {
        $('.quiz-menu .active-dot').addClass('hide');
    } else {
        $('.quiz-menu li').eq((pageId - 1)).addClass('active');

        if ($('body').hasClass('left-menu')) {
            $('.quiz-menu .active-dot').css('top', ($('.quiz-menu li.active').position().top + 10));
            $('.quiz-menu .active-dot').css('left', '');
        } else {
            $('.quiz-menu .active-dot').css('top', '');
            $('.quiz-menu .active-dot').css('left', ($('.quiz-menu li.active').position().left));
        }

        $('.quiz-menu .active-dot').removeClass('hide');
    }
}

function onKeyUpGotoNext(e) {
    var target = e.srcElement || e.target;
    if (e.keyCode == 13) {
        $('.quiz-birthday').submit();
        return;
    }

    if (!target.attributes["maxlength"])
        return;

    var maxLength = parseInt(target.attributes["maxlength"].value, 20);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
}

function validateAnswered() {
    if (optionsData[(optionsData.length - 1)]) {
        if (optionsData[(optionsData.length - 1)].state == "Answered") {
            isAnswered = true;
        }
    }

}

function setOption(that, qIndex, qOption) {
    var thisAnswerText = null,
        thisIndex = null;

    // ------ GET Answer Text
    if (that.attr('data-day') && that.attr('data-month') && that.attr('data-year')) {
        var birthdayText = that.attr('data-day') + '/' + that.attr('data-month') + '/' + that.attr('data-year');

        thisAnswerText = birthdayText;
    } else if (that.hasClass('answer-text')) {
        thisAnswerText = that.text();
    } else if (that.attr('data-answer')) {
        thisAnswerText = that.attr('data-answer');
    } else {
        thisAnswerText = that.find('.answer-text').text();
    }

    // ------ GET Answer Index
    if (that.attr('data-day') && that.attr('data-month') && that.attr('data-year')) {
        var birthdayArr = [
            parseInt(that.attr('data-day')),
            parseInt(that.attr('data-month')),
            parseInt(that.attr('data-year'))
        ];

        thisIndex = birthdayArr;
    } else if (that.attr('data-option')) {
        thisIndex = parseInt(that.attr('data-option'));
    }

    TriggerAnswerEvent(thisIndex);
    // ------ SET optionsData
    if (optionsData[(pageId - 1)] === null) {
        optionsData[(pageId - 1)] = {
            question: pageId,
            option: thisIndex,
            text: thisAnswerText,
            state: "Answered"
        };
    } else {
        optionsData[(pageId - 1)].option = thisIndex;
        optionsData[(pageId - 1)].text = thisAnswerText;
    }
}

function setOptionMobile(that, qIndex, qOption) {
    var thisAnswerText = null,
        thisIndex = null;

    if (that.hasClass('answer-text')) {
        thisAnswerText = that.text();
    } else if (that.attr('data-answer')) {
        thisAnswerText = that.attr('data-answer');
    } else {
        thisAnswerText = that.find('.answer-text').text();
    }


    if (that.attr('data-option')) {
        thisIndex = that.attr('data-option');
    } else {
        thisIndex = (that.index() + 1);
    }

    TriggerAnswerEvent(thisIndex);
    if (optionsData[(pageId - 1)] === null) {
        optionsData[(pageId - 1)] = {
            question: pageId,
            option: thisIndex,
            text: thisAnswerText,
            state: "Answered"
        };
    } else {
        optionsData[(pageId - 1)].option = thisIndex;
        optionsData[(pageId - 1)].text = thisAnswerText;
    }
}

function getAllAnswers() {
    for (var i = 0; i < optionsData.length; i++) {
        if (optionsData[i] != null) {
            $('.review-list li').eq(i).find('.pick-again').text(optionsData[i].text);
        }
    }
}

function findResultsPtext() {
    var resultsText = $('.results-paragraph').text().length;

    if (resultsText > 270) {
        $('.results-paragraph').addClass('fade');
    }
}

function setPage() {
    $('.page').hide();
    $('.main-box').show();

    if (pageId === 0) {

        $('.page-0').show();

        $('.quiz-menu').hide();
        $('body').removeClass('quiz-pages');
        $('.sidebar-box').show();
    } else if (pageId > 0) {
        $('.cookies-wrapper').slideUp(600);
        $('body').addClass('quiz-pages');

        if (pageId === 1) {
            setTimeout(function () {
                setQuizMenuDot()
            }, 800)
        }

        if (pageId === 4) {
            
            $('.page .quiz-slider .quiz-cover, .full .rs-bar').addClass('start-anim');

            setTimeout(function () {
                $('.page .quiz-slider .quiz-cover, .full .rs-bar').removeClass('start-anim');
            }, 1800);

            setTimeout(function () {
                $('.page .quiz-slider .quiz-cover').addClass('no-anim');
            }, 2400);
        }

        if (pageId === 8) {
            getAllAnswers();
        }
        
        if (pageId === 9) {
            $('.main-box').hide();
            setTimeout(function () {
                initResultsSlick();
            }, 1000);
            findResultsPtext();
        }

        $('.page-' + pageId).show();
        $('.quiz-menu').show();
        $('.sidebar-box').hide();

        mainBoxWidth = (690 / fontSize) + 'rem';
    }

    if ($('html').hasClass('desktop')) {
        if ($('.bg-video-' + prevPageId).length > 0) {

            $('.bg-video-' + prevPageId).fadeOut(2000).get(0).pause();
        }
        if ($('.bg-video-' + pageId).length > 0) {
            $('.bg-video-' + pageId).fadeIn(1000).get(0).play();
        }
    }

    animateIntro();

    setMaxId();

    if ($('.page').length > 0 && !$('html').hasClass('mobile')) {
        $('.page').niceScroll({
            cursorcolor: "#e6e6e6",
            railalign: 'left',
            rtlmode: true
        });
    }

    if ($('.page-review').is(':visible')) {
        $('body').addClass('review-page');
    } else {
        $('body').removeClass('review-page');
    }

    if ($('.page-results').is(':visible')) {
        $('body').addClass('results-page');
    } else {
        $('body').removeClass('results-page');
    }

}

function initResultsSlick() {
    $('.prod-grid-item .slider-items').slick({
        infinite: false,
        dots: true,
        cssEase: 'ease-in-out'
    });
}

function DateFormSubmit(thisIndex, $this) {

    if ($this)
        setOption($this);

    $('.bth-error').remove();
    // ----- Validate Birthday Missing
    if (isValid($('.birth-day').val(), $('.birth-month').val(), $('.birth-year').val())) {
        GaEvent('question-07-pote_exis_genethlia', 'sumbit-success');
        pageId++;
        animateOutro();
        addQuizMenuIcons(thisIndex + 1);
    } else {
        GaEvent('question-07-pote_exis_genethlia', 'submit-fail');
        var spanHtml = '<span class="field-validation-error bth-error">Η ημερομηνία δεν είναι σωστή.</span>';
        $('.quiz-birthday').append(spanHtml);
    }
}

function LoadPopup(id, cb) {
    $.ajax({
        url: '/ajax.aspx?m=Isobar.Loreal.SkinExpert.Modules.Product&view=~/Views/SkinexpertRevamp/Modal.cshtml&la=1&id=' + id,
        type: 'POST',
        success: function (data) {
            $(data).insertBefore($('.main-menu'));
            if (cb)
                cb();
        }
    });
}

function GetAnswerEvent(id) {
    var eventData = {};
    $.each(analytics, function (i, v) {
        if (v.Id == id)
            eventData = v;
    });

    return eventData;
}

function TriggerAnswerEvent(id) {
    // var data = GetAnswerEvent(id);
    // GaEvent(data.Category, data.Event);
}

function GaEvent(category, action) {
    ga('send', 'event', category, action);
}


$(document).ready( function() {
    $('body').addClass('transition');

    if ($('html').hasClass('mobile') === false) {
        seperateLines('.big-title');
        seperateLines('.desc-text');
    }

    initSlider();

    setupInputs();

    changeQuizMenuPosition();

    setMenuIntro();

    //-------------- Mouse events

    $('body').on('mouseenter', '.sidebar-box', function () {
        openSidebar();
    });

    $('body').on('mouseleave', '.sidebar-box', function () {
        closeSidebar();
    });

    $('body').on('mouseover click', '.page .quiz-list-answers.desktop-only li', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        setQuizBigIconClass();
    });

    $('body').on('click', '.page .quiz-list-answers.mobile-only li', function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $('body').on('change', '.quiz-birthday .birth-day', function () {
        $('.page-' + pageId + ' .next-page').attr('data-day', $(this).val());
        $('.page-' + pageId + ' .next-page-mobile').attr('data-day', $(this).val());
    });

    $('body').on('change', '.quiz-birthday .birth-month', function () {
        $('.page-' + pageId + ' .next-page').attr('data-month', $(this).val());
        $('.page-' + pageId + ' .next-page-mobile').attr('data-month', $(this).val());
    });

    $('body').on('change', '.quiz-birthday .birth-year', function () {
        $('.page-' + pageId + ' .next-page').attr('data-year', $(this).val());
        $('.page-' + pageId + ' .next-page-mobile').attr('data-year', $(this).val());
    });

    $('body').on('keyup', '.quiz-birthday input', onKeyUpGotoNext);

    $('body').on('submit', '.quiz-birthday', function (e) {
        e.preventDefault();
        setOption($(this));
        DateFormSubmit($(this).parents('.page').index(), $(this).parents('.page').find('.next-page'));
    });

    $('body').on('dbclick', '.next-page', function (e) {
        $(this).trigger('click', e);
    });

    $('body').on('click', '.next-page', function () {
        var thisIndex = $(this).index(),
            currentClickTime = (new Date()).getTime(),
            timeDiff = (currentClickTime - lastSubmitClickTime);

        lastSubmitClickTime = currentClickTime;

        var MIN_CLICK_GAP = 1000;

        if (timeDiff < MIN_CLICK_GAP) {
            return false;
        }

        validateAnswered();

        if (pageId == 0)
            GaEvent('pame', 'click');

        if (pageId != 0) {
            setOption($(this));

            if (optionsData[(pageId - 1)] != null) {
                prevPageId = pageId;

                if (($('.page-' + pageId).find('form.quiz-birthday').length > 0)) {
                    DateFormSubmit(thisIndex);
                } else if (isAnswered === true) {
                    pageId = 8;
                    animateOutro();
                } else {
                    if ($(this).attr('data-delay')) {
                        
                        $('body').addClass('transition');

                        setTimeout(function () {
                            pageId++;
                            setQuizMenuDot();
                            animateOutro();
                            addQuizMenuIcons(thisIndex + 1);
                        }, $(this).attr('data-delay'));
                    } else {
                        pageId++;
                        setQuizMenuDot();
                        animateOutro();
                        addQuizMenuIcons(thisIndex + 1);
                    }
                }

            }
        } else {
            prevPageId = pageId;
            pageId++;
            setQuizMenuDot();
            animateOutro();
        }

        isAnswered = false;
    });

    $('body').on('click', '.quiz-grid-box', function () {
        $(this).siblings().removeClass('flipped');
        $(this).addClass('flipped');
    });

    $('body').on('click', '.quiz-menu li', function () {
        var thisIndex = $(this).index();

        if (maxId <= (thisIndex - 1)) {
            return;
        }

        prevPageId = pageId;
        pageId = thisIndex;
        setQuizMenuDot();
        animateOutro();
    });

    $('body').on('click', '.prod-plus-img', function () {
        var $this = $(this);
        LoadPopup($(this).data('id'), function () {
            $('body').addClass('modal-open');
            TweenMax.to($('.modal-prod'), .6, { height: '100%', ease: CustomEase.create("custom", "M0,0 C0.362,0.184 0.106,0.868 0.482,0.938 0.74,0.986 0.752,0.986 1,1") });
            $this.removeClass('close').addClass('open');

            if ($('.modal-accordion li.video').length > 0) {
                $('.modal-accordion li').siblings().removeClass('active');
                $('.modal-accordion li.video').addClass('active');
            }
        });
    });

    $('body').on('click', '.modal-accordion li', function () {
        $('.modal-accordion li.active .content').slideUp();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $('.modal-accordion li.active .content').slideDown();
    });

    $('body').on('click', '.modal-close', function () {
        $('body').removeClass('modal-open');
        TweenMax.to($('.modal-prod'), .6, {
            height: '0%',
            ease: CustomEase.create("custom", "M0,0 C0.894,0.028 0.396,1 1,1")
        });
    });

    $('body').on('click', '.open-menu.open', function () {
        $('body').removeClass('modal-open');

        TweenMax.to([$('.main-menu .content'), $('.main-menu .social-info')], .6, {
            autoAlpha: 0,
            ease: Power1.linear
        });
        TweenMax.to($('.main-menu'), .6, {
            height: '0%',
            ease: CustomEase.create("custom", "M0,0 C0.894,0.028 0.396,1 1,1")
        });

        $(this).removeClass('open').addClass('close');
    });

    $('body').on('click', '.open-menu.close', function () {

        $('body').addClass('modal-open');

        TweenMax.set($('.main-menu .content'), {
            autoAlpha: 0
        });
        TweenMax.to($('.main-menu .content'), .6, {
            autoAlpha: 1,
            ease: Power1.linear
        });
        TweenMax.set($('.main-menu .social-info'), {
            autoAlpha: 0
        });
        TweenMax.to($('.main-menu .social-info'), 0.2, {
            autoAlpha: 1,
            ease: Power1.linear,
            delay: 0.2
        });
        TweenMax.to($('.main-menu'), .6, {
            height: '100%',
            ease: CustomEase.create("custom", "M0,0 C0.362,0.184 0.106,0.868 0.482,0.938 0.74,0.986 0.752,0.986 1,1")
        });
        $(this).removeClass('close').addClass('open');
    });

    $('body').on('click', '.load-results', function () {
        var postedData = [];

        $.each(optionsData, function (i, v) {
            if (!isNaN(v.option)) {
                postedData.push(v);
            }
        });

        $('#QuizData').val(JSON.stringify(postedData));
        $('#Date').val($('.review-list li').last().find('.pick-again').text());
        $('.your-info').ajaxSubmit({
            success: function (data) {
                if ($(data).is('form')) {
                    GaEvent('submit_personal_info', 'sumbit-fail');
                    $('.your-info').replaceWith(data);
                    $('.your-info input').each(function () {
                        LabelAnimation($(this));
                    });
                } else {
                    GaEvent('submit_personal_info', 'sumbit-success');
                    $('.page.page-review').html(data);
                }
            }
        });
    });

    $('body').on('click', '.pick-again', function () {
        closestIndex = $(this).closest('li').index();

        prevPageId = pageId;
        pageId = (closestIndex + 1);
        animateOutro();
    });

    $('body').on('click', '.results-paragraph', function () {
        $('.page-' + pageId).find('.results-paragraph').removeClass('fade');
    });

    $('body').on('click', '.go-to-results', function () {

        LoadResults(9);
    });

    $('body').on('click', '.set-option', function () {
        // setOptionMobile($(this));
        setOption($(this));

        if ($('.page-2').is(':visible')) {
            var thatIndex = $('.page-' + pageId).find('.quiz-list-answers.mobile-only li.active').index();

            $('.page-' + pageId + ' .quiz-big-icon').removeClass().addClass('quiz-big-icon');
            $('.page-' + pageId + ' .quiz-big-icon').addClass('answer-' + (thatIndex + 1));

            var svgDuration = $('.page-' + pageId).find('.quiz-big-icon').attr('data-dur') || 60,
                svgDelay = $('.page-' + pageId).find('.quiz-big-icon').attr('data-delay') || 0;

            if ($('#q_b_i_' + (thatIndex + 1)).length > 0) {
                new Vivus('q_b_i_' + (thatIndex + 1), {
                    type: 'delayed',
                    duration: svgDuration,
                    delay: svgDelay,
                    animTimingFunction: Vivus.EASE_IN_OUT
                });
                vivusPlayed = true;
            }
        }
    });

    $('body').on('click', '.next-page-mobile', function () {
        validateAnswered();

        if (pageId != 0) {
            // setOption($(this));

            if ($('.page-' + pageId + ' .quiz-slider').length > 0 || $('.page-' + pageId).find('form.quiz-birthday').length > 0) {
                setOption($(this));
            }

            if (optionsData[(pageId - 1)] != null) {
                prevPageId = pageId;

                if ($('.page-' + pageId).find('form.quiz-birthday').length > 0) {
                    setOption($(this));
                    // ----- Validate Birthday Missing
                    pageId++;
                    animateOutro();
                } else if (isAnswered === true) {
                    pageId = 8;
                    animateOutro();
                    console.log('1');
                } else {
                    if ($(this).attr('data-delay')) {
                        setTimeout(function () {
                            pageId++;
                            animateOutro();
                        }, $(this).attr('data-delay'));
                    } else {
                        pageId++;
                        animateOutro();
                    }
                }
            }
        } else {
            prevPageId = pageId;
            pageId++;
            animateOutro();
        }

        isAnswered = false;
    });

    $('body').on('keyup', '.search-blog-input', function () {
        var search = $(this).val();
        if (search.lenth <= 2)
            return;

        $.ajax({
            url: '/ajax.aspx?m=Isobar.Loreal.SkinExpert.Modules.BlogSearch&view=~/Views/SkinexpertRevamp/BlogResults.cshtml&la=1&search=' + search,
            type: 'POST',
            success: function (data) {
                $('.latest-posts').replaceWith(data);
            }
        });

    });

    $('body').on('click', '.show-all', function () {
        window.open('http://skinexpert.gr/blogs/', '_blank');
    });

    $('body').on('click', '.cookies-wrapper .close-button', function () {
        $('.cookies-wrapper').slideUp(600);
    });

    $('body').on('click', '.modal-terms .close-button', function () {
        $('body').removeClass('modaltermsopen');
    });

    $('body').on('click', '.open-terms', function () {
        $('body').addClass('modaltermsopen');
        $('.modal-terms .text').niceScroll();
    });

    $('body').on('click', '.main-menu .reset', function () {
        $('.open-menu.open').trigger('click');

        prevPageId = pageId;
        pageId = 1;
        animateOutro();
    });
});

$(window).resize(function () {
    changeQuizMenuPosition();
    setQuizMenuDot();
});

$(window).on('load', function () {
    setPage();
    TweenMax.to($('.loader'), .6, {
        height: '0%',
        ease: CustomEase.create("custom", "M0,0 C0.894,0.028 0.396,1 1,1")
    });
});