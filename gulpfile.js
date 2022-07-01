const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify-es').default;
const sass        = require('gulp-sass')(require('sass'));
const cssPrefix   = require('gulp-autoprefixer');
const cleanCss    = require('gulp-clean-css');
const imgMin      = require('compress-images');
const del         = require('del');


const devFolder = './dev-server';

function importTemplate()
{
    const pathTemplateBdConnect = '../!!!template_no_php/*',
        pathDest = devFolder;
    return src([pathTemplateBdConnect])
        .pipe(dest(pathDest));
}

function browser_sync()
{
    browserSync.init({
        server: { baseDir: devFolder },
        notify: true,
        online: false
    });
}

function images()
{
    return Promise.resolve(
        imgMin(
            "app/images/src/**/*",
            "app/images/dest/",
            { compress_force: false, statistic: true, autoupdate: true },
            false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            {
                gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
            },
            function (err, completed) {
                if (completed === true) {
                    browserSync.reload()
                }
            }
        )
    );
}

function watchAllFile()
{
    watch(['dev-server/scripts/*.js','!app/**/*.min.js']).on('change', browserSync.reload);
    watch(['dev-server/style/style.css']).on('change', browserSync.reload);
    watch(['dev-server/*.html']).on('change', browserSync.reload);
    // watch(['app/images/**'], images);
}

function prodaction_v_1_0()
{
    return src(['dev-server/**/*','!dev-server/style/**','dev-server/**/*.css'])
        .pipe(dest('prodaction/'));
}

exports.importTemplate = importTemplate;
exports.browserSync = browser_sync;
exports.watchAllFile = watchAllFile;
//
exports.default      = parallel( browser_sync, watchAllFile );
exports.prodaction   = series( prodaction_v_1_0 );