'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';

// es6 code change
import babel from 'gulp-babel';
import Cache from 'gulp-file-cache';

import nodemon from 'gulp-nodemon';

import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config';

import browserSync from 'browser-sync';

let cache = new Cache();

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/js/*.js',
    CSS: DIR.SRC + '/css/*.css',
    HTML: DIR.SRC + '/*.html',
    IMAGES: DIR.SRC + '/images/*',
    SERVER: 'server/**/*.js',
};

const DEST = {
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/',
    IMAGES: DIR.DEST + '/images',
    SERVER: 'app'
};

gulp.task('webpack', () => {
    return gulp.src(SRC.JS)
           .pipe(webpack(webpackConfig))
           .pipe(gulp.dest(DEST.JS));
});

gulp.task('css', () => {
    return gulp.src(SRC.CSS)
           .pipe(cleanCSS({compatibility: 'ie8'}))
           .pipe(gulp.dest(DEST.CSS));
});

gulp.task('html', () => {
    return gulp.src(SRC.HTML)
          .pipe(htmlmin({collapseWhitespace: true}))
          .pipe(gulp.dest(DEST.HTML))
});

gulp.task('images', () => {
    return gulp.src(SRC.IMAGES)
           .pipe(imagemin())
           .pipe(gulp.dest(DEST.IMAGES));
});

gulp.task('clean', done => {
    del.sync([DIR.DEST]);
    done();
});

gulp.task('babel', () => {
    return gulp.src(SRC.SERVER)
    .pipe(cache.filter())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(cache.cache())
    .pipe(gulp.dest(DEST.SERVER));
})

// gulp.task('watch', function() {
//     gulp.watch('app/css/*.css', gulp.series('styles'));
//     gulp.watch('app/js/*.js', gulp.series('scripts'));
//     gulp.watch('app/img/*', gulp.series('images'));
//   });


// gulp.task('watch', () => {
//     let watcher = {
//         js: gulp.watch(SRC.JS, gulp.series('js')),
//         css: gulp.watch(SRC.CSS, gulp.series('css')),
//         html: gulp.watch(SRC.HTML, gulp.series('html')),
//         images: gulp.watch(SRC.IMAGES, gulp.series('images'))
//     };

//     let notify = (event) => {
//         gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
//     };

//     for(let key in watcher) {
//         watcher[key].on('change', notify);
//     }
// });

gulp.task('watch', () => {
    let watcher = {
        webpack: gulp.watch(SRC.JS, ['webpack']),
        css: gulp.watch(SRC.CSS, ['css']),
        html: gulp.watch(SRC.HTML, ['html']),
        images: gulp.watch(SRC.IMAGES, ['images']),
        babel: gulp.watch(SRC.SERVER, ['babel'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('start', ['babel'], () => {
    return nodemon({
        script: DEST.SERVER + '/main.js',
        watch: DEST.SERVER,
    })
});

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["dist/**/*.*"],
        port: 7000
    });
});

// gulp.task('default', gulp.series('clean', gulp.parallel('js', 'css', 'html', 'images', 'watch')), done => {
//     gutil.log('Gulp is running');
//     done();
// });

gulp.task('default', ['clean', 'webpack', 'css', 'html','images', 'watch', 'start', 'browser-sync'], () => {
    gutil.log('Gulp is running');
});
    

// gulp.task('default', gulp.parallel('clean', 'js', 'css', 'html', 'images'), () => {
//     gutil.log('Gulp is running');
//     // done();
// });

