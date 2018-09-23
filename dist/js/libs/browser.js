var htmlEl = document.documentElement;
var isDesktop = (htmlEl.className.indexOf('desktop') > -1);
var isNonDesktop = ! isDesktop;
var isMobile = (htmlEl.className.indexOf('mobile') > -1);
var isTabvar = (htmlEl.className.indexOf('tabvar') > -1);
var isIOS = (htmlEl.className.indexOf('ios') > -1);

var ua = navigator.userAgent || navigator.vendor || window.opera;
var isChrome = /Chrome/.test(ua);
var isSafari = /Safari/.test(ua) && !/Chrome/.test(ua);
var isFirefox = /Firefox/.test(ua) && /Gecko/.test(ua);
var isEdge = /Edge\/\d./i.test(ua);
var isTrident = /Trident\/\d./i.test(ua);
var isWebkit = 'WebkitAppearance' in document.documentElement.style
var isFBWebview = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
var isIE = isTrident || isEdge;

if (isFBWebview)
	htmlEl.className += (' fb-webview');

if (isFirefox)
	htmlEl.className += (' firefox');

if (isTrident)
{
	htmlEl.className += (' trident');
	var idx = navigator.userAgent.indexOf('Trident/')+'Trident/'.length;
	if (navigator.userAgent.indexOf('MSIE ') > -1)
		htmlEl.className += (' oldie');
}

if (isEdge)
{
	htmlEl.className += (' edge');
	htmlEl.className = htmlEl.className.replace('trident', '');
	console.log('Edge browser detected.');
}

if (isSafari)
	htmlEl.className += (' safari');

if (isChrome)
	htmlEl.className += (' chrome');

if (isWebkit)
	htmlEl.className += (' webkit');