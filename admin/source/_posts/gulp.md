title: Gulp.js构建工具入门
date: 2014/08/20
thumbnailImage: http://7xp5hh.com1.z0.glb.clouddn.com/vintage-140.jpg
autoThumbnailImage: yes
tags:
    -前端构建
    -gulp
categories: 前端构建
---

> [gulp官网](http://gulpjs.com/)

**基本入门**

1. 全局安装`gulp.js`

```
		npm install -g gulp
```

<!-- more -->

2. 为项目目录安装`gulp.js`库文件

```
		#cd c://myproject/demo1
		npm install --save-dev gulp
```

3. 在项目根目录创建`gulpfile.js`文件并写入以下模板。

```
		var gulp = require('gulp');

		gulp.task('default', function(){
			// code
		});

```

4. 运行`gulp`任务。

```
		gulp

```    

基本入门就4步可以完成，比起`grunt`各种配置简单许多。

##Gulp.js进阶 ##

```
    var gulp = require('gulp');

    /**
    # 依赖插件可以在package.json中配置
    # npm install安装插件
    **/
    var contact = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var sourcemaps = require('gulp-sourcemaps');
    var imagemin = require('gulp-imagemin')
    //var del = require('del');

    var paths = {
    	scripts: 'static/js/**/*.js',
    	images: 'static/images/**/*'
    };

    // 清空build目录文件
    //# npm install --save-dev gulp-clean
    gulp.task('clean', function(cb){
    	//del(['build'], cb); #del不存在该模块，官方api居然有这句具体不知道怎么来
    	cb();
    });

    // 处理js文件
    //# npm install --save-dev gulp-sourcemaps
    //# npm install --save-dev gulp-uglify
    gulp.task('scripts', ['clean'], function(){
    	return gulp.src(paths.scripts)
    				.pipe(sourcemaps.init())
    				.pipe(uglify())
    				.pipe(sourcemaps.write('build/maps'))
    				.pipe(gulp.dest('build/js'));
    });

    // 复制图片
    //# npm install --save-dev gulp-images
    gulp.task('images', ['clean'], function(){
    	return gulp.src(paths.images)
    				.pipe(imagemin({optimizationLevel: 5}))
    				.pipe(gulp.dest('build/images'));
    });

    // 文件监听
    gulp.task('watch', function(){
    	gulp.watch(paths.scripts, ['scripts']);
    	gulp.watch(paths.images, ['images']);
    });

    // 配置默认任务，执行['watch', 'scripts', 'images']
    gulp.task('default', ['watch', 'scripts', 'images']);

```


##模板一

```
	/**
	 * 构建环境
	 */

	var gulp = require('gulp')

	var concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		less = require('gulp-less'),
		minifycss = require('gulp-minify-css'),
		rename = require('gulp-rename'),
		livereload = require('gulp-livereload'),
		autoprefixer = require('gulp-autoprefixer'),
		cache = require('gulp-cache'),
		notify = require('gulp-notify'),
		connect = require('gulp-connect'),
	    del = require('del');

	var paths = {
		styles: 'src/css/**/*.css',
		less: 'src/less/**/*.less',
		scripts: ['src/js/jquery.js','src/js/common/**/*.js'],
		images: 'src/images/**/*',
		gallery: 'src/gallery/**/*',
		index: ['src/gallery/jquery.bxslider/jquery.bxslider.min.js', 'src/js/app/index.js']
	};

	gulp.task('scripts', function(){
		return gulp.src(paths.scripts)
					.pipe(concat('main.js'))
					.pipe(gulp.dest('dist/js'))
					//.pipe(rename({suffix: '.min'}))
					.pipe(uglify())
					.pipe(gulp.dest('dist/js'))
					.pipe(notify('js任务运行完成'))
	});

	gulp.task('images', function(){
		return gulp.src(paths.images)
					.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
					.pipe(gulp.dest('dist/images'))
					//.pipe(notify('图片压缩完成'))
	})

	gulp.task('styles', function(cb){
		return gulp.src('src/less/main.less')
					.pipe(less())
					.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
					.pipe(gulp.dest('src/css'))
					.pipe(notify('less样式文件完成'));
	})

	gulp.task('concat', ['styles'], function(){
		return gulp.src(paths.styles)
					.pipe(concat('main.css'))
					.pipe(gulp.dest('dist/css'))
					//.pipe(rename({suffix: '.min'}))
					.pipe(minifycss())
					.pipe(gulp.dest('dist/css'))
					.pipe(notify('样式文件完成'))
	})

	// gallery 插件
	/*gulp.task('copy', function(){
		return gulp.src(paths.gallery)
					.pipe(gulp.dest('dist/gallery'));
	});*/

	gulp.task('clean', function(cb){
		del(['dist/js', 'dist/images', 'dist/css'], cb);
	})

	gulp.task('html', function(){
		return gulp.src('*.html')
					.pipe(connect.reload());
	})

	gulp.task('connect', function(){
		connect.server({
			root: '../ghlaw',
			livereload: true
		});
	})

	/*
	* 首页
	 */
	gulp.task('index', function(){
		return gulp.src(paths.index)
					.pipe(concat('index.js'))
					.pipe(gulp.dest('dist/js'))
					//.pipe(rename({suffix: '.min'}))
					.pipe(uglify())
					.pipe(gulp.dest('dist/js'))
					.pipe(notify('首页js任务运行完成'))
	});

	gulp.task('watch', function(){

		gulp.watch(paths.scripts, ['scripts'])
		gulp.watch(paths.images, ['images'])
		gulp.watch(paths.less, ['concat'])
		//gulp.watch(paths.gallery, ['copy'])
		gulp.watch(paths.index, ['index'])

		livereload.listen()
		gulp.watch(['/dist/**']).on('change', livereload.changed)
		gulp.watch(['**/*.html'], ['html'])
	})

	gulp.task('default', ['clean'], function(){
		gulp.start(['connect','watch', 'scripts', 'images', 'concat', 'index']);
	});

```  

##模板二

``` javascript
	/**
	 * 构建环境
	 * by tomieric
	 * gulpfile.js
	 */

	var gulp = require('gulp')

	var useref = require('gulp-useref')
	var gulpif = require('gulp-if')
	var minifycss = require('gulp-minify-css')
	var uglify = require('gulp-uglify')
	var notify = require('gulp-notify')
	var imagemin = require('gulp-imagemin')
	var cache = require('gulp-cache')
	var rev = require('gulp-rev')
	var del = require('del')

	gulp.task('copyimage', function(cb){
		//return
		gulp.src('./images/**/*')
					.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
					.pipe(gulp.dest('./dist/images'))
		cb()
	})

	gulp.task('app', ['clean', 'copyimage'], function(){
		var assets = useref.assets()

		return gulp.src('./index.html')
				.pipe(assets)
				.pipe(gulpif('*.js', uglify()))
				.pipe(gulpif('*.css', minifycss()))
				.pipe(assets.restore())
				.pipe(useref())
				.pipe(gulp.dest('dist'))
				.pipe(notify('构建完成'))
	})

	gulp.task('clean', function(cb){
		del(['./dist'], cb)
	})

	/* watch */
	gulp.task('watch', function(){
		gulp.watch('./js/*.js', ['app'])
		gulp.watch('./css/style.css', ['app'])
	})

	/* task */
	gulp.task('default', ['clean'], function(){
		gulp.start(['watch', 'app']);
	})

```


html

``` html
	<html>
	<head>
	    <!-- build:css css/combined.css -->
	    <link href="css/one.css" rel="stylesheet">
	    <link href="css/two.css" rel="stylesheet">
	    <!-- endbuild -->
	</head>
	<body>
	    <!-- build:js scripts/combined.js -->
	    <script type="text/javascript" src="scripts/one.js"></script>
	    <script type="text/javascript" src="scripts/two.js"></script>
	    <!-- endbuild -->
	</body>
	</html>

result

	<html>
	<head>
	    <link rel="stylesheet" href="css/combined.css"/>
	</head>
	<body>
	    <script src="scripts/combined.js"></script>
	</body>
	</html>
```

> [gulp-book中文](https://github.com/nimojs/gulp-book)

> [Building With Gulp中文版](https://github.com/yeol/blog/blob/master/20140828_building_with_gulp.md)

> [Learning Gulp](http://rookieone.gitbooks.io/learning-gulp/index.html)

> [gulp-book](http://davinov.gitbooks.io/gulp-book/)

> [“流式”前端构建工具——gulp.js 简介](http://blog.segmentfault.com/nightire/1190000000435599)

> [gulp视频教程之一：gulp是什么gulp能做什么](http://v.youku.com/v_show/id_XNzUyNzc5Nzky.html)

> [Gulp入门教程](http://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/)

>[gulp plugins 插件介绍](http://colobu.com/2014/11/17/gulp-plugins-introduction/#gulp-usemin)

>[gulp高级进阶](http://csspod.com/advanced-tips-for-using-gulp-js/)
