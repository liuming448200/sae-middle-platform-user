define('A:widget/pages/setting/phone/phone', function(require, exports, module) {

  var current = require('A:widget/pages/setting/phone/current/current');
  var newphone = require('A:widget/pages/setting/phone/newphone/newphone');
  var verifycode = require('A:widget/pages/setting/phone/verifycode/verifycode');
  var changemobile = require('A:widget/pages/setting/phone/changemobile/changemobile');
  
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
    template: "<!--\r\n    @require \"A:widget/pages/setting/phone/phone.css\"\r\n-->\r\n\r\n<div class=\"phone-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
