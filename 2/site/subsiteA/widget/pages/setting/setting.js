var all = require('./all/all');
var me = require('./me/me');
var phone = require('./phone/phone');
var password = require('./password/password');
var suggestion = require('./suggestion/suggestion');
var aboutus = require('./aboutus/aboutus');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/setting', '/setting/all');

  $stateProvider
    .state('setting.all', all)
    .state('setting.me', me)
    .state('setting.phone', phone)
    .state('setting.password', password)
    .state('setting.suggestion', suggestion)
    .state('setting.aboutus', aboutus);
}]);

module.exports = {
  url: '/setting',
  template: __inline('./setting.html')
};
