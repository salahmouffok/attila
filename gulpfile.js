const  gulp  = require('gulp');
const { watch } = require('gulp');

// gulp plugins and utils
const sourcemaps = require('gulp-sourcemaps');
// const zip = require('gulp-zip');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

var paths = {
    styles: {
        src: "src/sass/style.scss",
        dest: "assets/css/"
    }
};


function reload() {
    browserSync.reload();
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 4 versions']}))
        .pipe(sourcemaps.write('.')) // the path is relative to the dest direcotry
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// function release() {
//     var targetDir = 'dist/';
//     var themeName = require('./package.json').name;
//     var filename = themeName + '.zip';

//     return gulp.src([
//         '**',
//         '!node_modules', '!node_modules/**',
//         '!dist', '!dist/**',
//         '!assets/scss', '!assets/scss/**'
//     ])
//         .pipe(zip(filename))
//         .pipe(gulp.dest(targetDir));
// }
function watchFiles() {
    browserSync.init({
        proxy: "localhost:2368"
    });

    watch(['src/sass/**/*.scss'], styles);
    watch(['**/*.hbs'], reload);
}
//'gulpfile.js', 'assets/js/*.js' , 

exports.styles = styles;
// exports.release = release;
exports.watch = watchFiles;
