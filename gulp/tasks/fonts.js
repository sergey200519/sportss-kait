import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import rename from 'gulp-rename';

/* global app */
// eslint-disable-next-line arrow-body-style

// export const moveFonts = () => {
//   return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{ttf,woff,woff2}`, {
//     sourcemaps: true,
//     encoding: false
//   })
//     .pipe(app.plugins.plumber(
//       app.plugins.notify.onError({
//         title: 'FONTS',
//         message: 'Error: <%= error.message %>',
//       })
//     ))
//     .pipe(app.gulp.dest(app.path.build.fonts)) // Копируем исходные файлы
//     .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{ttf,woff,woff2}`, {
//       sourcemaps: true,
//       encoding: false
//     }))
//     .pipe(fonter({ formats: ['woff'] })) // Конвертируем в WOFF
//     .pipe(app.gulp.dest(app.path.build.fonts))
//     .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/**/*.{ttf,woff,woff2}`, {
//       sourcemaps: true,
//       encoding: false
//     }))
//     .pipe(ttf2woff2()) // Конвертируем в WOFF2
//     .pipe(app.gulp.dest(app.path.build.fonts));
// };

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



// export const otfToTtf = () => {
//   // Ищем файлы шрифтов .otf
//   return app.gulp.src(`${app.path.srcFolder}/fonts/**/*.otf`, {})
//     .pipe(app.plugins.plumber(
//       app.plugins.notify.onError({
//         title: 'FONTS',
//         message: 'Error: <%= error.message %>'
//       })
//     ))
//   // Конвертируем в .ttf
//     .pipe(fonter({
//       formats: ['ttf']
//     }))
//     // Выгружаем в исходную папку
//     .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
// };


// // eslint-disable-next-line arrow-body-style
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


// export const fontStyle = () => {
//   // Файл стилей подключения шрифтов
//   const fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
//   // Проверяем существуют ли файлы шрифтов
//   fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
//     if (fontsFiles) {
//       // Проверяем существует ли файл стилей для подключения шрифтов
//       if (!fs.existsSync(fontsFile)) {
//         // Если файла нет, создаем его
//         fs.writeFile(fontsFile, '', cb);
//         let newFileOnly;
//         for (let i = 0; i < fontsFiles.length; i++) {
//           // Записываем подключения шрифтов в файл стилей
//           const fontFileName = fontsFiles[i].split('.')[0]
//           if (newFileOnly !== fontFileName) {
//             const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
//             let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

//             if (fontWeight.toLowerCase() === 'thin') {
//               fontWeight = 100;
//             } else if (fontWeight.toLowerCase() === 'extralight') {
//               fontWeight = 200;
//             } else if (fontWeight.toLowerCase() === 'light') {
//               fontWeight = 300;
//             } else if (fontWeight.toLowerCase() === 'medium') {
//               fontWeight = 500;
//             } else if (fontWeight.toLowerCase() === 'semibold') {
//               fontWeight = 600;
//             } else if (fontWeight.toLowerCase() === 'bold') {
//               fontWeight = 700;
//             } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
//               fontWeight = 800;
//             } else if (fontWeight.toLowerCase() === 'black') {
//               fontWeight = 900;
//             } else {
//               fontWeight = 400;
//             }

//             fs.appendFile(fontsFile,
//               `@font-face {
//                 font-family: ${fontName};
//                 font-display: swap;
//                 src: url("../fonts/${fontFileName}.woff2") format("woff2"),
//                      url("../fonts/${fontFileName}.woff") format("woff");
//                 font-weight: ${fontWeight};
//                 font-style: normal;
//               }\r\n`, cb)
//             newFileOnly = fontFileName;
//           }
//         }
//       } else {
//         // Если файл есть нужно его удалить
//         console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
//       }
//     }
//   });

//   return app.gulp.src(`${app.path.srcFolder}`);
//   function cb() {};
// };
