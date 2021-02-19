define('A:widget/pages/setting/setting', function(require, exports, module) {

  var all = require('A:widget/pages/setting/all/all');
  var me = require('A:widget/pages/setting/me/me');
  var phone = require('A:widget/pages/setting/phone/phone');
  var password = require('A:widget/pages/setting/password/password');
  var suggestion = require('A:widget/pages/setting/suggestion/suggestion');
  var aboutus = require('A:widget/pages/setting/aboutus/aboutus');
  
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
    template: "<!--\r\n    @require \"A:widget/pages/setting/setting.css\"\r\n-->\r\n\r\n<div class=\"setting-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
