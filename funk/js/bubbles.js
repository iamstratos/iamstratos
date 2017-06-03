function createBubbles(element, speed) {
	var randomLeft = Math.floor(Math.random() * 100) + 1;
	var getBubbleSize = ["large", "small"];
	var rand = Math.random();
	rand *= getBubbleSize.length;
	var bubbleSize = getBubbleSize[Math.floor(rand)];
	var randomOpacity = Math.floor(Math.random() * (9 - 8 + 1)) + 8;
	var scaleValue = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
	var randomScale = "scale(0." + scaleValue + ")";

	if (speed === true)
	{
		// var verticalSpeed = 3;
		var verticalSpeed = Math.round(Math.random() * (6 - 5 + 1) + 3);
	} else {
		var verticalSpeed = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
	}
	
	var frequency = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	var randomAnimation = "moveclouds " + verticalSpeed + "s linear infinite, sideWays " + frequency + "s  ease-in-out infinite alternate";

	$(element).append('<div class="bubble ' + bubbleSize + '" style="left:' + randomLeft + '%;opacity:0.' + randomOpacity + ';transform:' + randomScale + ';-moz-transform:' + randomScale + ';-webkit-transform:' + randomScale + ';-webkit-animation:' + randomAnimation + ';-moz-animation:' + randomAnimation + ';-ms-animation:' + randomAnimation + ';"></div>');
	
}

function startBubbles()
{
	$('#bubbles').removeClass('clean');

	for (i = 0; i < 20; i++) { //create bubble every .5 seconds
		(function(i) {
			var bTimer = window.setTimeout(function() {
				if ( $('#bubbles').hasClass('clean') )
				{
					return;
				}
				createBubbles("#bubbles");
			}, i * 500);
		}(i));
	}
}

function loadingBubbles()
{
	for (i = 0; i < 15; i++) { //create bubble every .5 seconds
		(function(i) {
			var bLoadTimer = window.setTimeout(function() {
				createBubbles(".loader", true);
			}, i * 700);
		}(i));
	}
}

function stopBubbles()
{
	$('.bubble').remove();
	$('#bubbles').addClass('clean');
}
// setInterval(function()
// {
	
// 	$(".bubble").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function()
// 	{
// 		$(this).remove();
// 	});
// }, 1200);


$("#bubbles, .loader").on("click", ".large", function() {
	var bubble = $(this);
	$(this).css("transform", "scale(1.1)");
	setTimeout(function() {
		$(bubble).addClass('burst');
		// $(bubble).css("background", "url('../files/large-bubble-burst.png')")
		setTimeout(function() {
			// $(bubble).css("opacity", "0");
			$(bubble).remove();
		}, 50);
	}, 20);
});

$("#bubbles, .loader").on("click", ".small", function() {
	var bubble = $(this);
	$(this).css("transform", "scale(1.1)");
	setTimeout(function() {
		$(bubble).addClass('burst');
		// $(bubble).css("background", "url('../files/small-bubble-burst.png')")
		setTimeout(function() {
			// $(bubble).css("opacity", "0");
			$(bubble).remove();
		}, 50);
	}, 20);
});