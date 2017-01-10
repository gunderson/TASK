var OrthographicScene = require( './OrthographicScene' );
var EffectComposer = require( '../../../../../../lib/postprocessing' )
	.EffectComposer;
var RenderPass = require( '../../../../../../lib/postprocessing' )
	.RenderPass;
var _ = require( 'lodash' );
var THREE = require( 'three' );

window.THREE = THREE;

class PostProcessedOrthographicScene extends OrthographicScene {
	constructor( options ) {
		super( _.merge( {
			// ---------------------------------------------------
			// Class Properties

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
		this.setupRenderChain( this.options );
		return promise;
	}

	setupRenderChain( options ) {
		this.postProcessingPasses = {
			render: new RenderPass( this.scene, this.camera )
		};
		this.composer = new EffectComposer( this.renderer );
		// INITIALIZE COMPOSER w/ RENDER PASS
		this.composer.addPass( this.postProcessingPasses.render );
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

module.exports = PostProcessedOrthographicScene;
