'use strict';
var $ = require( 'jquery' );
var browser = require( 'jquery.browser' );
var _ = require( 'lodash' );
var TASKBase = require( '_TASK/Base' );

// ---------------------------------------------------
// Distribute Global Vars

TASKBase.prototype.TEMPLATES = require( './lib/templates' );
TASKBase.prototype.ENV = window.env;

// ---------------------------------------------------
// App Controller

var AppController = require( './controllers/App-controller' );
var appController = new AppController( {
	browser: browser
} );
TASKBase.prototype.APP = appController;

// ---------------------------------------------------
// Main App View

var AppPage = require( './views/App-View' );
var appPage = new AppPage( {
	model: appController
} );

var routes = _.map( appPage.pageViews, ( v ) => v.name );

appPage.once( 'afterRender', () => appController.setupRouter( routes ) );

// ---------------------------------------------------
// Start App

$( document )
	.ready( () => {
		if ( console ) {
			var logo = require( '../../data/logo.txt' );
			console.log( logo );
		}
		appPage.render();
	} );
