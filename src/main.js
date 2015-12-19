'use strict';

import App from "./app";

var canvasEl, gl;

function init() {
		console.log('init()');
		canvasEl = document.createElement("canvas");
		canvasEl.id = "canvasEl";
		canvasEl.width = window.innerWidth;
		canvasEl.height = window.innerHeight;
		canvasEl.style.position = "absolute";

		gl = WebGLUtils.setupWebGL(canvasEl, {
					premultipliedAlpha: true
				});
		if(!gl){ return; }

		gl.viewportWidth = window.innerWidth;
		gl.viewportHeight = window.innerHeight;
		document.body.appendChild(canvasEl);

		new App(gl);

		window.addEventListener('resize', onResize);
}


function onResize(e) {
	console.log('resize (' + window.innerWidth + 'x' + window.innerHeight + ')');
	canvasEl.width    = window.innerWidth;
	canvasEl.height   = window.innerHeight;
}

init();
