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
		super( _.mergeWith( {
			// ---------------------------------------------------
			// Class Properties

			camera: {
				fov: 10,
				near: 1,
				far: 100000,
				zoom: 1,
				position: new THREE.Vector3( 0, 1, -1 )
			}
		}, options, Scene.mergeRules ) );
	}

	setup() {
		var promise = super.setup();
		this.setupRenderChain( this.options );
		return promise;
	}

	setupRenderChain( options ) {
		this.postProcessingPasses = {
			renderPass: new RenderPass( this.scene, this.camera, {
				renderToScreen: true
			} )
		};
		this.composer = new EffectComposer( this.renderer );
		// INITIALIZE COMPOSER w/ RENDER PASS
		this.composer.addPass( this.postProcessingPasses.renderPass );
		return this;
	}

	activatePass( name ) {

	}

	deactivatePass( name ) {

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
