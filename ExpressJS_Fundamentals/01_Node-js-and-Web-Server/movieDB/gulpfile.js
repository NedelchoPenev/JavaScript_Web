const gulp = require("gulp")
const htmlmin = require('gulp-htmlmin')
const rename = require("gulp-rename")

gulp.task("minify-html", () => {
    gulp.src("./views/*.html")
        .pipe(htmlmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./views"))
});