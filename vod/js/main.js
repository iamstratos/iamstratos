var scroll_point = 0;
var $owl_img = $('.img_slides');
var $owl_wr = $('.wr_slides');
var $owl_imgpost = $('.img_post_slides');
var $owl_aboutslider = $('.aboutslider');
var $owl_post_slider = $('.post_slider');
var $owl_grid_inner_post = $('.grid_inner_post');

//  ------------------------  Menu open-close

function home_menu_openclose()
{
	$(".menu_icon").hover(function()
	{
		$(this).addClass('anim');
	}, function()
	{
		$(this).removeClass('anim');
	});

	$(".menu_icon").click(function(){
		$(".mainmenu").removeClass("hide_menu");

		$(".icon-close").css("right","35px");
		$(".menu_social").css("right","32px");
		$('.top_right').css('right','280px');

		$(this).addClass("hideit");
	});
	$(".mainmenu .icon-close").click(function(){
		$(".mainmenu").addClass("hide_menu");

		$(this).css("right","-500px");
		$(".menu_social").css("right","-200px");
		$('.top_right').css('right','0');

		setTimeout(function(){
			$(".menu_icon").removeClass("hideit");
		}, 300);
	});
};
	

//  ------------------------  #smartmenu - .lvl_3

function lvlautoWidth()
{
	var $browser_width = $(window).width();
	var $lvl_1 = $(".lvl_1").outerWidth();
	var $lvl_2 = $("#lvl_2").outerWidth();
	var $lvl_3 = $("#lvl_3").outerWidth();
	var $lvl_info = $("#lvl_info").outerWidth();
	var $div_width1 = $lvl_1 + $lvl_2;
	var $div_width2 = $div_width1 + $lvl_3;
	var $div_width_info = $div_width1 + $lvl_info;
	var $width_result = $browser_width - $div_width2;
	var $width_result2 = $browser_width - $div_width1;
	var $width_result_info = $browser_width - $div_width_info;

	if( $("#lvl_3").length > 0 )
	{
		$(".item").css("width", $width_result );
	} else {
		$(".item").css("width", $width_result_info );
	}

	if( $(window).width() <= 1240 )
	{
		$(".lvl_3").css("width", $width_result2 );
		$("#lvl_3 ul").css("width", $width_result2 );
		$("#lvl_info").css("width", $width_result2 );
	} else 
	{
		$(".lvl_3").css("width",'');
		$("#lvl_3 ul").css("width",'');
		$("#lvl_info").css("width",'');
	}
};

//  ------------------------  slider - social icons

function search_show_class()
{
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
};

function search_show_class_sticky()
{
	if( $(".search").hasClass("show_sticky") && $("header").hasClass("resize") )
	{
		$(".search").removeClass("show_sticky");
		$("header").removeClass("resize");
		$("header").css("opacity","1");
	}
	else
	{
		$(".search").addClass("show_sticky");
		$("header").addClass("resize");
		$("header").css("opacity","0");
	}
};

//  ------------------------  lvl_2 - li:hover link

function lvl_2_lihover_showlink()
{
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
};


//  ------------------------  price click - popup

function prices_click_popup()
{
	$(".pr_anim").hover(function(){
		var $priceDiv = $(".pr_anim");

		if( $(this).hasClass("current") )
		{
			$(this).removeClass("current");
		} else {
			$priceDiv.removeClass("current");
			$(this).addClass("current");
		}
	});
}


//  ------------------------  table hover bg color

function prices_li_bgcolor()
{
	$(".table_info ul li").add(".tb_anim ul li").hover(function(){

		var $liClass = $(this).attr("class");
		var $number = parseFloat($liClass);
		var $liCurrent = $("." + $number + "_li");
		
		$liCurrent.toggleClass("hover_colors");
	});
}

