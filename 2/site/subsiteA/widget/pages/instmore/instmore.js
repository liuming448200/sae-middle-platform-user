var news = require('./news/news');
var course = require('./course/course');
var product = require('./product/product');
var teachers = require('./teachers/teachers');
var environment = require('./environment/environment');
var instdetail = require('./instdetail/instdetail');
var brand = require('./brand/brand');

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
  template: __inline('./instmore.html')
};
