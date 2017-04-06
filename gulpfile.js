//------------------------------------------------------------------
//-------------- Load Plugins And Their Settings -------------------
const gulp = require('gulp'),
	fs = require('fs'),
	g = require('gulp-load-plugins')({
		lazy: false
	});

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
	settings = JSON.parse(fs.readFileSync('./config.app.json', 'utf8'));
} catch (error) {
	g.util.log('MY LOG ==> ' + error);
	process.exit();
}



//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {
	return gulp.src('./build/assets/player/js/bundle.js')
		.pipe(gulp.dest(destPath + '/js'));
});



//----------------------------------------------------
//------------------- CSS Tasks -----------------------
gulp.task('build-css', () => {
	return gulp.src('./build/assets/player/css/styles.css')
		.pipe(g.minifyCss())
		.pipe(gulp.dest(destPath + '/css'));
});



//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

	let stream = gulp.src('./app/index.html')
		.pipe(g.htmlhint('./config.htmlhint.json'))
		.pipe(g.htmlhint.reporter());

	if (environment === 'development') {

		return stream
			.pipe(gulp.dest('./build/'));

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

	gulp.src('./assets/images/**/*')
		.pipe(gulp.dest(destPath + '/images/'));

	gulp.src('./assets/app/vendor/**/*')
		.pipe(gulp.dest(destPath + '/js/vendor'));

});



//-------------------------------------------------------
//----------------- Builds Tasks ------------------------
gulp.task('build-dev', () => {

	environment = 'development';
	destPath = settings[environment].dest_path;

	g.runSequence(
		'build-html',
		'copy-assets'
	);

});

gulp.task('build-live', () => {

	environment = 'production';
	destPath = settings[environment].dest_path;

	g.runSequence(
		'build-js',
		'build-css',
		'build-html',
		'copy-assets'
	);

});