function prices_li_click_checkbox()
{
	$(".tab_two.table_info ul li").click(function(){

		var $liClass = $(this).attr("class");
		var $number = parseFloat($liClass);
		var $liCurrent = $("." + $number + "_li");
		var $label = $liCurrent.find('.input').find('.table_circle');
		
		if($label.is(':checked'))
		{
			$label.prop('checked', false);
		} else {
			$label.prop('checked', true);
		}

	});
}

function prices_li_adjust_height()
{
	if( $('.wrapper').hasClass('prices_wrapper') )
	{
		var $tableinfo_li_height = $(".table_info ul li").outerHeight();
		var $tbadjust_lists = $(".tb_adjust ul").children('li');
		var $tableinfo_lists = $(".table_info ul").children('li');
		var v = 0;

		$('.adjusted').css('height','auto');

		$tableinfo_lists.each(function() {
		    var height = $(this).outerHeight();
		    v = height > v ? height : v;
		});

		$tbadjust_lists.addClass('adjusted');
		$('.adjusted').css('height', v );
	}
}

function prices_li_adjust_height_load()
{
	$('.pricepage .links a').click(function(e) {
		var $tableinfo_li_height = $(".table_info ul li").outerHeight();
		var $tbadjust_lists = $(".tb_adjust ul").children('li');
		var $tableinfo_lists = $(".table_info ul").children('li');
		var v = 0;

		$tableinfo_lists.each(function() {
		    var height = $(this).outerHeight();
		    v = height > v ? height : v;
		});

		$tbadjust_lists.addClass('adjusted');
		$('.adjusted').css('height', v );
	});
}


//  ------------------------  price button click - magic.css

function prices_button_n_magic()
{
	$('.pricepage .links a').click(function(e) {
		e.preventDefault();

		var $that = $(this);
		var this_class = $that.attr('class');
		var $thisTableInfo = $that.closest(".prices").find("." + this_class + ".table_info");
		var $thisTable1 = $that.closest(".prices").find("." + this_class + ".table1");
		var $thisTable2 = $that.closest(".prices").find("." + this_class + ".table2");
		var $thisTable3 = $that.closest(".prices").find("." + this_class + ".table3");

		$( ".pr_anim" ).each(function() {
			$( this ).removeClass( "magictime spaceInRight" ).addClass( "magictime holeOut" );
		});

		setTimeout(function(){
			$( ".pr_anim" ).each(function() {
				$( this ).addClass( "hide" );
			});
		}, 300);


		$thisTableInfo.removeClass("hide").addClass("magictime spaceInRight");

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

		var $table_info_tabs = $(this).closest('.table_info').find('.tabs');

		if( $table_info_tabs.hasClass('open') )
		{
			$table_info_tabs.removeClass('open');
		}

	});
}


function price_tab_link_click()
{
	$('.tabs a').click(function(e) {
		e.preventDefault();


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


		//---

		var $that = $(this);
		var this_class = $that.attr('class');
		var $thisTableInfo = $that.closest(".prices").find("." + this_class + ".table_info");
		
		var $thisTable1 = $that.closest(".prices").find("." + this_class + ".table1");
		var $thisTable2 = $that.closest(".prices").find("." + this_class + ".table2");
		var $thisTable3 = $that.closest(".prices").find("." + this_class + ".table3");

		setTimeout(function(){
			$thisTableInfo.removeClass("hide").addClass("magictime spaceInRight");
		}, 500);

		setTimeout(function(){
			$thisTable1.removeClass("hide").addClass("magictime spaceInRight");
		}, 750);
		setTimeout(function(){
			$thisTable2.removeClass("hide").addClass("magictime spaceInRight");
		}, 1000);
		setTimeout(function(){
			$thisTable3.removeClass("hide").addClass("magictime spaceInRight");
		}, 1250);

	});
}

