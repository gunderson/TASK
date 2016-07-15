var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
// TODO abstract three-view
// var ThreeView = require( './Threejs-Page/Three-View' );
// var TransportBar = require( '_TASK/views/ui/Transport-Bar' );
// var MouseTelemetrics = require( '_art-kit/position/MouseTelemetrics' );

import MouseTelemetrics from '_art-kit/io/MouseTelemetrics';

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			name: 'Threejs',
			autoPlay: true,
			autoStop: true,

			// ---------------------------------------------------
			// local Properties

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'afterRender',
				'onMouseMove',
				'play',
				'stop',
				'update',
				'draw',
				'setupThreeView'
			],

			// ---------------------------------------------------
			// Event Listeners

			// TODO: Build in a workaround in TASK/Base and TASK/View so all events can use the target name rather than the selector name of assigning events
			events: [ {
				eventName: 'mousemove',
				target: '$el',
				handler: 'onMouseMove'
			} ],

			// ---------------------------------------------------
			// Data Binding

			dataBindings: []
		}, options, ThreejsPage.mergeRules ) );

		// ---------------------------------------------------
		// Finish setup

		this.mouseTelemetrics = new MouseTelemetrics();
	}

	// ---------------------------------------------------

	setupThreeView() {
		if ( !this.threeView.setup() ) {
			throw new Error( 'threeView must be set by child class' );
		}
		return this;
	}

	// ---------------------------------------------------
	// Event Handlers

	onResize() {
		if ( this.threeView ) this.threeView.onResize();
	}

	// ---------------------------------------------------

	onMouseMove( e ) {
		this.mouseTelemetrics.update( e );
	}

	// ---------------------------------------------------

	// ---------------------------------------------------
	// TASK/Page Overrides

	// transitionIn() {
	// 	super.transitionIn();
	// 	}
	//
	// transitionInComplete() {
	// 	super.transitionInComplete();
	// }
	//
	// // ---------------------------------------------------
	//
	// transitionOut() {
	// 	super.transitionOut();
	// }
	//
	// // ---------------------------------------------------
	//
	// beforeRender() {
	// 	super.beforeRender();
	// }

	// ---------------------------------------------------

	afterRender() {
		super.afterRender();
		this.setupThreeView();
	};

	// ---------------------------------------------------
	// TASK/AnimationPlayerPage Overrides

	play() {
		super.play();
		return this;
	};

	// ---------------------------------------------------

	stop() {
		super.stop();
		return this;
	};

	update( data ) {
		// console.log( 'update' )
		this.threeView.update( _.extend( {
			mouseTelemetrics: this.mouseTelemetrics
		}, data ) );
		return this;
	}

	draw() {
		// console.log( 'draw' )
		this.threeView.draw();
		return this;
	}
}

module.exports = ThreejsPage;
