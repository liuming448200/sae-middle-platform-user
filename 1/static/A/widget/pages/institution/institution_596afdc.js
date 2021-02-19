define('A:widget/pages/institution/institution', function(require, exports, module) {

  var course = require('A:widget/pages/institution/course/course');
  var activity = require('A:widget/pages/institution/activity/activity');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.when('/institution', '/institution/course');
  
    $stateProvider
      .state('institution.course', course)
      .state('institution.activity', activity);
  }]);
  
  module.exports = {
    url: '/institution',
    template: "<!--\r\n    @require \"A:widget/pages/institution/institution.css\"\r\n-->\r\n\r\n<div class=\"institution-detail-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"main.institution\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" style=\"color:red;\" href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#menuModal\">\r\n      <i class=\"fa fa-bars\" aria-hidden=\"true\"></i>\r\n    </a>\r\n    <div class=\"title\">纽约国际儿童俱乐部西红门鸿坤中心</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <ul class=\"nav nav-tabs\">\r\n      <li ui-sref-active=\"active\">\r\n        <a ui-sref=\"institution.course\">课程体系</a>\r\n      </li>\r\n      <li ui-sref-active=\"active\">\r\n        <a ui-sref=\"institution.activity\">亲子活动</a>\r\n      </li>\r\n    </ul>\r\n  \t<div class=\"content-container\">\r\n      <div ui-view></div>\r\n    </div>\r\n  </div>\r\n  <div class=\"modal fade\" id=\"menuModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n      <ul class=\"sidebar\">\r\n        <li>\r\n          <a ui-sref=\"instmore.news({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-newspaper-o\" aria-hidden=\"true\"></i>\r\n            <h4>最新动态</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.course({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-life-ring\" aria-hidden=\"true\"></i>\r\n            <h4>课程介绍</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.product({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i>\r\n            <h4>购买课程</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.teachers({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-users\" aria-hidden=\"true\"></i>\r\n            <h4>师资力量</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.environment({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-picture-o\" aria-hidden=\"true\"></i>\r\n            <h4>教学环境</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.instdetail({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-film\" aria-hidden=\"true\"></i>\r\n            <h4>学校详情</h4>\r\n          </a>\r\n        </li>\r\n        <li>\r\n          <a ui-sref=\"instmore.brand({from:$state.current.name})\" ng-click=\"closeModal()\">\r\n            <i class=\"fa fa-certificate\" aria-hidden=\"true\"></i>\r\n            <h4>品牌故事</h4>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/institution/institution.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
