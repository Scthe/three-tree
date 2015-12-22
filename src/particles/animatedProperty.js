'use strict';

class AnimatedProperty {

	constructor(name, curve){
		var p = name.split('.'),
		    l = p.length;
		this.name = p[l-1];
		this.subPropertesChain = p.splice(0, l - 1);

		// this.idx = _.sortedIndex( _.sortBy(_.keys(a), function(a){return a;}), 0.3)
		this.idx = _.chain(curve)
								.keys()
								.sortBy(e => e)
								.value();
		this.curve = curve;
	}

	apply(object, lifeMoment){
		var animatedObject = object,
				val = this._interpolate(lifeMoment);

		// follow sub properties
		for(var i = 0; i < this.subPropertesChain.length; i++){
			var subPropName = this.subPropertesChain[i];
			animatedObject = animatedObject[subPropName];
		}

		if(val !== undefined){
			this._setProperty(animatedObject, this.name, val);
		}
	}

	_interpolate(lifeMoment){
		var rightIdx = _.sortedIndex(this.idx, lifeMoment);
		rightIdx = Math.max(1, Math.min(rightIdx, this.idx.length - 1));

		var leftKey  = this.idx[rightIdx-1],
		    rightKey = this.idx[rightIdx],
				leftVal  = this.curve[leftKey],
				rightVal = this.curve[rightKey],
				mod = (lifeMoment - leftKey) / (rightKey - leftKey);

		return (1-mod) * leftVal + mod * rightVal;
	}

	_setProperty(obj, propName, value){
		if(obj[propName] instanceof THREE.Vector3){
			value *= obj['__'+propName]; // TODO weird assumption that this exists
			obj[propName].set(value, value, value);
		} else if (typeof obj[propName] === "number"){
			obj[propName] = value;
		}
	}

}

export default AnimatedProperty;
