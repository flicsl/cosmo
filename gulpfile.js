var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var project = {
	name: "cosmo"
};

var paths = {
	sass: "./src/**/*.scss",
	html: "./**/*.html"
};

gulp.task('browser-sync', function () {
	return browserSync({
		server: {
			baseDir: '.', 
			middleware: []
		}
	});
});

gulp.task('sass', function () {
	return gulp.src([paths.sass])
				.pipe(plumber())
				.pipe(sass({
					outputStyle: 'expanded'
				}))
				.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
				.pipe(gulp.dest("./dist/css"))
				.pipe(reload({
					stream: true
				}));
});

gulp.task('watch', function () {
	watch(paths.sass, function () {
		gulp.start('sass');
	});
	watch(paths.html, function () {
		reload();
	});
});

gulp.task('build', ['sass']);
gulp.task('default', ['build', 'browser-sync', 'watch']);