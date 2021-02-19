fis.require('smarty')(fis);
fis.set('namespace', 'B');

fis.match('**.{js,css,less,png}', {
  optimizer: null
});

fis.media('prod')
    .match('**.js', {
        optimizer: fis.plugin('uglify-js')
    })
    //注意压缩时.async.js文件是异步加载的，不能直接用annotate解析
    .match('**!(.async).js', {
        preprocessor : fis.plugin('annotate'),
        optimizer: fis.plugin('uglify-js')
    })
    .match('**.{css,less}', {
        optimizer: fis.plugin('clean-css', {
            'keepBreaks': true //保持一个规则一个换行
        })
    })
    .match('**.png', {
        optimizer: fis.plugin('png-compressor')
    })
    .match("static/js/*.js",{
        packTo : "/pkg/vendor.js"
    })
    //所有页面中引用到的bower js资源
    .match("bower_components/**/*.js",{
        packTo : "/pkg/vendor.js"
    })
    .match("widget/**/*.js", {
        packTo : "/pkg/vendor.js"
    })
    .match("widget/**/*.async.js", {
        packTo : "/pkg/async.js"
    })
    //所有页面中引用到的bower css资源
    .match("bower_components/**/*.{css,less}",{
        packTo : "/pkg/vendor.css"
    })
    .match("static/css/*.{css,less}", {
        packTo : "/pkg/vendor.css"
    })
    .match("widget/**/*.{css,less}", {
        packTo : "/pkg/vendor.css"
    });
