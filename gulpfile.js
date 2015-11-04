
// Gulp 4

var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var paths = {
  scripts: [
    'gulpfile.js',
    'lib/**/*.{js,json}',
    'test/**/*.{js,json}'
  ]
};

function lint() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    //.pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('default'))
    ;
}

// Watch files for changes to rerun tasks
function watch() {
  gulp.watch(paths.scripts, gulp.parallel(lint));
}

// Define tasks from plain functions
gulp.task(lint);
gulp.task(watch);

gulp.task('default', gulp.parallel(lint));

