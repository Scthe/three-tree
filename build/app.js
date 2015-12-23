(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// TODO make data driven
// TODO Emitter as 3DObject

// TODO better spawn position

// TODO all gl settings
// TODO mobile - force landscape

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _config = require("./config");

var config = _interopRequireWildcard(_config);

var _particlesParticleSystem = require("./particles/particleSystem");

var _particlesParticleSystem2 = _interopRequireDefault(_particlesParticleSystem);

var _ground = require("./ground");

var _ground2 = _interopRequireDefault(_ground);

var App = (function () {
	function App() {
		_classCallCheck(this, App);

		console.log('App()');
	}

	App.prototype.init = function init(scene) {

		var resolve,
		    reject,
		    loadedPromise = new Promise(function (resolve_, reject_) {
			resolve = resolve_;
			reject = reject_;
		});

		// camera
		var cameraOpt = config.camera;
		this.camera = new THREE.PerspectiveCamera(cameraOpt.angle, cameraOpt.aspect(), cameraOpt.near, cameraOpt.far);
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
		var lightCfg = config.lights;
		_.each(lightCfg, function (lCfg) {
			var pointLight = new THREE.PointLight(lCfg.color);
			pointLight.name = lCfg.name;
			pointLight.position.setVector(lCfg.position);

			var props = ['intensity', 'distance', 'decay'];
			_.each(props, function (p) {
				if (lCfg.hasOwnProperty(p)) {
					pointLight[p] = lCfg[p];
				}
			});

			scene.add(pointLight);
		});

		// tree
		var loader = new THREE.OBJLoader();
		loader.load("vendor/models/tree.obj", function (object) {
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
		    groundGeom = new _ground2["default"](groundOpt);
		groundGeom.init();
		var ground = new THREE.Mesh(groundGeom, groundOpt.material);
		ground.name = 'ground';
		ground.position.setVector(groundOpt.position);

		// flowers
		this.particles = new _particlesParticleSystem2["default"](scene);

		scene.fog = new THREE.FogExp2(config.fog.color, config.fog.density);

		// scene.add(this.sphere);
		scene.add(ground);
		scene.add(this.camera);

		return loadedPromise;
	};

	App.prototype.update = function update() {
		this.controls.update();
		this.particles.update();
	};

	App.prototype.getCamera = function getCamera() {
		return this.camera;
	};

	App.prototype.getParticleSystem = function getParticleSystem() {
		return this.particles;
	};

	App.prototype.getControls = function getControls() {
		return this.controls;
	};

	return App;
})();

exports["default"] = App;
module.exports = exports["default"];

},{"./config":2,"./ground":3,"./particles/particleSystem":7}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _particlesAnimatedProperty = require("./particles/animatedProperty");

var _particlesAnimatedProperty2 = _interopRequireDefault(_particlesAnimatedProperty);

var cfg = {
	camera: {
		angle: 45,
		near: 0.1,
		far: 10000,
		aspect: function aspect() {
			return width() / height();
		},
		position: new THREE.Vector3(0, 0, 650),
		lookAt: new THREE.Vector3()
	},
	lights: [{
		name: 'light_1',
		intensity: 1.0,
		distance: 2200,
		color: 0xffffff,
		position: new THREE.Vector3(570, 420, 80)
	}, {
		name: 'light_2',
		color: 0xebc3a1,
		intensity: 0.35,
		distance: 2100,
		decay: 0.5,
		position: new THREE.Vector3(-400, 375, 130)
	}, {
		name: 'light_3',
		color: 0xa1c8eb,
		intensity: 0.15,
		distance: 2100,
		decay: 0.6,
		position: new THREE.Vector3(-150, 40, -420)
	}],
	tree: {
		scale: 400,
		position: new THREE.Vector3(0, -150, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0x4d4d4d
		})
	},
	ground: {
		gridDensity: 45,
		width: 3000,
		height: 3300,
		heightVariance: 30,
		position: new THREE.Vector3(0, -160, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0xf5f5f5
		})
	},
	flowers: {
		count: 1500,
		// count   : 1,
		range: 170,
		emitRate: 60,
		life: [75, 225],
		scale: [8, 13],
		velocity: 1.6,
		rotVelocity: 0.07,
		wind: {
			force: new THREE.Vector3(1.8, -0.1, -2.3),
			speed: 0.5
		},
		position: new THREE.Vector3(0, 100, 0),
		material: new THREE.MeshLambertMaterial({
			color: 0xcf4f93
		}),
		// side: THREE.DoubleSide
		animations: [new _particlesAnimatedProperty2['default']('material.opacity', {
			1.0: 0.0,
			0.6: 1.0,
			0.0: 0.0
		})]
	},

	/*new AnimatedProperty('scale', {
 	1.0: 0.7,
 	0.6: 1.0,
 	0.0: 0.5
 })*/
	fog: {
		color: 0xf0f0f0,
		density: 0.0005
	},
	background: new THREE.Color(0xe3e3e3),
	width: width,
	height: height
};

