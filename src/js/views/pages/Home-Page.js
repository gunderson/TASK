/* exlint-env es6 */
var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );

class HomePage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.merge( {
			name: 'Home',
			el: null,
			col: 0,
			row: 0,
			type: 'page',
			views: null,
			events: null
		}, options ) );

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

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = HomePage;
