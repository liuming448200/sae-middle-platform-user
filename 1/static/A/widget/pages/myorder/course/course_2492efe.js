define('A:widget/pages/myorder/course/course', function(require, exports, module) {

  var list = require('A:widget/pages/myorder/course/list/list');
  var detail = require('A:widget/pages/myorder/course/detail/detail');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/myorder/course', '/myorder/course/list');
  
    $stateProvider
      .state('myorder.course.list', list)
      .state('myorder.course.detail', detail);
  }]);
  
  module.exports = {
    url: '/course',
    template: "<!--\r\n    @require \"A:widget/pages/myorder/course/course.css\"\r\n-->\r\n\r\n<div class=\"course-container\">\r\n\t<div class=\"ui-view\"></div>\r\n</div>\r\n"
  };
  

});
