function gopage2()
{
	setTimeout(function()
	{
		$('.page1').addClass('hideit');
		$('.page2').removeClass('hideit');
	}, 6100)
}

function dropdown()
{
	$('.select .box').on('touchstart', function()
	{
		if( $(this).hasClass('clicked') )
		{
			$(this).removeClass('clicked');
		} else {
			$(this).addClass('clicked');
		}
	});
}

function stopMovement()
{
	// this.$scrollableEl.on('touchmove', function(event){
	//   event.comesFromScrollable = true;
	//   //when you have containers that are srollable but 
	//   //doesn't have enough content to scroll sometimes:
	//   //event.comesFromScrollable = el.offsetHeight < el.scrollHeight;
	// })

	// $document.on('touchmove', function(event){
	//     if(!event.comesFromScrollable){
	//       event.preventDefault()
	//     }
	//   })
	var $scrollableEl = $(document);

	$(this).on('touchmove', function(event){
	  event.stopImmediatePropagation();
	});
}

function selectOption()
{
	$('.select ul.list li').on('click', function()
	{
		var thisText = $(this).text();
		var $selectBox = $('.select .box');

		$selectBox.find('p').text(thisText);
		$selectBox.removeClass('clicked');
	});
}

/////////// DOCUMENT READY

$(document).ready(function()
{
	selectOption();

	dropdown();

	gopage2();

	stopMovement();

	// document.ontouchmove = function(e){ e.preventDefault(); }

});

$(window).on('resize', function()
{
	
});