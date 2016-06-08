const gulp = require('gulp');
const notify = require('gulp-notify');
const growl = require('gulp-notify-growl');
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');

gulp.task('jscs', function() {
    gulp.src([ 'examples/*.js,hackerEarth-js/*.js,*.js'])
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});

gulp.task('lint', function() {
    gulp.src([ 'examples/*.js,hackerEarth-js/*.js,*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }))
});

gulp.task('build', ['jscs', 'lint'], function() {
    gulp.src('/')
        //pipe through other tasks such as sass or coffee compile tasks
        .pipe(notify({
            title: 'Task Builder',
            message: 'Successfully built application'
        }))
});
