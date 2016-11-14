//  ------------------------  Menu open-close

$(".menu_icon").click(function(){
	$(".mainmenu").removeClass("hide_menu");
	$(this).css("opacity","0");
});
$(".icon-close").click(function(){
	$(".mainmenu").addClass("hide_menu");
	$(".menu_icon").css("opacity","1");
});

//  ------------------------  #smartmenu - .lvl_3

function lvlautoWidth()
{
	var $browser_width = $(window).width();
	var $lvl_1 = $(".lvl_1").outerWidth();
	var $lvl_2 = $("#lvl_2").outerWidth();
	var $item = $("#lvl_3").outerWidth();
	var $div_width1 = $lvl_1 + $lvl_2;
	var $div_width2 = $div_width1 + $item;
	var $width_result = $browser_width - $div_width2;

	$(".item").css("width", $width_result );
}

$( document ).ready(function() {
	lvlautoWidth();
	$(window).resize(function() {
		lvlautoWidth();
	});
});

//  ------------------------  slider - social icons

function search_show_class(){
	if( $(".search").hasClass("show") && $("header").hasClass("resize") )
	{
		$(".search").removeClass("show");
		$("header").removeClass("resize");
	}
	else
	{
		$(".search").addClass("show");
		$("header").addClass("resize");
	}
}

$(".src_btn").click(function(){
	search_show_class();

});

$(".search .icon-close").click(function(){
	search_show_class();

});


//  ------------------------  lvl_2 - li:hover link

$(".lvl_2 li").hover(function(){
	var $that = $(this);
	var $li_link = $that.find(".icon-link");
	
	if( $li_link.hasClass("hide") )
	{
		$li_link.removeClass("hide");
	}
	else
	{
		//$li_link.addClass("hide");
	}
}, function()
{
	var $that = $(this);
	var $li_link = $that.find(".icon-link");

	$li_link.addClass("hide");
});


//  ------------------------  price click - popup

$(".pr_anim").click(function(){
	var $priceDiv = $(".pr_anim");

	if( $(this).hasClass("current") )
	{
		$(this).removeClass("current");
	} else {
		$priceDiv.removeClass("current");
		$(this).addClass("current");
	}
});


//  ------------------------  table hover bg color

$(".prices li").hover(function(){

	var $liClass = $(this).attr("class");
	var $number = parseFloat($liClass);
	var $liCurrent = $("." + $number + "_li");

	$liCurrent.toggleClass("hover_colors");
});


//  ------------------------  price button click - magic.css

$('.links a').click(function(e) {
	e.preventDefault();

	var $that = $(this);
	var $thisTable1 = $that.closest(".prices").find(".table1");
	var $thisTable2 = $that.closest(".prices").find(".table2");
	var $thisTable3 = $that.closest(".prices").find(".table3");

	$( ".pr_anim" ).each(function() {
		$( this ).removeClass( "magictime spaceInRight" ).addClass( "magictime holeOut" );
	});

	setTimeout(function(){
		$( ".pr_anim" ).each(function() {
			$( this ).addClass( "hide" );
		});
	}, 300);


	$(".table_info").removeClass("hide").addClass("magictime spaceInRight");

	setTimeout(function(){
		$thisTable1.removeClass("hide").addClass("magictime spaceInRight");
	}, 400);
	setTimeout(function(){
		$thisTable2.removeClass("hide").addClass("magictime spaceInRight");
	}, 650);
	setTimeout(function(){
		$thisTable3.removeClass("hide").addClass("magictime spaceInRight");
	}, 900);

});

$('.icon-close-thin').click(function(){

	setTimeout(function(){
		$( ".pr_anim" ).each(function() {
			$( this ).removeClass( "hide" ).addClass("magictime spaceInRight");
		});
	}, 300);


	$(".table_info").removeClass("magictime spaceInRight").addClass("magictime spaceOutRight");

	$( ".tb_anim" ).each(function() {
		$( this ).removeClass("magictime spaceInRight").addClass("magictime spaceOutRight");
	});

	setTimeout(function(){
		$(".table_info").addClass("hide").removeClass("magictime spaceOutRight");

		$( ".tb_anim" ).each(function() {
			$( this ).addClass("hide").removeClass("magictime spaceOutRight");
		});
	}, 500);

});


