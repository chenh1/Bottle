var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

/** Set up the default task (the watch task) */
gulp.task('default', ['watch', 'build-js']);

/** Run jshint on change of js files in public folder */
gulp.task('jshint', function(){
    return gulp.src('public/javascripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));   /** Make our jshint color-coded */
});

/** Start the watch task and execute any tasks on changes in our js files */
gulp.task('watch', function(){
    gulp.watch('public/javascripts/**/*.js', ['jshint']);
    return gutil.log("Gulp execution!");
});

/** Minify/uglify/concat */
gulp.task('build-js', function(){
    return gulp.src('public/javascripts/**/*.js')
        .pipe(sourcemaps.init()) /** sourcemaps map processed/minified/changed javascripts to their original sources*/
        .pipe(concat('bundle.js'))
        .pipe(gutil.env.type === 'production' ? uglify():gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/assets/javascripts'));
});
