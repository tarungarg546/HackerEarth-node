"use strict";
const gulp = require('gulp');
const notify = require('gulp-notify');
const growl = require('gulp-notify-growl');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const map = require('map-stream');
let exitOnJshintError = map( (file, cb) => {
    //console.log("here for file "+file.path);
    if (!file.jshint.success) {
        console.error('jshint failed for '+file.path);
        process.exit(1);
    }
});
gulp.task('jscs', () => {
    gulp.src([ '*.js',"examples/*.js","hackerEarth-js/*.js"])
        .pipe(jscs());
});

gulp.task('lint', () => {
    gulp.src([ '*.js',"examples/*.js","hackerEarth-js/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter("fail"));   
});

gulp.task('build', ['jscs', 'lint'], () => {
    gulp.src('/')
        .pipe(notify({
            title: 'Task Builder',
            message: 'Successfully built application'
        }));
});