function info_text_tooltip()
{
	$(".icon-price-info").hover(
	  function() {
	      
	      var $containerWidth = $(this).width();
	      var $offset = $(this).offset();

	      $('#wrapper')
	          .prepend('<div class="info_text">\
<p>Демонтажные и монтажные планы</p>\
<p>Планы размещения мебельного, осветительного и сан. технического оборудования</p>\
<p>Необходимые развертки/разресы сложных конструктивных эл-тов</p>\
<p>Ведомость отделки помещений</p>\
</div>');

	      var $tipWidth = $('.info_text').outerWidth();
	      var $tipHeight = $('.info_text').outerHeight();

	      $('.info_text').css({
	          'top': $offset.top + 33,
	          'left': $offset.left - (($tipWidth - $containerWidth  ) / 2) ,
	           'position':'absolute',
	           'display':'block'
	      });

	  },
	  function() {
	      $('.info_text').remove();
	  }
	);
}

// function put_dots_to_numbers()
// {
// 	var $autoinput = $('.auto_input');
// 	var autoinputVal = $autoinput.val();
// 	var num = numeral(autoinputVal).format('0.0');

// 	$autoinput.val(num);
// }

//  ------------------------  price mouse hover - show p

function price_hover_nclick_showp()
{

	$(".pr_anim").hover(function(){
		$(this).removeClass("price_data_p");
		//$(this).find("p").removeClass("slideDownRetourn").addClass("magictime slideDown");
		$(this).find("p").removeClass("slideDownRetourn").addClass("opacity-0");

		setTimeout(function(){
			$(this).find("p").addClass( "hide" );
		}, 200);
	});

}




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

function modal()
{
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
			
	});
}


//  ------------------------  socialcircle - mouseout

function socialcircle()
{
	$('.icon-socialcircle').hover(function(){
		$(this).addClass("anim");
	}, function()
	{
		$(".icon-socialcircle").one('animationiteration webkitAnimationIteration', function() {
			$(this).removeClass("anim");
		});
	});

	// ---------- icon-socialcircle click to show social_wr

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
}

//  ------------------------  scroll

function init_scrollbars()
{
	$('.lvl_2').scrollbar({
	disableBodyScroll: true
	});
	$('.lvl_3').scrollbar({
	disableBodyScroll: true
	});

	// $('.lvl_info .text div p').scrollbar({
	// disableBodyScroll: true
	// });

	$('.grid_port').scrollbar({
	disableBodyScroll: true
	});

	$('.scrollbar-dynamic').scrollbar();

	$('.scrollbar-inner').scrollbar({
		disableBodyScroll: true,
		ignoreMobile: true
	});
	$('.textarea-scrollbar').scrollbar();

	setTimeout(function()
	{
	$('.cnt-image').scrollbar({
		//disableBodyScroll: true
	});
	$('.cnt-wrframe').scrollbar({
		//disableBodyScroll: true
	});
	}, 10);

	$('.sidebar_p').scrollbar({
		disableBodyScroll: true
	});
}


function scroll_wheel()
{
	//$("#wrapper").smoothWheel();
}

function contactpage_form_tabs()
{
	var $tab = $('.contact_page').find('.tabs').find('div');

	$tab.click(function()
	{
		$(this).siblings().removeClass('active');
		var tab_class = $(this).attr('class');
		$(this).addClass('active');

		$(this).closest('.sidebar').find('.form_area').children().addClass('hideit');
		$(this).closest('.sidebar').find('.form_area').find("."+tab_class).removeClass('hideit');
	});

}

function enable_map_scroll()
{
	$('#vod_address').click(function()
	{
		$('#vod_address div').css("pointer-events","all");
	});
}


//  ------------------------   container-inner portofolio width

function contautoWidth_innerport()
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
	} else if ( scroll_point == 1) {
		$allimages_inner_port.css("width", $browser_width );
	}

	//$sidebar_inner_port.css("top", -sidebar_inner_port_height );
	
}

