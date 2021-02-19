var current = require('./current/current');
var past = require('./past/past');
var select = require('./select/select');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/coupon', '/coupon/current');

  $stateProvider
    .state('coupon.current', current)
    .state('coupon.past', past)
    .state('coupon.select', select);
}]);

module.exports = {
  url: '/coupon',
  template: __inline('./coupon.html')
};
