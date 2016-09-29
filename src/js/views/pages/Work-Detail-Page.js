var $ = require( 'jquery' );
var _ = require( 'lodash' );
var PEAK = require( '_PEAK/Base' );
var Page = require( '_PEAK/views/pages/Page' );

class WorkDetailPage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Work-Detail',

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

module.exports = WorkDetailPage;
