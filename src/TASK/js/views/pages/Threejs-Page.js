var _ = require( 'lodash' );
var AnimationPlayerPage = require( './Animation-Player-Page' );
var TASK = AnimationPlayerPage;
var ThreeView = require( './Threejs-Page/Three-View' );
var TransportBar = require( '_TASK/views/ui/Transport-Bar' );
var MouseTelemetrics = require( '_art-kit/MouseTelemetrics' );

class ThreejsPage extends AnimationPlayerPage {
	constructor( options ) {
		super( _.defaults( options, {
			name: 'Threejs',
			autoPlay: true,
			autoStop: true,
			// ---------------------------------------------------
			events: [ {
				eventName: 'click',
				selector: 'button.play',
				handler: 'onPlayButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.stop',
				handler: 'onStopButtonClick'
			} ],
			// ---------------------------------------------------
			views: [
				new ThreeView( {
					name: 'three-holder',
					el: '.three-holder'
				} ),
				new TransportBar( {
					name: 'transport-bar',
					el: '.transport-bar'
				} )
			]
		} ) );

		this.transportBar = _.find( this.views, {
			name: 'transport-bar'
		} );
		this.mouseTelemetrics = new MouseTelemetrics();

		// ---------------------------------------------------
		// Bind Functions

		TASK.bindFunctions( this, [
			'onPlayButtonClick',
			'onStopButtonClick',
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
		this.listenTo( this.transportBar, 'play', this.onClickPlay );
		this.listenTo( this.transportBar, 'stop', this.onClickPlay );

		// ---------------------------------------------------
		// Finish setup

	}

	// ---------------------------------------------------

	setupThreeView() {
		this.threeView = this.views[ 0 ];
		this.threeView.setup();
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

	onPlayButtonClick() {
		this.play();
	}

	// ---------------------------------------------------

	onStopButtonClick() {
		this.stop();
	}

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

	update() {
		this.threeView.update( {
			mouseTelemetrics: this.mouseTelemetrics
		} );
		return this;
	}

	draw() {
		this.threeView.draw();
		return this;
	}
}

module.exports = ThreejsPage;