function contautoWidth_innerpost()
{
	var $browser_width = $(window).width();
	var $container_inner_port = $(".inner_post .container");
	var $allimages_inner_port = $(".inner_post .all_images");
	var $grid_inner_post = $(".inner_post .grid_inner_post");
	var $post_lastbar = $(".inner_post .lastbar");
	var $post_footer = $(".inner_post > .footer");
	var $sidebar_inner_port = $(".inner_post .sidebar");
	var sidebar_inner_port_width = $(".inner_post .sidebar").outerWidth();
	var $width_result = $browser_width - sidebar_inner_port_width;


	$container_inner_port.css("width", $width_result - 12 );
	$grid_inner_post.css("width", $width_result - 12 );
	$post_lastbar.css("width", $width_result - 17 );
	$post_lastbar.css("margin-left", "6px" );
	$post_footer.css("width", $width_result - 17 );
	$post_footer.css("margin-left", "6px" );

	if( scroll_point == 0 )
	{
		$allimages_inner_port.css("width", $width_result - 12 );
	};

}

function contautoWidth_contact()
{
	var $browser_width = $(window).width();
	var $container_inner_port = $(".contact_page .container");
	var $sidebar_inner_port = $(".contact_page .sidebar");
	var sidebar_inner_port_width = $(".contact_page .sidebar").outerWidth();
	var $width_result = $browser_width - sidebar_inner_port_width;

	$container_inner_port.css("width", $width_result - 25 );
}

function contautoWidth_aboutus()
{
	var $browser_width = $(window).width();
	var $container_inner_port = $(".aboutus_page .container");
	var $sidebar_inner_port = $(".aboutus_page .sidebar");
	var sidebar_inner_port_width = $(".aboutus_page .sidebar").outerWidth();
	var $width_result = $browser_width - sidebar_inner_port_width;

	$container_inner_port.css("width", $width_result - 24 );
}

function inner_port_wr_tabs_owl_arrows()
{
	//  ------------------------  .wireframes - tabs and arrows

	var $wireframes_topbar_tab1 = $('.wireframes').find('.topbar').find('.tab1');
	var $wireframes_topbar_tab2 = $('.wireframes').find('.topbar').find('.tab2');

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

	// NEXT PREV ARROWS FOR OWL CAROUSEL

	var $img_slide_prev = $('.img_slide_prev');
	var $img_slide_next = $('.img_slide_next');
	var $wr_slide_prev = $('.wr_slide_prev');
	var $wr_slide_next = $('.wr_slide_next');
	var $img_post_slide_prev = $('.img_post_slide_prev');
	var $img_post_slide_next = $('.img_post_slide_next');
	var $aboutslider_prev = $('.aboutslider_prev');
	var $aboutslider_next = $('.aboutslider_next');

	// IMG_SLIDE

	$img_slide_prev.click(function()
	{
		$owl_img.trigger('prev.owl.carousel');
	});
	$img_slide_next.click(function()
	{
		var totalItems = $('.img_slides').find('.owl-item').length;
		var getItemBeforeLast = totalItems - 2;
		var currentIndex = $('.img_slides').find('.owl-item.active').index() + 1;

		if (currentIndex <= getItemBeforeLast )
		{
			$owl_img.trigger('next.owl.carousel');
		}
	});

	// WR_SLIDE

	$wr_slide_prev.click(function()
	{
		$owl_wr.trigger('prev.owl.carousel');
	});
	$wr_slide_next.click(function()
	{
		var totalItems = $('.wr_slides').find('.owl-item').length;
		var getItemBeforeLast = totalItems - 2;
		var currentIndex = $('.wr_slides').find('.owl-item.active').index() + 1;

		if (currentIndex <= getItemBeforeLast )
		{
			$owl_wr.trigger('next.owl.carousel');
		}
	});

	// IMG_POST_SLIDE

	$img_post_slide_prev.click(function()
	{
		$owl_imgpost.trigger('prev.owl.carousel');
	});
	$img_post_slide_next.click(function()
	{
		// var totalItems = $('.img_post_slides').find('.owl-item').length;
		// var getItemBeforeLast = totalItems - 2;
		// var currentIndex = $('.img_post_slides').find('.owl-item.active').index() + 1;

		// if (currentIndex <= getItemBeforeLast )
		// {
		// 	$owl_imgpost.trigger('next.owl.carousel');
		// }
			$owl_imgpost.trigger('next.owl.carousel');
	});

	// ABOUTUS_SLIDE

	$aboutslider_prev.click(function()
	{
		$owl_aboutslider.trigger('prev.owl.carousel');
	});
	$aboutslider_next.click(function()
	{
		$owl_aboutslider.trigger('next.owl.carousel');
	});

};


	
function freewall_grids()
{
//  ------------------------   grid
	// $(function() {
	// 	var wall = new Freewall(".grid_normal");
	// 	wall.reset({
	// 		selector: '.grid-item',
	// 		animate: true,
	// 		fixSize: null,
	// 		gutterX: 8,
	// 		gutterY: 8,
	// 		onResize: function() {
	// 			this.fitWidth();
	// 		}
	// 	});
	// 		wall.fitWidth();
	// });

	$('#grid_posts').masonry({
	  // set itemSelector so .grid-sizer is not used in layout
	  itemSelector: '.post',
	  // use element for option
	  columnWidth: '.post',
	  //percentPosition: true,
	  gutter: 8
	});

	// freewall

	var cnt_li_width = 250;
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
};

