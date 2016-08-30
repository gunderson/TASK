var PostProcessedScene = require( '_TASK/views/Three-View/scenes/PostProcessedScene' );
var _ = require( 'lodash' );
var THREE = require( 'three' );
var $ = require( 'jquery' );
// var TweenLite = require( 'TweenLite' );

class TriangleViz extends PostProcessedScene {
	constructor( options ) {
		super( _.mergeWith( {
			// ---------------------------------------------------
			// Local Properties

			camera: {
				fov: 50,
				near: 0.1,
				far: 10000,
				position: new THREE.Vector3( 0, 0, 8000 ),
				lookAt: new THREE.Vector3( 0, 0, 0 )
			},
			colorMap: undefined,
			colorMapCanvas: undefined,
			colorMapCtx: undefined,
			colorMapData: undefined,
			colorMapOffset: {
				x: 0,
				y: 0
			},
			colorMapDrift: {
				x: 0.001,
				y: 0.003
			},
			rows: 32,
			cols: 32,
			gridWidth: 10000,
			gridHeight: 3000,

			tick: 0,
			prevTick: -1,
			streamData: undefined,
			prevStreamData: undefined,
			prevStreamData1: undefined,

			spiralStartIndex: 0,

			// create object pool
			availableParticles: [],
			activeParticles: [],
			bindFunctions: [
				'loadColorMap',
				'postColorMapLoad',
				'getRGB',
				'updateParticles',
				'updateParticle',
				'getParticles',
				'setupParticles',
				'setupParticle',
				'recycleParticle',
				'reset',
				'computeSpiralGridPosition',
				'computeGridPosition',
				'computeSpiralPosition',
				'setLevel',
				'getLevel'
			],
		}, options, PostProcessedScene.mergeRules ) );

		// Dependent Local Properties

		this.totalChannels = this.cols * this.rows;
		this.currentGridPosition = {
			x: ( this.cols / 2 ) - 1,
			y: ( this.rows / 2 ) - 1
		};
		this.sideIndex = 0;
		this.sideLength = 1;
		this.sidePosition = 0;
	}

	setup() {
		return super.setup()
			.then( this.setupParticles );
	}

	update( data ) {
		var fftData = _.map( _.range( 2048 ), () => 255 * Math.random() );
		// console.log( this.activeParticles[ 0 ].position, this.activeParticles[ 0 ].material, this.activeParticles[ 0 ].geometry );
		this.updateParticles( fftData, data.currentTime, data.currentTick );
	}

	updateParticles( fftData, currentTime, currentTick ) {
		this.tick = currentTick;
		var tickDelta = this.tick - this.prevTick;

		this.colorMapOffset.x += tickDelta * this.colorMapDrift.x;
		this.colorMapOffset.y += tickDelta * this.colorMapDrift.y;

		var fftSize = fftData.length;
		var segs = Math.floor( fftData.length / fftSize );
		fftData = _.map( _.range( fftSize ), function( i ) {
			return _.reduce( fftData.slice( i * segs, ( i + 1 ) * segs ), function( a, b ) {
				return a + b;
			}, 0 ) / segs;
		} );

		this.activeParticles.forEach( ( p, i ) => {
			this.updateParticle( p, this.tick, fftData[ i ] );
		} );

		// var cameraTick = Math.PI * 2 * ( ( this.tick % 2048 ) / 2048 );
		// this.camera.rotation.z = cameraTick;
		// camera.position.x = Math.cos(cameraTick) * WIDTH * 0.125
		// camera.position.y = Math.sin(cameraTick) * HEIGHT * 0.125
		// this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
		this.prevTick = this.tick;

		this.prevStreamData1 = this.prevStreamData;
		this.prevStreamData = this.streamData;
		this.streamData = fftData;

		// normalize stream data

		// streamData = new Uint8Array(
		//     _.map(streamData, function(val, i, arr){
		//         var len = arr.length;
		//         var prop = i / len;
		//         if (prop < 0.5){
		//             val *= 0.5 * (0.5 - prop);
		//         } else {
		//             val *= 4 * (prop - 0.5);
		//         }
		//         return val;
		//     })
		// );
	}

	loadAssets() {
		return this.loadColorMap();
	};

	loadColorMap() {
		var deferred = $.Deferred();
		var imgSrc = 'http://www.theorigin.net/silkbrush/img/colormap.png';
		this.colorMap = new Image();
		this.colorMap.crossOrigin = 'anonymous';
		this.colorMap.src = imgSrc;
		this.colorMap.onload = () => {
			this.postColorMapLoad( deferred );
		};
		return deferred.promise();
	}

