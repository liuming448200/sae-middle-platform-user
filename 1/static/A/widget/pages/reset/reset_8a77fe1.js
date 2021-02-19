define('A:widget/pages/reset/reset', function(require, exports, module) {

  var first = require('A:widget/pages/reset/first/first');
  var second = require('A:widget/pages/reset/second/second');
  var third = require('A:widget/pages/reset/third/third');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/reset', '/reset/first');
  
    $stateProvider
      .state('reset.first', first)
      .state('reset.second', second)
      .state('reset.third', third);
  }]);
  
  module.exports = {
    url: '/reset',
    template: "<!--\r\n    @require \"A:widget/pages/reset/reset.css\"\r\n-->\r\n\r\n<div class=\"reset-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n",
    controller: ['$rootScope', 'globals', function ($rootScope, globals) {
    	$rootScope.pageTitle = '重置密码';
      $rootScope.pageImage = globals.LOGO_IMAGE;
    }]
  };
  

});
