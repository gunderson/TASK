'use strict';
var $ = require( 'jquery' );
require( 'jquery.browser' );
var _ = require( 'lodash' );
var TASK = require( './framework/TASKBase' );


// Distribute Global Vars
TASK.prototype.TEMPLATES = require( './lib/templates' );
TASK.prototype.ENV = window.env;

// Get Views
var AppPage = require( './views/App-view' );

// Start App
var AppController = require( './controllers/App-controller' );
var APP = new AppController( {} );
TASK.prototype.APP = APP;

var appPage = new AppPage( {
	model: APP
} );

var routes = _.map( appPage.pageViews, ( v ) => v.name.slice( 0, -5 ) );

appPage.once( 'afterRender', () => APP.setupRouter( routes ) );
appPage.render();
