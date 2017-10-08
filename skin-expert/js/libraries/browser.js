'use strict';

// var $html = $('html');
var htmlEl = document.documentElement;
var isDesktop = (htmlEl.className.indexOf('desktop') > -1);
var isNonDesktop = ! isDesktop;
var isMobile = (htmlEl.className.indexOf('mobile') > -1);
var isTablet = (htmlEl.className.indexOf('tablet') > -1);
var isIOS = (htmlEl.className.indexOf('ios') > -1);


var ua = navigator.userAgent || navigator.vendor || window.opera;
var isChrome = /Chrome/.test(ua);// && /Google Inc/.test(ua);
var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);///Apple Computer/.test(ua);
var isFirefox = /Firefox/.test(ua) && /Gecko/.test(ua);
var isEdge = /Edge\/\d./i.test(ua);
var isTrident = /Trident\/\d./i.test(ua);
var isWebkit = 'WebkitAppearance' in document.documentElement.style
var isFBWebview = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);

if (isFBWebview)
	// $html.addClass('fb-webview');
	// htmlEl.classList.push('fb-webview');
	htmlEl.className += (' fb-webview');
	

if (isFirefox)
	// $html.addClass('firefox');
	// htmlEl.classList.push('firefox');
	htmlEl.className += (' firefox');

if (isTrident)
{
	// htmlEl.classList.push('trident');
	htmlEl.className += (' trident');
	// $html.addClass('trident');
	var idx = navigator.userAgent.indexOf('Trident/')+'Trident/'.length;
	if (navigator.userAgent.indexOf('MSIE ') > -1)
		// $html.addClass('oldie');
		// htmlEl.classList.push('oldie');
		htmlEl.className += (' oldie');

}

if (isEdge)
{
	htmlEl.className += (' edge');
	htmlEl.className = htmlEl.className.replace('trident', '');
	// $html.addClass('edge')
	// 		.removeClass('trident');
	console.log('Edge browser detected.');
}


if (isSafari)
	// $html.addClass('safari');
	htmlEl.className += (' safari');

if (isChrome)
	// $html.addClass('chrome');
	htmlEl.className += (' chrome');

// var isWebkit = isChrome || isSafari;
if (isWebkit)
	// $html.addClass('webkit');
	htmlEl.className += (' webkit');
var isIE = isTrident || isEdge;