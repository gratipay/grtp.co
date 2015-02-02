var gulp = require('gulp');
var moment = require('moment');

module.exports = function() {
    return gulp.src('lib/**/*.js')
        .pipe(gulp.plugin.cached('uglify'))
        .pipe(gulp.plugin.uglify())
        .pipe(gulp.plugin.header(moment().format('/*! [grtp.co] YYYY-MM-DD */[\n]')))
        .pipe(gulp.plugin.remember('uglify'))
        .pipe(gulp.dest('www'));
};
