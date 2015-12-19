'use strict';

import * as config from "./config";

class Particle extends THREE.Geometry{

	constructor(){
		super();
		this.x = 0;
		this.y = 0;
		this.z = 0;

		this.vx = 0;
		this.vy = 0;
		this.vz = 0;

		// this.rx = 0;
		// this.ry = 0;
		// this.rz = 0;

		// this.vrx = 0;
		// this.vry = 0;
		// this.vrz = 0;

		this.life = 0;
		this.maxLife = 0; // to reduce opacity later in life
		this.size = 0;

		// TODO inefficient
		var self = this;
		// THREE.Geometry.call( this );
		v(0,0,0);
		v(0,1,0);
		v(1,0,0);
		v(1,1,0);
		f3(0, 2, 1);
		f3(3, 1, 2);

		this.computeFaceNormals();
		function v(x,y,z) { self.vertices.push( new THREE.Vector3(x,y,z)); }
		function f3(a,b,c){ self.faces   .push( new THREE.Face3(a,b,c)); }
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.z += this.vz;
		// this.rx += this.vrx;
		// this.ry += this.vry;
		// this.rz += this.vrz;
		this.life--;
	}

	onSpawn(){
		var cfg = config.flowers,
		    range = cfg.range,
		    velocity = cfg.velocity,
		    rotVelocity = cfg.rotVelocity;

		this.life = this.maxLife = randomRange(cfg.life);
		this.size = randomRange(cfg.size);
		this.x   = randomRange(-range, range) + cfg.position.x - this.size/2;
		this.y   = randomRange(-range, range) + cfg.position.y - this.size/2;
		this.z   = randomRange(-range, range) + cfg.position.z - this.size/2;
		this.vx  = randomRange(-velocity, velocity);
		this.vy  = randomRange(-velocity, 0);
		this.vz  = randomRange(-velocity, velocity);
		// this.vrx = randomRange(-rotVelocity, rotVelocity);
		// this.vry = randomRange(-rotVelocity, rotVelocity);
		// this.vrz = randomRange(-rotVelocity, rotVelocity);
	}

	onDie(){
		this.y = -9999;
		this.life = -1;
	}

	isAlive(){
		return this.life > 0;
	}
}

function randomRange(min, max){
	if(max === undefined && _.isArray(min)){
		max = min[1];
		min = min[0];
	} else if (max === undefined){
		max = min;
		min = -max;
	}

	return Math.random() * (max - min) + min;
}

export default Particle;
