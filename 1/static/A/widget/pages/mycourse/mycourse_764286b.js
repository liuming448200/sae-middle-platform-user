define('A:widget/pages/mycourse/mycourse', function(require, exports, module) {

  var overview = require('A:widget/pages/mycourse/overview/overview');
  var review = require('A:widget/pages/mycourse/review/review');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
  	$urlRouterProvider.when('/mycourse', '/mycourse/overview');
  
    $stateProvider
      .state('mycourse.overview', overview)
      .state('mycourse.review', review);
  }]);
  
  module.exports = {
    url: '/mycourse',
    template: "<!--\r\n    @require \"A:widget/pages/mycourse/mycourse.css\"\r\n-->\r\n\r\n<div class=\"mycourse-container\">\r\n  <div ui-view></div>\r\n</div>\r\n"
  };
  

});
