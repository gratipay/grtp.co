var gulp = require('gulp');

module.exports = function() {
    return gulp.src([ 'lib/**.js', '*.js' ])
        .pipe(gulp.plugin.cached('jshint'))
        .pipe(gulp.plugin.jshint('.jshintrc'))
        .pipe(gulp.plugin.remember('jshint'))
        .pipe(gulp.plugin.jshint.reporter('jshint-stylish'));
};