//  ------------------------  price mouse hover - show p

$(".pr_anim").hover(function(){

	if( $(this).hasClass("current") ){
	} else {
		$(this).addClass("price_data_p");
		$(this).find("p").removeClass("opacity-0 hide").addClass("magictime slideDownRetourn");
	}
}, function(){

	$(this).removeClass("price_data_p");
	$(this).find("p").removeClass("magictime slideDownRetourn").addClass("magictime slideDown");

	setTimeout(function(){
		$(this).find("p").addClass( "hide" );
	}, 200);
});

//  ------------------------  price mouse click - show p

$(".pr_anim").click(function(){
	$(this).removeClass("price_data_p");
	//$(this).find("p").removeClass("slideDownRetourn").addClass("magictime slideDown");
	$(this).find("p").removeClass("slideDownRetourn").addClass("opacity-0");

	setTimeout(function(){
		$(this).find("p").addClass( "hide" );
	}, 200);
});


//  ------------------------  tooltip title - mouse hover

function tooltipTitleShow(){
	var $that = $(this);
	var $thisWidth = $that.width();
	var $thisHeight = $that.outerHeight();
	var $thisPosition = $that.offset();
	var $thisMiddle = $thisWidth / 2;

	$("<div></div>").prependTo("body").addClass("tooltip tooltip-title");

	var $tooltip = $(".tooltip-title");
	$tooltip.text( $that.prop("title") );
	
	var $tooltipWidth = $tooltip.outerWidth();
	var $tooltipMiddle = $tooltipWidth / 2;

	var $tooltipLeft = $thisPosition.left + $thisMiddle - $tooltipMiddle;
	var $tooltipTop = $thisPosition.top + $thisHeight + 11;
	
	$tooltip.css("left", $tooltipLeft);
	$tooltip.css("top", $tooltipTop);

	$tooltip.css("opacity","0.8");
}

function tooltipTitleHide(){
	var $tooltip = $(".tooltip-title");

	$tooltip.css("opacity","0");

	setTimeout(function(){
		$tooltip.remove();
	}, 300);
}

var $tooltipTitle = $(".with-tooltip-title");

$tooltipTitle.hover( tooltipTitleShow, tooltipTitleHide );

//  ------------------------  modal open

$(".open_phonemodal").click(function()
{
	var $phonemodal = $(".modal-phone");

	$phonemodal.addClass("show");
	$(".modalblack").removeClass("magictime slideUp").addClass("show");
	$("#wrapper").addClass("over");
});

$(".open_emailmodal").click(function()
{
	var $emailmodal = $(".modal-email");

	$emailmodal.addClass("show");
	$(".modalblack").removeClass("magictime slideUp").addClass("show");
	$("#wrapper").addClass("over");
});


//  ------------------------  modal close

$(".modalclose").click(function(){
var $modal = $(this).closest(".modal");


	$(".modalblack").removeClass("show").addClass("magictime slideUp");
	$modal.removeClass("show").addClass("magictime slideUp");

	$("#wrapper").removeClass("over");
});


//  ------------------------  modal action

$(".goto_step2").click(function()
{
	var $step1 = $(this).closest(".step1");
	var $step2 = $(".step2");

	$(".first_action").addClass("add_action");
	$step1.addClass("step_out");
	$step2.addClass("step_in");

});

$(".goto_step3").click(function()
{
	var $step2 = $(".step2");
	var $step3 = $(".step3");
	var $info = $("p.info");

	$(".second_action").addClass("add_action");
	$step2.removeClass("step_in").addClass("step_out");
	$step3.addClass("step_in");
	$info.addClass("hide-op");

});

