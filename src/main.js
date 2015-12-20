'use strict';

import * as config from "./config";
import App from "./app";
import UI from "./ui";

var renderer, scene, app;

THREE.Vector3.prototype.setVector = function(v){
	this.setX(v.x);
	this.setY(v.y);
	this.setZ(v.z);
}


function init() {
	console.log('init()');

	renderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	app = new App();

	renderer.setSize(config.width(), config.height());

	var sceneLoadedPromise = app.init(scene);

	var ui = new UI();
	sceneLoadedPromise.then(() => {
		ui.init(scene);
	});

	document.body.appendChild(renderer.domElement );

	window.addEventListener('resize', onResize);

	animloop();
}


function onResize(e) {
	console.log('resize (' + config.width() + 'x' + config.height() + ')');
	renderer.setSize(config.width(), config.height());
}

function animloop(){

	requestAnimFrame(animloop);

	app.update();

	renderer.render(scene, app.getCamera());

}

init();
