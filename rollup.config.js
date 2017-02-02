import {
	rollup
} from 'rollup';
import babel from 'rollup-plugin-babel';
let pkg = require( './package.json' );
let external = Object.keys( pkg.dependencies );

export default {
	entry: './src/index.js',
	plugins: [
		babel( {
			externalHelpers: true,
			exclude: 'node_modules/**'
		} ),
	],
	external: external,
	targets: [ {
		dest: pkg.main,
		format: 'es',
		sourceMap: true
	}, ]
};
