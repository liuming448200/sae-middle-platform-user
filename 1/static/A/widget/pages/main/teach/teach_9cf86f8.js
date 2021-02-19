define('A:widget/pages/main/teach/teach', function(require, exports, module) {

  var story = require('A:widget/pages/main/teach/story/story');
  var english = require('A:widget/pages/main/teach/english/english');
  var song = require('A:widget/pages/main/teach/song/song');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/main/teach', '/main/teach/story');
  
    $stateProvider
      .state('main.teach.story', story)
      .state('main.teach.english', english)
      .state('main.teach.song', song);
  }]);
  
  module.exports = {
    url: '/teach',
    template: "<!--\r\n    @require \"A:widget/pages/main/teach/teach.css\"\r\n-->\r\n\r\n<div class=\"teach-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" style=\"color:red;\" href=\"javascript:;\" ng-click=\"discover()\">\r\n      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"search()\">\r\n      <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\r\n    </a>\r\n    <div class=\"nav-container\">\r\n      <ul class=\"nav navbar-nav\">\r\n        <li ng-class=\"menu.active ? 'active': ''\" ng-repeat=\"menu in menus\">\r\n          <a href=\"javascript:;\" ng-click=\"switchMenu(menu)\">{{menu.text}}</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </header>\r\n  <div ui-view></div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/main/teach/teach.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  
  

});
