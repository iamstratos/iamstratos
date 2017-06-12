import React from 'react';
// import videoUrl from '../../../assets/img/timelapse.mp4';

class BackgroundCanvas extends React.Component {
	
	componentDidMount()
	{
		this.updateCanvas();
	}

	updateCanvas()
	{

		//copy main video into sticky vid canvas
		function initVideo() {
			var video = document.getElementById('introVideo');
			var canvas = document.getElementById('canvas');
			var context = canvas.getContext('2d');

			canvas.width = 1000;
			canvas.height = 1000;

			video.addEventListener('playing', function(){
				draw(this,context,1000,1000);
			},false);
		}

		//draw video to canvas
		function draw(video,c,w,h) {
			if(video.paused || video.ended) return false;
				c.drawImage(video,0,0,w,h);
				setTimeout(draw,20,video,c,w,h);
		}

		initVideo();
	}

	render()
	{
		return (
			<div className='BackgroundCanvas'>
				<div className='videoMask'></div>
				<video id='introVideo' className='bgVideo' autoPlay muted loop src='../../../assets/img/timelapse.mp4'/>
				<canvas id='canvas' width='100%' height='100%'></canvas>
			</div>
		)
	}
}

export default BackgroundCanvas