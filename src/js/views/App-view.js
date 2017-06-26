var _ = require( 'lodash' );
var Page = require( '_TASK/views/pages/Page' );
var pageViews = require( './pages/index' );
var uiViews = require( './ui/index' );

class AppPage extends Page {
	constructor( options ) {

		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			name: 'app-page',
			parentView: window,

			// ---------------------------------------------------
			// Local Properties

			// ---------------------------------------------------
			// Child Views

			views: _.extend( {}, uiViews, pageViews ),

			// ---------------------------------------------------
			// Event Listeners

			events: [ {
				eventName: 'route',
				target: 'model',
				handler: 'onRoute'
			} ],

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'onRoute'
			]
		}, options, Page.mergeRules ) );

		this.pageViews = pageViews;

	}
}

module.exports = AppPage;
