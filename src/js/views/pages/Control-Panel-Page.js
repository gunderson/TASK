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
				handler: 'enterFullScreen'
			}, {
				eventName: 'click',
				target: 'button.sync',
				handler: 'onClickSync'
			}, {
				eventName: 'click',
				target: 'button.restart',
				handler: 'onClickRestart'
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
				'onClickSync',
				'onClickRestart',
				'onFullScreen',
				'onEnterFullScreen',
				'onRestart',
				'onFFT',
				'onSync'
			]
		}, options, TASK.mergeRules ) );

		// ---------------------------------------------------
		// finish setup

		this.threeView = this.views[ 'threeView' ];
		this.transportBar = this.views[ 'transportBar' ];

	}

	// ---------------------------------------------------
	// ThreeView Handlers

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

	onEnterFullScreen() {
		this.threeView.el.webkitRequestFullScreen();
	}

	onFullScreen() {
		$( 'html' )
			.toggleClass( 'fullscreen' );
		this.threeView.$el.toggleClass( 'fullscreen' );
	}

	// ---------------------------------------------------
	// ControlPanel Handlers

	onClickSync() {
		console.log( this.threeView.scenes.TriangleViz.getColorMapOffset() )
		this.trigger( 'sync', {
			currentTime: this.player.currentTime,
			colorMapOffset: this.threeView.scenes.TriangleViz.getColorMapOffset()
		} );
	}

	onClickRestart() {
		this.trigger( 'restart' );
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
}

module.exports = ControlPanelPage;
