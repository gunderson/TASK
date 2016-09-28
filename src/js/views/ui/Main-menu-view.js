var _ = require( 'lodash' );
var $ = require( 'jquery' );
var View = require( '_PEAK/views/View' );

class Menu extends View {
	constructor( options ) {

		super( _.mergeWith( {

			// ---------------------------------------------------
			// Class Properties

			el: '#main-menu',

			// ---------------------------------------------------
			// Local Properties

			// ---------------------------------------------------
			// Event Listeners

			events: [ {
					eventName: 'click',
					selector: '.handle',
					handler: 'toggleMenu'
				}, {
					eventName: 'click',
					selector: '.closer',
					handler: 'closeMenu'
				}

			],

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: [
				'openMenu',
				'closeMenu',
				'toggleMenu'
			]
		}, options, View.mergeRules ) );

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
		$( 'html' )
			.toggleClass( 'menu-open' );
	}
}

module.exports = Menu;
