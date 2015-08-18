# Grunt自动化工具

简单梳理grunt工具的使用步骤，总结给自己看，并不断补充更正。

### 一、主要用途

基于nodeJS的命令行工具，结合uglify 和 cssmin等插件对文件进行压缩合并等操作。

### 二、安装步骤（mac）

##### 1、安装nodeJS环境
```javascript
brew install node
node –v
npm –v
sudo npm update –g npm  （确保当前环境安装的npm是最新版本）
```
##### 2、安装CLI
```javascript
sudo npm install –g grunt-cli  （将Grunt命令CLI安装到全局环境中）
grunt --version
```
##### 3、创建package.json文件
此文件被npm用于存储项目的元数据，以便将此项目发布为npm模块。可以在此文件中列出项目依赖的grunt和grunt插件，放置于devDependencies配置段内，要放在项目的根目录中，与gruntfile文件在同一目录中，并且应该与项目的源代码一起被提交。

Package.json文件案例：

第一种方法：

```javascript
touch package.json
vim package.json
```

```javascript
/*package.json content Start*/
{
  "name": "nanchong",
  "version": "1.1.0",
  "description": "webpage",
  "author": "nancy",
  "devDependencies": {
  "grunt": "~0.4.5"
  }
}
/*package.json content End*/

```

```javascript
cat package.json
```
第二种方法：
```javascript
git init      （按照提示一步一步配置完成）
```
在创建package.json文件之后执行：
```javascript
npm install  （安装依赖库到node_modules目录中），此时项目的根目录下会新增一个node_modules目录。
```

##### 4、安装Grunt和grunt插件
向已经存在的package.json文件中添加Grunt和grunt插件可以通过npm install <module> --save-dev命令。此命令不光安装了<module>，还会自动将其添加到devDependencies配置段中。

在创建package.json文件之后执行：
```javascript
npm install grunt –save-dev  （安装最新grunt到项目中）
npm install grunt-contrib-jshint –save-dev （安装插件和相关node模块）
```
##### 5、创建Gruntfile.js文件
此文件被命名为Gruntfile.js 或 Gruntfile.coffee，用来配置或定义任务（task）并加载Grunt插件的。放在跟目录中，和package.json同一级目录，并和项目源码一起提交。Gruntfile由以下几部分构成：
* “wrapper”函数

```javascript

grunt代码必须放在此函数中
module.exports = function(grunt) { 
// Do grunt-related things in here
 };
 
```

* 项目与任务配置
* 加载grunt插件和任务
* 自定义任务

Gruntfile文件案例：

先合并在压缩

