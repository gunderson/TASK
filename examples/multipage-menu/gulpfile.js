require( 'babelify' );

var _ = require( 'lodash' );
var browserify = require( 'browserify' );
var aliasify = require( 'aliasify' );
var stringify = require( 'stringify' );
var babelify = require( 'babelify' );
var helpers = require( 'babelify-external-helpers' );
var buffer = require( 'vinyl-buffer' );
var transform = require( 'vinyl-transform' );
var cli = require( './gulp/cli' );
var csso = require( 'gulp-csso' );
var docco = require( 'gulp-docco' );
var domain = require( 'domain' );
var fs = require( 'fs' );
var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var jstConcat = require( 'gulp-jst-concat' );
var livereload = require( 'gulp-livereload' ); // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdle;
var path = require( 'path' );
// var pkg = require( './package.json' );
var plumber = require( 'gulp-plumber' );
var pug = require( 'gulp-pug' );
var rename = require( 'gulp-rename' );
var rm = require( 'gulp-rm' );
var sass = require( 'gulp-sass' );
var source = require( 'vinyl-source-stream' );
var tap = require( 'gulp-tap' );
var uglify = require( 'gulp-uglify' );
var sourcemaps = require( 'gulp-sourcemaps' );

var envName = cli.env;
gutil.log( 'Using environment', gutil.colors.green( envName ) );

// --------------------------------------------------
// Environment vars

var env = require( `./data/env/${envName}` );
var meta = require( './data/meta.json' );

// --------------------------------------------------

gulp.task( 'css', function() {
	return gulp
		.src( './src/sass/**/*.sass' )
		.pipe( plumber( onError ) )
		.pipe( sass( {

			includePaths: [ './src/sass/', './src/TASK/sass/' ],
			errLogToConsole: true
		} ) )
		// .pipe( csso() )
		.pipe( gulp.dest( './dist/' ) )
		.pipe( livereload() )
		.on( 'error', gutil.log );
} );

// --------------------------------------------------

// TODO: process assets
gulp.task( 'copy-assets',
	function() {
		return gulp
			.src( './src/assets/**/*' )
			.pipe( plumber( onError ) )
			.pipe( gulp.dest( './dist/assets/' ) )
			.pipe( livereload() )
			.on( 'error', gutil.log );
	} );

// --------------------------------------------------

gulp.task( 'compile-js', [ 'dynamic-templates' ], function( cb ) {
	return gulp
		.src( './src/js/index.js', {
			read: false
		} )
		.pipe( tap( function( file ) {
			var d = domain.create();

			d.on( 'error', function( err ) {
				gutil.beep();
				gutil.log(
					gutil.colors.red( 'Browserify compile error:' ),
					err.message,
					'\n\t',
					gutil.colors.cyan( 'in file' ),
					file.path,
					err
				);
			} );

			d.run( function() {
				file
					.contents = browserify( {
						entries: [ file.path ],
						debug: env.name === 'dev',
						// paths: [ './src/js/' ],
						paths: [ './src/js/', './node_modules' ],
						externalHelpers: false,
						runtimeHelpers: true
					} )
					.transform( babelify, {
						presets: [
							'es2015'
						]
					} )
					.transform( aliasify )
					.transform( stringify )
					.plugin( helpers )
					.bundle()
					.pipe( plumber( onError ) )
					.pipe( source( 'index.js' ) )
					.pipe( buffer() )
					.pipe( sourcemaps.init( {
						loadMaps: true
					} ) )
					.pipe( env.name !== 'dev' ? uglify() : buffer() )
					.pipe( sourcemaps.write( './' ) )
					.pipe( gulp.dest( './dist/' ) )
					.pipe( livereload() )
					.on( 'error', gutil.log );
			} );
		} ) );

} );

function listFolders( dir ) {
	return fs
		.readdirSync( dir )
		.filter( function( file ) {
			return fs
				.statSync( path.join( dir, file ) )
				.isDirectory();
		} );
}

function listFiles( dir ) {
	return fs
		.readdirSync( dir )
		.filter( function( file ) {
			return !fs
				.statSync( path.join( dir, file ) )
				.isDirectory();
		} );
}

// --------------------------------------------------

