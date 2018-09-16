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
//------------------- Util Functions -----------------
function createCSSTags(cssSources) {
	const createTag = (url) => `<link href="${url}" rel="stylesheet"/>\n\t`;
	return cssSources.map((url) => createTag(url)).join('');
}

function createJSTags(jsSources) {
	const createTag = (url) => `<script src="${url}"></script>\n\t`;
	return jsSources.map((url) => createTag(url)).join('');
}



//----------------------------------------------------
//------------------- JS Tasks -----------------------
gulp.task('build-js', () => {
	return gulp.src('./build/assets/player/bundle.js')
		.pipe(gulp.dest(destPath + '/js'));
});



//----------------------------------------------------
//------------------- CSS Tasks -----------------------
gulp.task('build-css', () => {
	return gulp.src('./build/assets/player/styles.css')
		.pipe(gulp.dest(destPath + '/css'));
});



//----------------------------------------------------
//------------------- HTML Tasks ---------------------
gulp.task('build-html', () => {

	const timestamp = +new Date();

	let stream = gulp.src('./app/index.html');

	let cssSources = [], jsSources = ['https://cdn.plyr.io/3.3.7/plyr.polyfilled.js'];

	if (environment === 'development') {

		jsSources.push('/player/bundle.js');

		return stream
			.pipe(g.replace('<!-- INJECT:css -->', createCSSTags(cssSources)))
			.pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
			.pipe(gulp.dest('./build/'));

	} else {

		cssSources.push(`/player/css/styles.css?tm=${timestamp}`);
		jsSources.push(`/player/js/bundle.js?tm=${timestamp}`);

		return stream
			.pipe(g.replace('<!-- INJECT:css -->', createCSSTags(cssSources)))
			.pipe(g.replace('<!-- INJECT:js -->', createJSTags(jsSources)))
			.pipe(g.htmlmin(htmlminOpts))
			.pipe(gulp.dest(destPath));

	}

});



//----------------------------------------------------
//------------------- Copy Assets Tasks --------------
gulp.task('copy-assets', () => {

	gulp.src('./assets/**/*')
		.pipe(gulp.dest(destPath));

	gulp.src('./app/vendor/**/*')
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
