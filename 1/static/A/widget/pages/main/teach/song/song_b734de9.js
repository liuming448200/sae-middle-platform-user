define('A:widget/pages/main/teach/song/song', function(require, exports, module) {

  var chinese = require('A:widget/pages/main/teach/song/chinese/chinese');
  var english = require('A:widget/pages/main/teach/song/english/english');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/main/teach/song', '/main/teach/song/chinese');
  
    $stateProvider
      .state('main.teach.song.chinese', chinese)
      .state('main.teach.song.english', english);
  }]);
  
  module.exports = {
    url: '/song',
    template: "<!--\r\n    @require \"A:widget/pages/main/teach/song/song.css\"\r\n-->\r\n\r\n<div class=\"song-container\">\r\n  <div class=\"container\">\r\n    <ul class=\"nav nav-tabs\">\r\n      <li ui-sref-active=\"active\">\r\n        <a href=\"javascript:;\" ui-sref=\"main.teach.song.chinese\">中文歌</a>\r\n      </li>\r\n      <li ui-sref-active=\"active\">\r\n        <a href=\"javascript:;\" ui-sref=\"main.teach.song.english\">英文歌</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"content-container\">\r\n      <div ui-view></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"
  };
  

});