	postColorMapLoad( deferred ) {
		this.colorMapCanvas = document.createElement( 'canvas' );
		this.colorMapCanvas.attributes.height = this.colorMapCanvas.attributes.width = 100;
		this.colorMapCtx = this.colorMapCanvas.getContext( '2d' );
		this.colorMapCtx.drawImage( this.colorMap, 0, 0, 100, 100 );
		this.colorMapData = this.colorMapCtx.getImageData( 0, 0, 100, 100 );
		return deferred.resolve();
	}

	getRGB( colorMap, colorMapData, x, y ) {
		var data = colorMapData.data;
		var propX = Math.abs( x / this.width ) + this.colorMapOffset.x;
		var propY = Math.abs( y / this.width ) + this.colorMapOffset.y;
		propX %= 1;
		propY %= 1;
		var col = ( propX * colorMapData.width ) << 2; // multiply by 4 per pixel to account for [r,g,b,a] order
		var row = ( propY * colorMapData.height ) >> 0; // math.floor
		var rowWidth = colorMapData.width << 2;
		return ( data[ col + ( row * rowWidth ) + 0 ] << 16 ) | ( data[ col + ( row * rowWidth ) + 1 ] << 8 ) | data[ col + ( row * rowWidth ) + 2 ];
	}

	// setup elements

	setupRenderChain( options ) {
		super.setupRenderChain( options );
		// this.postProcessingPasses.renderPass.renderToScreen = false;
		let passes = {

		};
		_.extend( this.postProcessingPasses, passes );

		// this.composer
		// 	// 	.addPass( passes.HorizontalBlurPass )
		// .addPass( passes.MakePink )
		// 	.merge( 'branch', 'main', null, {
		// 		renderToScreen: true
		// 	} );
		return this;
	}

	setupShaders( options ) {
		return this;
	}

	setupGeometry( options ) {
		_.extend( this.geometry, {
			boxgeometry: new THREE.BoxGeometry( 200, 200, 200 ),
			// sphereGeometry: new THREE.SphereGeometry(),
			// cylindarGeometry: new THREE.CylinderGeometry(),
			// planeGeometry: new THREE.PlaneGeometry( 1500, 1500 ),
			standardGeometry: new THREE.CylinderGeometry(
				260, // upper radius
				260, // lower radius
				620, // height
				3 // segments
			)
		} );
		this.geometry.standardGeometry.applyMatrix( new THREE.Matrix4()
			.makeRotationX( Math.PI / 2 ) );

		return this;
	}

	setupMaterials( options ) {
		this.materials.standardMaterial = new THREE.MeshLambertMaterial( {
			color: 0xffffff,
			transparent: true,
			blending: THREE.AdditiveBlending,
			opacity: 0,

		} );
		this.materials.basicMaterial = new THREE.MeshBasicMaterial( {
			color: 0xffffff,
			// transparent: true,
			// blending: THREE.AdditiveBlending,
			// opacity: 0,

		} );
		return this;
	}

	setupMeshes( options ) {
		_.extend( this.meshes, {
			// cube: new THREE.Mesh( this.geometry.boxgeometry, this.materials.basicMaterial ),
			// cyl: new THREE.Mesh( this.geometry.cylindarGeometry, this.materials.basicMaterial ),
			// sph: new THREE.Mesh( this.geometry.sphereGeometry, this.materials.basicMaterial ),
			// groundPlane: new THREE.Mesh( this.geometry.planeGeometry, this.materials.basicMaterial )
		} );

		// ---------------------------------------------------
		// Shadows

		// this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.BasicShadowMap;
		//
		// _( this.meshes )
		// 	.each( ( mesh ) => {
		// 		mesh.receiveShadow = true;
		// 		mesh.castShadow = true;
		// 	} );
		// this.meshes.groundPlane.castShadow = false;

		// ---------------------------------------------------
		// Transform Geometry
		// this.meshes.groundPlane.geometry.rotateX( -Math.PI / 2 );
		return this;
	}

	setupLights( options ) {
		_.extend( this.lights, {
			ambientLight: new THREE.AmbientLight( 0xffffff ),
			// pointLight: new THREE.PointLight( 0xffffff, 1 ),
			// dirctionalLight: new THREE.DirectionalLight(0xffffff, 2)
		} );

		// ---------------------------------------------------
		// Shadows

		// this.lights.pointLight.castShadow = true;
		// this.lights.pointLight.shadow.camera.near = 1;
		// this.lights.pointLight.shadow.camera.far = 5000;
		// this.lights.pointLight.shadow.bias = 0.01;

		return this;
	}

