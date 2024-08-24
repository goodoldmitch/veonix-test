const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create(); // Подключаем browser-sync

// Пути к исходным и выходным файлам
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/'
  }
};

// Компиляция и минификация SCSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream()); // Обновляем стили в браузере
}

// Минификация и объединение JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream()); // Обновляем скрипты в браузере
}

// Обновление страницы в браузере
function reload(done) {
  browserSync.reload();
  done(); // Завершаем задачу
}

// Запуск локального сервера и наблюдение за изменениями в файлах
function serve() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch('*.html').on('change', gulp.series(reload));
}

// Задачи для сборки и наблюдения
const build = gulp.series(gulp.parallel(styles, scripts));
const watch = gulp.series(build, serve);

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.default = build;
