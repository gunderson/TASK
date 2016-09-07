var $ = require( 'jquery' );
var _ = require( 'lodash' );
var TASK = require( '_TASK/Base' );
var ThreejsPage = require( '_TASK/views/pages/Threejs-Page' );
var ThreeView = require( './Projector-Page/Three-View' );
var TransportBar = require( '_TASK/views/ui/Transport-Bar' );

class ProjectorPage extends ThreejsPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Projector',

			// ---------------------------------------------------
			// Event Handlers

			events: [ {
				eventName: 'play',
				target: 'transportBar',
				handler: 'onPlay'
			}, {
				eventName: 'stop',
				target: 'transportBar',
				handler: 'onStop'
			}, {
				eventName: 'fullscreen',
				target: 'transportBar',
				handler: 'enterFullScreen'
			}, {
				eventName: 'change',
				target: 'select.cameraPosition',
				handler: 'onChangeCameraPosition'
			}, {
				eventName: 'fft',
				target: 'APP',
				handler: 'onFFT'
			}, {
				eventName: 'sync',
				target: 'APP',
				handler: 'onSync'
			}, {
				eventName: 'restart',
				target: 'APP',
				handler: 'onRestart'
			} ],

			// ---------------------------------------------------
			// Child Views

			views: {
				'threeView': new ThreeView( {
					name: 'three-holder',
					el: '.three-holder'
				} ),
				'transportBar': new TransportBar( {
					name: 'transport-bar',
					el: '.transport-bar'
				} )
			},

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'onPlay',
				'onStop',
				'onFullScreen',
				'enterFullScreen',
				'onChangeCameraPosition',
				'onFFT',
				'onSync'
			]
		}, options, TASK.mergeRules ) );

		// ---------------------------------------------------
		// Finish Setup

		this.threeView = this.views[ 'threeView' ];
		this.transportBar = this.views[ 'transportBar' ];

		this.$( '.transport-bar button.enter-fullscreen' )
			.on( 'click', this.enterFullScreen );

	}

	// ---------------------------------------------------
	// Public Methods

	// ---------------------------------------------------
	// overrides

	afterRender() {
		super.afterRender();

		this.$( '.scenes' )
			.text( _.keys( this.threeView.scenes )
				.toString() );
	}

	// ---------------------------------------------------
	// Event Handlers

	onChangeCameraPosition( e ) {
		var value = e.target.value;
		this.threeView.setCameraPosition( parseInt( value, 10 ) );
	}

	onRestart() {
		this.animationPlayer.reset();
		this.animationPlayer.play();
	}

	onFFT( data ) {
		this.fftData = data.fftData;
	}

	onSync( data ) {
		this.animationPlayer.currentTime = data.currentTime;
		this.threeView.sync( data );
	}

	update( playerData ) {
		this.threeView.update( _.extend( {}, playerData, {
			fftData: this.fftData
		} ) );
	}

	// ---------------------------------------------------
	// TransportBar Handlers

	onPlay() {
		this.play();
	}

	onStop() {
		this.stop();
	}

	enterFullScreen() {
		console.log( 'enterFullScreen' );
		this.$( this.threeView.el )[ 0 ].webkitRequestFullScreen();
	}

	onFullScreen() {
		$( 'html' )
			.toggleClass( 'fullscreen' );
		this.$( this.threeView.el )
			.toggleClass( 'fullscreen' );
	}

	transitionInComplete() {
		super.transitionInComplete();

		$( document )
			.on( "webkitfullscreenchange fullscreenchange", this.onFullScreen );
	}

	transitionOut() {
		super.transitionOut();

		$( document )
			.off( "webkitfullscreenchange fullscreenchange", this.onFullScreen );
	}

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = ProjectorPage;
