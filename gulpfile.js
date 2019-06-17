/**
 * Created by Ovídio César on 07/12/17.
 */
'use strict';

const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const shell = require('gulp-shell');

/**
 * Remove build directory.
 */
gulp.task('clean', () => gulp.src("build", {read: false}).pipe(rimraf()));

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tslint( {
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task('compile', shell.task(['npm run tsc']));

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task(['npm run tsc-watch']));

/**
 * Copy setting files
 */
gulp.task('configs', () => gulp.src("src/setting/*.json").pipe(gulp.dest('./build/src/setting')));

/**
 * Copy public folder
 */
gulp.task('public', () => gulp.src("src/public/*").pipe(gulp.dest('./build/src/public')));

/**
 * Build the project.
 */
gulp.task('build', gulp.parallel('tslint', 'compile', 'configs', 'public'), () => console.log('Building the project ...'));
