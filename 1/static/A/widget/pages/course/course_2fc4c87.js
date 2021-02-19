define('A:widget/pages/course/course', function(require, exports, module) {

  var week = require('A:widget/pages/course/week/week');
  var month = require('A:widget/pages/course/month/month');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/course', '/course/week');
  
    $stateProvider
      .state('course.week', week)
      .state('course.month', month);
  }]);
  
  module.exports = {
    url: '/course',
    template: "<!--\r\n    @require \"A:widget/pages/course/course.css\"\r\n-->\r\n\r\n<div class=\"course-detail-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"institution.course\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">课程详情</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <ul class=\"nav nav-tabs\">\r\n      <li ui-sref-active=\"active\">\r\n        <a ui-sref=\"course.week\">按周</a>\r\n      </li>\r\n      <li ui-sref-active=\"active\">\r\n        <a ui-sref=\"course.month\">按月</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"content-container\">\r\n      <div ui-view></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/course/course.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
