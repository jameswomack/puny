require('babel/register');

const build = require('./tools/build').build;
const gulp = require('gulp');

gulp.task('build', build);