function width() {
	// window.innerWidth, window.innerHeight
	return document.documentElement.clientWidth;
}

function height() {
	return document.documentElement.clientHeight;
}

exports['default'] = cfg;
module.exports = exports['default'];

},{"./particles/animatedProperty":5}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ground = (function (_THREE$Geometry) {
	_inherits(Ground, _THREE$Geometry);

	function Ground(cfg) {
		_classCallCheck(this, Ground);

		_THREE$Geometry.call(this);
		this.cfg = cfg;
		this.dynamic = true;
	}

	Ground.prototype.init = function init(opt) {
		if (opt) {
			var f = _.pick(opt, 'width', 'height', 'gridDensity', 'heightVariance');
			_.extend(this.cfg, f);
		}

		Ground._generate(this, this.cfg.width, this.cfg.height, this.cfg.gridDensity, this.cfg.heightVariance);
	};

	Ground._generate = function _generate(geom, width, height, gridDensity, heightVariance) {
		clearArray(geom.vertices);
		clearArray(geom.faces);

		var segW = width / (gridDensity - 1),
		    segH = height / (gridDensity - 1);

		for (var i = 0; i < gridDensity; i++) {
			for (var j = 0; j < gridDensity; j++) {
				var x = segW * i - width / 2,
				    z = segH * j - height / 2,
				    y = Math.random() * heightVariance - heightVariance / 2;

				var v = new THREE.Vector3(x, y, z);
				geom.vertices.push(v);
			}
		}

		for (var i = 0; i < gridDensity - 1; i++) {
			var idxOfFirstInRow = i * gridDensity,
			    idxOfFirstInNextRow = (i + 1) * gridDensity;

			for (var j = 0; j < gridDensity - 1; j++) {
				var i1 = idxOfFirstInRow + j,
				    i2 = idxOfFirstInNextRow + j;
				var f1 = new THREE.Face3(i1, i1 + 1, i2),
				    f2 = new THREE.Face3(i2 + 1, i2, i1 + 1);
				geom.faces.push(f1);
				geom.faces.push(f2);
			}
		}

		geom.computeFaceNormals();
	};

	return Ground;
})(THREE.Geometry);

function clearArray(arr) {
	while (arr.length > 0) {
		arr.pop();
	}
}

exports['default'] = Ground;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _config = require("./config");

var config = _interopRequireWildcard(_config);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _ui = require("./ui");

var _ui2 = _interopRequireDefault(_ui);

var renderer, scene, app;

THREE.Vector3.prototype.setVector = function (v) {
	this.setX(v.x);
	this.setY(v.y);
	this.setZ(v.z);
};

function init() {
	console.log('init()');

	renderer = new THREE.WebGLRenderer();
	scene = new THREE.Scene();
	app = new _app2["default"]();

	renderer.setClearColor(config.background);
	renderer.setSize(config.width(), config.height());

	var sceneLoadedPromise = app.init(scene);

	var ui = new _ui2["default"]();
	sceneLoadedPromise.then(function () {
		ui.init(renderer, scene, app);
	});

	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onResize);

	animloop();
}

function onResize(e) {
	console.log('resize (' + config.width() + 'x' + config.height() + ')');
	renderer.setSize(config.width(), config.height());
}

function animloop() {

	requestAnimFrame(animloop);

	app.update();

	renderer.render(scene, app.getCamera());
}

