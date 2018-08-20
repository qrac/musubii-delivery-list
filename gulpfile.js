//----------------------------------------------------
// gulp
//----------------------------------------------------

const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');

// Setting : Paths
const paths = {
  'src_pug': './src/pug/',
  'out_html': './docs/'
}

// Setting : Pug Options
const pugOptions = {
  pretty: true
}

// Pug > HTML
gulp.task('pug', () => {
  return gulp.src([paths.src_pug + '**/*.pug', '!' + paths.src_pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.out_html));
});

// Browser Sync
gulp.task('browser-sync', function (done) {
  browserSync.init({
    server: {
      baseDir: paths.out_html
    },
    startPath: './develop.html',
    notify: false
  });
  done();
});

gulp.task('reload', function (done) {
  browserSync.reload();
  done();
});

// Watch
gulp.task('watch', () => {
  gulp.watch([paths.src_pug + '**/*.pug', '!' + paths.src_pug + '**/_*.pug'], gulp.series('pug', 'reload'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));