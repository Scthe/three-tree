'use strict';

import * as config from "./config";

class Particle extends THREE.Mesh{

	constructor(geometry, material){
		super(geometry, material);

		this.velocity = new THREE.Vector3(0, 0, 0);

		// this.rx = 0;
		// this.ry = 0;
		// this.rz = 0;
		// this.vrx = 0;
		// this.vry = 0;
		// this.vrz = 0;

		this.life = 0;
		this.maxLife = 0; // to reduce opacity later in life
	}

	update() {
		this.life--;
		this.position.add(this.velocity);
		// this.rx += this.vrx;
		// this.ry += this.vry;
		// this.rz += this.vrz;
	}

	onSpawn(particleSystemCfg){
		var range       = particleSystemCfg.range,
		    basePoint   = particleSystemCfg.position,
		    velocity    = particleSystemCfg.velocity,
		    rotVelocity = particleSystemCfg.rotVelocity;

		this.life = this.maxLife = randomRange(particleSystemCfg.life);
		var sc = randomRange(particleSystemCfg.scale);
		this.scale.set(sc,sc,sc);
		this.position.set(
			randomRange(-range, range) + basePoint.x - this.scale.x/2,
			randomRange(-range, range) + basePoint.y - this.scale.y/2,
			randomRange(-range, range) + basePoint.z - this.scale.z/2
		);
		this.velocity.set(
			randomRange(-velocity, velocity),
			randomRange(-velocity, 0),
			randomRange(-velocity, velocity)
		);
		// this.vrx = randomRange(-rotVelocity, rotVelocity);
		// this.vry = randomRange(-rotVelocity, rotVelocity);
		// this.vrz = randomRange(-rotVelocity, rotVelocity);

		this.visible = true;
	}

	onDie(){
		this.life = -1;
		this.visible = false;
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
