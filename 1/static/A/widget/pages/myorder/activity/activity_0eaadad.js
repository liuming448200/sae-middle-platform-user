define('A:widget/pages/myorder/activity/activity', function(require, exports, module) {

  var list = require('A:widget/pages/myorder/activity/list/list');
  var detail = require('A:widget/pages/myorder/activity/detail/detail');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/myorder/activity', '/myorder/activity/list');
  
    $stateProvider
      .state('myorder.activity.list', list)
      .state('myorder.activity.detail', detail);
  }]);
  
  module.exports = {
    url: '/activity',
    template: "<!--\r\n    @require \"A:widget/pages/myorder/activity/activity.css\"\r\n-->\r\n\r\n<div class=\"activity-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
