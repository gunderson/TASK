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
				handler: 'onFullscreen'
			}, {
				eventName: 'change',
				target: 'select.cameraPosition',
				handler: 'onChangeCameraPosition'
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
				'onFullscreen',
				'onEnterFullscreen',
				'onExitFullscreen',
				'onChangeCameraPosition'
			]
		}, options, TASK.mergeRules ) );

		// ---------------------------------------------------
		// Finish Setup

		this.threeView = _.find( this.views, {
			name: 'three-holder'
		} );
		this.transportBar = _.find( this.views, {
			name: 'transport-bar'
		} );
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

	// ---------------------------------------------------
	// TransportBar Handlers

	onPlay() {
		this.play();
	}

	onStop() {
		this.stop();
	}

	onFullscreen() {
		// make three-view full screen
	}

	onEnterFullscreen() {

	}

	onExitFullscreen() {

	}

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = ProjectorPage;
