var pageNum = 3,
    oldNum = 0;

function setInnerWrapperWidth()
{
    var windowWidth = $(window).width(),
    windowHeight = $(window).height()
    setWidth = (windowWidth - 135);

    if ( $('.brazil-landing').hasClass('sidebar-open') )
    {
        $('.inner-wrapper').css('width', (setWidth - 375));
    }
    else
    {
        $('.inner-wrapper').css('width', setWidth);
    }

    setVideoInfoWidth();
}

function loadPageData(mask)
{

    var $pageTitle = $('.video-info--title h3'),
        $pageDesc = $('.video-info--text'),
        $innerWrapper = $('.brazil-landing .inner-wrapper');

    $innerWrapper.removeClass('page-1 page-2 page-3 page-4');
    $innerWrapper.addClass('page-' + (pageNum + 1) );

    setTimeout(function()
    {
        $pageTitle.text( pagesData[pageNum].title );
        $pageDesc.text( pagesData[pageNum].desc );
    }, 450);
    
    $('.video-mask').removeClass('video-mask__current');

    if (youtubeReady)
    {
        switch(oldNum)
        {
            case 0:
                player_1.stopVideo();
                break;
            case 1:
                player_2.stopVideo();
                break;
            case 2:
                player_3.stopVideo();
                break;
            case 3:
                player_4.stopVideo();
                break;
        }     
    }
}

function animateNext()
{
    if (pageNum > 0)
    {
        $('#player--' + (oldNum + 1)).closest('.video-mask').addClass('video-mask__current');
    }
    else if (pageNum == 0)
    {
        $('#player--' + (oldNum + 1)).closest('.video-mask').addClass('video-mask__current');
    }

    $('.video-mask').removeClass('running');
    $('.video-mask__current').addClass('running');

    var tlNext = new TimelineLite(),
        $photoGalleryCircleSvg = $('.photo-gallery .circle, .photo-gallery svg'),
        $photoGalleryText = $('.photo-gallery .text'),
        $videoInfoH3 = $('.video-info--title h3'),
        $videoInfoText = $('.video-info--text'),
        $videoMask = $('.video-mask__current');

    tlNext
        .to( $videoInfoH3, .6, {y: 22, ease: Power3.easeInOut })
        .to( $videoInfoH3, .6, {y: 0, ease: Power3.easeInOut})
        .to( $videoInfoText, .6, {autoAlpha: 0}, '-=1.2' )
        .to( $videoInfoText, .6, {autoAlpha: 1}, '-=.4' );
}

function setVideoSize()
{
    var windowWidth = $(window).width(),
        windowHeight = $(window).height()
        setWidth = (windowWidth - 800),
        setWidthHeight830 = (windowWidth - 1500);

    
    if (setWidth > 1200 && windowHeight <= 900)
    {
        $('.video-thumb, .video-mask .iframe').css('width', setWidthHeight830 );
        $('.video-thumb, .video-mask .iframe').css('height', ( setWidthHeight830 * (9/16) ));
    }
    else if (setWidth > 1200)
    {
       $('.video-thumb, .video-mask .iframe').css('width', '1200px' );
       $('.video-thumb, .video-mask .iframe').css('height', ( 1200 * (9/16) ));     
    }
    else if (setWidth < 430)
    {
        $('.video-thumb, .video-mask .iframe').css('width', '430px' );
        $('.video-thumb, .video-mask .iframe').css('height', ( 430 * (9/16) ));   
    }
    else
    {
        $('.video-thumb, .video-mask .iframe').css('width', setWidth );
        $('.video-thumb, .video-mask .iframe').css('height', ( setWidth * (9/16) ));
    }

}

function popupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}


function setVideoInfoWidth()
{
    videoThumbWidth = $('.video-thumb').width();

    $('.video-info').css('width', videoThumbWidth);
}

//------------- DOCUMENT READY

