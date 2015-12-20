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
		},
		lookAt: new THREE.Vector3()
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
	flowers: {
		count   : 500,
		range   : 300,
		emitRate: 60,
		life    : [75, 225],
		size    : [10, 20],
		velocity   : 3.5,
		// rotVelocity: 7.5,
		wind: {
			x: 1,
			y: -0.1,
			z: 1,
			speed: .001
		},
		position: {
			x: 0,
			y: 0,
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