$(".first_action .icon-close-thin").click(function()
{
	var $step1 = $(".step1");
	var $step2 = $(".step2");
	var $step3 = $(".step3");
	var $info = $("p.info");

	if( $step3.hasClass("step_in") )
	{
		$(".first_action").removeClass("add_action");
		$(".second_action").removeClass("add_action");

		$step1.removeClass("step_out");
		$step2.removeClass("step_out");
		$step3.removeClass("step_in");
		$info.removeClass("hide-op");
	} else
	{
		$(".first_action").removeClass("add_action");

		$step1.removeClass("step_out");
		$step2.removeClass("step_in");
		$info.removeClass("hide-op");
	}

});

$(".second_action .icon-close-thin").click(function()
{
	var $step2 = $(".step2");
	var $step3 = $(".step3");
	var $info = $("p.info");

	$(".second_action").removeClass("add_action");

	$step2.removeClass("step_out").addClass("step_in");
	$step3.removeClass("step_in");
	$info.removeClass("hide-op");
});

$(".send_request").click(function()
{
	var $step2 = $(".step2");
	var $step3 = $(".step3");
	var $final = $(".final");
	var $info = $("p.info");
	var $formtitle = $(".formtitle");
	var $finaltitle = $(".finaltitle");

	if( $step2.hasClass("step_in") )
	{
		$step2.removeClass("step_in").addClass("step_out");
	}
	if( !$info.hasClass("hide-op") )
	{
		$info.addClass("hide-op");
	}

	$(".first_action").removeClass("add_action");
	$(".second_action").removeClass("add_action");
	$step3.removeClass("step_in").addClass("step_out");
	$formtitle.addClass("title_hide");
	$finaltitle.addClass("title_show");
	$final.addClass("step_in");
		
})


//  ------------------------  socialcircle - mouseout

$('.icon-socialcircle').hover(function(){
	$(this).addClass("anim");
}, function()
{
	$(".icon-socialcircle").one('animationiteration webkitAnimationIteration', function() {
		$(this).removeClass("anim");
	});
});

//  ------------------------  scroll

$(document).ready(function() {
  $('.lvl_2').scrollbar({
	disableBodyScroll: true
  });
  $('.lvl_3').scrollbar({
	disableBodyScroll: true
  });
  $('.grid_port').scrollbar({
	disableBodyScroll: true
  });

  $('.scrollbar-dynamic').scrollbar();
  $('.textarea-scrollbar').scrollbar();

  setTimeout(function()
  {
	$('.cnt-image').scrollbar({
		disableBodyScroll: true
	});
	$('.cnt-wrframe').scrollbar({
		disableBodyScroll: true
	});
  }, 10);

  $('.sidebar_p').scrollbar({
		disableBodyScroll: true
  });
});


//  ------------------------   container-inner portofolio width

function contautoWidth()
{
	var $browser_width = $(window).width();
	var $container_inner_port = $(".inner_portfolio .container");
	var $allimages_inner_port = $(".inner_portfolio .all_images");
	var $sidebar_inner_port = $(".inner_portfolio .sidebar");
	var sidebar_inner_port_width = $(".inner_portfolio .sidebar").outerWidth();
	var $width_result = $browser_width - sidebar_inner_port_width;

	//var sidebar_inner_port_height = $allimages_inner_port.outerHeight() + 4;

	$container_inner_port.css("width", $width_result - 12 );

	if( scroll_point == 0 )
	{
		$allimages_inner_port.css("width", $width_result - 12 );
	};

	//$sidebar_inner_port.css("top", -sidebar_inner_port_height );
}

$( document ).ready(function() {
	contautoWidth();
	$(window).resize(function() {
		contautoWidth();
	});
});


//  ------------------------   slick

