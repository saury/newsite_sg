var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    postcss = require('gulp-postcss');

//js need to convert || in array
var js_target = ['./js/jquery-1.11.3.min.js', './js/bootstrap/transition.js', './js/bootstrap/dropdown.js', './js/bootstrap/modal.js', './js/bootstrap/tooltip.js', './js/bootstrap/popover.js', './js/bootstrap/tab.js', './js/bootstrap/validator.js', './js/bootstrap/carousel.js', './js/bootstrap/scrollspy.js', './js/bootstrap/affix.js', './js/jquery.jcarousel.min.js', './js/gallary-carousels.js', './js/bootstrap/button.js', './js/bootstrap/bootstrap-select.js', './js/fly.js', './js/bootstrap/collapse.js', './js/bootstrap/ekko-lightbox.js', './js/bootstrap/moment.min.js', './js/bootstrap/bootstrap-datetimepicker.min.js', './js/jquery.lazyload.min.js', './js/zmall.js'];

//js语法检查
gulp.task('jshint', function() {
    return gulp.src(js_target)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//compass convert
gulp.task('minifycss', function() {
    gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(postcss([require('postcss-discard-duplicates')]))//remove this line if any problem occurs with the css genaration
        .pipe(minifyCss())
        .pipe(gulp.dest('./css/'));
});

gulp.task('minifyjs', function() {
    return gulp.src(js_target)
        .pipe(concat('zmall.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('compass_only', function() {
    gulp.src('./sass/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'css',
            sass: 'sass'
        }))
        .pipe(gulp.dest('./css/'));
});

// Replace the compass watch
gulp.task('compass_watch', function() {
  gulp.watch('./sass/*.scss', ['compass_only']);
  gulp.watch('./images/*', ['compass_only']);
});

//default gulp task
gulp.task('default', ['jshint'], function() {
// gulp.task('default', function() {
    gulp.start('minifyjs', 'minifycss');　　
});
