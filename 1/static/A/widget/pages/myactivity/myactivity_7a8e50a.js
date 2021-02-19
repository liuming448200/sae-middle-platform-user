define('A:widget/pages/myactivity/myactivity', function(require, exports, module) {

  var overview = require('A:widget/pages/myactivity/overview/overview');
  var review = require('A:widget/pages/myactivity/review/review');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
  	$urlRouterProvider.when('/myactivity', '/myactivity/overview');
  
    $stateProvider
      .state('myactivity.overview', overview)
      .state('myactivity.review', review);
  }]);
  
  module.exports = {
    url: '/myactivity',
    template: "<!--\r\n    @require \"A:widget/pages/myactivity/myactivity.css\"\r\n-->\r\n\r\n<div class=\"myactivity-container\">\r\n  <div ui-view></div>\r\n</div>\r\n"
  };
  

});
