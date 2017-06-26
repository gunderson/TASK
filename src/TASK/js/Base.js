var _ = require( 'lodash' );
var $ = require( 'jquery' );
var Events = require( 'backbone-events-standalone' );

let context = typeof window != 'undefined' ? window : global;

class TASK {
	constructor( options ) {
		this.options = _.mergeWith( {
				// ---------------------------------------------------
				// Event Listeners

				events: [],

				// ---------------------------------------------------
				// Function Scope Binding

				bindFunctions: []
			},
			options, TASK.mergeRules );
		_.extend( this, this.options );
		this.makeBoundFunctions( this.options.bindFunctions, this );
		// memory leak here, fixed in later versions by eliminating this block and not tracking TASK instances
		if ( !context.TASKs ) context.TASKs = [];
		context.TASKs.push( this );
	}

	// ---------------------------------------------------
	// Bind functions named in the 'bindFunctions' hash
	makeBoundFunctions( funcNames, context ) {
		context = context || this;
		_.each( funcNames, ( funcName ) => {
			if ( !context[ funcName ] ) {
				console.error( `You tried to bind "${funcName}", but it doesn't exist on `, context );
			}
			context[ funcName ] = context[ funcName ].bind( context );
		} );
		return context;
	}

	// ---------------------------------------------------

	delegateEvents() {
		_( this.options.events )
			.each( ( e ) => {
				e.handler = this.getLocalObject( e.handler );
				e.target = this.getLocalObject( e.target );
				// use jquery for ui events
				if ( e.target instanceof $ ) {
					e.target.on( e.eventName, e.handler );
				} else {
					// use backbone for all other events
					this.listenTo( e.target, e.eventName, e.handler );
				}
			} );
		return this;
	}

	// ---------------------------------------------------

	undelegateEvents() {
		_( this.options.events )
			.each( ( e ) => {
				this.stopListening( e.target, e.eventName );
			} );
		return this;
	}

	// ---------------------------------------------------

	getLocalObject( name, report ) {
		if ( name === 'this' ) {
			return this;
		} else if ( typeof name === 'string' ) {
			// try to resolve the name as an object on this
			var target = this[ name ];
			// if there is no object on this with that name, try to find it as selector in the a local jquery object
			if ( !target ) {
				target = this.$ ? this.$( name ) : target;
			}
			// consider it a selector and use jquery to find it
			if ( !target ) {
				target = $( name );
			}

			return target;
		}
		return name;
	}

	// ---------------------------------------------------

	static mergeOptions( a, b ) {}

	// ---------------------------------------------------

	static mergeRules( objValue, srcValue ) {
		if ( _.isArray( objValue ) ) {
			return objValue.concat( srcValue );
		} else if ( typeof objValue === 'object' ) {
			return _.extend( {}, objValue, srcValue );
		}
	}
}

Events.mixin( TASK.prototype );

module.exports = TASK;
