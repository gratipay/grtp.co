var gulp = require('gulp');
var moment = require('moment');
var merge = require('merge-stream');

module.exports = function() {
    var uglify = gulp.src('lib/**/*.js')
        .pipe(gulp.plugin.cached('uglify'))
        .pipe(gulp.plugin.uglify())
        .pipe(gulp.plugin.header(moment().format('/*! [grtp.co] YYYY-MM-DD */[\n]')))
        .pipe(gulp.plugin.remember('uglify'))
        .pipe(gulp.dest('www'));

    var htmlmin = gulp.src('lib/**/*.html')
        .pipe(gulp.plugin.cached('htmmin'))
        .pipe(gulp.plugin.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyCSS: true
        }))
        .pipe(gulp.plugin.remember('htmlmin'))
        .pipe(gulp.dest('www'));

    return merge(uglify, htmlmin);
};
