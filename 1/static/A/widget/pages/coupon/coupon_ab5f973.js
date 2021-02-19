define('A:widget/pages/coupon/coupon', function(require, exports, module) {

  var current = require('A:widget/pages/coupon/current/current');
  var past = require('A:widget/pages/coupon/past/past');
  var select = require('A:widget/pages/coupon/select/select');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/coupon', '/coupon/current');
  
    $stateProvider
      .state('coupon.current', current)
      .state('coupon.past', past)
      .state('coupon.select', select);
  }]);
  
  module.exports = {
    url: '/coupon',
    template: "<!--\r\n    @require \"A:widget/pages/coupon/coupon.css\"\r\n-->\r\n\r\n<div class=\"coupon-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
