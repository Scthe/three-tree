'use strict';

import * as config from "./config";
import Particle from "./particle";


class ParticleSystem {

	constructor(scene){
		console.log('ParticleSystem()');
		var cfg = config.flowers;

		this.particles = [];

		var materialScene = new THREE.MeshLambertMaterial({
			color: 0x00ff00
		});

		for(var i = 0; i < cfg.count; i++){
			var p = new Particle();
			// p.onSpawn();
			p.onDie();

			this.particles.push(p);

			var po = new THREE.Mesh(p, materialScene);
			p.__obj = po;
			scene.add(po);
		}
	}

	update(){
		this._updateExisting();
		this._emit();
	}

	_emit(){
		var cfg = config.flowers;

		for(var i = 0; i < cfg.emitRate; i++){
			var p = _.find(this.particles, e => {return !e.isAlive()} );
			if(p === undefined){
				// console.log('no free particle slot');
				break;
			}

			// console.log('spawn');
			p.onSpawn();
			var po = p.__obj;
			po.scale.x = p.size;
			po.scale.y = p.size;
			po.scale.z = p.size;
			po.position.x = p.x;
			po.position.y = p.y;
			po.position.z = p.z;
		}
	}

	_updateExisting(){
		var cfg = config.flowers,
		    wind = cfg.wind;

		_.chain(this.particles)
			.filter( e => {return e.isAlive()} )
			.each((p, i) => {
				// p.vx += wind.x * wind.velocity;
				// p.vy += wind.y * wind.velocity;
				// p.vz += wind.z * wind.velocity;
				p.update();

				var po = p.__obj;
				po.position.x = p.x;
				po.position.y = p.y;
				po.position.z = p.z;

				if(p.life < 0 ){
					p.onDie();
				}
			});
	}

}

export default ParticleSystem;
