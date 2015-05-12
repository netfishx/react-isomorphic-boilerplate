var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
// set variable via $ gulp --type production
var environment = process.env.NODE_ENV || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js');

var src = 'src/';
var dist = 'dist/';

gulp.task('css', function () {
    return gulp.src(src + 'css/**/*.css')
        .pipe($.cssmin())
        .pipe(gulp.dest(dist + 'public/css/'));
});

gulp.task('html', function () {
    return gulp.src(src + 'html/**/*.html')
        .pipe(gulp.dest(dist + 'lib/server/views/'));
});

gulp.task('scripts-client', function () {
    return gulp.src(webpackConfig.entry)
        .pipe($.webpack(webpackConfig))
        .pipe(isProduction ? $.uglifyjs() : $.util.noop())
        .pipe(gulp.dest(dist + 'public/js/'))
});

gulp.task('scripts-server', function () {
    return gulp.src(src + 'js/server/**/*.js')
        .pipe(gulp.dest(dist + 'lib/server'))
});

gulp.task('scripts-shared', function () {
    return gulp.src(src + 'js/shared/**/*.js')
        .pipe(gulp.dest(dist + 'lib/shared'))
});

// copy images
gulp.task('images', function () {
    return gulp.src(src + 'images/**/*.{png,jpg,jpeg,gif}')
        .pipe($.imagemin())
        .pipe(gulp.dest(dist + 'public/images/'));
});

// watch styl, html and js file changes
gulp.task('watch', function () {
    gulp.watch(src + 'css/*.css', ['css']);
    gulp.watch(src + 'images/*.css', ['images']);
    gulp.watch(src + 'html/**/*.html', ['html']);
    gulp.watch(src + 'js/**/*.js', ['scripts']);
    gulp.watch(src + 'js/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function (cb) {
    del([dist], cb);
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'watch']);
gulp.task('scripts', ['scripts-server', 'scripts-shared', 'scripts-client']);
// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
    gulp.start(['images', 'css', 'html', 'scripts']);
});
