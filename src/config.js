'use strict';

var cfg = {
	camera: {
		angle: 45,
		near: 0.1,
		far: 10000,
		aspect: () => {
			// return window.innerWidth / window.innerHeight;
			return width() / height();
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
