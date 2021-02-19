define('A:widget/pages/myorder/myorder', function(require, exports, module) {

  var course = require('A:widget/pages/myorder/course/course');
  var activity = require('A:widget/pages/myorder/activity/activity');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/myorder', '/myorder/activity');
  
    $stateProvider
      .state('myorder.course', course)
      .state('myorder.activity', activity);
  }]);
  
  module.exports = {
  	url: '/myorder',
  	template: "<!--\r\n    @require \"A:widget/pages/myorder/myorder.css\"\r\n-->\r\n\r\n<div class=\"myorder-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
