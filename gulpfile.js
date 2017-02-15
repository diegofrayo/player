//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp'),
	fs = require('fs'),
	g = require('gulp-load-plugins')({
		lazy: false
	}),
	historyApiFallback = require('connect-history-api-fallback');

const htmlminOpts = {
	removeComments: true,
	collapseWhitespace: true,
	removeEmptyAttributes: false,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true
};

var destPath;
var environment;
var settings;

try {
	settings = JSON.parse(fs.readFileSync('./config.gulp.json', 'utf8'));
} catch (error) {
	g.util.log('MY LOG ==> ' + error);
	process.exit();
}



//--------------------------------------------------------------
//------------------------- Util Functions ---------------------
function replaceEnvironmentVariables() {

	return g.replaceTask({
		patterns: [{
			match: 'environment',
			replacement: settings[environment].environment
		}, {
			match: 'firebase_database_url',
			replacement: settings[environment].firebase_database_url
		}, {
			match: 'firebase_auth_domain',
			replacement: settings[environment].firebase_auth_domain
		}, {
			match: 'firebase_api_key',
			replacement: settings[environment].firebase_api_key
		}, {
			match: 'youtube_api_key',
			replacement: settings[environment].youtube_api_key
		}]
	});
}

function createLocalServer() {

	gulp.task('run-local-server', g.serve({
		root: ['./dist', './app'],
		port: 4567,
		middleware: function(req, res, next) {
			return historyApiFallback(req, res, next);
		}
	}));

	gulp.start('run-local-server');
}



//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {

	let stream = gulp.src('./dist/assets/player/js/webpack-bundle.js')
		.pipe(g.rename('bundle.js'))
		.pipe(replaceEnvironmentVariables());

	if (environment === 'LIVE') {

		return stream
			.pipe(g.uglify())
			.pipe(gulp.dest(destPath + '/js'));

	} else {

		return stream
			.pipe(gulp.dest(destPath + '/js'))
			.pipe(g.livereload());

	}

});



//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

	let stream = gulp.src('./app/index.html')
		.pipe(g.htmlhint('./config.htmlhint.json'))
		.pipe(g.htmlhint.reporter());

	if (environment === 'DEV') {

		return stream
			.pipe(g.embedlr())
			.pipe(gulp.dest('dist/'))
			.pipe(g.livereload());

	} else {

		return stream
			.pipe(g.rename('player.html'))
			.pipe(g.htmlmin(htmlminOpts))
			.pipe(gulp.dest(destPath.replace('/assets/player', '') + '/templates'));

	}

});



//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {

	gulp.src('./app/images/**/*')
		.pipe(gulp.dest(destPath + '/images/'));

});



//-------------------------------------------------------
//----------------- Main Tasks --------------------------
gulp.task('watch', () => {

	gulp.start('build-dev');

	gulp.watch('./app/index.html', ['build-html']);
	gulp.watch(destPath + '/js/webpack-bundle.js', ['build-js']);

	createLocalServer();

	g.livereload.listen({
		start: true
	});

});

gulp.task('default', ['watch']);



//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {

	environment = 'DEV';
	destPath = settings[environment].dest_path;

	g.runSequence(
		'build-js',
		'build-html',
		'copy-assets'
	);

});

gulp.task('build-live', () => {

	environment = 'LIVE';
	destPath = settings[environment].dest_path;

	g.runSequence(
		'build-js',
		'build-html',
		'copy-assets'
	);

});