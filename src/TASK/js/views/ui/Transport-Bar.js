var _ = require( 'lodash' );
var TaskView = require( '_TASK/views/View' );

class TransportBar extends TaskView {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.defaults( options, {
			name: '<%=name%>',
			el: null,
			col: 0,
			row: 0,
			type: 'page',
			views: null,
			events: [ {
				eventName: 'click',
				selector: 'button.play',
				handler: 'onPlayButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.stop',
				handler: 'onStopButtonClick'
			} ]
		} ) );

		// ---------------------------------------------------
		// Event Listeners

		// ---------------------------------------------------
		// Function Bindings

		// ---------------------------------------------------
		// Local Properties
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
