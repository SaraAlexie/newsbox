const gulp = require("gulp");
const connect = require("gulp-connect");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

function processJS(){
    return gulp.src("./src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
}

function buildJS(){
    return gulp.src("./src/js/**/*.js")
        .pipe(concat("app.js"))
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"));
}

function watchJS(){
    return gulp.watch("./src/js/**/*.js", {
        ignoreInitial: false
    }, processJS)
}

module.exports = {
    watchJS,
    buildJS
}