	layoutScene( options ) {
		super.layoutScene( options );
		// ---------------------------------------------------
		// Position Lights
		// this.lights.pointLight.position.set( 500, 250, -350 );

		// ---------------------------------------------------
		// Position Meshes
		this.activeParticles.forEach( this.recycleParticle );
		this.particleDestination = new THREE.Vector3( 0, 0, 5000 );

		return this;
	}

	// ------------------------------------

	setupParticles() {
		// console.log( 'setupParticles', this.totalChannels, this.tick, this.rows, this.cols );
		this.getParticles( this.totalChannels, {
				birthday: this.tick
			} )
			.forEach( ( p, i ) => {
				this.setupParticle( p, {
					index: i,
					rows: this.rows,
					cols: this.cols
				} );
			} );
	}

	// ------------------------------------

	setupParticle( particle, options ) {
		var p = _.extend( particle, options );
		p.geometry.dynamic = true;

		// changes to the vertices
		p.geometry.verticesNeedUpdate = true;

		// changes to the normals
		p.geometry.normalsNeedUpdate = true;

		// assign particles to home positions
		// this.computeGridPosition(p, options.cols, options.rows);
		this.computeSpiralGridPosition( p, options.cols, options.rows );
		// this.computeSpiralPosition(p);

		p.angle = Math.atan2( p.homePosition.y, p.homePosition.x );
		p.speed = -100;

		var color = this.getRGB( this.colorMap, this.colorMapData, p.homePosition.x * 0.25, p.homePosition.y * 0.25 );
		p.material.color = new THREE.Color( color );
	}

	// ------------------------------------

	getParticles( quantity, options ) {
		quantity = quantity || 1;
		while ( this.availableParticles.length < quantity ) {
			this.availableParticles.push( new Particle( {
				standardGeometry: this.geometry.standardGeometry,
				standardMaterial: this.materials.standardMaterial
			} ) );
		}
		var newParticles = this.availableParticles.splice( 0, quantity );
		newParticles.forEach( ( p ) => {
			// setupParticle(p, options);
			this.scene.add( p );
		} );

		this.activeParticles = this.activeParticles.concat( newParticles );
		return newParticles;
	}

	// ------------------------------------

	updateParticle( p, tick, level ) {
		// console.log( tick, level, p.birthday );
		p.age = ( tick - p.birthday ) / p.lifespan;

		this.setLevel( p, level );

		if ( p.age >= 1 ) {
			// recycleParticle(p);
			p.age = 1;
		} else if ( p.age <= 0 ) {
			p.age = 0;
		}

		p.position.x = p.homePosition.x + ( 1 - p.age ) * Math.cos( p.angle ) * p.speed;
		p.position.y = p.homePosition.y + ( 1 - p.age ) * Math.sin( p.angle ) * p.speed;
		p.position.z = ( this.particleDestination.z * ( p.peak / 255 ) ) * ( 1 - p.age );

		// less opaque with age
		// less opaque with higher index

		p.material.opacity = ( 1 - p.age ) * Math.pow( ( p.peak / 255 ), 1.25 ) * ( 0.24 ); // + (0.10 * (1 - (p.index / 1024))));

		var color = this.getRGB( this.colorMap, this.colorMapData, Math.pow( p.gridPosition.x / this.cols, 1 ) * 750, Math.pow( p.gridPosition.y / this.rows, 1 ) * 750 );
		p.material.color = new THREE.Color( color );

		// p.lookAt(camera.position);
	}

	// ------------------------------------

	reset() {
		this.activeParticles.forEach( function( p ) {
			p.age = 0;
			p.birthday = 0;
			p.level = 0;
		} );
	}

	// ------------------------------------

	resizeParticle( p ) {

	}

	// ------------------------------------

	recycleParticle( particle ) {
		this.scene.remove( particle );
		var index = this.activeParticles.indexOf( particle );
		this.activeParticles.splice( index, 1 );
		this.availableParticles.push( particle );
	}

	// ------------------------------------

