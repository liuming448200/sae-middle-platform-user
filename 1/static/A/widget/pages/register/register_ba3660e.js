define('A:widget/pages/register/register', function(require, exports, module) {

  var first = require('A:widget/pages/register/first/first');
  var second = require('A:widget/pages/register/second/second');
  var third = require('A:widget/pages/register/third/third');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/register', '/register/first');
  
    $stateProvider
      .state('register.first', first)
      .state('register.second', second)
      .state('register.third', third);
  }]);
  
  module.exports = {
    url: '/register',
    template: "<!--\r\n    @require \"A:widget/pages/register/register.css\"\r\n-->\r\n\r\n<div class=\"register-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n",
    controller: ['$rootScope', 'globals', function ($rootScope, globals) {
    	$rootScope.pageTitle = '用户注册';
      $rootScope.pageImage = globals.LOGO_IMAGE;
    }]
  };
  

});
