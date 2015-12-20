'use strict';

import * as config from "./config";
import Particle from "./particle";


class ParticleSystem {

	constructor(scene){
		console.log('ParticleSystem()');
		this.cfg = config.flowers;
		this.scene = scene;

		this.geo = ParticleSystem.createParticleGeometry();

		this.particles = [];
		this.fillParticleArray(this.cfg.count);

		this._emit(this.cfg.count / 3);
	}

	fillParticleArray(cnt){
		var i = this.particles.length;
		for(; i < cnt; i++){
			var p = new Particle(this.geo, this.cfg.material);
			// p.onSpawn();
			p.onDie();

			this.particles.push(p);

			this.scene.add(p);
		}
		console.log(`particle array has ${this.particles.length} entries`);
	}

	update(){
		this._updateExisting();
		this._emit(this.cfg.emitRate);
	}

	_emit(cnt){
		var slotIdx = 0,
		    maxParticles = Math.min(this.cfg.count, this.particles.length);

		for(var i = 0; i < cnt; i++){
			for(; slotIdx < maxParticles; slotIdx++){
				var p = this.particles[slotIdx];
				if(!p.isAlive()) break;
			}

			if(slotIdx < maxParticles){
				// console.log('spawn, slot: ', slotIdx);
				var p = this.particles[slotIdx];
				p.onSpawn(this.cfg);
				++slotIdx;
			} else {
				// console.log('no free particle slot');
				break;
			}
		}
	}

	_updateExisting(){
		var windOpt = this.cfg.wind;

		_.chain(this.particles)
			.filter( e => {return e.isAlive()} )
			.each((p, i) => {

				var wind = windOpt.force.clone().multiplyScalar(windOpt.speed);
				p.position.add(wind);

				p.update();

				if(p.life < 0 ){
					p.onDie();
				}
			});
	}

	static createParticleGeometry(){
		var geo = new THREE.Geometry();
		v(0,0,0);
		v(0,1,0);
		v(1,0,0);
		v(1,1,0);
		f3(0, 2, 1);
		f3(3, 1, 2);

		geo.computeFaceNormals();
		geo.dynamic = false;

		return geo;

		function v(x,y,z) { geo.vertices.push( new THREE.Vector3(x,y,z)); }
		function f3(a,b,c){ geo.faces   .push( new THREE.Face3(a,b,c)); }
	}

}

export default ParticleSystem;