$(document).ready(function()
{
	$('.slider').slick(
	{
		autoplay: true,
		autoplaySpeed: 2500,
		arrows: false,
		easing: "easein"
	});
	$('.slider').on('beforeChange', function(event, slick, currentSlide)
	{
		if (currentSlide == 7 || currentSlide == 0)
		{
		$(".social_dots .slick-social").removeClass("slick-social");
		$(".social_dots .icon-fb").addClass("slick-social");

		} else if (currentSlide >= 1 && currentSlide <= 2)
		{
		$(".social_dots .slick-social").removeClass("slick-social");
		$(".social_dots .icon-vk").addClass("slick-social");

		} else if (currentSlide >= 3 && currentSlide <= 4)
		{
		$(".social_dots .slick-social").removeClass("slick-social");
		$(".social_dots .icon-pinterest").addClass("slick-social");

		} else if (currentSlide >= 5 && currentSlide <= 6)
		{
		$(".social_dots .slick-social").removeClass("slick-social");
		$(".social_dots .icon-instagram").addClass("slick-social");
		}

		var $slide = $('.slider .slide');
		var grid_item_slideHeight = $('.grid-item-slide').css('height');
		$slide.css('height',grid_item_slideHeight);
	});

	$('.img_slides').slick(
	{
		arrows:false,
		dots:true,
		appendDots:$(".wireframes"),
		dotsClass:'cnt-image',
		customPaging : function(slider, i)
		{
			var thumb = $(slider.$slides[i]).data('thumb');
			return '<div class="wrframe" style="background-image:url('+thumb+')"></div>';
		}
	});

	$('.wr_slides').slick(
		{
			arrows:false,
			dots:true,
			appendDots:$(".wireframes"),
			dotsClass:'cnt-wrframe',
			customPaging : function(slider, i)
			{
				var thumb = $(slider.$slides[i]).data('thumb');
				return '<div class="wrframe"><img src="'+thumb+'"></div>';
			}
		});

	$('.cnt-image').addClass('scrollbar-inner');
	$('.cnt-image li').addClass('cnt-image-li');
	$('.cnt-wrframe').addClass('scrollbar-inner');
	$('.cnt-wrframe li').addClass('cnt-wrframe-li');
});

//  ------------------------  .wireframes - tabs and arrows

var $wireframes_topbar_tab1 = $('.wireframes').find('.topbar').find('.tab1');
var $wireframes_topbar_tab2 = $('.wireframes').find('.topbar').find('.tab2');
var $img_slide_prev = $('.img_slide_prev');
var $img_slide_next = $('.img_slide_next');
var $wr_slide_prev = $('.wr_slide_prev');
var $wr_slide_next = $('.wr_slide_next');

$wireframes_topbar_tab1.click(function()
{
	$('.wr_slides').addClass('hideit');
	$('.img_slides').removeClass('hideit');

	$('.wr_arrows').addClass('hideit');
	$('.img_arrows').removeClass('hideit');

	$('div.cnt-image').removeClass('hideit');
	$('div.cnt-wrframe').addClass('hideit');
	$(this).addClass('active');
	$($wireframes_topbar_tab2).removeClass('active');
});

$wireframes_topbar_tab2.click(function()
{
	if( $('div.cnt-wrframe').hasClass('hideit') )
	{
		$('div.cnt-wrframe').removeClass('hideit');
	} else {
		$('wr_slides').slick('setPosition');
	}

	$('.wr_slides').removeClass('hideit');
	$('.img_slides').addClass('hideit');
	
	$('.wr_arrows').removeClass('hideit');
	$('.img_arrows').addClass('hideit');

	$('div.cnt-image').addClass('hideit');
	$(this).addClass('active');
	$($wireframes_topbar_tab1).removeClass('active');
});

$img_slide_prev.click(function()
{
	$('.img_slides').slick('slickPrev');
});
$img_slide_next.click(function()
{
	$('.img_slides').slick('slickNext');
});

$wr_slide_prev.click(function()
{
	$('.wr_slides').slick('slickPrev');
});
$wr_slide_next.click(function()
{
	$('.wr_slides').slick('slickNext');
});



//  ------------------------   grid
	

