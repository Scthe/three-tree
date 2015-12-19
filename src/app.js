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
			object.position.set( 0, -150, -150 );
			object.scale.multiplyScalar( 400 );
			scene.add( object );
		});

		// scene.add(this.sphere);
		scene.add(this.camera);
		scene.add(pointLight);
	}

	getCamera(){
		return this.camera;
	}
}

export default App;
