define('A:widget/pages/main/teach/english/english', function(require, exports, module) {

  var type = require('A:widget/pages/main/teach/english/type/type');
  var detail = require('A:widget/pages/main/teach/english/detail/detail');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/main/teach/english', '/main/teach/english/type');
  
    $stateProvider
      .state('main.teach.english.type', type)
      .state('main.teach.english.detail', detail);
  }]);
  
  module.exports = {
    url: '/english',
    template: "<!--\r\n    @require \"A:widget/pages/main/teach/english/english.css\"\r\n-->\r\n\r\n<div class=\"english-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
