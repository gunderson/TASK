var _ = require( 'lodash' );
// var AnimationPlayerPage = require( '../../framework/views/pages/js/Animation-Player-Page' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
var ThreeView = require( '../Three-View' );
var MouseTelemetrics = require( 'art-kit/src/MouseTelemetrics' );

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.defaults( options, {
			name: 'threejs-page',
			autoPlay: false,
			autoStop: true,
			events: [ {
				eventName: 'click',
				selector: 'button.play',
				handler: 'onPlayButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.stop',
				handler: 'onStopButtonClick'
			} ],
			views: [
				new ThreeView( {
					el: '.three-holder'
				} )
			]
		} ) );

		this.mouseTelemetrics = new MouseTelemetrics();

		// ---------------------------------------------------
		// Bind Functions

		this.bindFunctions( this, [
			'update',
			'draw',
			'onPlayButtonClick',
			'onStopButtonClick',
			'onMouseMove'
		] );

		// ---------------------------------------------------
		// Event Listeners

		this.$el( 'mousemove', this.onMouseMove );

		// ---------------------------------------------------
		// Finish setup

		this.setup();
	}

	setup() {
		this.threeView = this.views[ 0 ];
		this.threeView.setup();
	}

	update() {
		this.threeView.update( {} );
	}

	// ---------------------------------------------------
	// Event Handlers

	onMouseMove( e ) {
		this.mouseTelemetrics.update( e );
	}

	onPlayButtonClick() {
		this.play();
	}

	onStopButtonClick() {
		this.stop();
	}

	// ---------------------------------------------------
	// TASK/Page Overrides

	transitionInComplete() {
		super();
	}

	transitionOut() {
		super();
	}

	afterRender() {
		super();
	};

	// ---------------------------------------------------
	// TASK/AnimationPlayerPage Overrides

	play() {
		super();
		this.threeView.draw();
	};

	stop() {
		super();
		cancelAnimationFrame( this.raf );
	};

	// ---------------------------------------------------
	// Getter & Setters

	get raf() {
		return this.threeView.raf;
	}
}

module.exports = ThreejsPage;
