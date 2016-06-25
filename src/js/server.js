'use strict';
// var _ = require( 'lodash' );
var TASK = require( '../TASK/js/TASK-Base' );
var log = require( '../TASK/utils/log' );
var bodyParser = require( 'body-parser' );
var express = require( 'express' );
// var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var methodOverride = require( 'method-override' );
var path = require( 'path' );
var chalk = require( 'chalk' );

class Server extends TASK {
	constructor( env ) {
		super();
		var app = express();
		app.set( 'env', env.name );

		// ---------------------------------------------------------

		var router = express.Router();
		router.use( logger( 'dev' ) );
		router.use( methodOverride() );
		// parse application/x-www-form-urlencoded
		router.use( bodyParser.urlencoded( {
			extended: false
		} ) );
		// parse application/json
		router.use( bodyParser.json() );
		// router.use( '/*', ( req, res ) => {
		// 	req.method = 'get';
		// 	res.redirect( '/#' + req.originalUrl );
		// } );
		router.use( express.static( path.resolve( __dirname, '..' ) ) );

		// ---------------------------------------------------------

		app.use( '/', router );
		log( chalk.green( 'Front-end server' ), 'starting', __dirname );
		app.listen( env.port, function() {
			log( chalk.green( 'Front-end server' ), 'listening on port:', chalk.green( `${env.port}` ) );

		} );
	}
}

module.exports = Server;
