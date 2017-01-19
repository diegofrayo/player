//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp'),
	fs = require('fs'),
	g = require('gulp-load-plugins')({
		lazy: false
	}),
	lazypipe = require('lazypipe'),
	historyApiFallback = require('connect-history-api-fallback'),
	noop = g.util.noop;

const htmlminOpts = {
	removeComments: true,
	collapseWhitespace: true,
	removeEmptyAttributes: false,
	collapseBooleanAttributes: true,
	removeRedundantAttributes: true
};

var destPath;
var environment;
var isWatching = false;
var settings;
var timestamp = +new Date();

try {
	settings = JSON.parse(fs.readFileSync('./config.gulp.json', 'utf8'));
} catch (error) {
	g.util.log('MY LOG ==> ' + error);
	process.exit();
}



//--------------------------------------------------------------
//------------------------- Util Functions ---------------------
function livereload() {
	return lazypipe()
		.pipe(isWatching ? g.livereload : noop)();
}

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
		root: ['./public', './app', './bower_components'],
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

	return gulp.src(destPath + '/js/webpack-bundle.js')
		.pipe(g.rename('bundle.js'))
		.pipe(replaceEnvironmentVariables())
		.pipe(gulp.dest(destPath + '/js'))
		.pipe(livereload());

});



//----------------------------------------------------
//------------------- CSS Tasks ----------------------
gulp.task('build-css', () => {

	// return gulp.src('./app/styles/main.less')
	// .pipe(g.less())
	// 	.pipe(g.rename('styles.css'))
	// 	.pipe(g.autoprefixer())
	// 	.pipe(g.csslint('./config.csslint.json'))
	// 	.pipe(g.csslint.reporter('csslint-xml'))
	// 	.pipe(replaceEnvironmentVariables())
	// 	.pipe(gulp.dest(destPath + '/css'))
	// 	.pipe(livereload());

});



//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

	const transformJS = (filepath) => {
		'<script src="' + filepath + '"></script>';
	};

	const transformCSS = (filepath) => {
		'<link href="' + filepath + '" rel="stylesheet"/>';
	};

	const transform = (filepath) => {

		if (filepath.indexOf('.css') !== -1) {
			return transformCSS(filepath);
		}

		return transformJS(filepath);
	};

	const opt = {
		read: false
	};

	return gulp.src('./app/index.html')
		.pipe(g.inject(g.bowerFiles(opt), {
			ignorePath: 'bower_components',
			starttag: '<!-- inject:vendor:{{ext}} -->',
			transform: transform
		}))
		.pipe(g.embedlr())
		.pipe(g.htmlhint('./config.htmlhint.json'))
		.pipe(g.htmlhint.reporter())
		.pipe(replaceEnvironmentVariables())
		.pipe(gulp.dest('public/'))
		.pipe(livereload());

});

// gulp.task('build-html-live', function() {

// 	var cssVendorSources =
// 		'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"/>' +
// 		'<link rel="stylesheet" href="@@root_url/css/styles.min.css?tm=' + timestamp + '"/>';

// 	var jsVendorSources =
// 		'<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>' +
// 		'<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>' +
// 		'<script src="https://www.gstatic.com/firebasejs/3.3.0/firebase.js"></script>' +
// 		'<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react.min.js"></script>' +
// 		'<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.2/react-dom.min.js"></script>' +
// 		'<script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/4.0.0-0/react-router.min.js"></script>' +
// 		'<script src="@@root_url/js/bundle.min.js?tm=' + timestamp + '"></script>';

// 	return gulp.src(['./app/index.html'])
// 		.pipe(g.replace('<!-- INJECT:css -->', cssVendorSources))
// 		.pipe(g.replace('<!-- INJECT:js -->', jsVendorSources))
// 		.pipe(g.htmlhint('./config.htmlhint.json'))
// 		.pipe(g.htmlhint.reporter())
// 		.pipe(g.rename('player.html'))
// 		.pipe(g.htmlmin(htmlminOpts))
// 		.pipe(replaceEnvironmentVariables())
// 		.pipe(gulp.dest(destLivePath + '/templates/'));

// });



//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {

	gulp.src('./app/images/**/*')
		.pipe(gulp.dest(destPath + '/images/'));

});



//-------------------------------------------------------
//----------------- Main Tasks --------------------------
gulp.task('watch', () => {

	isWatching = true;
	gulp.start('build-dev');

	gulp.watch('./app/index.html', ['build-html']);
	gulp.watch(['./app/styles/*.less', './app/components/**/*.less', './app/views/**/*.less'], ['build-css']);
	gulp.watch(destPath + '/js/webpack-bundle.js', ['build-js']);

	createLocalServer();
	gulp.start('copy-assets');

});

gulp.task('default', ['watch']);



//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {

	environment = 'dev';
	destPath = settings[environment].dest_path;

	g.runSequence(
		'build-js',
		'build-css',
		'build-html'
	);

});

gulp.task('build-live', () => {

	environment = 'live';
	destPath = settings[environment].dest_path;

});