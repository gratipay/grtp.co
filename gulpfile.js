
// Gulp 4

var gulp   = require('gulp');
var eslint = require('gulp-eslint');

var paths = {
  scripts: [
    'gulpfile.js',
    'lib/**/*.js',
    'test/**/*.js'
  ]
};

function lint() {
  return gulp.src(paths.scripts)
     // eslint() attaches the lint output to the eslint property 
     // of the file object so it can be used by other modules. 
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console. 
    .pipe(eslint.format())
    // To have the process exit with an error code (1) after
    // lint errors, return the stream and pipe to failAfterError
    // last. 
    .pipe(eslint.failAfterError())
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

