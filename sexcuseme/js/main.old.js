function setSectionMiddle(getHeight,applyTo,number)
{
	var browserHeight = $(window).height();
	var $section = $(getHeight);
	var sectionHeight = $section.outerHeight();
	var findMarginTop = (browserHeight - sectionHeight) / number;

	$(applyTo).css('margin-top', findMarginTop)
}

function initSlider()
{
	$('section.slider').slick({
		variableWidth: true,
		arrows: true,
		// centerMode: true,
		infinite: false
	});

	$('.prev').click(function()
	{
		$('section.slider').slick('slickPrev');
	});

	$('.next').click(function()
	{
		$('section.slider').slick('slickNext');
	});
}

function initOwl()
{
	var $slider = $('section.slider');

	var $sliderActive = $slider.find('.owl-item.active');
	var $sliderItems = $slider.find('.owl-item');
	var sliderItemsLength = $sliderItems.length;
	var sliderActiveLength = $sliderActive.length;

	$slider.owlCarousel({
		// variableWidth: true,
		// arrows: false,
		// infinite: false
		autoWidth: true,
		//center: true,
		items: 1
	});


	// ------------- Setup custom arrows

	$('.prev').click(function()
	{
		$slider.trigger('prev.owl');
	});

	$('.next').click(function()
	{
		$slider.trigger('next.owl');
	});

	// ------------- Setup Mousewheel for Owl

	$slider.on('mousewheel', '.owl-stage', function (e) {
		var $sliderActive = $slider.find('.owl-item.active');
		var $sliderItems = $slider.find('.owl-item');
		var sliderItemsLength = $sliderItems.length;
		var sliderActiveLength = $sliderActive.length;

		if( sliderItemsLength <= sliderActiveLength )
		{
			$('.prev').hide();
			$('.next').hide();
		} else {

			console.log('items: ' + sliderItemsLength);
			console.log('active: ' + sliderActiveLength);

			if (e.deltaY>0) {
				$slider.trigger('next.owl');
			} else {
				$slider.trigger('prev.owl');
			}
			e.preventDefault();

		}
	});
}

// ------------- Setup custom carousel

function setupCarousel(thumb_size, thumb_margin){

	var slidesToScroll = 2;
	var $thumbsEl = $("#allslides");

	function calculateThumbOffsets()
	{
		var transformString = $thumbsEl.css('transform') || '';

		var stringParts = transformString.split(",");
		var xOffsetString = stringParts[4] || "0";

		var xOffset = Number(xOffsetString);

		var wrapperWidth = $thumbsEl.parent().innerWidth();
		var thumbWidth = thumb_size;
		// console.log("thumbWidth: " + thumbWidth );
		var thumbTotalWidth = thumb_size + thumb_margin;
		// console.log("thumbTotalWidth: " + thumbTotalWidth );
		var numberofVisibleItems = (wrapperWidth) / thumbTotalWidth;
		// console.log("numberofVisibleItems: " + numberofVisibleItems );

		var childrenCount = $thumbsEl.children('.slide').length;
		// console.log("childrenCount: " + childrenCount );
		var totalChildrenWidth = thumbTotalWidth * childrenCount;
		// console.log("totalChildrenWidth: " + totalChildrenWidth );

		var maxXoffset = totalChildrenWidth - numberofVisibleItems * thumbTotalWidth;

		var xtoScroll = thumbTotalWidth * slidesToScroll;
		var nextXOffset = xOffset - xtoScroll;

		var xxxoff = {xOffset: xOffset}
		return {
			xOffset: xOffset,
			maxXoffset: maxXoffset,
			thumbTotalWidth: thumbTotalWidth
		};
	}

	function scrollNext()
	{	
		var o = calculateThumbOffsets();
		var currentOffset;

		currentOffset = Math.round(o.xOffset - o.thumbTotalWidth);
		if ( currentOffset < -o.maxXoffset )
		{
			currentOffset = - o.maxXoffset;
		}

		// var prefixes = ['','-webkit-','-moz-','-o-','-ms-'];

		// for(var i = 0; i < 5; i++)
		// {
		// 	$thumbsEl.css(prefixes[i] + 'transform','translate3d(' + currentOffset + 'px, 0, 0)');
		// };

		$thumbsEl.css('transform','translate3d(' + currentOffset + 'px, 0, 0)');
		console.log('currentOffset:' + currentOffset);
	}

	function scrollPrev()
	{
		var o = calculateThumbOffsets();
		var currentOffset;

		currentOffset = Math.round(o.xOffset + o.thumbTotalWidth);
		if ( currentOffset > 0 )
		{
			currentOffset = 0;
		}

		// var prefixes = ['','-webkit-','-moz-','-o-','-ms-'];

		// for(var i = 0; i < 5; i++)
		// {
		// 	$thumbsEl.css(prefixes[i] + 'transform','translate3d(' + currentOffset + 'px, 0, 0)');
		// };

		$thumbsEl.css('transform','translate3d(' + currentOffset + 'px, 0, 0)');
		console.log('currentOffset:' + currentOffset);
	}


	$thumbsEl.mousewheel(function(e)
	{
		e.preventDefault();

	    if (e.deltaY < 0) {
	    	scrollNext();
	    }
	    else {
	    	scrollPrev();
	    }
	});

	$(window).on('resize', function(e)
	{
		var o = calculateThumbOffsets();

		var currentOffset = Math.round(o.xOffset - o.thumbTotalWidth);

		if ( currentOffset < -o.maxXoffset )
		{
			currentOffset = - o.maxXoffset;
		}
		if ( currentOffset > 0 )
    	{
    		currentOffset = 0;
    	}

    	// var prefixes = ['','-webkit-','-moz-','-o-','-ms-'];

    	// for(var i = 0; i < prefixes.length ; i++)
    	// {
    	// 	$thumbsEl.css(prefixes[i] + 'transform','translate3d(' + currentOffset + 'px, 0, 0)');
    	// };

    	$thumbsEl.css('transform','translate3d(' + currentOffset + 'px, 0, 0)');
	});

	$(window).trigger('resize');

	$(".arrows .prev").click(function()
	{
		scrollPrev();
	})
	$(".arrows .next").click(function()
	{
		scrollNext();
	});
}

