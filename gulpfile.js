'use strict';

const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

const paths = {
  dev: {
    base: './client/',
    JS: ['./client/scripts/*', '!.client/scripts/*-min.js'],
    CSS: ['./client/styles/*.css', '!./client/styles/*.min.css'],
    IMG: './client/images/**/!(*.psd)*',
    HTML: './client/views/**/*',
    LIBS: './client/libs/**/*',
    FONTS: './client/styles/fonts/*',
    SRC: './src/**/*',
  },
  dist: {
    base: './dist/',
    JS: './dist/scripts/',
    CSS: './dist/styles/',
    IMG: './dist/images/',
    HTML: './dist/views/',
    LIBS: './dist/libs/',
    FONTS: './dist/styles/fonts/',
    SRC: './dist/src/',
  },
};

gulp.task('copy-html', () => gulp.src(paths.dev.HTML)
  .pipe(gulp.dest(paths.dist.HTML)));

gulp.task('copy-libs', () => gulp.src(paths.dev.LIBS)
  .pipe(gulp.dest(paths.dist.LIBS)));

gulp.task('copy-fonts', () => gulp.src(paths.dev.FONTS)
  .pipe(gulp.dest(paths.dist.FONTS)));

gulp.task('minify-css', () => gulp.src(paths.dev.CSS)
  .pipe(cleanCSS())
  .pipe(gulp.dest(paths.dist.CSS)));

gulp.task('minify-img', () => gulp.src(paths.dev.IMG)
  .pipe(imagemin([
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false },
      ],
    }),
  ]))
  .pipe(gulp.dest(paths.dist.IMG)));

gulp.task('babel-js', () => gulp.src(paths.dev.JS)
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(gulp.dest(paths.dist.JS)));

gulp.task('minify-js', () => {
  gulp.src(paths.dev.JS)
    .pipe(minify({
      ext: {
        min: '.js',
      },
      noSource: true,
    }))
    .pipe(gulp.dest(paths.dist.JS));
});

gulp.task('copy', gulp.parallel('copy-html', 'copy-libs', 'copy-fonts'));

gulp.task('minify', gulp.parallel(
  'minify-css',
  'minify-img',
  // 'minify-js',
));

gulp.task('default', gulp.parallel('minify', 'copy'));
