'use strict';

var gulp = require('gulp');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var rigger = require('gulp-rigger');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-csso');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var browserSync = require("browser-sync").create();

gulp.task('clean', function () {
  return del('docs');
});

gulp.task('copy', function () {
  return gulp.src('assets/fonts/*.{woff,woff2}', {base: './assets/'})
    .pipe(gulp.dest('docs'));
});

gulp.task('image', function () {
  return gulp.src('assets/img/**/*.{png,jpg,svg}', {base: './assets/'})
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest('docs'));
});

gulp.task('html', function() {
  return gulp.src('assets/**/*.html')
    .pipe(rigger())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'));
});

gulp.task('style', function () {
  return gulp.src('assets/css/style.css', {base: './assets/'})
    .pipe(rigger())
    .pipe(postcss([ autoprefixer({grid: true}) ]))
    .pipe(cssmin())
    .pipe(gulp.dest('docs'));
});

gulp.task('js', function (cb) {
  pump([
        gulp.src('assets/js/*.js', {base: './assets/'}),
        uglify(),
        gulp.dest('docs')
    ],
    cb
  );
});

gulp.task('default',
  gulp.series('clean',
  gulp.parallel('copy', 'image', 'html', 'style', 'js'),
  )
);

gulp.task('dev', function() {
  browserSync.init({
    server: 'docs'
  });
  gulp.watch('assets/css/*.css', gulp.series('style'));
  gulp.watch('assets/js/*.js', gulp.series('js'));
  gulp.watch('assets/*.html', gulp.series('html'));
  gulp.watch('assets/img/**/*.{png,jpg,svg}', gulp.series('image'));
  browserSync.watch('./**/*.*').on('change', browserSync.reload);
});
