define('A:widget/pages/child/child', function(require, exports, module) {

  var list = require('A:widget/pages/child/list/list');
  var add = require('A:widget/pages/child/add/add');
  var edit = require('A:widget/pages/child/edit/edit');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/child', '/child/list');
  
    $stateProvider
      .state('child.list', list)
      .state('child.add', add)
      .state('child.edit', edit);
  }]);
  
  module.exports = {
    url: '/child',
    template: "<!--\r\n    @require \"A:widget/pages/child/child.css\"\r\n-->\r\n\r\n<div class=\"child-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