init();

},{"./app":1,"./config":2,"./ui":8}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AnimatedProperty = (function () {
	function AnimatedProperty(name, curve) {
		_classCallCheck(this, AnimatedProperty);

		var p = name.split('.'),
		    l = p.length;
		this.name = p[l - 1];
		this.subPropertesChain = p.splice(0, l - 1);

		// this.idx = _.sortedIndex( _.sortBy(_.keys(a), function(a){return a;}), 0.3)
		this.idx = _.chain(curve).keys().sortBy(function (e) {
			return e;
		}).value();
		this.curve = curve;
	}

	AnimatedProperty.prototype.apply = function apply(object, lifeMoment) {
		var animatedObject = object,
		    val = this._interpolate(lifeMoment);

		// follow sub properties
		for (var i = 0; i < this.subPropertesChain.length; i++) {
			var subPropName = this.subPropertesChain[i];
			animatedObject = animatedObject[subPropName];
		}

		if (val !== undefined) {
			this._setProperty(animatedObject, this.name, val);
		}
	};

	AnimatedProperty.prototype._interpolate = function _interpolate(lifeMoment) {
		var rightIdx = _.sortedIndex(this.idx, lifeMoment);
		rightIdx = Math.max(1, Math.min(rightIdx, this.idx.length - 1));

		var leftKey = this.idx[rightIdx - 1],
		    rightKey = this.idx[rightIdx],
		    leftVal = this.curve[leftKey],
		    rightVal = this.curve[rightKey],
		    mod = (lifeMoment - leftKey) / (rightKey - leftKey);

		return (1 - mod) * leftVal + mod * rightVal;
	};

	AnimatedProperty.prototype._setProperty = function _setProperty(obj, propName, value) {
		if (obj[propName] instanceof THREE.Vector3) {
			value *= obj['__' + propName]; // TODO weird assumption that this exists
			obj[propName].set(value, value, value);
		} else if (typeof obj[propName] === "number") {
			obj[propName] = value;
		}
	};

	return AnimatedProperty;
})();

exports['default'] = AnimatedProperty;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var Particle = (function (_THREE$Mesh) {
	_inherits(Particle, _THREE$Mesh);

	function Particle(geometry, material) {
		_classCallCheck(this, Particle);

		_THREE$Mesh.call(this, geometry, material);

		this.life = 0;
		this.maxLife = 0; // to reduce opacity later in life

		this.velocity = new THREE.Vector3(0, 0, 0);
		this.rotVelocity = new THREE.Vector3(0, 0, 0);
	}

	Particle.prototype.update = function update() {
		var toAngle = function toAngle(e) {
			return Math.max(0, Math.min(e, 360));
		};
		this.life--;
		this.position.add(this.velocity);
		this.position.setY(Math.max(this.position.y, config.ground.position.y));

		var rot = this.rotation.toVector3();
		rot.add(this.rotVelocity);
		rot.setX(toAngle(rot.x));
		rot.setY(toAngle(rot.y));
		rot.setZ(toAngle(rot.z));
		this.rotation.setFromVector3(rot);
	};

	Particle.prototype.onSpawn = function onSpawn(particleSystemCfg) {
		var range = particleSystemCfg.range,
		    basePoint = particleSystemCfg.position,
		    velocity = particleSystemCfg.velocity,
		    rotVelocity = particleSystemCfg.rotVelocity;

		this.life = this.maxLife = randomRange(particleSystemCfg.life);
		var sc = randomRange(particleSystemCfg.scale);
		this.__scale = sc;
		this.scale.set(sc, sc, sc);
		this.position.set(randomRange(-range, range) + basePoint.x - this.scale.x / 2, randomRange(-range, range) + basePoint.y - this.scale.y / 2, randomRange(-range, range) + basePoint.z - this.scale.z / 2);
		this.velocity.set(randomRange(-velocity, velocity), randomRange(-velocity, 0), randomRange(-velocity, velocity));
		this.rotVelocity.set(randomRange(-rotVelocity, rotVelocity), randomRange(-rotVelocity, rotVelocity), randomRange(-rotVelocity, rotVelocity));

		this.visible = true;
		this.material.opacity = 0.0;
	};

	Particle.prototype.onDie = function onDie() {
		this.life = -1;
		this.visible = false;
	};

	Particle.prototype.isAlive = function isAlive() {
		return this.life > 0;
	};

	return Particle;
})(THREE.Mesh);

