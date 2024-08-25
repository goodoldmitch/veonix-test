import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

// Создаем экземпляр browser-sync
const bs = browserSync.create();

// Инициализация gulp-sass с компилятором
const sass = gulpSass(dartSass);

// Пути к исходным и выходным файлам
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/js/main.js', // Указываем путь к единственному файлу
    dest: 'dist/js/'
  }
};

// Компиляция и минификация SCSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError)) // Устанавливаем компилятор
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(bs.stream()); // Обновляем стили в браузере
}

// Минификация и объединение JS (теперь только для main.js)
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify()) // Минификация
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream()); // Обновляем скрипты в браузере
}

// Обновление страницы в браузере
function reload(done) {
  bs.reload();
  done(); // Завершаем задачу
}

// Запуск локального сервера и наблюдение за изменениями в файлах
function serve() {
  bs.init({
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

export { styles, scripts, watch };
export default build;
