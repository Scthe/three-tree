'use strict';

// TODO native Position class
// TODO UI for config

// TODO all gl settings
// TODO materials

import * as config from "./config";
import ParticleSystem from "./particleSystem";

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
			object.name = 'tree';
			object.material = treeCfg.material;
			object.position.setVector(treeCfg.position);
			object.scale.set(treeCfg.scale, treeCfg.scale, treeCfg.scale);
			scene.add(object);
			resolve('tree was loaded');
		});

		// ground
		var groundOpt = config.ground,
		    groundGeom = this._createGround(),
		    ground = new THREE.Mesh(groundGeom, groundOpt.material);
		ground.name = 'ground';
		ground.position.setVector(groundOpt.position);

		// flowers
		this.particles = new ParticleSystem(scene);

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

	_createGround(){
		var groundOpt = config.ground;

		var geom = new THREE.Geometry(),
		    segW = groundOpt.width / (groundOpt.gridDesity - 1),
		    segH = groundOpt.height / (groundOpt.gridDesity - 1);

		for (var i = 0; i < groundOpt.gridDesity; i++) {
			for (var j = 0; j < groundOpt.gridDesity; j++) {
				var x = segW * i - groundOpt.width / 2,
				    z = segH * j - groundOpt.height / 2,
				    y = Math.random() * groundOpt.heightVariance - groundOpt.heightVariance/2;

				var v = new THREE.Vector3(x, y, z);
				geom.vertices.push(v);
			}
		}

		for (var i = 0; i < groundOpt.gridDesity -1; i++) {
			var idxOfFirstInRow = i * groundOpt.gridDesity,
			    idxOfFirstInNextRow = (i+1) * groundOpt.gridDesity;

			for (var j = 0; j < groundOpt.gridDesity -1; j++) {
				var i1 = idxOfFirstInRow + j,
				    i2 = idxOfFirstInNextRow + j;
				var f1 = new THREE.Face3(i1,   i1+1, i2  );
				var f2 = new THREE.Face3(i2+1, i2,   i1+1);
				geom.faces.push(f1);
				geom.faces.push(f2);
			}
		}

		geom.computeFaceNormals();

		return geom;
	}

	getCamera(){
		return this.camera;
	}
}

export default App;
