'use strict';
var $ = require( 'jquery' );
var browser = require( 'jquery.browser' );
var _ = require( 'lodash' );
var TASK = require( '_TASK/TASK-Base' );

if ( console ) {
	var logo = require( '../../data/logo.txt' );
	console.log( logo );
}

// Distribute Global Vars
TASK.prototype.TEMPLATES = require( './lib/templates' );
TASK.prototype.ENV = window.env;

// App Controller
var AppController = require( './controllers/App-controller' );
var appController = new AppController( {
	browser: browser
} );
TASK.prototype.APP = appController;

// Main App View
var AppPage = require( './views/App-View' );
var appPage = new AppPage( {
	model: appController
} );

var routes = _.map( appPage.pageViews, ( v ) => v.name );

appPage.once( 'afterRender', () => appController.setupRouter( routes ) );
appPage.render();
