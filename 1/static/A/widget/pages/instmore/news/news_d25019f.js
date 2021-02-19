define('A:widget/pages/instmore/news/news', function(require, exports, module) {

  var list = require('A:widget/pages/instmore/news/list/list');
  var detail = require('A:widget/pages/instmore/news/detail/detail');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/instmore/news?from', '/instmore/news/list?from');
  
    $stateProvider
      .state('instmore.news.list', list)
      .state('instmore.news.detail', detail);
  }]);
  
  module.exports = {
    url: '/news',
    template: "<!--\r\n    @require \"A:widget/pages/instmore/news/news.css\"\r\n-->\r\n\r\n<div class=\"news-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a href=\"javascript:;\" class=\"header-btn header-pos-left\" ng-click=\"back()\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">最新动态</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div ui-view></div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/instmore/news/news.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