function randomRange(min, max) {
	if (max === undefined && _.isArray(min)) {
		max = min[1];
		min = min[0];
	} else if (max === undefined) {
		max = min;
		min = -max;
	}

	return Math.random() * (max - min) + min;
}

exports["default"] = Particle;
module.exports = exports["default"];

},{"../config":2}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _config = require("../config");

var config = _interopRequireWildcard(_config);

var _particle = require("./particle");

var _particle2 = _interopRequireDefault(_particle);

/**
 * This class acts as Emitter
 */

var ParticleSystem = (function () {
	function ParticleSystem(scene) {
		_classCallCheck(this, ParticleSystem);

		console.log('ParticleSystem()');

		this.scene = scene;
		this.cfg = config.flowers;
		this.animations = this.cfg.animations;

		this.geo = ParticleSystem.createParticleGeometry();

		this.particles = [];
		this._fillParticleArray(this.cfg.count);

		/*
  this._animate('material.opacity', lifeMoment => {
  	return lifeMoment > 0.5 ? 1.0 : lifeMoment * 2;
  });
  this._animate('scale', (lifeMoment, p) => {
  	var sc = p.__scale;
  	if(lifeMoment > 0.9){
  		sc *= 1 - (lifeMoment - 0.9) * 10;
  	}
  		p.scale.set(sc,sc,sc);
  });
  */

		this._emit(this.cfg.count / 3);
	}

	ParticleSystem.prototype._fillParticleArray = function _fillParticleArray(cnt) {
		var i = this.particles.length;
		for (; i < cnt; i++) {

			var material = this._createMaterial();

			var p = new _particle2["default"](this.geo, material);
			p.onDie();

			this.particles.push(p);
			this.scene.add(p);
		}
		console.log("particle array has " + this.particles.length + " entries");
	};

	ParticleSystem.prototype._createMaterial = function _createMaterial() {
		var m = this.cfg.material,
		    material = new THREE.MeshLambertMaterial();

		_.chain(m).keys().filter(function (k) {
			return !_.isFunction(m[k]);
		}).each(function (k) {
			material[k] = m[k];
		});

		material.transparent = true;

		return material;
	};

	ParticleSystem.prototype.update = function update() {
		this._updateExisting();
		this._emit(this.cfg.emitRate);
	};

	ParticleSystem.prototype.refreshCount = function refreshCount() {
		this._fillParticleArray(this.cfg.count);
	};

	ParticleSystem.prototype._emit = function _emit(cnt) {
		var slotIdx = 0,
		    maxParticles = Math.min(this.cfg.count, this.particles.length);

		for (var i = 0; i < cnt; i++) {
			for (; slotIdx < maxParticles; slotIdx++) {
				var p = this.particles[slotIdx];
				if (!p.isAlive()) break;
			}

			if (slotIdx < maxParticles) {
				// console.log('spawn, slot: ', slotIdx);
				var p = this.particles[slotIdx];
				p.onSpawn(this.cfg);
				++slotIdx;
			} else {
				// console.log('no free particle slot');
				break;
			}
		}
	};

	ParticleSystem.prototype._updateExisting = function _updateExisting() {
		var _this = this;

		var windOpt = this.cfg.wind;

		_.chain(this.particles).filter(function (e) {
			return e.isAlive();
		}).each(function (p, i) {

			var wind = windOpt.force.clone().multiplyScalar(windOpt.speed);
			p.position.add(wind);

			p.update();

			if (p.life < 0) {
				p.onDie();
			} else {
				_this._applyAnimations(p);
			}
		});
	};

	ParticleSystem.prototype._applyAnimations = function _applyAnimations(p) {
		_.each(this.animations, function (anim) {
			var lifeMoment = p.life / p.maxLife;
			anim.apply(p, lifeMoment);
		});
	};

	ParticleSystem.createParticleGeometry = function createParticleGeometry() {
		var geo = new THREE.Geometry();
		v(0, 0, 0);
		v(0, 1, 0);
		v(1, 0, 0);
		v(1, 1, 0);
		f3(0, 2, 1);
		f3(3, 1, 2);

		geo.computeFaceNormals();
		geo.dynamic = false;

		return geo;

		function v(x, y, z) {
			geo.vertices.push(new THREE.Vector3(x, y, z));
		}
		function f3(a, b, c) {
			geo.faces.push(new THREE.Face3(a, b, c));
		}
	};

	return ParticleSystem;
})();

