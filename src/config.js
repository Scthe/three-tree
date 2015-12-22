'use strict';

import AnimatedProperty from "./particles/animatedProperty";

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
	lights: [
		{
			name: 'light_1',
			intensity: 1.0,
			distance: 2200,
			color: 0xffffff,
			position: new THREE.Vector3(570, 420, 80)
		}, {
			name: 'light_2',
			color: 0xebc3a1,
			intensity: 0.35,
			distance: 2100,
			decay: 0.5,
			position: new THREE.Vector3(-400, 375, 130)
		}, {
			name: 'light_3',
			color: 0xa1c8eb,
			intensity: 0.15,
			distance: 2100,
			decay: 0.6,
			position: new THREE.Vector3(-150, 40, -420)
		}
	],
	tree: {
		scale: 400,
		position: new THREE.Vector3(0, -150, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0x4d4d4d
		})
	},
	ground: {
		gridDensity: 45,
		width:  3000,
		height: 3300,
		heightVariance: 30,
		position: new THREE.Vector3(0, -160, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0xf5f5f5
		})
	},
	flowers: {
		count   : 1500,
		// count   : 1,
		range   : 170,
		emitRate: 60,
		life    : [75, 225],
		scale   : [8, 13],
		velocity   : 1.6,
		rotVelocity: 0.07,
		wind: {
			force: new THREE.Vector3(1.8, -0.1, -2.3),
			speed: 0.5
		},
		position: new THREE.Vector3(0, 100, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0xcf4f93,
			// side: THREE.DoubleSide
		}),
		animations: [
			new AnimatedProperty('material.opacity', {
				1.0: 0.0,
				0.6: 1.0,
				0.0: 0.0
			}),
			/*new AnimatedProperty('scale', {
				1.0: 0.7,
				0.6: 1.0,
				0.0: 0.5
			})*/
		]
	},
	fog: {
		color: 0xf0f0f0,
		density: 0.0005
	},
	background: new THREE.Color(0xe3e3e3),
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
