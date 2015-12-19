'use strict';

var cfg = {
	camera: {
		angle: 45,
		near: 0.1,
		far: 10000,
		aspect: () => {
			// return window.innerWidth / window.innerHeight;
			return width() / height();
		},
		position: {
			x: 0,
			y: 0,
			z: 650
		}
	},
	ground: {
		gridDesity: 25,
		width:  1500,
		height: 1500,
		heightVariance: 20,
		position: {
			x: 0,
			y: -160,
			z: 0
		}
	},
	width: width,
	height: height
};

function width(){
	// window.innerWidth, window.innerHeight
	return document.documentElement.clientWidth;
}

function height(){
	return document.documentElement.clientHeight;
}

export default cfg;
