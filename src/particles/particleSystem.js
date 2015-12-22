'use strict';

import * as config from "../config";
import Particle from "./particle";


/**
 * This class acts as Emitter
 */
class ParticleSystem {

	constructor(scene){
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

	_fillParticleArray(cnt){
		var i = this.particles.length;
		for(; i < cnt; i++){

			var material = this._createMaterial();

			var p = new Particle(this.geo, material);
			p.onDie();

			this.particles.push(p);
			this.scene.add(p);
		}
		console.log(`particle array has ${this.particles.length} entries`);
	}

	_createMaterial(){
		var m = this.cfg.material,
		    material = new THREE.MeshLambertMaterial();

		_.chain(m)
		  .keys()
			.filter( k => { return !_.isFunction(m[k]); })
			.each( k => { material[k] = m[k]; });

		material.transparent = true;

		return material;
	}

	update(){
		this._updateExisting();
		this._emit(this.cfg.emitRate);
	}

	refreshCount(){
		this._fillParticleArray(this.cfg.count);
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
				} else {
					this._applyAnimations(p);
				}
			});
	}

	_applyAnimations(p){
		_.each(this.animations, anim => {
			var lifeMoment = p.life / p.maxLife;
			anim.apply(p, lifeMoment);
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
