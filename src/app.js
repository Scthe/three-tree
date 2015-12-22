'use strict';

// TODO make data driven
// TODO 3-point lighting
// TODO Emitter as 3DObject

// TODO pop on spawn
// TODO better spawn position

// TODO all gl settings
// TODO github badge
// TODO mobile - force landscape

import * as config from "./config";
import ParticleSystem from "./particles/particleSystem";
import Ground from "./ground";

class App {
	constructor(){
		console.log('App()');
	}

	init(scene){

		var resolve, reject,
				loadedPromise = new Promise( (resolve_, reject_) => {
					resolve = resolve_;
					reject = reject_;
				});

		// camera
		var cameraOpt = config.camera;
		this.camera = new THREE.PerspectiveCamera(
			cameraOpt.angle,
			cameraOpt.aspect(),
			cameraOpt.near,
			cameraOpt.far);
		this.camera.name = 'camera';
		this.camera.lookAt(cameraOpt.lookAt);
		this.camera.position.setVector(cameraOpt.position);
		this.controls = new THREE.OrbitControls(this.camera);

		/*
		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});
		var radius = 50, segments = 16, rings = 16;
		this.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			sphereMaterial);
		*/

		// light
		var lightCfg = config.light,
		    pointLight = new THREE.PointLight(lightCfg.color);
		pointLight.name = 'light';
		pointLight.position.setVector(lightCfg.position);


		// tree
		var loader = new THREE.OBJLoader();
		loader.load( "vendor/models/tree.obj", function ( object ) {
			var treeCfg = config.tree;
			object = object.children[0];
			object.name = 'tree';
			object.material = treeCfg.material;
			object.position.setVector(treeCfg.position);
			object.scale.set(treeCfg.scale, treeCfg.scale, treeCfg.scale);
			scene.add(object);
			resolve('tree was loaded');
		});

		// ground
		var groundOpt = config.ground,
		    groundGeom = new Ground(groundOpt);
		groundGeom.init();
		var ground = new THREE.Mesh(groundGeom, groundOpt.material);
		ground.name = 'ground';
		ground.position.setVector(groundOpt.position);

		// flowers
		this.particles = new ParticleSystem(scene);

		scene.fog = new THREE.FogExp2(config.fog.color, config.fog.density);

		// scene.add(this.sphere);
		scene.add(ground);
		scene.add(this.camera);
		scene.add(pointLight);

		return loadedPromise;
	}

	update(){
		this.controls.update();
		this.particles.update();
	}

	getCamera(){
		return this.camera;
	}

	getParticleSystem(){
		return this.particles;
	}

	getControls(){
		return this.controls;
	}

}

export default App;
