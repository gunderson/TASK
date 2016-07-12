var _ = require( 'lodash' );
var Model = require( '_TASK/models/Model' );
var TaskView = require( '_TASK/views/View' );

class TransportBar extends TaskView {
	constructor( options ) {
		super( _.merge( {

			// ---------------------------------------------------
			// Class Properties

			name: '',
			el: null,
			views: null,

			// ---------------------------------------------------
			// Local Properties

			target: null,
			model: new Model( {
				title: '',
				isPlaying: false,
				currentTime: 0,
				duration: 0,
				isFullscreen: false,
				isMuted: false,
				volume: 1
			} ),

			// ---------------------------------------------------
			// Event Listeners

			events: [ {
				eventName: 'click',
				selector: 'button.play',
				handler: 'onPlayButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.stop',
				handler: 'onStopButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.fullscreen',
				handler: 'onFullscreenButtonClick'
			} ]

			// ---------------------------------------------------
			// Function Bindings
		}, options ) );

	}

	// ---------------------------------------------------
	// Public Methods

	// ---------------------------------------------------
	// Event Handlers

	onPlayButtonClick() {
		this.trigger( 'play' );
	}

	// ---------------------------------------------------

	onStopButtonClick() {
		this.trigger( 'stop' );
	}

	// ---------------------------------------------------

	onFullscreenButtonClick() {
		this.trigger( 'fullscreen' );
	}

	// ---------------------------------------------------

	onChangeVolume( e ) {
		this.model.volume = e.target.value;
	}

	// ---------------------------------------------------

	onClickToggleMute() {

	}

	// ---------------------------------------------------

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = TransportBar;
