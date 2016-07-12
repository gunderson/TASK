var _ = require( 'lodash' );
var Events = require( 'backbone-events-standalone' );

class TASK {
	constructor( options ) {
		this.options = _.merge( {
				events: {},
				bindFunctions: []
			},
			options );
		this.bindFunctions( options.bindFunctions );
	}

	// ---------------------------------------------------
	// Bind functions named in the 'bindFunctions' hash
	bindFunctions( funcNames, context ) {
		context || ( context = this );
		_.each( funcNames, ( funcName ) => {
			context[ funcName ] = context[ funcName ].bind( context );
		} );
		return context;
	}

	// ---------------------------------------------------

	delegateEvents() {
		_.each( this.events, ( e ) => {
			e.handler = this.getLocalObject( e.handler );
			e.target = this.getLocalObject( e.target );
			if ( e.target && typeof e.target === 'object' && e.target.trigger ) {
				this.listenTo( e.target, e.eventName, e.handler );
			}
		} );
		return this;
	}

	// ---------------------------------------------------

	undelegateEvents() {
		_.each( this.events, ( e ) => {
			this.stopListening( e.target, e.eventName );
		} );
		return this;
	}

	// ---------------------------------------------------

	getLocalObject( name ) {
		if ( typeof name === 'string' ) return this[ name ];
		return name;
	}
}

Events.mixin( TASK.prototype );

module.exports = TASK;
