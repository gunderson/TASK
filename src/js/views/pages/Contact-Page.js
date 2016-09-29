var $ = require( 'jquery' );
var _ = require( 'lodash' );
var PEAK = require( '_PEAK/Base' );
var Page = require( '_PEAK/views/pages/Page' );

class ContactPage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Contact',

			// ---------------------------------------------------
			// Child Views

			views: [],

			// ---------------------------------------------------
			// Event Listeners

			events: [],

			// ---------------------------------------------------
			// Function Bindings

			bindFunctions: []

			// ---------------------------------------------------
			// Local Properties

		}, options, PEAK.mergeRules ) );

	}

	// ---------------------------------------------------
	// Public Methods

	// ---------------------------------------------------
	// Event Handlers

	// ---------------------------------------------------
	// Getters & Setters
}

module.exports = ContactPage;
