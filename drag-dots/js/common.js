var pageWidth = $(window).width(),
		pageHeight = $(window).height(),
		dotsDistance = 15,
		dotHeight = 14,
		dotInnerWidth = (dotsDistance + dotHeight),
		findDotsNum = pageHeight / (dotsDistance + dotHeight),
		dotsNum = Math.floor(findDotsNum),
		$dragDots = $('.drag').children(),
		clicking = false,
		mouseX = -100,
		mouseY = -100,
		prevX = 0,
		prevY = 0;

console.log("dotsNum: " + dotsNum);

	

$(function()
{
	

	$(document).mousedown(function(e){
		clicking = true;

		mouseX = e.pageX,
		mouseY = e.pageY;
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
		// $('.drag').append('<div class="drag__dot" style="top: ' + e.pageY + 'px; left: ' + e.pageX + 'px;"></div>');
		prevX = e.pageX,
		prevY = e.pageY;

		
		var dotsToDraw = 0;

		if (mouseX >= prevX)
		{
			dotsToDraw = Math.floor((mouseX - prevX) / dotInnerWidth);

			for(var i = 0; i < dotsToDraw; i++)
			{
				var num = dotInnerWidth * i;
				$('.drag').append('<div class="drag__dot" style="top: ' + mouseY + 'px; left: ' + (mouseX - num) + 'px;"></div>');
			}
		}
		else if (mouseX < prevX)
		{
			dotsToDraw = Math.floor((prevX - mouseX) / dotInnerWidth);

			for(var i = 0; i < dotsToDraw; i++)
			{
				var num = dotInnerWidth * i;
				$('.drag').append('<div class="drag__dot" style="top: ' + mouseY + 'px; left: ' + (mouseX + num) + 'px;"></div>');
			}
		}
	});

});
