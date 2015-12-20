'use strict';


class Ground extends THREE.Geometry{

	constructor(cfg){
		super();
		this.cfg = cfg;
		this.dynamic = true;
	}

	init(opt){
		if(opt){
			var f = _.pick(opt, 'width', 'height', 'gridDensity', 'heightVariance');
			_.extend(this.cfg, f)
		}

		Ground._generate(this,
		                 this.cfg.width, this.cfg.height,
		                 this.cfg.gridDensity,
		                 this.cfg.heightVariance);
	}

	static _generate(geom, width, height, gridDensity, heightVariance){
		clearArray(geom.vertices);
		clearArray(geom.faces);

		var segW = width  / (gridDensity - 1),
		    segH = height / (gridDensity - 1);

		for (var i = 0; i < gridDensity; i++) {
			for (var j = 0; j < gridDensity; j++) {
				var x = segW * i - width/2,
				    z = segH * j - height/2,
				    y = Math.random() * heightVariance - heightVariance/2;

				var v = new THREE.Vector3(x, y, z);
				geom.vertices.push(v);
			}
		}

		for (var i = 0; i < gridDensity -1; i++) {
			var idxOfFirstInRow = i * gridDensity,
			    idxOfFirstInNextRow = (i+1) * gridDensity;

			for (var j = 0; j < gridDensity -1; j++) {
				var i1 = idxOfFirstInRow + j,
				    i2 = idxOfFirstInNextRow + j;
				var f1 = new THREE.Face3(i1,   i1+1, i2  ),
				    f2 = new THREE.Face3(i2+1, i2,   i1+1);
				geom.faces.push(f1);
				geom.faces.push(f2);
			}
		}

		geom.computeFaceNormals();
	}

}

function clearArray(arr){
	while(arr.length > 0){
		arr.pop();
	}
}

export default Ground;
