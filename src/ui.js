'use strict';

import * as config from "./config";
import Ground from "./ground";

const SCENE_RANGE = 750;

class UI {

	constructor(){
	}

	init(renderer, scene, app){
		var cfg = config,
		    gui = new dat.GUI(),
		    folder, obj;

		// general
		addColorCtrls(gui, cfg.background, 'background', 'background', v => {
			renderer.setClearColor(config.background);
		});
		addColorCtrls(gui, scene.fog.color, 'color', 'Fog color');
		gui.add(scene.fog, 'density', 0.0, 0.005).name('Fog density');

		// light
		obj = scene.getObjectByName('light');
		folder = gui.addFolder("Light");
		addColorCtrls(folder, obj.color);
		folder.add(obj, 'intensity', 0.1, 1);
		folder.add(obj, 'distance', 0.1, SCENE_RANGE * 3);
		folder.add(obj, 'decay', 0.1, 1);
		addVectorCtrls(folder, obj.position);

		// tree
		obj = scene.getObjectByName('tree');
		folder = gui.addFolder("Tree");
		addSingleValueToVectorCtrls(folder, obj, 'scale', 200, 800);
		addColorCtrls(folder, obj.material.color);
		addVectorCtrls(folder, obj.position);

		// ground
		obj = scene.getObjectByName('ground');
		folder = gui.addFolder("Ground");
		groundGeomProperty(folder, obj, 'gridDensity', 3, 100);
		groundGeomProperty(folder, obj, 'width',  100, 5000);
		groundGeomProperty(folder, obj, 'height', 100, 5000);
		groundGeomProperty(folder, obj, 'heightVariance', 0, 80);
		addColorCtrls(folder, obj.material.color);
		addVectorCtrls(folder, obj.position);

		// flowers
		obj = cfg.flowers;
		var particleSystem = app.getParticleSystem();
		folder = gui.addFolder("Flowers");
		folder.add(obj, 'count', 10, 10000).onChange( (value) => {
			particleSystem.refreshCount();
		});
		folder.add(obj, 'emitRate', 0, 400);
		folder.add(obj, 'range', 10, 1000);
		addRangeCtrl(folder, obj, 'life', 10, 1000);
		addRangeCtrl(folder, obj, 'scale', 1, 100);
		folder.add(obj, 'velocity', 0.1, 10);
		folder.add(obj, 'rotVelocity', 0, 2);
		addColorCtrls(folder, obj.material.color);
		addVectorCtrls(folder, obj.position);

		// folder.open();

		obj = cfg.flowers.wind;
		folder = gui.addFolder("Wind");
		folder.add(obj, 'speed' , 0, 10);
		addVectorCtrls(folder, obj.force, 30);

		// orbit
		var ctrl = app.getControls(),
				orbitSpeed = {
					Slow: 0.5,
					Normal: 1,
					Fast: 5
				};

		// gui.add(ctrl, 'speed').name('Orbit speed').onChange( v => {
			// console.log(v);
		// });
		gui.add(ctrl, 'enabled').name('Orbit enabled').onChange( v => {
			ctrl.enabled = v;
		});
	}

}

/**
 * We have to recreate geometry, since change of buffer sizes is forbidden
 */
function groundGeomProperty(folder, obj, prop, min, max){
	var groundGeom = obj.geometry,
	    oldCfg = groundGeom.cfg,
	    a = {};
	a[prop] = oldCfg[prop];

	folder.add(a, prop, min, max).step(1).onChange((value) => {
		a[prop] = value;

		groundGeom.dispose();

		var g = new Ground(oldCfg);
		g.init(a)
		obj.geometry = g;
	});
};

function addVectorCtrls(gui, pos, range){
	range = range || SCENE_RANGE;
	gui.add(pos, 'x', -range, range);
	gui.add(pos, 'y', -range, range);
	gui.add(pos, 'z', -range, range);
}

function addRangeCtrl(gui, obj, prop, min, max){
	var a = {};
	a[prop] = (obj[prop][0] + obj[prop][1]) / 2;

	gui.add(a, prop, min, max).onChange( v =>{
		var variance = Math.sqrt(v);
		obj[prop][0] = Math.max(0, v - variance);
		obj[prop][1] = v + variance;
	});
}

/**
 * dat.gui and three does not interoperate nicely on colors
 */
function addColorCtrls(gui, colorObj, prop, name, cb){
	prop = prop || 'color';
	name = name || prop;
	var a = {};
	a[prop] = `#${colorObj.getHexString()}`;

	gui.addColor(a, prop).name(name).onChange((value) => {
		colorObj.setStyle(value);
		if(cb) cb(value);
	});
}

function addSingleValueToVectorCtrls(gui, obj, prop, min, max){
	var a = {};
	a[prop] = obj[prop].x;

	gui.add(a, prop, min, max).onChange((value) => {
		obj[prop].set(value, value, value);
	});
}

export default UI;
