'use strict';

import * as config from "./config";

const SCENE_RANGE = 750;

class UI {

	constructor(){
	}

	init(scene){
		var cfg = config,
		    gui = new dat.GUI(),
		    folder, obj;

		// light
		obj = scene.getObjectByName('light');
		folder = gui.addFolder("Light");
		addColorCtrls(folder, obj.color);
		folder.add(obj, 'intensity', 0.1, 1);
		folder.add(obj, 'distance', 0.1, SCENE_RANGE);
		folder.add(obj, 'decay', 0.1, 1);
		addVectorCtrls(folder, obj.position);

		// tree
		obj = scene.getObjectByName('tree');
		folder = gui.addFolder("Tree");
		addSingleValueToVectorCtrls(folder, obj, 'scale', 200, 800);
		// addColorCtrls(folder, obj.material.color);
		addVectorCtrls(folder, obj.position);

		folder.open();


		// ground
		obj = cfg.ground;
		folder = gui.addFolder("Ground");
		// folder.add(obj, 'density', 3, 100);
		// folder.add(obj, 'width' , 100, 5000);
		// folder.add(obj, 'height', 100, 5000);
		// folder.add(obj, 'heightVariance', 0, 80);
		// folder.addColor(obj, 'color');
		// addVectorCtrls(folder, obj.position);

		obj = cfg.flowers;
		folder = gui.addFolder("Flowers");
		// folder.add(obj, 'count', 10, 10000);
		folder.add(obj, 'emitRate', 0, 1000);
		folder.add(obj, 'range', 10, 1000);
		// folder.add(obj, 'life', 10, 1000);
		// folder.add(obj, 'size', 1, 100);
		folder.add(obj, 'velocity', 0.1, 20);
		// folder.addColor(obj, 'color');
		addVectorCtrls(folder, obj.position);

		obj = cfg.flowers.wind;
		folder = gui.addFolder("Wind");
		folder.add(obj, 'speed' , 0, 10);
		addVectorCtrls(folder, obj.force);


		// TODO orbit speed
		// gui.add(text, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
		// TODO disable mouse
	}

}

function addVectorCtrls(gui, pos){
	gui.add(pos, 'x', -SCENE_RANGE, SCENE_RANGE);
	gui.add(pos, 'y', -SCENE_RANGE, SCENE_RANGE);
	gui.add(pos, 'z', -SCENE_RANGE, SCENE_RANGE);
}

/**
 * dat.gui and three does not interoperate nicely on colors
 */
function addColorCtrls(gui, colorObj){
	var a = {
		color: `#${colorObj.getHexString()}`
	};
	gui.addColor(a, 'color').onChange(function(value) {
		colorObj.setStyle(value);
	});
}

function addSingleValueToVectorCtrls(gui, obj, prop, min, max){
	var a = {};
	a[prop] = obj[prop].x;

	gui.add(a, prop, min, max).onChange(function(value) {
		// obj[prop].x = obj[prop].y = obj[prop].z = value;
		obj[prop].set(value, value, value);
	});
}

export default UI;
