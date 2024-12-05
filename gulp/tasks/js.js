import webpack from "webpack-stream";
import uglify from "gulp-uglify";
import rename from 'gulp-rename';
import ts from "gulp-typescript";
import removeUseStrict from "gulp-remove-use-strict";

let tsProj = ts.createProject("tsconfig.json");
let tsProjMin = ts.createProject("tsconfig.json");


export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: true })
  .pipe(
    app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error: <%= error.message %>',
      })
    )
  )
    .pipe(app.gulp.dest(app.path.build.js))
// ----------------------------------------------------------------
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      }),
    )
    .pipe(app.gulp.dest(app.path.build.js))
// ----------------------------------------------------------------
    .pipe(app.gulp.src(app.path.src.ts, {
      sourcemaps: true
    }))
    // .pipe(ts({
    //   noImplicitAny: true,
    //   module: "commonjs"
    //   // noImplicitUseStrict: true
    // }))
    .pipe(tsProj())
    .pipe(app.plugins.replace(".js\"", ".min.js\""))
    .pipe(app.plugins.replace(".js\'", ".min.js\'"))
    // .pipe(ts.createProject("tsconfig.json"), { noImplicitAny: true })
    // .pipe(removeUseStrict())
    .pipe(app.gulp.dest(app.path.build.js))
// ------------------------------------------------------------------
    .pipe(app.gulp.src(app.path.src.ts, {
      sourcemaps: true
    }))
    // .pipe(ts({
    //   noImplicitAny: true,
    // }))
    .pipe(tsProjMin())
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      }),
    )
    .pipe(app.gulp.dest(app.path.build.js))



    .pipe(app.plugins.browsersync.stream())
}