exports["default"] = ParticleSystem;
module.exports = exports["default"];

},{"../config":2,"./particle":6}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _config = require("./config");

var config = _interopRequireWildcard(_config);

var _ground = require("./ground");

var _ground2 = _interopRequireDefault(_ground);

var SCENE_RANGE = 750;

var UI = (function () {
	function UI() {
		_classCallCheck(this, UI);
	}

	/**
  * We have to recreate geometry, since change of buffer sizes is forbidden
  */

	UI.prototype.init = function init(renderer, scene, app) {
		var cfg = config,
		    gui = new dat.GUI(),
		    folder,
		    obj;

		// general
		addColorCtrls(gui, cfg.background, 'background', 'background', function (v) {
			renderer.setClearColor(config.background);
		});
		addColorCtrls(gui, scene.fog.color, 'color', 'Fog color');
		gui.add(scene.fog, 'density', 0.0, 0.005).name('Fog density');

		// light
		var lightCfg = config.lights;
		_.each(lightCfg, function (lCfg) {
			folder = gui.addFolder(lCfg.name);
			obj = scene.getObjectByName(lCfg.name);

			addColorCtrls(folder, obj.color);
			folder.add(obj, 'intensity', 0.1, 1);
			folder.add(obj, 'distance', 0.1, SCENE_RANGE * 3);
			folder.add(obj, 'decay', 0.1, 1);
			addVectorCtrls(folder, obj.position);
		});

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
		groundGeomProperty(folder, obj, 'width', 100, 5000);
		groundGeomProperty(folder, obj, 'height', 100, 5000);
		groundGeomProperty(folder, obj, 'heightVariance', 0, 80);
		addColorCtrls(folder, obj.material.color);
		addVectorCtrls(folder, obj.position);

		// flowers
		obj = cfg.flowers;
		var particleSystem = app.getParticleSystem();
		folder = gui.addFolder("Flowers");
		folder.add(obj, 'count', 10, 10000).onChange(function (value) {
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
		folder.add(obj, 'speed', 0, 10);
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
		gui.add(ctrl, 'enabled').name('Orbit enabled').onChange(function (v) {
			ctrl.enabled = v;
		});
	};

	return UI;
})();

function groundGeomProperty(folder, obj, prop, min, max) {
	var groundGeom = obj.geometry,
	    oldCfg = groundGeom.cfg,
	    a = {};
	a[prop] = oldCfg[prop];

	folder.add(a, prop, min, max).step(1).onChange(function (value) {
		a[prop] = value;

		groundGeom.dispose();

		var g = new _ground2["default"](oldCfg);
		g.init(a);
		obj.geometry = g;
	});
};

function addVectorCtrls(gui, pos, range) {
	range = range || SCENE_RANGE;
	gui.add(pos, 'x', -range, range);
	gui.add(pos, 'y', -range, range);
	gui.add(pos, 'z', -range, range);
}

function addRangeCtrl(gui, obj, prop, min, max) {
	var a = {};
	a[prop] = (obj[prop][0] + obj[prop][1]) / 2;

	gui.add(a, prop, min, max).onChange(function (v) {
		var variance = Math.sqrt(v);
		obj[prop][0] = Math.max(0, v - variance);
		obj[prop][1] = v + variance;
	});
}

/**
 * dat.gui and three does not interoperate nicely on colors
 */
function addColorCtrls(gui, colorObj, prop, name, cb) {
	prop = prop || 'color';
	name = name || prop;
	var a = {};
	a[prop] = "#" + colorObj.getHexString();

	gui.addColor(a, prop).name(name).onChange(function (value) {
		colorObj.setStyle(value);
		if (cb) cb(value);
	});
}

function addSingleValueToVectorCtrls(gui, obj, prop, min, max) {
	var a = {};
	a[prop] = obj[prop].x;

	gui.add(a, prop, min, max).onChange(function (value) {
		obj[prop].set(value, value, value);
	});
}

exports["default"] = UI;
module.exports = exports["default"];

},{"./config":2,"./ground":3}]},{},[4]);
