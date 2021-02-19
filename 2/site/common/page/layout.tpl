{%html framework="common:static/js/mod.js" lang="zh-CN" ng-app="eduApp"%}
  {%head%}
    <meta charset='utf-8'>
    {%if $data.app_role == 'web'%}
        <title ng-bind="pageTitle">方向教育</title>
    {%elseif $data.app_role == 'admin'%}
        <title>方向教育管理平台</title>
    {%/if%}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="shortcut icon" type="image/ico" href="common:static/images/favicon.ico?v=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="keywords" content="早教,英语培训,绘本阅读,托管,素质教育,个性化教育">
    <meta name="description" content="帮助每一个孩子找到适合自己的发展方向">
    <meta name="author" content="方向教育,fangxiang.applinzi.com">
    <meta name="robots" content="index,follow">
    <meta name="apple-mobile-web-app-title" content="方向教育">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no, email=no">

    <!-- <link rel="apple-touch-icon-precomposed" href="common:static/images/icon57.png?v=1.0">
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="common:static/images/icon76.png?v=1.0">
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="common:static/images/icon120.png?v=1.0">
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="common:static/images/icon152.png?v=1.0"> -->

    <meta name="HandheldFriendly" content="true">
    <meta name="MobileOptimized" content="320">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <meta name="msapplication-tap-highlight" content="no">

    {%if $data.app_role == 'web'%}
        {%require name="A:static/css/base.css"%}
        <script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
        <script>
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "//hm.baidu.com/hm.js?7f75d369332a1ba84f7846ba095a36f9";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();

            (function(e,t,n,a,o,i,m){
            e.alogObjectName=o,e[o]=e[o]||function(){(e[o].q=e[o].q||[]).push(arguments)},e[o].l=e[o].l||+new Date,i=t.createElement(n),i.asyn=1,i.src=a,m=t.getElementsByTagName(n)[0],m.parentNode.insertBefore(i,m)
            })(window,document,"script","//cdn.sinacloud.net/static.directionedu.com/alogs/alog.min.js","alog");
        </script>
    {%elseif $data.app_role == 'admin'%}
        {%require name="B:static/css/base.css"%}
        {%require name="common:bower_components/rdash-ui/dist/css/rdash.css"%}
    {%/if%}

    {%require name="common:bower_components/bootstrap/less/bootstrap.less"%}
    {%require name="common:bower_components/font-awesome/css/font-awesome.css"%}
    {%require name="common:bower_components/jquery-ui/themes/smoothness/jquery-ui.css"%}
    {%require name="common:bower_components/ng-img-crop/compile/unminified/ng-img-crop.css"%}
    {%require name="common:bower_components/videogular-themes-default/videogular.css"%}
    <!-- {%require name="common:bower_components/angular-chart.js/dist/angular-chart.css"%} -->
    {%require name="common:static/css/reset.css"%}
    {%require name="common:static/css/layout.less"%}
    
    {%require name="common:static/js/detect.js"%}
    
    {%require name="common:bower_components/angular/angular.js"%}
    {%require name="common:bower_components/angular-sanitize/angular-sanitize.js"%}
    {%require name="common:bower_components/videogular/videogular.js"%}
    {%require name="common:bower_components/videogular-controls/vg-controls.js"%}
    {%require name="common:bower_components/videogular-buffering/vg-buffering.js"%}
    {%require name="common:bower_components/videogular-overlay-play/vg-overlay-play.js"%}
    {%require name="common:bower_components/videogular-poster/vg-poster.js"%}
    {%require name="common:bower_components/angular-bootstrap/ui-bootstrap-tpls.js"%}
    {%require name="common:bower_components/angular-cookies/angular-cookies.js"%}
    {%require name="common:bower_components/angular-animate/angular-animate.js"%}
    {%require name="common:bower_components/ui-router/release/angular-ui-router.js"%}
    {%require name="common:bower_components/jquery/dist/jquery.js"%}
    {%require name="common:bower_components/scrollup/dist/jquery.scrollUp.js"%}
    {%require name="common:bower_components/jquery-ui/jquery-ui.js"%}
    {%require name="common:bower_components/bootstrap/dist/js/bootstrap.js"%}
    {%require name="common:bower_components/ng-img-crop/compile/unminified/ng-img-crop.js"%}
    {%require name="common:bower_components/scroll-trigger/dist/scroll-trigger.js"%}
    {%require name="common:bower_components/angular-md5/angular-md5.js"%}
    <!-- {%require name="common:bower_components/Chart.js/Chart.js"%} -->
    <!-- {%require name="common:bower_components/angular-chart.js/dist/angular-chart.js"%} -->
  {%/head%}

  {%body id="screen" ng-controller="MasterCtrl" class="um-vp"%}
    {%if $data.app_role == 'web'%}
        {%block name="image"%}{%/block%}
    {%/if%}
    <div id="container">
      <div class="main">
        {%block name="main"%}{%/block%}
      </div>
    </div>
  {%/body%}

{%/html%}
