import babelify from 'babelify';
import gulp from 'gulp';
import babel from 'gulp-babel';
import source from 'vinyl-source-stream';

//------------------------------------------------------------------------------
// Build Client Assets
//------------------------------------------------------------------------------

export function build() {
  return gulp.src('./src/**/*.js*')
    .pipe(babel({
      comments: false,
      presets: ['es2015', 'react', 'stage-0'],
      sourceMaps: true
    }))
    .pipe(gulp.dest('build'));
};