function sticky_menu()
{
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
};

function auto_grow(element) {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight)+"px";
}

function inner_portfolio_scroll()
{

	// var $sidebar = $('.inner_portfolio .sidebar');

	// // init
	// var ctrl = new ScrollMagic.Controller({
	//     globalSceneOptions: {
	//         triggerHook: 'onLeave'
	//     }
	// });

	// var iphoneIntroTl = new TimelineMax();
	// 	iphoneIntroTl
	// 		.from($sidebar, 1, {yPercent: 50,xPercent: 100, ease: Power4.easeInOut})
	// 		.to($sidebar, 0.5, {opacity: 0, yPercent: -5}, '0');

	// 	// iPhone back to stylesheet position
	// 	new ScrollMagic.Scene({
	// 		duration: '70%'
	// 	})
	// 	.setTween(iphoneIntroTl)
	// 	.triggerElement($('body')[0])
	// 	.addTo(ctrl);


	// var controller = new ScrollMagic.Controller();

	// var ourScene = new ScrollMagic.Scene(
	// {
	// 	triggerElement: '.sidebar',
	// 	duration: 800,
	// 	triggerHook:  0
	// })
	// .setClassToggle('.sidebar', 'test')
	// .addIndicators()
	// .addTo(controller);
}

function comment_form_input_icon()
{
	$('.comment_form input').click(function()
	{
		$(this).siblings('.icon').addClass('active');
	});
	$('.comment_form input').focusout(function()
	{
		$(this).siblings('.icon').removeClass('active');
	});
}

function inner_post_sidebar_height()
{

	var browser_height = $(window).height();
	var $inner_post_sidebar = $('.inner_post .sidebar');
	var sidebar_height = browser_height - 95;

	$inner_post_sidebar.css('height',sidebar_height);

	$('.inner_post').closest('.scrollbar-dynamic').scroll(function() {
		var $scrollbarY = $(".scrollbar-dynamic > .scroll-element.scroll-y .scroll-bar");
		var sc_top = $scrollbarY.css("top");
		var sc_clear = parseFloat(sc_top);
		if (sc_clear > 35 && scroll_point == 0) {
			var $inner_post_sidebar = $('.inner_post .sidebar');
		
			$inner_post_sidebar.css('top','4px');
			$inner_post_sidebar.css('height','');

		} else if (sc_clear <= 32 )
		{
			var browser_height = $(window).height();
			var $inner_post_sidebar = $('.inner_post .sidebar');
			var sidebar_height = browser_height - 95;

			$('.inner_post .sidebar').css('top','89px');
			$inner_post_sidebar.css('height',sidebar_height);
			
		};
	});
}