gulp.task( 'static-templates', function() {
	var copyPath = './data/copy/';
	var langs = listFolders( copyPath );
	var langData = {};
	if ( !langs.length ) {
		throw new Error( 'No language folders in ./data/copy/' );
	}
	var files = listFiles( path.join( copyPath, langs[ 0 ] ) );
	if ( !files.length ) {
		throw new Error( 'No data files in ./data/copy/' + langs[ 0 ] );
	}
	return langs.map( ( lang ) => {
		langData[ lang ] = {};
		_.each( files, ( filename ) => {
			langData[ lang ][ path.basename( filename, '.json' ) ] = require( path.resolve( copyPath, lang, filename ) );
		} );
		return gulp
			.src( [ './src/pug/static/**/*.pug', '!./src/pug/static/**/_*.pug' ] )
			.pipe( plumber( onError ) )
			.pipe( rename( function( path ) {
				path.basename += `.${lang}`;
				path.extname = '.html';
			} ) )
			.pipe( pug( {
				pretty: true,
				locals: {
					env: env,
					copy: langData[ lang ],
					lang: lang,
					meta: meta
				},
				basedir: './src/'
			} ) )
			.pipe( gulp.dest( './dist' ) )
			.pipe( livereload() )
			.on( 'error', gutil.log )
			.on( 'end', () => {
				if ( lang === 'en' ) {
					gulp
						.src( './dist/index.en.html' )
						.pipe( plumber( onError ) )
						.pipe( rename( function( path ) {
							path.basename = 'index';
							path.extname = '.html';
						} ) )
						.pipe( gulp.dest( './dist/' ) );
				}
			} );
	} );
} );

// --------------------------------------------------

gulp.task( 'dynamic-templates', function() {
	var stream = gulp
		.src( [ './src/pug/dynamic/**/*.pug', '!./src/pug/dynamic/**/_*.pug' ] )
		.pipe( plumber( onError ) )
		.pipe( pug( {
			pretty: true
		} ) )
		.pipe( rename( function( path ) {
			path.dirname = 'home';
			path.extname = '';
			path.relative = true;
		} ) )
		.pipe( jstConcat( 'templates.js', {
			exportString: 'module.exports'
		} ) )
		.pipe( gulp.dest( './src/js/lib/' ) )
		// .pipe( livereload() )
		.on( 'error', gutil.log );
	return stream;
} );

// --------------------------------------------------

gulp.task( 'watch',
	function() {
		livereload.listen( env.lrPort );
		gulp.watch( [
			'./src/**/*.js',
			'!./src/js/lib/templates.js', // generated from /src/pug/dynamic/**/*.pug
			'./src/pug/dynamic/**/*.pug',
			'./package.json', 'data/**/*.json'
		], [ 'compile-js' ] );
		gulp.watch( [ './src/pug/static/**/*.pug', './src/TASK/pug/static/**/*.pug' ], [ 'static-templates' ] );
		gulp.watch( [ './src/sass/**/*.sass', './src/TASK/sass/**/*.sass' ], [ 'css' ] );
	} );

// --------------------------------------------------

gulp.task( 'default', [
	'compile-js',
	'static-templates',
	'copy-assets',
	'copy-data',
	'copy-app',
	'css'
] );

// --------------------------------------------------

// --------------------------------------------------
// General project tasks

gulp.task( 'clean', function() {
	return gulp
		.src( [ './dist/', './dist/**/*', './dist/**/.*' ], {
			read: false
		} )
		.pipe( plumber( onError ) )
		.pipe( rm() )
		.on( 'error', gutil.log );
} );

// --------------------------------------------------

gulp.task( 'copy-app', [ 'compile-js' ], function() {
	return gulp
		.src( './src/**/*' )
		.pipe( plumber( onError ) )
		.pipe( gulp.dest( './dist/' ) )
		.on( 'error', gutil.log );
} );

// --------------------------------------------------

gulp.task( 'copy-data', function() {
	return gulp.src( './data/**/*' )
		.pipe( plumber( onError ) )
		.pipe( gulp.dest( './dist/data/' ) )
		.on( 'error', gutil.log );
} );

// --------------------------------------------------

gulp.task( 'docs', function() {
	return gulp.src( './src/**/*.js' )
		.pipe( plumber( onError ) )
		.pipe( docco() )
		.pipe( gulp.dest( './documentation-output' ) )
		.on( 'error', gutil.log );
} );

// --------------------------------------------------

function onError( err ) {
	gutil.beep();
	gutil.log( err );
	this.emit( 'end' );
};
