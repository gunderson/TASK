var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );
var pageViews = require( './pages/index' );
var uiViews = require( './ui/index' );

class AppPage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.merge( {
			name: 'app-page',
			views: [].concat( uiViews, pageViews )
		}, options ) );

		this.pageViews = pageViews;

		// ---------------------------------------------------
		// Event Handling

		this.listenTo( this.model, 'route', this.onRoute );
	}
}

module.exports = AppPage;