function table_info_tabs_responsive()
{
	$('.table_info .tabs span.active').click(function(){
		$(this).closest('.tabs').toggleClass('open');
	});
	$('.table_info .tabs.open a').click(function(){
		$(this).closest('.tabs').removeClass('open');
	});
}

function header_badge_show()
{
	var $award_badge = $('.award .badge');
	var $award_badge_popup = $('.award .badge .popup');

	$award_badge.mouseover(function()
	{
		$award_badge_popup.removeClass('hideit');
	});
	$award_badge.mouseleave(function()
	{
		$award_badge_popup.addClass('hideit');
	});

}

function posts_grid_center()
{
	var browser_width = $(window).width();
	var $grid_posts = $('#grid_posts');
	var $smartmenu = $('#smartmenu');


	//var grid_posts_width = $('#grid_posts .post').width();
	var $grid_posts_post = $('#grid_posts .post');

	$grid_posts.css('width',$smartmenu.width() );

	var posts_width3 = ($grid_posts.width() / 3) - 5.5;
	var posts_width2 = ($grid_posts.width() / 2) - 4.5;

	
	//var width_left_3 = (browser_width - (grid_posts_width * 3)) / 2;
	//var width_left_2 = (browser_width - (grid_posts_width * 2)) / 2;


	if( browser_width > 1111 )
	{
		$grid_posts_post.css('width',posts_width3 );
	} else {
		$grid_posts_post.css('width',posts_width2 );
	}
}

function search_enter_key()
{
	$('.search input').keydown(function(e) {
	    if (e.keyCode == 13) {
	        e.preventDefault();
	        $(this).siblings('.spinner').addClass('play');
	        $(this).css('padding-left','90px');
	    }
	});
}

////////////////// DOCUMENT.READY