$(function() {
	var wall = new Freewall(".grid_normal");
	wall.reset({
		selector: '.grid-item',
		animate: true,
		fixSize: null,
		gutterX: 8,
		gutterY: 8,
		onResize: function() {
			this.fitWidth();
		}
	});
		wall.fitWidth();
});

var cnt_li_width = 232;
if (window.innerWidth <= 949) {
    cnt_li_width = 200;
} else if (window.innerWidth <= 875){
	cnt_li_width = 70;
}
var currentWidth = window.innerWidth;

$(function() {
	var img_preview = new Freewall(".cnt-image");
	img_preview.reset({
		selector: '.cnt-image-li',
		animate: true,
		cellW: cnt_li_width,
		cellH: 'auto',
		gutterX: 8,
		gutterY: 8,
		onResize: function() {
			//if (currentWidth !== window.innerWidth)
				this.fitWidth();
		}
	});
	var wr_preview = new Freewall(".cnt-wrframe");
	wr_preview.reset({
		selector: '.cnt-wrframe-li',
		animate: true,
		cellW: cnt_li_width,
		cellH: 'auto',
		gutterX: 8,
		gutterY: 8,
		onResize: function() {
				this.fitWidth();
		}
	});
		img_preview.fitWidth();
		wr_preview.fitWidth();
});


//  ------------------------   sticky


$('.scrollbar-dynamic').scroll(function() {
	var $scrollbarY = $(".scrollbar-dynamic > .scroll-element.scroll-y .scroll-bar");
	var sc_top = $scrollbarY.css("top");
	var sc_clear = parseFloat(sc_top);

	if (sc_clear > 20) {
		var $browser_width = $(window).width();
		$(".mainheader.light").addClass("sticky");
	} else {
		$(".mainheader.light").removeClass("sticky");
	}
});



//  ------------------------   inner_portfolio scroll


var scroll_point = 0;

$('.inner_portfolio').closest('.scrollbar-dynamic').scroll(function() {
	var $scrollbarY = $(".scrollbar-dynamic > .scroll-element.scroll-y .scroll-bar");
	var sc_top = $scrollbarY.css("top");
	var sc_clear = parseFloat(sc_top);
	if (sc_clear > 35 && scroll_point == 0) {
		$('.scrollbar-dynamic').scrollTop(86);

		var $browser_width = $(window).width();

		$(".sidebar").addClass("small");
		setTimeout(function(){
			$('img_slides').width($browser_width);
			//$(".cnt_slides").css("width",$browser_width);
			//$(".cnt_slides").find(".slick-active").css("width",$browser_width);
			//$(".img_arrows").css("width",$browser_width);
			//$(".wr_arrows").css("width",$browser_width);
		}, 450);
		
		setTimeout(function(){
			$(window).resize();
			//$('img_slides').slick('setPosition');
			//$('wr_slides').slick('setPosition');
			scroll_point = 1;
		}, 1100);
	$('.scrollbar-dynamic').scrollTop();
	}
	console.log(scroll_point);
});

$(window).on('resize', function()
{
	if( scroll_point == 1)
	{
		var $browser_width = $(window).width();

		$(".cnt_slides").css("width",$browser_width);
		$(".all_images").css("width",$browser_width);
		//$(".img_arrows").css("width",$browser_width);
		//$(".wr_arrows").css("width",$browser_width);

		$('.img_slides').css("width",$browser_width);
		$('.img_slides').slick('slickSetOption', 'refresh', true);

		//$('.wr_slides').slick('setPosition');
	};
});

//  ------------------------   icon-socialcircle click to show social_wr


$('.icon-socialcircle').click(function()
{
	$(this).addClass('hideit');
	$('.social_wr').removeClass('hideit');
});


 $('.social_wr').mouseleave(function()
 {
	setTimeout(function()
	{
		$('.social_wr').addClass('hideit');
		$('.icon-socialcircle').removeClass('hideit');
	}, 4500);
});