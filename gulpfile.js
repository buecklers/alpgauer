var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var pkg = require('./package.json');
var ngmin = require('gulp-ngmin');
var htmlreplace = require('gulp-html-replace');
var bump = require('gulp-bump');
var replace = require('gulp-replace');

var paths = {
	scripts : 'script/*.js',
	libs : 'script/libs/*.*',
	content : 'content/*.*',
	img : 'img/*.*',
	php : 'php/**/*',
	css : 'css/*.*',
	replacehtml : 'index.html',
	rootfiles : ['.htaccess']
}

gulp.task('clean', function(){
	return gulp.src('./dist', {read: false})
	.pipe(clean());
});

gulp.task('build', ['clean'], function(){
	return gulp.src(paths.scripts)
	.pipe(concat(pkg.name + '.js'))
	//.pipe(gulp.dest('./dist/script'))
	.pipe(rename(pkg.name + '.min.js'))
	.pipe(ngmin()).on('error', errorHandler)
	.pipe(uglify()).on('error', errorHandler)
	.pipe(gulp.dest('./dist/script'));
});

gulp.task('htmlreplace', ['build'], function(){
	return gulp.src(paths.replacehtml)
	.pipe(htmlreplace({
		'libangular' :{
			src: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.11/angular.min.js',
			tpl: '<script type="text/javascript" src="%s"></script>'
		},
		'libangularroute' : {
			src: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.11/angular-route.js',
			tpl: '<script type="text/javascript" src="%s"></script>'
		},
		'libangularanimate' : {
			src: 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.11/angular-animate.js',
			tpl: '<script type="text/javascript" src="%s"></script>'
		},
		'js' : {
			src: 'script/' + pkg.name + '.min.js',
			tpl: '<script type="text/javascript" src="%s"></script>'
		}
	}, {
		resolvePaths:true
	}))
	.pipe(gulp.dest('./dist/'))
});

gulp.task('copy', ['htmlreplace'], function(){
	var php = gulp.src(paths.php)
	.pipe(gulp.dest('./dist/php'));

	var content = gulp.src(paths.content)
	.pipe(gulp.dest('./dist/content'));

	var libs = gulp.src(paths.libs)
	.pipe(gulp.dest('./dist/script/libs'));

	var images = gulp.src(paths.img)
	.pipe(gulp.dest('./dist/img'));

	var css = gulp.src(paths.css)
	.pipe(gulp.dest('./dist/css'));

	var rootfiles = gulp.src(paths.rootfiles)
	.pipe(gulp.dest('./dist/'))
});

gulp.task('bump', ['copy'], function(){
	return gulp.src(['./package.json', './bower.json'])
	.pipe(bump()).on('error', errorHandler)
	.pipe(gulp.dest('./'));
})

gulp.task('deploy', ['bump']);

gulp.task('default', ['copy']);

function errorHandler(error){
	console.log('error: ' + error.toString());
	this.emit('end');
};