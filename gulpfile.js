const { src, dest, series, parallel, watch } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const prefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const browser = require("browser-sync");

// browser sync task
function serve() {
  return browser.init({
    server: {
      baseDir: "./dist",
    },
  });
}

exports.serve = serve;

// pugjs task
function html(cb) {
  return src("./src/html/**.pug").pipe(pug()).pipe(dest("dist"));
  cb();
}

exports.html = html;

// sass task
function css() {
  return src("./src/sass/**/**.scss")
    .pipe(sass())
    .pipe(prefixer())
    .pipe(dest("dist/css/", { sourcemaps: true }));
}

exports.css = css;

// js task
function js() {
  return src("./src/js/**.js").pipe(babel()).pipe(dest("dist/js/"));
}

exports.js = js;

// watch task
function watchTask(cb) {
  watch("./src/html/**/*.pug").on("change", series(html, browser.reload));
  watch("./src/sass/**/*.scss").on("change", series(css, browser.reload));
  watch("./src/js/**.js").on("change", series(js, browser.reload));
  cb();
}

exports.watchTask = watchTask;

// default setup
exports.default = series(html, css, js, parallel(serve, watchTask));
