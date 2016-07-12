var _ = require( 'lodash' );
var $ = require( 'jquery' );
var TaskView = require( '_TASK/views/View' );

class Menu extends TaskView {
	constructor( options ) {

		super( _.merge( {

			// ---------------------------------------------------
			// Class Properties

			el: '#main-menu',

			// ---------------------------------------------------
			// Event handlers

			events: [ {
					eventName: 'click',
					selector: '.handle',
					handler: 'toggleMenu'
				}, {
					eventName: 'click',
					selector: '.closer',
					handler: 'closeMenu'
				}

				// ---------------------------------------------------
				// Local Properties

			]
		}, options ) );

		// ---------------------------------------------------
		// Bind Functions

		this.bindFunctions( this, [
			'openMenu',
			'closeMenu',
			'toggleMenu'
		] );
	}

	openMenu( e ) {
		$( 'html' )
			.addClass( 'menu-open' );
	}

	closeMenu( e ) {
		$( 'html' )
			.removeClass( 'menu-open' );
	}

	toggleMenu( e ) {
		console.log( this.$el );
		$( 'html' )
			.toggleClass( 'menu-open' );
	}
}

module.exports = Menu;
