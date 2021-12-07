const gulp = require("gulp");
const connect = require("gulp-connect");
const {watchHTML, buildHTML} = require("./tasks/html");
const {watchSCSS, buildSCSS} = require("./tasks/scss"); 
const {watchJS, buildJS} = require("./tasks/js");
const {watchMEDIA, buildMEDIA} = require("./tasks/media");
const {watchIMAGE, buildIMAGE} = require("./tasks/image");


function dist (done){
    // Her kommer det vi gerne vil have tasken til at gøre
    watchHTML();
    watchSCSS();
    watchJS();
    watchMEDIA();
    watchIMAGE();
    connect.server({
        root: "./dist",
        livereload: true,
        port: 3000
    });
    done();
}

function build (done){
    buildHTML();
    buildSCSS();
    buildJS();
    buildMEDIA();
    buildIMAGE();
    done();
}

exports.default = dist;
exports.build = build;