var _ = require( 'lodash' );
var Page = require( '_TASK/views/pages/Page' );
var pageViews = require( './pages/index' );
var uiViews = require( './ui/index' );
var io = require( 'socket.io-client' );

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

		this.listenTo( this.pageViews[ 'Control Panel' ], 'sync', ( data ) => {
			this.socket.send( 'sync', data );
		} );
		this.listenTo( this.pageViews[ 'Control Panel' ], 'restart', () => {
			this.socket.send( 'restart' );
		} );

		// TODO: Move this to a model

		this.socket = io( 'http://pgtool.local:3011' );

		this.socket.on( 'connect', () => {
			this.socket.on( 'sync', ( data ) => {
				this.model.trigger( 'sync', data );
			} );

			this.socket.on( 'fft', ( data ) => {
				this.model.trigger( 'fft', data );
			} );

			this.socket.on( 'restart', ( data ) => {
				this.model.trigger( 'restart', data );
			} );
		} );
	}
}

module.exports = AppPage;