```javascript
module.exports = function (grunt) {

    var js_src = [
        'resource/js/admin1.js',
        'resource/js/admin2.js'
    ];

    var css_src = [
        //'resource/css/jquery.mCustomScrollbar.css',
        'resource/css/main.css'
    ];

    var sass_src = [
        'resource/3rd/bootstrap3/sass/main.scss'
    ];

    // Project configuration.
    grunt.initConfig({

        //package.json文件中的项目元数据被导入到Grunt配置中
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourcemap: 'none'
            },
            compile: {
                files: {
                    'resource/css/main.css': 'resource/3rd/bootstrap3/sass/main.scss'
                }
            }
        },

        //合并js和css文件
        concat: {
            js: {
                src: js_src,
                dest: 'resource/js/<%= pkg.name %>.concat.min.js'
            },
            css: {
                src: css_src,
                dest: 'resource/css/<%= pkg.name %>.concat.css'
            }
        },

        //合并和压缩css文件
        //第一种配置方法
        cssmin: {
            css: {
                src: css_src,
                dest: 'resource/css/<%= pkg.name %>.v<%= pkg.version %>.min.css'
            }
        },

        //第二种配置方法
        cssmin2nd: {
            options: {
                keepSpecialComments: 0
            },
            target_one: {
                options: {
                    banner: '/* common.css index.css style.css profession.css concat and minified css file */'
                },
                files: {
                    'resource/css/concat.min.css': [
                        "resource/css/common.css",
                        "resource/css/index.css",
                        "resource/css/style.css",
                        "resource/css/profession.css"
                    ]
                }
            },
            target_two: {
                options: {
                    banner: '/* product-info.css minified css file */'
                },
                files: {
                    'resource/css/product-info.min.css': [
                        "resource/css/product-info.css",
                    ]
                }
            },
            target_three: {
                options: {
                    banner: '/* questionnaire-print.css minified css file */'
                },
                files: {
                    'resource/css/questionnaire-print.min.css': [
                        "resource/css/questionnaire-print.css",
                    ]
                }
            }
        },

        //grunt-contrib-uglify插件中的uglify任务被配置为压缩源码文件并依据上述元数据动态生成一个文件头注释,uglify有合并和压缩的作用。
        //第一种配置方法
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: js_src,
                dest: 'resource/js/<%= pkg.name %>.min.js'
            }
        },

        //第二种配置方法
        uglify2nd: {
            options: {
                report: "all",
                compress: {
                    drop_console: true
                }
//                mangle: false  默认true是js自定义变量名最小化（变），

            },
            my_target: {
                options: {
                    banner: '/* jquery.min.js super-slide.js jquery.yiiactiveform.js profession.js concat and minified js file */'
                },
                files: {
                    'resource/js/common.min.js': ['resource/js/jquery.min.js', 'resource/js/super-slide.js', 'resource/js/jquery.yiiactiveform.js', 'resource/js/profession.js']
                }
            },

            my_scroll_target: {
                options: {
                    banner: '/* scroll.js minified js file */'
                },
                files: {
                    'resource/js/scroll.min.js': ['resource/js/scroll.js']
                }
            },

            my_transfer_target: {
                options: {
                    banner: '/* transfer-cash.js minified js file */'
                },
                files: {
                    'resource/js/transfer-cash.min.js': ['resource/js/transfer-cash.js']
                }
            }
        },

        watch: {
            js: {files: js_src, tasks: ['concat', 'uglify']},
            css: {files: [sass_src,css_src], tasks: ['sass','concat', 'cssmin']},
            //cssmin: {files: css_src, tasks: ['cssmin']},

            //livereload配置
            livereload:{
                options:{
                    livereload:true
                },
                files:[
                    '../sass/sass/*.scss',
                    '../sass/include/*.scss',
                    '../js/app/**/*.js',
                    '../../layout/**/*.php',
                    '../lib/jquery/**/*.js'
                ]
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认被执行的任务列表。
    //grunt.registerTask('sass', ['sass']);
    grunt.registerTask('css', ['sass','concat', 'cssmin']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('default', ['watch']);

};

```

##### 6、package.json扩展

因为上一步安装了grunt-contrib-sass、grunt-contrib-watch、grunt-contrib-concat、grunt-contrib-cssmin和grunt-contrib-uglify依赖库，所以package.json文件的内容改为：

```javascript
{
  "name": "nanchong",
  "version": "1.1.0",
  "description": "webpage",
  "author": "nancy",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-concat": "^0.5.1",
    "grunt-contrib-cssmin": "^0.13.0",
    "grunt-contrib-sass": "^0.9.2",
    "grunt-contrib-uglify": "^0.9.1",
    "grunt-contrib-watch": "^0.6.1"
  }
}
```

### 三、重要Grunt插件

参考网址： 
* [http://www.gruntjs.net/plugins](http://www.gruntjs.net/plugins)

1、	contrib-jshint   
说明：Validate files with JSHint.

2、	contrib-watch  
说明：Run predefined tasks whenever watched file patterns are added, changed or deleted.

3、	 contrib-clean 
说明：Clean files and folders.

4、 contrib-uglify
说明：Minify files with UglifyJS.

5、	contrib-copy
说明：Copy files and folders.

6、	contrib-concat
说明：Concatenate files..

7、	contrib-connet
说明：Start a connect web server

8、	contrib-cssmin
说明：Minify CSS

9、	contrib-less
说明：Compile LESS files to CSS.

10、	contrib-sass
说明：Compile Sass to CSS

11、	contrib-requirejs
说明：Optimize RequireJS projects using r.js.

12、	contrib-imagemin
说明：Minify images

13、	contrib-htmlmin
说明：Minify HTML

14、	contrib-compass
说明：compile sass to css using compass

15、	contrib-compress
说明：compress files and folder.

16、	contrib-livereload
说明：reload assets live in the browser.

### 四、参考网站
* [http://www.gruntjs.net/](http://www.gruntjs.net/)

* [http://spmjs.io/documentation/package.json](http://spmjs.io/documentation/package.json)
