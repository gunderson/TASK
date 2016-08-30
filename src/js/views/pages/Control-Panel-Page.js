'use strict';
var _ = require( 'lodash' );
var $ = require( 'jquery' );
var TASK = require( '_TASK/Base' );
var ThreejsPage = require( '_TASK/views/pages/Threejs-Page' );
var ThreeView = require( './Control-Panel-Page/Three-View' );
var TransportBar = require( '_TASK/views/ui/Transport-Bar' );

class ControlPanelPage extends ThreejsPage {
	constructor( options ) {
		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			name: 'Control-Panel',

			// ---------------------------------------------------
			// Local Properties

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
				'onChangeCheckbox'
			]
		}, options, TASK.mergeRules ) );

		// ---------------------------------------------------
		// finish setup

		this.threeView = _.find( this.views, {
			name: 'three-holder'
		} );
		this.transportBar = _.find( this.views, {
			name: 'transport-bar'
		} );
	}

	// ---------------------------------------------------
	// ThreeView Handlers

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
	// ControlPanel Handlers

	onChangeCheckbox( evt ) {
		var target = evt.target;
		if ( target.checked ) {
			this.$( 'input:checkbox' )
				.each( ( i, el ) => {
					target.value === i ? el.checked = true : el.checked = false;
				} );
		} else {
			$.get( `http://${this.localAddress}:${this.localPort}/led/${target.value}/off` );
		}
	}
}

module.exports = ControlPanelPage;
