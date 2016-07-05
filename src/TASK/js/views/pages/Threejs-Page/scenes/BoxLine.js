var _ = require( 'lodash' );
var MergePass = require( 'postprocessing' )
	.MergePass;
var FilmPass = require( 'postprocessing' )
	.FilmPass;
var ColorizePass = require( '../passes/ColorizePass' );
var VerticalBlurPass = require( '../passes/VerticalBlurPass' );
var HorizontalBlurPass = require( '../passes/HorizontalBlurPass' );
var PostProcessedOrthographicScene = require( './PostProcessedOrthographicScene' );
var THREE = require( 'three' );

class BoxLineScene extends PostProcessedOrthographicScene {
	constructor( options ) {
		super( _.merge( {
			camera: {
				near: 1,
				far: 100000,
				zoom: 5,
				position: new THREE.Vector3( 0, 300, -300 )
			},
			settings: {
				numMeshes: 30
			}
		}, options ) );

	}

	setupCamera( options ) {
		super.setupCamera( options );
		return this;
	}

	setupGeometry( options ) {
		this.geometry.boxgeometry = new THREE.BoxGeometry( 200, 200, 200 );
		return this;
	}

	setupMaterials( options ) {
		this.materials.basicMaterial = new THREE.MeshBasicMaterial( {
			color: 0xff0000
				// wireframe: true
		} );
		this.materials.depthMaterial = new THREE.MeshDepthMaterial( {} );
		return this;
	}

	setupMeshes( options ) {
		for ( let i = 0; i < this.settings.numMeshes; i++ ) {
			this.meshes[ i ] = new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial );
		}
		return this;
	}

	setupLights( options ) {
		this.lights.main = new THREE.PointLight( 0x0f0f0f );
		this.lights.main.position.x = 0;
		this.lights.main.position.y = 500;
		this.lights.main.position.z = -500;
	}

	setupRenderChain( options ) {
		super.setupRenderChain( options );
		// this.renderPass.renderToScreen = true;

		// PINK BRANCH
		// let pinkBranch = this.composer.branch( null, 'pinkBranch' );
		//
		// let makePink = new ColorizePass( {
		// 	color: new THREE.Color( 1, 0, 1 )
		// } );
		// pinkBranch.addPass( makePink );

		// MAIN PATH
		let effect0 = new VerticalBlurPass();
		this.composer.addPass( effect0 );

		let effect1 = new HorizontalBlurPass();
		effect1.renderToScreen = true;
		this.composer.addPass( effect1 );

		// MERGE AND RENDER TO SCREEN
		// let mergePinkBranch = new MergePass( pinkBranch, {
		// 	renderToScreen: true
		// } );
		// pinkBranch.addPass( mergePinkBranch );

		return this;
	}

	layoutScene( options ) {
		_.each( this.meshes, ( m, i ) => {
			m.position.x = 300 * ( 2 * ( i % 2 ) - 1 ) * Math.ceil( i * 0.5 );
		} );
	}

}

module.exports = BoxLineScene;