function stopCarouselBlank()
{
	var $slider = $('section.slider');

	var $sliderActive = $slider.find('.owl-item.active');
	var $sliderItems = $slider.find('.owl-item');
	var sliderItemsLength = $sliderItems.length;
	var sliderActiveLength = $sliderActive.length;
	
	if( sliderItemsLength <= sliderActiveLength )
	{
		$('.prev').hide();
		$('.next').hide();
	} else if ( sliderItemsLength > sliderActiveLength ) {
		$('.prev').show();
		$('.next').show();
	}
}

function fadeoutTip()
{
	setTimeout(function()
	{
		$('.tip').removeClass('hideit');
	}, 100);

	setTimeout(function()
	{
		$('.tip').addClass('hideit');
	}, 4000);
}

function cloneSlideForm()
{
	$('.vote').click(function(){

		$('.modal_bg').removeClass('hideit');
		$('.step1').removeClass('hideit');

		var toyImg = $(this).siblings('.toy').attr('data-img');
		var votesNum = $(this).siblings('span.votes').attr('data-votes');
		var h1Title = $(this).siblings('h1').attr('data-title');
		var pDesc = $(this).siblings('p.desc').attr('data-desc');

		$('.step1 .toyinfo .toy').css('background-image', 'url('+ toyImg +')');
		$('.step1 span.votes').text(votesNum);
		$('.step1 .text h1').text(h1Title);
		$('.step1 .text p.desc').text(pDesc);

		setSectionMiddle('.step1 .wrapper', '.step1 .wrapper', 3.5);
	});
}

// function cloneSlideSuccess()
// {
// 	$('.submit').click(function(){

// 		var closeBtn = "<span class='close'></span>";
// 		var congratsTitle = "<h2>Συγχαρητήρια!</h2>";
// 		var congratsText = "<p class='congrats'>Ψήφισες για το παιχνίδι της χρονιάς και μπήκες στην κλήρωση για super δώρα. Οι νικητές θα ανακοινωθούν στις <span class='green'>30/12/2016</span>\
// 							<br><br>\
// 							Μέχρι τότε μπορείς να διαλέξεις το αγαπημένο σου παιχνίδι μέσα από μία <strong>τεράστια ποικιλία παιχνιδιών.</strong>\
// 							<br><a href='#'>Ανακάλυψέ τα εδώ!</a>\
// 							<br><br>\
// 							Αν θέλεις όμως να έχεις μία ακόμα συμμετοχή στην κλήρωση μπορείς να ψηφίσεις ένα ακόμα αγαπημένο σου παιχνίδι.\
// 							</p>";

// 		$('.modal_bg').removeClass('hideit');
// 		$(this).closest('.slide').clone().appendTo('.modal_bg').addClass('modal');

// 		$('.modal').find('span.votes').insertBefore('.modal img');
// 		$('.modal h1').remove();
// 		$('.modal .desc').remove();
// 		$('.modal .category').remove();
// 		$(closeBtn).insertBefore('.modal span.votes');
// 		$(congratsTitle).insertAfter('.modal img');
// 		$(congratsText).insertAfter('.modal h2');
// 		$('.modal .vote p').html('Ψήφισέ ξάνα');
// 		$('.modal .vote').addClass('voteagain').removeClass('vote');
// 	});
// }

function removeSlide()
{
	$(document).on('click', '.modal span.close',function(){
		$('.modal').addClass('hideit');
		$('.modal_bg').addClass('hideit');
	});

	// $(document).on('click', '.modal_bg', function()
	// {
	// 	$('.modal').addClass('hideit');
	// 	$('.modal_bg').addClass('hideit');
	// });
}

function keepInputLabelClass()
{
	$('.details input').on('focus', function()
	{
		$(this).siblings('label').addClass('high');
	});

	$('.details input').focusout(function()
	{
		if( !$(this).val() )
		{
			$(this).siblings('label').removeClass('high');
		}
	});
}

function step1formSubmit()
{
	$('.step1 form').submit(function(e)
	{
		var $step1 = $('.step1');
		var $step2 = $('.step2');

		$step1.addClass('hideit');
		$step2.removeClass('hideit');



		setSectionMiddle('.step2 .wrapper', '.step2 .wrapper', 2);

		e.preventDefault();
	});
}

/////////// DOCUMENT READY

$(document).ready(function()
{
	//initOwl();
	
	//initSlider();

	step1formSubmit();

	keepInputLabelClass();

	setupCarousel(300, 54);

	cloneSlideForm();

	removeSlide();

	//stopCarouselBlank();

	fadeoutTip();

	setSectionMiddle('.card', '.card', 2);

	setSectionMiddle('.slide', '#slider', 2);

	// setSectionMiddle('.step1 .wrapper', '.step1 .wrapper', 3.5);
	// setSectionMiddle('.step2 .wrapper', '.step2 .wrapper', 2);

});

$(window).on('resize', function()
{
	// setTimeout(function(){
	// 	stopCarouselBlank();
	// }, 10);

	setSectionMiddle('.card', '.card', 2);

	setSectionMiddle('.slide', '#slider', 2);

	setSectionMiddle('.step1 .wrapper', '.step1 .wrapper', 3.5);
	setSectionMiddle('.step2 .wrapper', '.step2 .wrapper', 2);
});