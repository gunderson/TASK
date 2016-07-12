var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
var TASK = AnimationPlayerPage;
// TODO abstract three-view
// var ThreeView = require( './Threejs-Page/Three-View' );
// var TransportBar = require( '_TASK/views/ui/Transport-Bar' );
// var MouseTelemetrics = require( '_art-kit/position/MouseTelemetrics' );

import MouseTelemetrics from '_art-kit/position/MouseTelemetrics';

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.defaults( options, {
			name: 'Threejs',
			autoPlay: true,
			autoStop: true
				// ---------------------------------------------------
				// events: [ {
				// 	eventName: 'click',
				// 	selector: 'button.play',
				// 	handler: 'onPlayButtonClick'
				// }, {
				// 	eventName: 'click',
				// 	selector: 'button.stop',
				// 	handler: 'onStopButtonClick'
				// } ],
				// // ---------------------------------------------------
				// views: [
				// 	new ThreeView( {
				// 		name: 'three-holder',
				// 		el: '.three-holder'
				// 	} )
				// 	new TransportBar( {
				// 		name: 'transport-bar',
				// 		el: '.transport-bar'
				// 	} )
				// ]
		} ) );

		// this.transportBar = _.find( this.views, {
		// 	name: 'transport-bar'
		// } );
		this.mouseTelemetrics = new MouseTelemetrics();

		// ---------------------------------------------------
		// Bind Functions

		TASK.bindFunctions( this, [
			'onMouseMove',
			'play',
			'stop',
			'update',
			'draw',
			'setupThreeView'
		] );

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
