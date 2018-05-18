var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browsersync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		imagemin      = require('gulp-imagemin'),
		notify        = require('gulp-notify'),
		svgstore	  = require('gulp-svgstore'),
		webp		  = require('gulp-webp'),
		run		  	  = require('run-sequence'),
		del 		  = require('del');

//server

gulp.task('browser-sync', function() {
	browsersync({
		server: {
			baseDir: 'build'
		},
		notify: false,
		// open: false,
		// tunnel: true,
		// tunnel: "projectname", //Demonstration page: http://projectname.localtunnel.me
	});
});

//image optimization

gulp.task("images", function(){
	return gulp.src('src/img/**/*.{png,jpg,svg}')
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({progressive: true}),
		imagemin.svgo({
			plugins: [
				{ cleanupIDs: false }
			]
		})
		]))
	.pipe(gulp.dest('build/img'));
});

gulp.task("webp", function() {
	return gulp.src('src/img/**/*.{png,jpg}')
	.pipe(webp({quality: 85}))
	.pipe(gulp.dest('build/img'));
});

//svg sprite creating

gulp.task('sprite', function () {
  	return gulp.src('build/img/**/icon-*.svg') 
    .pipe(svgstore({ 
      inlineSvg: true
     }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img/')); 
});

// sass to css with minification

gulp.task('styles', function() {
	return gulp.src('src/'+syntax+'/**/main.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
	.pipe(autoprefixer( {
			browsers: ['last 15 versions'],
			cascade: true
	} ))
	.pipe(gulp.dest('build/css'))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(cleancss( {
			level: { 1: { specialComments: 0 } },
			compatibility: 'ie8'
		})) // Opt., comment out when debugging
	.pipe(gulp.dest('build/css'))
	.pipe(browsersync.reload( {stream: true} ));
});

//js optimization

gulp.task('js', function() {
	return gulp.src([
		// 'src/libs/jquery/dist/jquery.min.js',
		'src/js/*.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('build/js'))
	.pipe(browsersync.reload({ stream: true }));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('html', function() {
	return gulp.src('src/*.html')
	.pipe(gulp.dest('build'))
	.pipe(browsersync.reload( {stream: true} ));
});

gulp.task('copy', function() {
	return gulp.src([
		'src/fonts/**/*.{woff,woff2}'
	], {
		base: './src'
	})
	.pipe(gulp.dest('build'));
});

gulp.task('build', function (done) {
	run('clean', 'copy', 'html', 'styles', 'js', 'images', 'webp', 'sprite', done);
});
//watcher

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch('src/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'src/js/*.js'], ['js']);
	gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['watch']);
