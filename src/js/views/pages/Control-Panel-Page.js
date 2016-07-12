'use strict';
var _ = require( 'lodash' );
var $ = require( 'jquery' );
var ThreejsPage = require( '_TASK/views/pages/Threejs-Page' );
var ThreeView = require( './Control-Panel-Page/Three-View' );
var TransportBar = require( '_TASK/views/ui/Transport-Bar' );

class ControlPanelPage extends ThreejsPage {
	constructor( options ) {

		// ---------------------------------------------------
		// Local Properties

		super( _.defaults( options, {
			name: 'Control-Panel',
			events: [ {
				eventName: 'click',
				selector: 'button.play',
				handler: 'onPlayButtonClick'
			}, {
				eventName: 'click',
				selector: 'button.stop',
				handler: 'onStopButtonClick'
			} ],
			views: [
				new ThreeView( {
					name: 'three-holder',
					el: '.three-holder'
				} ),
				new TransportBar( {
					name: 'transport-bar',
					el: '.transport-bar'
				} )
			]
		} ) );

		console.log( this.bindFunctions, this.views );

		this.threeView = _.find( this.views, {
			name: 'three-holder'
		} );
		this.transportBar = _.find( this.views, {
			name: 'transport-bar'
		} );

		// ---------------------------------------------------
		// Bind Functions

		ThreejsPage.bindFunctions( this, [
			'onPlayButtonClick',
			'onStopButtonClick',
			'onChangeCheckbox'
		] );

		// ---------------------------------------------------
		// Event Handlers

		this.listenTo( this.transportBar, 'play', this.onClickPlay );
		this.listenTo( this.transportBar, 'stop', this.onClickPlay );
	}

	onPlayButtonClick() {
		this.play();
	}

	onStopButtonClick() {
		this.stop();
	}

	onChangeCheckbox( evt ) {
		var target = evt.target;
		if ( target.checked ) {
			this.$( 'input:checkbox' )
				.each( ( i, el ) => {
					target.value === i ? el.checked = true : el.checked = false;
				} );
		} else {
			$.get( `http://${this.localAddress}:${this.localPort}/led/${target.value}/off` );
		}
	}
}

module.exports = ControlPanelPage;
