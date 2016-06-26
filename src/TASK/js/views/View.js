var _ = require( 'lodash' );
var $ = require( 'jquery' );
var TASK = require( '_TASK/TASK-Base' );

class View extends TASK {
	constructor( options ) {
		super( options );

		// ---------------------------------------------------

		this.parseName( options );

		// ---------------------------------------------------

		_.extend( this, {
			el: null,
			model: null,
			template: '',
			id: '',
			tagname: '',
			classname: '',
			hasRendered: false,
			loadPromise: null,
			parentView: null,
			views: [
				/*
                    new ChildView0({
                        el: '#child-id-0',
                        model: this.model.widgets.at(0)
                    }),
                    new ChildView1({
                        el: '#child-id-1',
                        model: this.model.widgets.at(1)
                    }), ...
                */
			],
			events: [
				// TODO: change 'selector' to target to allow event delegation to non js elements
				// Helpful for data binding to the model

				/*
				{
                    eventName: 'click',
                    selector: 'button.play',
                    handler: 'handleButtonClick'
				}
				*/
			],
			dataBindings: [
				/*
				{
                    element: '.selector',
                    attributeName: 'name',
                    model: 'model',
					elementChangeEventName: 'change',
					mode: 'get' || 'send'
				}
				*/
			]
		}, options );

		// ---------------------------------------------------
		// Bind Functions

		TASK.bindFunctions( this, [
			'bindData',
			'delegateEvents',
			'destroy',
			'undelegateEvents',
			'render',
			'setupElement',
			'onResize'
		] );

		// ---------------------------------------------------
		// Event Listeners

		this.listenTo( this.APP, 'resize', this.onResize );

		// ---------------------------------------------------
		// Finish setup

		this.setupElement();
	}

	// ---------------------------------------------------

	static getTemplate( name ) {
		// TEMPLATES is a global object on window
		return name ? TEMPLATES[ name ] : () => '';
	}

	// ---------------------------------------------------

	parseName( options ) {
		if ( options.name ) {
			if ( !options.el ) options.el = '.' + options.name;
		}
		return options;
	}

	// ---------------------------------------------------

	getView( name ) {
		return _.find( this.views, {
			name: name
		} );
	}

	// ---------------------------------------------------

	onResize() {}

	// ---------------------------------------------------

	setupElement() {
		// if an el property exists, attempt to find it
		// otherwise, create one
		this.$el = this.el ? $( this.el )
			.first() : $( `<${this.tagname} class='${this.classname}' id='${this.id}' />` );

		this.el = this.$el[ 0 ];
		this.$ = this.$el.find.bind( this.$el );
	}

	// ---------------------------------------------------

	render( parentView ) {
		this.hasRendered = false;
		this.parentView = parentView;
		this.undelegateEvents();
		this.unbindData();
		this.trigger( 'beforeRender', this );

		// put rendered JST template into $el
		if ( this.template ) {
			var html = View.getTemplate( this.template )( this.serialize() );
			this.$el.html( html );
		}
		this.onResize();
		// render child views
		_.each( this.views, ( v ) => v.render( this ) );

		this.delegateEvents();
		this.bindData();
		this.trigger( 'afterRender', this );
		this.hasRendered = true;
	}

	// ---------------------------------------------------
	// bind the value of an HTMLElement to a model or collection

	createDataBinding( hash ) {
		var attributeName = hash.attributeName;
		var element = hash.element;
		var model = hash.model;
		var elementChangeEventName = hash.elementChangeEventName;
		var mode = hash.mode;

		// parse argument options
		var $element = $( element );
		model = model || this[ model ] || this.model;
		elementChangeEventName = elementChangeEventName || 'change';

		// set listeners
		if ( mode !== 'send' ) this.listenTo( model, `change:${attributeName}`, updateElement );
		if ( mode !== 'get' ) $element.on( elementChangeEventName, updateModel );

		// assign a destroy function for convenient destruction
		hash.unbindData = unbindData.bind( hash );

		return hash;

		function updateElement( event ) {
			$element.val( event.value );
		}

		function updateModel( event ) {
			model[ attributeName ] = $element.val();
		}

		function unbindData() {
			this.stopListening( model, `change:${attributeName}`, updateElement );
			$element.off( elementChangeEventName, updateModel );
			delete this.unbindData;
		}
	}

	// ---------------------------------------------------

	bindData() {
		_.each( this.dataBindings, this.createDataBinding );
		return this;
	}

	// ---------------------------------------------------

	unbindData() {
		_.each( this.dataBindings, ( hash ) => hash.unbindData && hash.unbindData() );
		return this;
	}

	// ---------------------------------------------------

	delegateEvents() {
		_.each( this.events, ( e ) => {
			if ( typeof e.handler === 'string' ) e.handler = this[ e.handler ];
			this.$( e.selector )
				.on( e.eventName, e.handler );
		} );
		return this;
	}

	// ---------------------------------------------------

	undelegateEvents() {
		_.each( this.events, ( e ) => {
			this.$( e.selector )
				.off( e.eventName );
		} );
		return this;
	}

	// ---------------------------------------------------

	destroy() {
		this.unbindData();
		this.undelegateEvents();
		this.stopListening();
		_.each( this.views, ( v ) => v.destroy() );
	}

	// ---------------------------------------------------

	serialize() {
		var model = this.model ? this.model.attributes : {};
		return _.extend( {
			// "this.env" is a property of all TASK objects
			env: this.env
		}, model );
	}
}

module.exports = View;
