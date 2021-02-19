define('A:widget/pages/setting/all/all', function(require, exports, module) {

  module.exports = {
    url: '/all',
    template: "<!--\r\n    @require \"A:widget/pages/setting/all/all.css\"\r\n-->\r\n\r\n<div class=\"all-container\">\r\n  <header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" href=\"javascript:;\" ui-sref=\"main.user\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">设置</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div class=\"content-container\">\r\n      <a href=\"javascript:;\" ng-click=\"go()\" class=\"list-group-item\" ng-show=\"isLogin\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        个人资料\r\n      </a>\r\n      <a href=\"javascript:;\" ui-sref=\"score.memberlevel\" class=\"list-group-item\" ng-show=\"isLogin\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        会员级别\r\n      </a>\r\n      <a href=\"javascript:;\" ui-sref=\"setting.phone\" class=\"list-group-item\" ng-show=\"isLogin\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        手机号码\r\n      </a>\r\n      <a href=\"javascript:;\" ui-sref=\"setting.password\" class=\"list-group-item\" ng-show=\"isLogin\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        修改密码\r\n      </a>\r\n      <a href=\"javascript:;\" ui-sref=\"setting.suggestion\" class=\"list-group-item\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        意见反馈\r\n      </a>\r\n      <a href=\"javascript:;\" ui-sref=\"setting.aboutus\" class=\"list-group-item\">\r\n        <span class=\"badge\" style=\"background-color: #5cb85c;\"><i class=\"fa fa-arrow-circle-right\"></i></span>\r\n        关于我们\r\n      </a>\r\n      <div class=\"exit-line\" ng-show=\"isLogin\">\r\n        <button type=\"button\" class=\"btn btn-danger\" ng-click=\"exit()\">退出登录</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
      require.async(['A:widget/pages/setting/all/all.async'], function(ctrl) {
        $injector.invoke(ctrl, this, {'$scope': $scope});
      });
    }]
  };
  

});
