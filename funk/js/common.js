function cssParallax(cont, el, radiusVal){
    $(cont).mousemove(function(event) {

        cx = Math.ceil($(window).width() / 2);
        cy = Math.ceil($(window).height() / 2);
        dx = event.pageX - cx;
        dy = event.pageY - cy;

        var cMin = Math.min(cx, cy);

        tiltx = (dy / cMin);
        tilty = - (dx / cMin);
        radius = Math.sqrt(Math.pow(tiltx,2) + Math.pow(tilty,2));
        degree = (radius * radiusVal);

        $(el, cont).css('-webkit-transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
        $(el, cont).css('transform','rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)');
    });
}

function setModelLeft()
{
    var browserWidth = $(window).width();

    
    if (browserWidth >= 2100)
        {
            $('.model img').css('left', (browserWidth / 1.65));
        } else {
           $('.model img').css('left', (browserWidth / 1.8));
        }
}

function barcodeAutoshow()
{
    var tlBarcode = new TimelineMax(),
        $barcodeImg = $('.barcode-img');

    tlBarcode
        .set( $barcodeImg, {scale: 0, autoAlpha: 0})
        .to( $barcodeImg, .4, {scale: 1, autoAlpha: 1, ease: Power2.easeOut}, '+=.6')
        .to( $barcodeImg, .4, {scale: 0, autoAlpha: 0, ease: Power2.easeIn}, '+=1.2');
}

// function setHandLeft()
// {
//     var browserWidth = $(window).width();

//     if (browserWidth <= 1322)
//     {
//         // $('.hand img').css('left', -(browserWidth / 7));
//         $('.hand img').css('left', '-20%');
//     } else {
//         $('.hand img').css('left', '');
//     }
// }

// Add scroll event listeners & scrollBool to true
function enable() {
    document.addEventListener('mousewheel', function(e)
    {
        animateScroll(e);
    });
    document.addEventListener('DOMMouseScroll', function(e)
    {
        animateScroll(e);
    });
    document.body.addEventListener('keydown', function(e)
    {
        animateScroll(e.keyCode);
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

function setActive(num)
{
    $('.screen').removeClass('active');
    $('.screen-' + num).addClass('active');
}

function animateScroll(e)
{
    var windowWidth = $(window).width();

    if (windowWidth <= 600)
    {
        return;
    }

    var tlForm = new TimelineMax(),
        $screenForm = $('.screen-form'),
        $parallaxChild = $('.parallax-base'),
        $obj = $('.obj');

    // Check if scroll is true
    if (!scrollBool)
    {
        return;
    }

    var scrollData = e.wheelDelta || -e.detail;

    if (e == 38 || e == 33)
    {
        scrollData = 1;
    } else if (e == 40 || e == 34 || e == 32) {
        scrollData = -1;
    }
   
    if (scrollData < 0 && $('.screen-1').hasClass('active'))
    {
        disableScroll();
        tlForm
                .set( $screenForm, {y: '140%'})
                .set( $obj, {y: '100%'})
                .set( $('.form'), {y: '10%', autoAlpha: 0})
                .to( $('.model img'), .8, {y: 70, ease: Power2.easeOut})
                .to( $parallaxChild, .8, {y: 70, ease: Power2.easeOut}, '-=.8')
                .to( $screenForm, .9, {y: '-100%', ease: Power4.easeOut, onComplete: startBubbles}, '-=.9')
                .to( $obj, .9, {y: '0%', ease: Power4.easeOut}, '-=.7')
                .to( $('.form'), .9, {y: '0%', autoAlpha: 1, ease: Power2.easeOut, onComplete: enableScroll}, '-=.8');
        setActive(2);
        barcodeAutoshow();

    } else if (scrollData > 0 && $('.screen-2').hasClass('active')) {
        disableScroll();
        tlForm
                .set( $screenForm, {y: '-100%'})
                .set( $obj, {y: '0%'})
                .to( $('.model img'), .8, {y: 0, ease: Power2.easeOut})
                .to( $parallaxChild, .8, {y: 0, ease: Power2.easeOut}, '-=.8')
                .to( $obj, .8, {y: '100%', ease: Power2.easeInOut, onComplete: stopBubbles}, '-=.9')
                .to( $screenForm, .9, {y: '100%', ease: Power2.easeInOut}, '-=.5')
                .to( $('.form'), .9, {y: '100%', ease: Power2.easeInOut, onComplete: enableScroll}, '-=1.3');
        
        setActive(1);
    }
}

function setupInputs()
{
 $('input')
     .on('focus', function(e)
     {
         $(this).addClass('focused');
     })
     .on('blur', function(e)
     {
         var $this = $(this);
         var val = $(this).val() || '';
         val = val.trim();
         if (val.length > 0)
             $this.addClass('has-value');
         else
             $this.removeClass('has-value');
         $this.removeClass('focused');
     })
 ;
}

function changeMilkAnimation()
{
    $('.milk').addClass('start');

    var milkTimer = setTimeout(function()
    {
        $('.milk').removeClass('start').addClass('loop');
    }, 1100);
}

//------------- DOCUMENT READY

$(function()
{
    cssParallax('.parallax-container', '.parallax-base', 4);
    cssParallax('.parallax-container.first', '.parallax-base', 4);

    setModelLeft();
    setupInputs(); 

    //----------- Clicks
    $('body').on('click', '.text .arrow', function()
    {
        animateScroll(40);
    });

    $('body').on('mouseover', '.barcode-show', function()
    {
        var tlBarcode = new TimelineMax(),
            $barcodeImg = $('.barcode-img');

        tlBarcode
            .set( $barcodeImg, {scale: 0, autoAlpha: 0})
            .to( $barcodeImg, .4, {scale: 1, autoAlpha: 1, ease: Power2.easeOut});
    });

    $('body').on('mouseout', '.barcode-show', function()
    {
        var tlBarcode = new TimelineMax(),
            $barcodeImg = $('.barcode-img');

        tlBarcode
            .to( $barcodeImg, .4, {scale: 0, autoAlpha: 0, ease: Power2.easeIn});
    });
});

function startArrow()
{
    $('.arrow').addClass('intro'); 
}

//------------- WINDOW RESIZE

$(window).on('resize', function()
{
    setModelLeft();
});


//------------- WINDOW LOAD

loadingBubbles();

$(window).on('load', function()
{
    if ($('html').hasClass('mobile'))
    {
        $('.loader').fadeOut('1000');
        setTimeout(function()
        {
            $('.loader').remove();
        }, 1100);
        return;
    }
    var tlLoader = new TimelineMax(),
        $parallaxChild = $('.parallax-base').children(),
        $parallaxFirst = $('.parallax-1, .parallax-2, .parallax-3, .parallax-4, .parallax-5'),
        $parallaxSecond = $('.parallax-text .title, .parallax-text .text p');

    tlLoader
        .set( $('.logo'), {scale: 1.5, autoAlpha: 0})
        .set( $('.model'), {x: 100, autoAlpha: 0})
        .set( $('.footer'), {y: 30, autoAlpha: 0})
        .set( $parallaxFirst, {x: 60, autoAlpha: 0})
        .set( $parallaxSecond, {y: 40, autoAlpha: 0})
        .to( $('.loader'), .8, {autoAlpha: 0, ease: Power2.easeInOut})
        .to( $('.logo'), .3, {scale: 1, autoAlpha: 1, ease: Power2.easeOut} )
        .to( $('.model'), 1.3, {x: 0, ease: Power4.easeOut}, '-=.4')
        .to( $('.model'), 1.6, {autoAlpha: 1, ease: Power1.easeIn}, '-=1.3')
        .to( $('.footer'), .6, {y: 0, autoAlpha: 1, ease: Power2.easeOut}, '-=1.3')
        .staggerTo( $parallaxFirst, 1.4, {x: 0, autoAlpha: 1, ease: Power4.easeOut}, 0.05, '-=1.3')
        .staggerTo( $parallaxSecond, 1, {y: 0, autoAlpha: 1, ease: Power4.easeOut}, 0.05, '-=.8');
    
    // $('.loader').fadeOut();
    setTimeout(function()
    {   
        changeMilkAnimation();
    }, 1150);

    setTimeout(function()
    {   
        startArrow();
        $('.loader').remove();
    }, 1720);

    enable();
});