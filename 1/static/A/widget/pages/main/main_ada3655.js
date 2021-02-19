define('A:widget/pages/main/main', function(require, exports, module) {

  var teach = require('A:widget/pages/main/teach/teach');
  var user = require('A:widget/pages/main/user/user');
  var institution = require('A:widget/pages/main/institution/institution');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/main', '/main/teach');
  
    $stateProvider
      .state('main.teach', teach)
      .state('main.user', user)
      .state('main.institution', institution);
  }]);
  
  module.exports = {
    url: '/main',
    template: "<!--\r\n    @require \"A:widget/pages/main/main.css\"\r\n-->\r\n\r\n<div class=\"main-container\">\r\n\t<div ui-view></div>\r\n\t<!--\n    @require \"A:widget/partial/footer/footer.less\"\n-->\n\n<footer class=\"footer-container\">\n\t<div class=\"row\">\n\t  <div class=\"col-xs-4\">\n\t    <a ui-sref=\"main.teach\" ui-sref-active=\"active\">\n\t      <i class=\"fa fa-book\"></i>\n\t      <div class=\"menu\">教孩子</div>\n\t    </a>\n\t  </div>\n\t  <div class=\"col-xs-4\">\n\t    <a ui-sref=\"main.institution\" ui-sref-active=\"active\">\n\t      <i class=\"fa fa-university\"></i>\n\t      <div class=\"menu\">找学校</div>\n\t    </a>\n\t  </div>\n\t  <div class=\"col-xs-4\">\n\t    <a ui-sref=\"main.user\" ui-sref-active=\"active\">\n\t      <i class=\"fa fa-tree\"></i>\n\t      <div class=\"menu\">成长树</div>\n\t    </a>\n\t  </div>\n  </div>\n</footer>\n\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/main/main.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
