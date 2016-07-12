var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
// TODO abstract three-view
// var ThreeView = require( './Threejs-Page/Three-View' );
// var TransportBar = require( '_TASK/views/ui/Transport-Bar' );
// var MouseTelemetrics = require( '_art-kit/position/MouseTelemetrics' );

import MouseTelemetrics from '_art-kit/position/MouseTelemetrics';

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.merge( {
			name: 'Threejs',
			autoPlay: true,
			autoStop: true,
			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'onMouseMove',
				'play',
				'stop',
				'update',
				'draw',
				'setupThreeView'
			],
			// ---------------------------------------------------
			// Event Listeners

			events: [ {
				eventName: 'mousemove',
				target: '$el',
				handler: 'onMouseMove'
			} ]
		}, options ) );

		this.mouseTelemetrics = new MouseTelemetrics();

		// ---------------------------------------------------
		// Event Listeners

		this.$el.on( 'mousemove', this.onMouseMove );

		// ---------------------------------------------------
		// Finish setup

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
		this.threeView.update( _.extend( {
			mouseTelemetrics: this.mouseTelemetrics
		}, data ) );
		return this;
	}

	draw() {
		this.threeView.draw();
		return this;
	}
}

module.exports = ThreejsPage;
