window.onload = function() {
    var c = document.getElementByClassName("background");
    var ctx = c.getContext("2d");
    var img = document.getElementByClassName("bg-video");
    ctx.drawImage(img,10,10);
};