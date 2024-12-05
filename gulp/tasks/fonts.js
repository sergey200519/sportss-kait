import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import rename from 'gulp-rename';



export const moveFonts = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{ttf,woff,woff2}`, {
    sourcemaps: true,
    encoding: false
  })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>',
      })
    ))
    .pipe(rename((file) => {
      file.basename = file.basename.replace("\\", '/');
    }))
    .pipe(app.gulp.dest(app.path.build.fonts)) // Копируем исходные файлы
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {
      sourcemaps: true,
      encoding: false
    }))
    .pipe(fonter({ formats: ['woff'] })) // Конвертируем в WOFF
    .pipe(rename((file) => {
      file.basename = file.basename.replace("\\", '/');
    }))
    .pipe(app.gulp.dest(app.path.build.fonts))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {
      sourcemaps: true,
      encoding: false
    }))
    .pipe(ttf2woff2()) // Конвертируем в WOFF2
    .pipe(rename((file) => {
      file.basename = file.basename.replace("\\", '/');
    }))
    .pipe(app.gulp.dest(app.path.build.fonts));
};




export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fonter({ formats: ['woff'] }))
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .on('end', () => console.log('Woff files generated!'))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .on('end', () => console.log('Woff2 files generated!'));
};
