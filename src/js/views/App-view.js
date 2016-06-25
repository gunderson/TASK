var _ = require( 'lodash' );
var TaskPage = require( '_TASK/views/pages/Page' );
var ThreejsPage = require( '_TASK/views/pages/Threejs-Page' );
var MainMenuView = require( './ui/Main-menu-view' );
var MasterPage = require( './pages/Master-Page' );
var ControlPanelPage = require( './pages/Control-Panel-Page' );

class AppPage extends TaskPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		var uiViews = [
			new MainMenuView()
		];

		var pageViews = [
			new MasterPage( {
				col: 0,
				row: 0
			} ),
			new ControlPanelPage( {
				col: 1,
				row: 0
			} ),
			new ThreejsPage( {
				col: 2,
				row: 0
			} )
		];

		super( _.extend( {
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
