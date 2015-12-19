'use strict';

import * as config from "./config";

class App {
	constructor(){
		console.log('App()');
	}

	init(scene){
		var cameraOpt = config.camera;
		this.camera = new THREE.PerspectiveCamera(
			cameraOpt.angle,
			cameraOpt.aspect(),
			cameraOpt.near,
			cameraOpt.far);
		this.camera.position.x = cameraOpt.position.x;
		this.camera.position.y = cameraOpt.position.y;
		this.camera.position.z = cameraOpt.position.z;

		var sphereMaterial = new THREE.MeshLambertMaterial({
			color: 0xCC0000
		});

		var radius = 50, segments = 16, rings = 16;

		this.sphere = new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, rings),
			sphereMaterial);

		var pointLight = new THREE.PointLight( 0xFFFFFF );
		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		var materialScene = new THREE.MeshLambertMaterial({
			color: 0xff0000,
			// shading: THREE.FlatShading
		});

		var loader = new THREE.OBJLoader();
		loader.load( "vendor/models/tree.obj", function ( object ) {
			object.material = materialScene;
			object.position.set( 0, -150, 0 );
			object.scale.multiplyScalar( 400 );
			scene.add( object );
		});

		var groundOpt = config.ground;
		var groundGeom = this._createGround();
		// var ground = new THREE.Mesh( groundGeom, new THREE.MeshNormalMaterial() );
		var ground = new THREE.Mesh(groundGeom, materialScene);
		ground.position.set(groundOpt.position.x,
												groundOpt.position.y,
												groundOpt.position.z );

		// scene.add(this.sphere);
		scene.add(ground);
		scene.add(this.camera);
		scene.add(pointLight);
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
