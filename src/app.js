'use strict';

class App {
	constructor(gl){
		console.log('App()');
		this.gl = gl;
		this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

		window.addEventListener("resize", () => {
			this.onResize();
		});
	}

	onResize(){
		console.log('app::resize (' + window.innerWidth + 'x' + window.innerHeight + ')');
		this.gl.viewportWidth  = window.innerWidth;
		this.gl.viewportHeight = window.innerHeight;
		this.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
	}
}

export default App;
