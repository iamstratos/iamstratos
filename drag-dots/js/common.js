var pageWidth = $(window).width(),
		pageHeight = $(window).height(),
		dotsDistance = 15,
		dotHeight = 14,
		findDotsNum = pageHeight / (dotsDistance + dotHeight),
		dotsNum = Math.floor(findDotsNum),
		$dragDots = $('.drag').children(),
		clicking = false;

console.log("dotsNum: " + dotsNum);

	

$(function()
{
	

	$(document).mousedown(function(e){
		clicking = true;

		$('.drag').append('<div class="drag__dot" style="top: ' + e.pageY + 'px; left: ' + e.pageX + 'px;"></div>');
		console.log('mousedown');
	});

	$(document).mouseup(function(){
		clicking = false;
		console.log('mouseup');
		console.log('click released, no more move event');
	})

	$(document).mousemove(function(e){
		if(clicking == false) return;

		// Mouse click + moving logic here
		$('.drag').append('<div class="drag__dot" style="top: ' + e.pageY + 'px; left: ' + e.pageX + 'px;"></div>');
	});

});
