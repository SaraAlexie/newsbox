const gulp = require('gulp');
const connect = require('gulp-connect');

function media (){
    return gulp.src("./src/media/**/*.pdf")
        .pipe(gulp.dest("./dist/media"))
        .pipe(connect.reload());
}

function buildMEDIA (){
    return gulp.src("./src/media/**/*.pdf")
        .pipe(gulp.dest("./build/media"));
}

function watchMEDIA(){
    return gulp.watch("./src/media/**/*.pdf", {
        ignoreInitial: false
    }, media)
}

module.exports = {
    watchMEDIA,
    buildMEDIA
}