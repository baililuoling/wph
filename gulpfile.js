var gulp=require("gulp");
// var uglify=require("gulp-uglify");
// var minifyCss=require("gulp-minify-css");
// var minifyHtml=require("gulp-minify-html");
// var imagemin=require("gulp-imagemin");
// var rename=require("gulp-rename");
// var concat=require("gulp-concat");
// var babel=require("gulp-babel");
var load=require("gulp-load-plugins")();
var browser=require("browser-sync").create();
// gulp.task("init",function(done){
// 	console.log("initaaa")
// 	done()

// })
// gulp.task("default",function(done){
// 	console.log("default")
// 	done()
// })

gulp.task("js",function(done){
	gulp.src("./src/js/*.js")
	.pipe(load.babel({'presets':['@babel/env']}))
	.pipe(load.uglify())
	.pipe(gulp.dest("./dist/js/"))
	done()
})
gulp.task("css",function(done){
	gulp.src("./src/css/*.scss")
	.pipe(load.sass())
	.pipe(load.minifyCss())
	.pipe(gulp.dest("./dist/css/"))
	done()
})
gulp.task("html",function(done){
	gulp.src("./src/*.html")
	.pipe(load.minifyHtml())
	.pipe(gulp.dest("./dist/"))
	done()
})
gulp.task("image",function(done){
	gulp.src("./src/images/**")
	.pipe(load.imagemin())
	.pipe(gulp.dest("./dist/images/"))
	done()
})
gulp.task("save",gulp.series(gulp.parallel("html","css","js"),function(done){
	browser.reload()
	done()
}))
gulp.task("server",gulp.series(gulp.parallel("html","css","js"),function(done){
	browser.init({
		server:"./dist",
		port:8080
	})
	gulp.watch("./src",gulp.series("save"))
	done()
}))
