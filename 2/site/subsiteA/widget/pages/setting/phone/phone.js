var current = require('./current/current');
var newphone = require('./newphone/newphone');
var verifycode = require('./verifycode/verifycode');
var changemobile = require('./changemobile/changemobile');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/setting/phone', '/setting/phone/current');

  $stateProvider
    .state('setting.phone.current', current)
    .state('setting.phone.newphone', newphone)
    .state('setting.phone.verifycode', verifycode)
    .state('setting.phone.changemobile', changemobile);
}]);

module.exports = {
  url: '/phone',
  template: __inline('./phone.html')
};
