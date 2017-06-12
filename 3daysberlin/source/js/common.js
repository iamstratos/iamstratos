var v = document.getElementById("introVideo");
var mycanvas = document.createElement("canvas");
mycanvas.id = "mycanvas";
document.body.appendChild(mycanvas);
var ctx = mycanvas.getContext("2d");
ctx.drawImage(v,1,1);