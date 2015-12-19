'use strict';

import App from "./app";
import * as config from "./config";

var renderer, scene, app;

function init() {
	console.log('init()');

	renderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	app = new App();

	renderer.setSize(config.width(), config.height());

	app.init(scene);

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

	renderer.render(scene, app.getCamera());

}

init();
