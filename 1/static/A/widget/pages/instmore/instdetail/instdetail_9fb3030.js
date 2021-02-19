define('A:widget/pages/instmore/instdetail/instdetail', function(require, exports, module) {

  module.exports = {
    url: '/instdetail',
    template: "<!--\r\n    @require \"A:widget/pages/instmore/instdetail/instdetail.css\"\r\n-->\r\n\r\n<div class=\"instdetail-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a href=\"javascript:;\" class=\"header-btn header-pos-left\" ng-click=\"back()\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">学校详情</div>\r\n  </header>\r\n  <div class=\"container\">\r\n    <div id=\"myCarousel\" class=\"carousel slide\">\r\n      <ol class=\"carousel-indicators\">\r\n        <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\r\n        <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\r\n        <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\r\n      </ol>\r\n      <div class=\"carousel-inner\">\r\n        <div class=\"item active\">\r\n          <img src=\"/static/A/images/default_0e3a6a2.jpg\" alt=\"轮播图1\">\r\n        </div>\r\n        <div class=\"item\">\r\n          <img src=\"/static/A/images/default_0e3a6a2.jpg\" alt=\"轮播图2\">\r\n        </div>\r\n        <div class=\"item\">\r\n          <img src=\"/static/A/images/default_0e3a6a2.jpg\" alt=\"轮播图3\">\r\n        </div>\r\n      </div>\r\n      <a class=\"carousel-control left\" href=\"javascript:;\" data-target=\"#myCarousel\" data-slide=\"prev\">&lsaquo;</a>\r\n      <a class=\"carousel-control right\" href=\"javascript:;\" data-target=\"#myCarousel\" data-slide=\"next\">&rsaquo;</a>\r\n    </div>\r\n    <div class=\"thumbnail\">\r\n      <div class=\"caption\">\r\n        <h3>纽约国际儿童俱乐部西红门鸿坤中心</h3>\r\n        <div class=\"service\">\r\n          <span class=\"label label-primary\">早教</span>\r\n          <span class=\"label label-info\">英语培训</span>\r\n          <span class=\"label label-warning\">绘本阅读</span>\r\n          <span class=\"label label-danger\">托管</span>\r\n        </div>\r\n        <p>营业时间：8:00-21:00</p>\r\n        <p>开业时间：2016-06-16</p>\r\n      </div>\r\n    </div>\r\n    <div class=\"more-info\">\r\n      <ul>\r\n        <a class=\"list-group-item\" href=\"tel:01012345678\">\r\n          <table>\r\n            <tr>\r\n              <td>电话：010-12345678</td>\r\n              <td><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></td>\r\n            </tr>\r\n          </table>\r\n        </a>\r\n        <a class=\"list-group-item\" href=\"javascript:;\">\r\n          <table>\r\n            <tr>\r\n              <td>地址：北京市大兴区西红门鸿坤购物中心三层</td>\r\n              <td><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></td>\r\n            </tr>\r\n          </table>\r\n        </a>\r\n      </ul>\r\n    </div>\r\n  \t<article>\r\n      <div class=\"content\">\r\n        <div class=\"page js-page on\">\r\n          <p>纽约国际儿童俱乐部（New York Kids Club）是美国早期最科学、最专业、最权威的儿童早期教育品牌之一，美国儿童早期教育协会（NAEYC）成员，代表了美国儿童早期教育行业的最高水平。</p>\r\n        </div>\r\n      </div>\r\n    </article>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/instmore/instdetail/instdetail.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
