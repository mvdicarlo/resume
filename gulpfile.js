const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('browser-sync');

const dest = 'dist';

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(`${dest}/css`));
});

gulp.task('pages', function () {
  return gulp.src(['src/html/**/*.html'])
  .pipe(gulp.dest(dest))
});

gulp.task('sass:watch', function () {
  return gulp.watch('src/scss/resume.scss', gulp.series('sass'));
});

function server(done) {
  browser.init({
    injectChanges: true,
    server: dest
  });

  done();
}

function watch() {
  gulp.watch('src/html/**/*.html').on('all', gulp.series('pages', browser.reload));
  gulp.watch(['src/scss/**/*.scss']).on('all', gulp.series('sass', 'pages', browser.reload));
}

gulp.task('serve', gulp.series('pages', 'sass', server, watch));
gulp.task('build', gulp.series('pages', 'sass'));
