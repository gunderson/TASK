// imports
var Work = require( './Work-Page' );
var Contact = require( './Contact-Page' );
var Art = require( './Art-Page' );
var Home = require( './Home-Page' );

module.exports = {
	// exports
	'Work': new Work(),
	'Contact': new Contact(),
	'Art': new Art(),
	'Home': new Home(),
};
