define('A:widget/pages/discover/discover', function(require, exports, module) {

  var list = require('A:widget/pages/discover/list/list');
  var detail = require('A:widget/pages/discover/detail/detail');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/discover?from', '/discover/list?from');
  
    $stateProvider
      .state('discover.list', list)
      .state('discover.detail', detail);
  }]);
  
  module.exports = {
    url: '/discover?from',
    template: "<!--\r\n    @require \"A:widget/pages/discover/discover.css\"\r\n-->\r\n\r\n<div class=\"discover-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ng-click=\"back()\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">发现</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<div ui-view></div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/discover/discover.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
