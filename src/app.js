'use strict';

import * as config from "./config";

class App {
	constructor(){
		console.log('App()');
		// this.gl = gl;
		// this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		// this.gl.enable(this.gl.BLEND);
		// this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

		window.addEventListener("resize", () => {
			this.onResize();
		});
	}

	init(scene){
		var cameraOpt = config.camera;
		this.camera = new THREE.PerspectiveCamera(
			cameraOpt.angle,
			cameraOpt.aspect(),
			cameraOpt.near,
			cameraOpt.far);
		this.camera.position.z = 300;

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

		scene.add(this.sphere);
		scene.add(this.camera);
		scene.add(pointLight);
	}

	getCamera(){
		return this.camera;
	}

	onResize(){
		console.log('app::resize (' + window.innerWidth + 'x' + window.innerHeight + ')');
		// this.gl.viewportWidth  = window.innerWidth;
		// this.gl.viewportHeight = window.innerHeight;
		// this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
	}
}

export default App;
