const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const nunjucksRender = require('gulp-nunjucks-render');

//compile SASS files into CSS files
gulp.task('sass', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('docs/css/'))
    .pipe(browserSync.stream());
})


gulp.task('nunjucks', () => {
  return gulp.src('src/pages/**/*.nunjucks')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    // output files in src folder  
    .pipe(gulp.dest('docs/'))
    // .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream())
});



// create a server and watching files
gulp.task('serve', function() {
	browserSync.init({
    notify: false, 
    server: 'docs/'
  });

  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.nunjucks', gulp.parallel('nunjucks'));
  // gulp.watch('docs/*.html').on('change', browserSync.reload);
});


// gulp.task('default', gulp.series(['sass', 'serve']))
gulp.task('default', gulp.parallel('serve', 'sass', 'nunjucks'));