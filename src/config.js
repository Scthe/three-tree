'use strict';

var cfg = {
	camera: {
		angle: 45,
		near: 0.1,
		far: 10000,
		aspect: () => {
			return width() / height();
		},
		position: new THREE.Vector3(0, 0, 650),
		lookAt: new THREE.Vector3()
	},
	light: {
		color: 0x000000,
		position: new THREE.Vector3(10, 50, 130)
	},
	tree: {
		scale: 400,
		position: new THREE.Vector3(0, -150, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0xff0000,
			// shading: THREE.FlatShading
		})
	},
	ground: {
		gridDesity: 25,
		width:  1500,
		height: 1500,
		heightVariance: 20,
		position: new THREE.Vector3(0, -160, 0),
		material: new THREE.MeshLambertMaterial({ // new THREE.MeshNormalMaterial()
			color: 0xff0000,
			// shading: THREE.FlatShading
		})
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
			force: new THREE.Vector3(1, -0.1, 1),
			speed: .001
		},
		position: new THREE.Vector3(0, 0, 0),
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
