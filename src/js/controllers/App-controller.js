var _ = require( 'lodash' );
var $ = require( 'jquery' );
var Model = require( '_PEAK/models/Model' );
var router = require( 'page' );

class AppModel extends Model {
	constructor( options ) {
		super( {}, _.mergeWith( {

			// ---------------------------------------------------------
			// Local Properties

			prevRoute: null,
			_route: {
				parts: [ 'bootstrap route' ]
			},

			// ---------------------------------------------------------
			// Event Listeners

			events: [ {
				eventName: 'resize',
				selector: window,
				handler: 'onResize'
			} ],

			// ---------------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'setupRouter',
				'setupSocket',
				'onRoute',
				'onResize'
			]
		}, options, Model.mergeRules ) );

		// ---------------------------------------------------------
		// Init chain

		// this.setupRouter();
		// this.setupSocket();

	}

	// ---------------------------------------------------------
	// Controls

	play() {
		return $.get( `http://${this.ENV.address}:${this.ENV.port}/play` );
	}

	stop() {
		return $.get( `http://${this.ENV.address}:${this.ENV.port}/stop` );
	}

	setLed( id, state ) {
		return $.get( `http://${this.ENV.address}:${this.ENV.port}/led/${id}/${state}` );
	}

	onResize() {
		this.trigger( 'resize' );
	}

	// ---------------------------------------------------------
	// Routing

	setupSocket() {
		// this.socket = io( `http://${this.localAddress}` );
		// this.socket.on( 'connect', function() {} );
		// this.socket.on( 'event', function( data ) {} );
		// this.socket.on( 'disconnect', function() {} );
	}

	setupRouter( routes ) {
		router.base( '/#' );
		router( '/', `/${routes[0]}` );
		_.each( routes, ( route ) => {
			router( `/${route}`, this.onRoute );
		} );
		router( '*', `/${routes[0]}` );
		router();
	}

	onRoute( ctx ) {
		this.route = ctx;
	}

	// ---------------------------------------------------------
	// Getters & Setters

	get route() {
		return this._route;
	}

	set route( ctx ) {
		// Get constituent parts for use in page-route handling
		ctx.parts = ctx.path
			.slice( 1 )
			.split( '/' );
		this.prevRoute = this._route;
		this._route = ctx;
		this._route.prevRoute = this.prevRoute;

		this.trigger( 'route', this._route );
		return ctx;
	}
}

module.exports = AppModel;
