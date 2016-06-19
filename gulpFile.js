"use strict";
const gulp = require('gulp');
const notify = require('gulp-notify');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const map = require('map-stream');
const babel=require('gulp-babel');
const files=[ '*.js',"examples/*.js","source/*.js"];
gulp.task('transpile',_=> {
    return gulp.src('source/*.js')
                .pipe(babel({
                    presets: ['es2015']
                }))
                .pipe(gulp.dest('distribution'));
});
gulp.task('jscs',_=> {
    return gulp.src(files)
                .pipe(jscs());
});

gulp.task('lint',_=> {
    return gulp.src(files)
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
