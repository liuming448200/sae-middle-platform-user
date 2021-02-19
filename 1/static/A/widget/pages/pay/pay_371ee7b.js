define('A:widget/pages/pay/pay', function(require, exports, module) {

  var success = require('A:widget/pages/pay/success/success');
  var failure = require('A:widget/pages/pay/failure/failure');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('pay.success', success)
      .state('pay.failure', failure);
  }]);
  
  module.exports = {
  	url: '/pay?from',
  	template: "<!--\r\n    @require \"A:widget/pages/pay/pay.css\"\r\n-->\r\n\r\n<div class=\"pay-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ng-click=\"back()\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <div class=\"title\">支付结果</div>\r\n  </header>\r\n  <div class=\"container\">\r\n\t\t<div ui-view></div>\r\n\t</div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/pay/pay.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
