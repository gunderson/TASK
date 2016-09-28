/* exlint-env es6 */
var _ = require( 'lodash' );
var Page = require( '_PEAK/views/pages/Page' );

class HomePage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			// ---------------------------------------------------
			// Class Properties

			name: 'Home',
			col: 0,
			row: 0,

			// ---------------------------------------------------
			// Local Properties

			// ---------------------------------------------------
			// Child views

			//views: [],

			// ---------------------------------------------------
			// Event Handlers

			//events: [],

			// ---------------------------------------------------
			// Bind Functions

			//bindFunctions: []
		}, options, Page.mergeRules ) );
	}

	// ---------------------------------------------------
	// Public Methods

	// ---------------------------------------------------
	// Event Handlers

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = HomePage;
