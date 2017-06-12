import React from 'react';

class Timeline extends React.Component {

    componentDidMount()
	{
		this.updateCanvas();
	}

	updateCanvas()
	{
		//copy main video into sticky vid canvas
		var tlCanvas = document.getElementById('timeline-canvas');
        var ctx = tlCanvas.getContext('2d');

        tlCanvas.width = (window.innerWidth / 2);
        tlCanvas.height = window.innerHeight;

		//draw to canvas
		ctx.save();
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(447,0);
            ctx.lineTo(447,325);
            ctx.lineTo(0,325);
            ctx.closePath();
            ctx.clip();
            ctx.translate(0,0);
            ctx.translate(0,0);
            ctx.scale(1,1);
            ctx.translate(0,0);
            ctx.strokeStyle = 'rgba(0,0,0,0)';
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.miterLimit = 4;
            ctx.save();
            ctx.restore();
            ctx.save();
            ctx.restore();
            ctx.save();
            ctx.translate(-204,-205);
            ctx.save();
            ctx.save();
            ctx.fillStyle = "#ff0000";
            ctx.translate(205,205);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(110,137);
            ctx.lineTo(109.819,136.534);
            ctx.lineTo(110,137);
            ctx.closePath();
            ctx.moveTo(-0.5,0);
            ctx.bezierCurveTo(-0.5,37.9933,2.33915,81.9389,17.5737,111.599);
            ctx.bezierCurveTo(25.2003,126.448,35.9546,137.758,51.0465,142.922);
            ctx.bezierCurveTo(66.1311,148.083,85.4611,147.072,110.181,137.466);
            ctx.lineTo(109.819,136.534);
            ctx.bezierCurveTo(85.2302,146.089,66.1559,147.034,51.3702,141.976);
            ctx.bezierCurveTo(36.5917,136.919,26.0095,125.835,18.4633,111.143);
            ctx.bezierCurveTo(3.3522,81.7225,0.5,38.0067,0.5,0);
            ctx.lineTo(-0.5,0);
            ctx.closePath();
            ctx.moveTo(110.181,137.466);
            ctx.bezierCurveTo(206.556,100.014,290.125,110.523,349.588,152.284);
            ctx.bezierCurveTo(409.057,194.05,444.5,267.134,444.5,355);
            ctx.lineTo(445.5,355);
            ctx.bezierCurveTo(445.5,266.866,409.943,193.45,350.162,151.466);
            ctx.bezierCurveTo(290.375,109.477,206.444,98.9855,109.819,136.534);
            ctx.lineTo(110.181,137.466);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            ctx.restore();
            ctx.restore();
            ctx.restore();
            ctx.restore();

	}

    render(){
        return (
            <div className='Timeline'>
                <canvas id='timeline-canvas'></canvas>
            </div>
        )
    }
}

export default Timeline