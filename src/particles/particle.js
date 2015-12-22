'use strict';

import * as config from "../config";

class Particle extends THREE.Mesh{

	constructor(geometry, material){
		super(geometry, material);

		this.life = 0;
		this.maxLife = 0; // to reduce opacity later in life

		this.velocity = new THREE.Vector3(0, 0, 0);
		this.rotVelocity = new THREE.Vector3(0, 0, 0);
	}

	update() {
		var toAngle = (e) => { return Math.max(0, Math.min(e, 360)); };
		this.life--;
		this.position.add(this.velocity);
		this.position.setY(Math.max(this.position.y, config.ground.position.y));

		var rot = this.rotation.toVector3();
		rot.add(this.rotVelocity);
		rot.setX(toAngle(rot.x));
		rot.setY(toAngle(rot.y));
		rot.setZ(toAngle(rot.z));
		this.rotation.setFromVector3(rot);
	}

	onSpawn(particleSystemCfg){
		var range       = particleSystemCfg.range,
		    basePoint   = particleSystemCfg.position,
		    velocity    = particleSystemCfg.velocity,
		    rotVelocity = particleSystemCfg.rotVelocity;

		this.life = this.maxLife = randomRange(particleSystemCfg.life);
		var sc = randomRange(particleSystemCfg.scale);
		this.__scale = sc;
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
		this.rotVelocity.set(
			randomRange(-rotVelocity, rotVelocity),
			randomRange(-rotVelocity, rotVelocity),
			randomRange(-rotVelocity, rotVelocity)
		);

		this.visible = true;
		this.material.opacity = 1.0;
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
