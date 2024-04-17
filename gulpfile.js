const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');

//Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

//Javascript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true})
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

//Watch Task
function watchTask(){
    watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask));
}

//Default Gulp task
exports.default = series(
    scssTask,
    jsTask,
    watchTask
);
