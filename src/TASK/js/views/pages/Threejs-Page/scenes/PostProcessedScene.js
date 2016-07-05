var Scene = require( './Scene' );
var EffectComposer = require( 'postprocessing' )
	.EffectComposer;
var RenderPass = require( 'postprocessing' )
	.RenderPass;
var _ = require( 'lodash' );
var THREE = require( 'three' );

window.THREE = THREE;

class PostProcessedScene extends Scene {
	constructor( options ) {
		super( _.merge( {
			camera: {
				fov: 10,
				near: 1,
				far: 100000,
				zoom: 1,
				position: new THREE.Vector3( 0, 1, -1 )
			}
		}, options ) );
	}

	setup() {
		var promise = super.setup();
		promise.then( () => this.setupRenderChain( this.options ) );
		return promise;
	}

	setupRenderChain( options ) {
		this.composer = new EffectComposer( this.renderer );
		// INITIALIZE COMPOSER w/ RENDER PASS
		this.renderPass = new RenderPass( this.scene, this.camera );
		this.composer.addPass( this.renderPass );
		return this;
	}

	render() {
		this.composer.render();
	}

	onResize() {
		super.onResize();
		this.composer.setSize( this.width, this.height );
	}

}

module.exports = PostProcessedScene;
