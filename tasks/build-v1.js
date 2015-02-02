var gulp = require('gulp');
var moment = require('moment');

module.exports = function() {
    var stream = gulp.src('lib/**/*.js');

    if (gulp.plugin.cached) {
        stream.pipe(gulp.plugin.cached('uglify'));
    }

    stream
        .pipe(gulp.plugin.uglify())
        .pipe(gulp.plugin.header(moment().format('/*! [grtp.co] YYYY-MM-DD */[\n]')));

    if (gulp.plugin.cached) {
        stream.pipe(gulp.plugin.remember('uglify'));
    }

    return stream.pipe(gulp.dest('www'));
};
