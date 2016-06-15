"use strict";
const gulp = require('gulp');
const notify = require('gulp-notify');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const map = require('map-stream');
const babel=require('gulp-babel');
let exitOnJshintError = map( (file, cb) => {
    //console.log("here for file "+file.path);
    if (!file.jshint.success) {
        console.error('jshint failed for '+file.path);
        process.exit(1);
    }
});
gulp.task('transpile',_=> {
    return gulp.src('source/*.js')
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(gulp.dest('distribution'));
});
gulp.task('jscs',_=> {
    return gulp.src([ '*.js',"examples/*.js","source/*.js"])
                .pipe(jscs());
});

gulp.task('lint',_=> {
    return gulp.src([ '*.js',"examples/*.js","source/*.js"])
                .pipe(jshint())
                .pipe(jshint.reporter('jshint-stylish'))
                .pipe(jshint.reporter("fail"));   
});

gulp.task('check', ['transpile','jscs', 'lint'],_=> {
    return gulp.src('/')
                .pipe(notify({
                    title: 'Task Builder',
                    message: 'Successfully built application'
                }));
});