$(document).ready(function()
{
	init_scrollbars();

	inner_portfolio_scroll();

	inner_post_sidebar_height();

	freewall_grids();

	search_enter_key();

	header_badge_show();

	posts_grid_center();

	table_info_tabs_responsive();

	comment_form_input_icon();

	contautoWidth_innerport();

	contautoWidth_innerpost();

	contautoWidth_contact();

	contautoWidth_aboutus();

	socialcircle();

	lvl_2_lihover_showlink();

	lvlautoWidth();

	home_menu_openclose();

	prices_click_popup();

	prices_button_n_magic();

	price_hover_nclick_showp();

	prices_li_bgcolor();

	prices_li_adjust_height_load();

	prices_li_click_checkbox();

	modal();

	enable_map_scroll();

	inner_port_wr_tabs_owl_arrows();

	sticky_menu();

	scroll_wheel();

	info_text_tooltip();

	contactpage_form_tabs();

	price_tab_link_click();

	var $tooltipTitle = $(".with-tooltip-title");
	$tooltipTitle.hover( tooltipTitleShow, tooltipTitleHide );


	$(".src_btn").click(function(){
		if( $('.mainheader').hasClass('sticky') )
		{
			search_show_class_sticky();
		} else {
			search_show_class();
		}
	});

	$(".search .icon-close").click(function(){
		if( $('.mainheader').hasClass('sticky') )
		{
			search_show_class_sticky();
		} else {
			search_show_class();
		}
	});



//  ------------------------   slick

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

	
	$owl_img.owlCarousel({
		nav: false,
		items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        thumbImage: false,
        thumbContainerClass: 'cnt-image',
        thumbItemClass: 'cnt-image-li',
        mouseDrag: false,
        touchDrag: false
	});

	$owl_wr.owlCarousel({
		nav: false,
		items: 1,
        thumbs: true,
        thumbsPrerendered: true,
        thumbImage: false,
        thumbContainerClass: 'cnt-wrframe',
        thumbItemClass: 'cnt-wrframe-li',
        mouseDrag: false,
        touchDrag: false
	});

	$owl_imgpost.owlCarousel({
		nav: false,
		items: 1,
		dots: true,
        mouseDrag: false,
        touchDrag: false
	});

	$owl_aboutslider.owlCarousel({
		nav: false,
		items: 1,
		dots: true,
        mouseDrag: false,
        touchDrag: false
	});

	$owl_post_slider.owlCarousel({
		nav: false,
		items: 1,
		dots: true,
        mouseDrag: false,
        touchDrag: false
	});

	$owl_grid_inner_post.owlCarousel({
		//navContainer: '.inner_post_arrows',
		//itemElement: 'div',
		dots: false,
		margin:4,
		loop: false,
		autoWidth:true,
		items:4,
        mouseDrag: false,
        touchDrag: false,
	    navText: [
	      "<span class='arrow_left'><i class='icon icon-slider-next'></i></span>",
	      "<span class='arrow_right'><i class='icon icon-slider-next'></i></span>"
	    ],
	    nav: true
	});


	$('.cnt-image').addClass('scrollbar-inner');
	$('.cnt-image li').addClass('cnt-image-li');
	$('.cnt-wrframe').addClass('scrollbar-inner');
	$('.cnt-wrframe li').addClass('cnt-wrframe-li');


//  ------------------------   inner_portfolio scroll

	// $('.inner_portfolio').closest('.scrollbar-dynamic').scroll(function() {
	// 	var $scrollbarY = $(".scrollbar-dynamic > .scroll-element.scroll-y .scroll-bar");
	// 	var sc_top = $scrollbarY.css("top");
	// 	var sc_clear = parseFloat(sc_top);
	// 	if (sc_clear > 35 && scroll_point == 0) {
	// 		var $browser_width = $(window).width();

	// 		$('.scrollbar-dynamic').scrollTop(86);
	// 		$(".sidebar").addClass("small");
	// 		$('.img_slides').css('overflow','auto');
	// 		$('.wr_slides').css('overflow','auto');

	// 		setTimeout(function(){
	// 			$('.all_images').addClass('full_width');

	// 			$('.img_slides').css('overflow','hidden');
	// 			$('.wr_slides').css('overflow','hidden');

	// 			$('.img_slides').find('.owl-item.active').css("width",$browser_width);
	// 			$('.wr_slides').find('.owl-item.active').css("width",$browser_width);

	// 			$(".full_width").css("width",$browser_width);
	// 		}, 0);
			
	// 		setTimeout(function(){
	// 			scroll_point = 1;
	// 			window.dispatchEvent(new Event('resize'));

	// 		}, 600);

	// 	} else if (sc_clear <= 32 && scroll_point == 1)
	// 	{
	// 		scroll_point = 0;
	// 		var $browser_width = $(window).width();
	// 		var sidebar_inner_port_width = $(".inner_portfolio .sidebar").outerWidth();
	// 		var $width_result = $browser_width - sidebar_inner_port_width;

	// 		$('.img_slides').css('overflow','hidden');
	// 		$('.wr_slides').css('overflow','hidden');

	// 		$('.img_slides').find('.owl-item.active').css("width",$width_result);
	// 		$('.wr_slides').find('.owl-item.active').css("width",$width_result);

	// 		contautoWidth_innerport();

	// 		//contautoWidth_innerpost();

	// 		setTimeout(function(){
	// 			$(".sidebar").removeClass("small");
	// 		}, 110);

	// 		setTimeout(function(){
	// 			window.dispatchEvent(new Event('resize'));
	// 		}, 20);
	// 		//$(".all_images").removeClass('full_width');
	// 	};
	// });


	$(window).on('resize', function()
	{
		posts_grid_center();

		lvlautoWidth();

		contautoWidth_innerport();

		contautoWidth_innerpost();

		contautoWidth_contact();

		prices_li_adjust_height();

	}); //on.resize

});