	computeSpiralGridPosition( p, cols, rows ) {
		switch ( this.sideIndex ) {
			case 0:
				p.gridPosition = _.extend( {}, this.currentGridPosition );
				this.currentGridPosition.x++;
				report();
				if ( ++this.sidePosition >= this.sideLength ) {
					this.sidePosition = 0;
					this.sideIndex++;
				}
				break;
			case 1:
				p.gridPosition = _.extend( {}, this.currentGridPosition );
				this.currentGridPosition.y++;
				report();
				if ( ++this.sidePosition >= this.sideLength ) {
					this.sidePosition = 0;
					this.sideIndex++;
				}
				break;
			case 2:
				p.gridPosition = _.extend( {}, this.currentGridPosition );
				this.currentGridPosition.x--;
				report();
				if ( ++this.sidePosition >= this.sideLength ) {
					this.sidePosition = 0;
					this.sideIndex++;
				}
				break;
			case 3:
				p.gridPosition = _.extend( {}, this.currentGridPosition );
				this.currentGridPosition.y--;
				report();
				if ( ++this.sidePosition >= this.sideLength ) {
					this.sidePosition = 0;
					this.sideIndex = 0;
					this.currentGridPosition.x--;
					this.currentGridPosition.y--;
					this.sideLength += 2;
				}

				break;
		}

		p.homePosition.x = ( ( p.gridPosition.x / this.cols ) * this.gridWidth ) - ( this.gridWidth * 0.5 );
		p.homePosition.y = ( ( p.gridPosition.y / this.rows ) * this.gridHeight ) - ( this.gridHeight * 0.5 );

		p.centerdGridPosition = {
			x: p.gridPosition.x - 0.5 * this.cols,
			y: p.gridPosition.y - 0.5 * this.rows
		};

		// p.homePosition.x = ((Math.pow(centerdGridPosition / 0.5 * cols, 2)) * gridWidth) - (gridWidth*0.5);
		// p.homePosition.y = ((Math.pow(centerdGridPosition / 0.5 * rows, 2)) * gridHeight) - (gridHeight*0.5);
		p.homePosition.z = 0;

		p.position.x = p.homePosition.x;
		p.position.y = p.homePosition.y;
		p.position.z = this.particleDestination.z;

		function report() {
			// console.log({index: p.index, sideIndex: sideIndex, sidePosition: sidePosition, sideLength: sideLength}, currentGridPosition);
		}
	}

	// ------------------------------------

	computeGridPosition( p, cols, rows ) {
		p.gridPosition = {
			x: p.index % cols,
			y: Math.floor( p.index / cols ),
			z: 0
		};
		p.homePosition.x = ( 1 - Math.pow( ( p.gridPosition.x / this.cols ) * this.width, 6 ) ) - ( this.width * 0.5 );
		p.homePosition.y = ( 1 - Math.pow( ( p.gridPosition.y / this.rows ) * this.height, 6 ) ) - ( this.height * 0.5 );
		p.homePosition.z = 0;

		p.position.x = p.homePosition.x;
		p.position.y = p.homePosition.y;
		p.position.z = p.particleDestination.z;
	}

	// ------------------------------------

	computeSpiralPosition( p ) {
		var finalRadius = Math.sqrt( this.activeParticles.length + this.spiralStartIndex );

		var angle = p.index * Math.PHI; // Golden angle relative to TWO_PI

		p.homePosition = new THREE.Vector3(
			Math.cos( angle ) * Math.sqrt( p.index + this.spiralStartIndex ) * 2 * ( 720 / finalRadius ),
			Math.sin( angle ) * Math.sqrt( p.index + this.spiralStartIndex ) * 2 * ( 480 / finalRadius ),
			0
		);

		// console.table(p.homePosition)

		p.position.x = p.homePosition.x;
		p.position.y = p.homePosition.y;
	}

	// ------------------------------------

	setLevel( p, level ) {
		if ( level >= this.getLevel( p ) ) {
			// reset to new peak
			p.peak = level;
			p.age = 0;
			p.birthday = this.tick;
			// console.log( p.birthday )
		}
	}

	getLevel( p ) {
		return p.peak * ( 1 - p.age );
	}

}

// ------------------------------------

var Particle = function( options ) {
	var p = _.extend( new THREE.Mesh(
		options.standardGeometry,
		options.standardMaterial.clone()
	), {
		index: 0,
		age: 1,
		lifespan: 120,
		birthday: 0,
		peak: 0,
		endTime: this.birthday + this.lifespan,
		homePosition: {
			x: 0,
			y: 0,
			z: 0
		},
	}, options );

	return p;
};

module.exports = TriangleViz;
