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
	light: {
		color: 0xffffff,
		position: new THREE.Vector3(275, 375, 260)
	},
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
		heightVariance: 20,
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
		scale   : [10, 15],
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
				1.0: 0.8,
				0.7: 1.0,
				0.5: 1.0,
				0.0: 0.0
			}),
			new AnimatedProperty('scale', {
				1.0: 0.5,
				0.5: 1.0,
				0.0: 1.0
			})
		]
	},
	fog: {
		color: 0xffffff,
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
