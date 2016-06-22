var pkg = require( '../package.json' );

// ----------------------------------------------------------------
// CLI

var argv = require( 'yargs' )
	.epilog( 'copyright 2015' )

// version
.alias( 'v', 'version' )
	.version( function() {
		return pkg.version;
	} )
	.describe( 'v', 'show version information' )
	// help text
	.alias( 'h', 'help' )
	.help( 'help' )
	.usage( 'Usage: $0 -env [options]' )
	.showHelpOnFail( false, 'Specify --help for available options' )
	// environment
	.option( 'env', {
		alias: 'environment',
		describe: 'define the deployment target [dev|stage|prod]',
		type: 'string',
		nargs: 1,
		default: 'dev'
	} )
	.argv;

// ----------------------------------------------------------------
// Server

var Server = require( './js/Server' );
var server = new Server( require( `../data/env/${argv.env}` ) );
