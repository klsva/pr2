var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
 
gulp.task('goocdn', function (done) {
    return gulp.src('./index.html')
        .pipe(googlecdn(require('./bower.json'), {
        	componentsPath: './bower_components/'
        }))
        .pipe(gulp.dest('./dist'));
        done();
});

gulp.task('clean', function(done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});

gulp.task('scss', gulp.series('clean', 'goocdn', function(done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass({
    	outputStyle: 'expanded'
  }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
    done();
}));

gulp.task('scss:watch', function() {
  gulp.watch('./scss/**/*.scss', gulp.series('scss', 'goocdn'));
});