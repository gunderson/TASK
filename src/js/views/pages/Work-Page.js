var $ = require( 'jquery' );
var _ = require( 'lodash' );
var PEAK = require( '_PEAK/Base' );
var Page = require( '_PEAK/views/pages/Page' );
var WorkDetail = require( './Work-Detail-Page' );

class WorkPage extends Page {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.mergeWith( {
			name: 'Work',

			// ---------------------------------------------------
			// Child Views

			views: {
				'Work-Detail': new WorkDetail(),
			},

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

module.exports = WorkPage;