$(function()
{
    setVideoSize();
    loadPageData();
    setInnerWrapperWidth();

    // ---------------------  Clicks

    $('body').on('click', '.desc-sidebar .toggle-btn', function()
    {
        var $brazilLanding = $('.brazil-landing');

        if ( $brazilLanding.hasClass('sidebar-open') )
        {
            $brazilLanding.removeClass('sidebar-open');
        } else 
        {
            $brazilLanding.addClass('sidebar-open');
        }
        setInnerWrapperWidth();
    });

    $('body').on('click', '.main-menu--nav li', function()
    {
        var dataPage = $(this).attr('data-page');

        oldNum = pageNum;

        pageNum = parseInt(dataPage);

        loadPageData();

        animateNext();
    });

    $('body').on('click', '.video-col .arrow__next', function()
    {
        oldNum = pageNum;

        pageNum++;

        loadPageData();

        animateNext();
    });

    $('body').on('click', '.video-col .arrow__prev', function()
    {
        oldNum = pageNum;

        pageNum--;

        loadPageData();

        animateNext();
    });

    // -------- Gallery

    $('body').on('click', '.main-content .photo-gallery', function()
    {
        $('.galleryWrp#gallery' + (pageNum + 1)).addClass('opened');
    });
 
    $('body').on('click', '.thumbImg figure', function () {
        var indx = $(this).index();        
        var gall = $(this).parents('.galleryWrp').find('.mainImgSlider');
        gall.trigger('to.owl.carousel', indx);
    });

    $('body').on('click','.closeModal, .modalwrp .overlay, .toggleThumbs', function () {
        $('.modalwrp.opened').removeClass('opened');
        $('body.modalOpened').removeClass('modalOpened');
    });
    
    $('.expertsGallery.vScroll').each(function(){
        var h = $(this).siblings('.exStepIntro').outerHeight();
        var p = $(this).parents('.exStep').outerHeight();
        $(this).css({'height': p - h - 120})
    });

    // -------- Terms

    $('.exSideTools .terms').click(function(event) {
        event.preventDefault();
        $('.main-wrapper').not('.termsOpened').addClass('termsOpened');
    });

    $('.main-wrapper .termsClose').click(function(event) {
        event.preventDefault();
        $('.main-wrapper').removeClass('termsOpened');
    });

    
    $('body').on('click','.exSideTools .at-share-btn.at-svc-facebook', function () {
        fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href;

        popupCenter(fbUrl,'Share on Facebook','700','300');  
    });
    
    $('body').on('click','.exSideTools .at-share-btn.at-svc-twitter', function () {
        twitterUrl = 'https://twitter.com/home?status=' + window.location.href;

        popupCenter(twitterUrl,'Share on Twitter','700','300');  
    });

    $('.expertIntro .scrollDown').click(function(event) {
        $('html,body').animate({scrollTop: $('.main-wrapper').offset().top}, 700);
    });

});



//------------- WINDOW RESIZE

$(window).on('resize', function()
{
    setVideoSize();

    setInnerWrapperWidth();
});


var ticking = false;


function scrollEvents(){
    if($(window).scrollTop() >= 10){
        $('.main-wrapper').addClass('fixedHeader');
    }else{
        $('.main-wrapper').removeClass('fixedHeader');
    }
}

/**Callback for our scroll event - just keeps a track on the last scroll value*/
function onScroll() {
    requestTick();
}

/*** Calls rAF if it's not already been done already*/
function requestTick() {
    if(!ticking) {
        requestAnimFrame(update);
        ticking = true;
    }
}

/*** Our animation callback*/
function update() {

	scrollEvents();

    // allow further rAFs to be called
    ticking = false;
}


// only listen for scroll events
window.addEventListener('scroll', onScroll, false);

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


$(window).on("load", function () {
    var slider, actSlide, actSlideCaption;
    $('.mainImgSlider').owlCarousel({
        items: 1,
        nav: true,
        navText: ['', ''],
        dots: false,
        mouseDrag: false,
        navSpeed: 1000,
        dotsSpeed: 1000,
        onTranslated: function(event){
            slider = $(event.target);
            actSlide = event.item.index + 1;
            allSlides = event.item.count;
            slider.siblings('.title').find('.questNumb .active').text(actSlide);
            slider.siblings('.title').find('.questNumb .all').text(allSlides);
        },
        onInitialized: function(event){
            slider = $(event.target);
            actSlide = event.item.index + 1;
            allSlides = event.item.count;
            slider.siblings('.title').find('.questNumb .active').text(actSlide);
            slider.siblings('.title').find('.questNumb .all').text(allSlides);
        } 
    });

    $(".vScroll, .expertsForm, .expertsTerms .text").mCustomScrollbar();
});