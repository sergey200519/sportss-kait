import webpack from "webpack-stream";
import imagemin from "imagemin";
import webp from 'gulp-webp';


export const images = () => {
    return app.gulp.src(app.path.src.images, {
        sourcemaps: true,
        encoding: false
    })

        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.gulp.src(app.path.src.images, {
            sourcemaps: true,
            encoding: false
        }))
        // .pipe(app.plugins.newer(app.path.build.images))
        .pipe(webp())
        .pipe(app.gulp.dest(app.path.build.images))



        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.plugins.browsersync.stream())
}