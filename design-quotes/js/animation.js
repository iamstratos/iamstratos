(function($)
{

    var textWidth = $('.content .text').outerWidth(),
        specialLineWidth = $('.h2.special').outerWidth(),
        widthLeft = Math.round(textWidth - specialLineWidth);

    var $slideContentTitles = $('.slide .h2 span, .content .bg-h2 span'),
        $slideCover = $('.white-cover'),

        $sidebar = $('.sidebar'),
        $logo = $('.header .h1'),
        $menuIconLines = $('.menu-icon .line'),

        $playBtn = $('.content .btn'),
        $contentText = $('.content .h2, .content .author div'),
        $specialLine = $('.special-line'),

        $footerPages = $('.footer .pages').children(),
        $footerMetaIcons = $('.footer .meta .icon, .header .search .icon'),
        $footerMetaNum = $('.footer .meta .num, .header .search input'),

        $loadCircle = $('#loader .circle'),

        tl = new TimelineMax()
        tlAll = new TimelineMax()
        tlnewDown = new TimelineMax()
        tloldUp = new TimelineMax()
        tloldDown = new TimelineMax()
        tlnewUp = new TimelineMax()
        tlLoad = new TimelineMax({repeat: -1})
        ;

    NProgress.start();

    function updateStatus()
    {
        var ngStatus = NProgress.status,
            ngClear = ngStatus.toString().replace('0.', ''),
            loadStatus = ngClear.slice(0,2);

        if ( loadStatus.length < 2 )
        {
            loadStatus = loadStatus + '0';
        }

        $('#loader .line').css('height', loadStatus + '%');
        $('#loader .percent').text(loadStatus);
    }

    var interval = setInterval(updateStatus, 5);

    $(window).on('load', function()
    {
        $('#loader .line').css('height', '100%');
        $('#loader .percent').text('100');
        $('#loader').fadeOut(400);

        setTimeout(function()
        {
            NProgress.done();
            clearInterval(interval);
            tl.play();
        }, 500);
    });

    tl
        // .pause()

        // set
        .set($slideContentTitles, {y: '100%'})
        .set($slideCover, {width: '100%'})

        .set($sidebar, {x: -200})
        .set($logo, {y: -200})
        .set($menuIconLines, {y: -200})

        .set($playBtn, {scale: 0})
        .set($contentText, {y: -140, autoAlpha: 0})
        .set($specialLine, {width: 0})

        .set($footerPages, {x: -90, autoAlpha: 0})
        .set($footerMetaIcons, {scale: 0})
        .set($footerMetaNum, {x: -30, autoAlpha: 0})

        .pause()

        // animate
        .add('intro')
        .to($slideCover, .8, {width: '0%', ease:Power2.easeInOut})
        .to($sidebar, 1, {x: 0}, 'intro')
        .to($logo, 1, {y: 0, ease:Power2.easeInOut}, 'intro')
        .staggerTo($menuIconLines, .8, {y: 0, ease:Power1.easeOut}, -0.2, 'intro')
        
        .staggerTo($footerMetaIcons, .4, {scale: 1, ease:Back.easeOut.config(2.3)}, 0.2, 'intro+=.6')
        .staggerTo($footerMetaNum, .3, {x: 0, autoAlpha: 1, ease:Power2.easeInOut}, 0.2, 'intro+=.6')
        .staggerTo($footerPages, .35, {x: 0, autoAlpha: 1, ease:Power1.easeOut}, -0.2, 'intro+=.6')

        .staggerTo($contentText, .6, {y: 0, autoAlpha: 1, ease:Power2.easeInOut}, -0.1, 'intro-=.5')
        .to($playBtn, .5, {scale: 1, ease:Power2.easeInOut}, 'intro+=1.8')
        .to($specialLine, .5, {width: (widthLeft - 90), ease:Power2.easeInOut}, 'intro+=1.8')

        .to($slideContentTitles, .8, {y: '0%', ease:Power2.easeInOut, onComplete: enable}, 'intro+=1.7')
        ;


    // Get active content's number and length, display them in page
    var getContent = $('.content.active')
                .attr('class')
                .split(' ')[1]
                .replace('content-', ''),
        contentNum = parseInt(getContent),
        contentLength = $('.content').length;

    function setPager(num)
    {
        if (num < 0)
        {
            $('.footer .pages .span').eq(0).text( ( contentNum - 1));
        } else if (num > 0) {
            $('.footer .pages .span').eq(0).text( ( contentNum + 1));
        } else {
            $('.footer .pages .span').eq(0).text(contentNum);
        }
        $('.footer .pages .span').eq(2).text(contentLength);
    }

    setPager(0);

    function setActiveContent(num)
    {
        if (num >= 0 && contentNum > 1)
        {
            $('.content').removeClass('active');
            $('.content-' + (contentNum - 1)).addClass('active');
        } else if (num < 0 && contentNum < contentLength) {
            $('.content').removeClass('active');
            $('.content-' + (contentNum + 1)).addClass('active');
        }
    }

    // Hide all content except current slide on load
    TweenLite.set( $('.content'), {autoAlpha: 0});
    TweenLite.set( $('.content-' + contentNum), {autoAlpha: 1});
    TweenLite.set( $('.slide'), {autoAlpha: 0});
    TweenLite.set( $('.slide-' + contentNum), {autoAlpha: 1});

    // Add scroll event listeners & scrollBool to true
    function enable() {
        document.addEventListener('mousewheel', function(e)
        {
            animate(e);
        });
        document.addEventListener('DOMMouseScroll', function(e)
        {
            animate(e);
        });
    }

    var scrollBool = true;
    function disableScroll()
    {
        scrollBool = false;
    }
    function enableScroll()
    {
        scrollBool = true;
    }

    
    function animate(e)
    {
        // Check if scroll is true
        if (!scrollBool)
        {
            return;
        }

        var scrollData = e.wheelDelta || -e.detail;

        // Set active content's number and length
        getContent = $('.content.active')
                .attr('class')
                .split(' ')[1]
                .replace('content-', '');
        contentNum = parseInt(getContent);
        contentLength = $('.content').length;

        if (scrollData > 0 && contentNum > 1)
        {
            disableScroll();

            tloldDown // Current slide goes down
                .add('slideDown')
                .staggerTo( $('.content-' + contentNum + ' .h2, .content-' + contentNum + ' .author div'), .5, {y: '1000%', autoAlpha: 0, ease:Power2.easeInOut}, -0.2)
                .to( $('.content-' + contentNum + ' .btn'), .4, {scale: 0, ease:Power1.easeInOut }, 'slideDown-=.1')
                .to( $('.content-' + contentNum + ' .special-line'), .5, {width: '0%', ease:Power2.easeInOut}, 'slideDown-=.1')
                .to( $('.content-' + contentNum + ' .bg-h2 span'), .9, {y: '100%', ease:Power1.easeInOut}, 'slideDown+=.3')
                .to( $('.slide-' + contentNum + ' .h2 span' ) , .7, {y: '100%', ease:Power1.easeInOut}, 'slideDown')
                .to( $('.slide-' + contentNum ) , .7, {y: '-100%', ease:Power2.easeInOut}, 'slideDown+=.6')
                .staggerTo( $footerPages , .5, {x: 70, autoAlpha: 0, ease:Power1.easeInOut}, -0.1, 'slideDown')
                .set($footerPages, {x: -90, autoAlpha: 0, onStart: setPager, onStartParams:[-1] }, 'slideDown+=.7')
                ;

            tlnewUp // New slide will come up
                // set
                .set( $('.content-' + (contentNum - 1)) , {autoAlpha: 1})
                .set( $('.content-' + (contentNum - 1) + ' .h2, .content-' + (contentNum - 1) + ' .author div') , {y: '-1000%', autoAlpha: 0})
                .set( $('.content-' + (contentNum - 1) + ' .btn') , {scale: 0})
                .set( $('.content-' + (contentNum - 1) + ' .special-line') , {width: 0})
                .set( $('.content-' + (contentNum - 1) + ' .bg-h2 span') , {y: '100%'})
                .set( $('.slide-' + (contentNum - 1) ) , {y: '100%', autoAlpha: 1})
                .set( $('.slide-' + (contentNum - 1) + ' .h2 span' ), {y: '100%', })

                // animate
                .add('newSlideUp')
                .staggerTo( $('.content-' + (contentNum - 1) + ' .h2, .content-' + (contentNum - 1) + ' .author div') , .6, {y: '0%', autoAlpha: 1, ease:Power2.easeInOut}, -0.1, 'newSlideUp+=1.2')
                .to( $('.content-' + (contentNum - 1) + ' .btn') , .5, {scale: 1, ease:Power2.easeInOut}, 'newSlideUp+=1.9')
                .to( $('.content-' + (contentNum - 1) + ' .special-line') , .5, {width: (widthLeft - 90), ease:Power2.easeInOut, onComplete: setActiveContent, onCompleteParams:[1]}, 'newSlideUp+=1.9')
                .to( $('.content-' + (contentNum - 1) + ' .bg-h2 span') , .8, {y: '0%', ease:Power2.easeInOut, onComplete: enableScroll}, 'newSlideUp+=1.6')
                .to ( $('.slide-' + (contentNum - 1) ) , .5, {y: '0%', ease:Power2.easeInOut}, 'newSlideUp+=.6')
                .to ( $('.slide-' + (contentNum - 1) + ' .h2 span' ) , .8, {y: '0%', ease:Power2.easeInOut}, 'newSlideUp+=1.6')
                .staggerTo($footerPages, .35, {x: 0, autoAlpha: 1, ease:Power1.easeOut}, -0.2, 'newSlideUp+=1')
                ;
        
        } else if (scrollData < 0 && contentNum < contentLength) {
            disableScroll();

            tloldUp // Current slide goes up
                .add('slideUp')
                .staggerTo( $('.content-' + contentNum + ' .h2, .content-' + contentNum + ' .author div'), .5, {y: '-1000%', autoAlpha: 0, ease:Power2.easeInOut}, 0.2)
                .to( $('.content-' + contentNum + ' .btn'), .4, {scale: 0, ease:Power1.easeInOut}, 'slideUp+=.4')
                .to( $('.content-' + contentNum + ' .special-line'), .5, {width: '0%', ease:Power2.easeInOut}, 'slideUp-=.1')
                .to( $('.content-' + contentNum + ' .bg-h2 span'), .7, {y: '-100%', ease:Power1.easeInOut}, 'slideUp')
                .to( $('.slide-' + contentNum + ' .h2 span' ) , .7, {y: '-100%', ease:Power1.easeInOut}, 'slideUp')
                .to( $('.slide-' + contentNum ) , .9, {y: '100%', ease:Power4.easeInOut}, 'slideUp+=.6')
                .staggerTo( $footerPages , .5, {x: 70, autoAlpha: 0, ease:Power1.easeInOut}, -0.1, 'slideUp')
                .set($footerPages, {x: -90, autoAlpha: 0, onStart: setPager, onStartParams:[1] }, 'slideUp+=.7')
                ;

            tlnewDown // New slide will come from below
                // set
                .set( $('.content-' + (contentNum + 1)) , {autoAlpha: 1})
                .set( $('.content-' + (contentNum + 1) + ' .h2, .content-' + (contentNum + 1) + ' .author div') , {y: '1000%', autoAlpha: 0})
                .set( $('.content-' + (contentNum + 1) + ' .btn') , {scale: 0})
                .set( $('.content-' + (contentNum + 1) + ' .special-line') , {width: 0})
                .set( $('.content-' + (contentNum + 1) + ' .bg-h2 span') , {y: '100%'})
                .set( $('.slide-' + (contentNum + 1) ) , {y: '-100%', autoAlpha: 1})
                .set ( $('.slide-' + (contentNum + 1) + ' .h2 span' ), {y: '100%', })

                // animate
                .add('newSlideDown')
                .staggerTo( $('.content-' + (contentNum + 1) + ' .h2, .content-' + (contentNum + 1) + ' .author div') , .6, {y: '0%', autoAlpha: 1, ease:Power2.easeInOut}, 0.1, 'newSlideDown+=1.2')
                .to( $('.content-' + (contentNum + 1) + ' .btn') , .5, {scale: 1, ease:Power2.easeInOut}, 'newSlideDown+=1.9')
                .to( $('.content-' + (contentNum + 1) + ' .special-line') , .5, {width: (widthLeft - 90), ease:Power2.easeInOut, onComplete: setActiveContent, onCompleteParams:[-1] }, 'newSlideDown+=1.2')
                .to( $('.content-' + (contentNum + 1) + ' .bg-h2 span') , .8, {y: '0%', ease:Power2.easeInOut, onComplete: enableScroll}, 'newSlideDown+=1.6')
                .to ( $('.slide-' + (contentNum + 1) ) , .9, {y: '0%', ease:Power4.easeInOut}, 'newSlideDown+=.6')
                .to ( $('.slide-' + (contentNum + 1) + ' .h2 span' ) , .8, {y: '0%', ease:Power2.easeInOut}, 'newSlideDown+=1.6')
                .staggerTo($footerPages, .35, {x: 0, autoAlpha: 1, ease:Power1.easeOut}, -0.2, 'newSlideDown+=1')
                ;
        }
    }

    // extra events

    $('.nextPage').hover(function()
    {
        TweenLite.to( $(this), .5, {x: 10} );
    }, function()
    {
        TweenLite.to( $(this), .5, {x: 0} );
    });

    $('body').on('click', '.nextPage', function(e)
    {
        animate(e);
    });

    
})(jQuery);