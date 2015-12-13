var gulp = require('gulp')
var clean = require('del');

gulp.task('copy', function() {
	return gulp.src('./public/**/**')
				.pipe(gulp.dest('../'));
});

gulp.task('clean', ['copy'], function() {
	return clean(['./public/**/**']);			
});

gulp.task('default', ['clean'])