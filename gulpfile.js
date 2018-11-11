const gulp = require('gulp');
const run = require('run-sequence');
const rename = require('gulp-rename');
const del = require('del');

const posthtml = require('gulp-posthtml');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps'); // пишет карту исходных файлов для devtools
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker'); // для группировки медиа-выражений
const cleanCSS = require('gulp-clean-css');

const babel = require('gulp-babel'); // новый синтаксис js для старых браузеров
const concat = require('gulp-concat');
const jsmin = require('gulp-uglify');

const plumber = require('gulp-plumber');
const server = require('browser-sync').create();

let postCssPlugins = [
  autoprefixer({grid: true}),
  mqpacker({
    sort: true
  }),

];

gulp.task('html', function () {
  return gulp.src([
    'source/**/*.html',
    '!source/html/components/*.html'])
    .pipe(plumber())
    .pipe(posthtml([

    ]))
    .pipe(gulp.dest('build/'))
    .pipe(server.stream());
});

gulp.task('style', function () {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(postCssPlugins))
    .pipe(gulp.dest('build/css'))
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('script', function () {
  return gulp.src('source/js/modules/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js/'))
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js/'))
    .pipe(server.stream());
});


gulp.task('serve', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/**/*.html', ['html']);
  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/js/modules/**/*.js', ['script']);
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', function (done) {
  run(
      'clean',
      'style',
      'script',
      'html',
      done
  );
});
