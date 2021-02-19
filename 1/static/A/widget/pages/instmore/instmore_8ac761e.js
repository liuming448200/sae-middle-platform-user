define('A:widget/pages/instmore/instmore', function(require, exports, module) {

  var news = require('A:widget/pages/instmore/news/news');
  var course = require('A:widget/pages/instmore/course/course');
  var product = require('A:widget/pages/instmore/product/product');
  var teachers = require('A:widget/pages/instmore/teachers/teachers');
  var environment = require('A:widget/pages/instmore/environment/environment');
  var instdetail = require('A:widget/pages/instmore/instdetail/instdetail');
  var brand = require('A:widget/pages/instmore/brand/brand');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('instmore.news', news)
      .state('instmore.course', course)
      .state('instmore.product', product)
      .state('instmore.teachers', teachers)
      .state('instmore.environment', environment)
      .state('instmore.instdetail', instdetail)
      .state('instmore.brand', brand);
  }]);
  
  module.exports = {
    url: '/instmore?from',
    template: "<!--\r\n    @require \"A:widget/pages/instmore/instmore.css\"\r\n-->\r\n\r\n<div class=\"instmore-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
