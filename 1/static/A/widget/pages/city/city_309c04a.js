define('A:widget/pages/city/city', function(require, exports, module) {

  module.exports = {
    url: '/city',
    template: "<!--\r\n    @require \"A:widget/pages/city/city.css\"\r\n-->\r\n\r\n<div class=\"city-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a class=\"header-btn header-pos-left\" ui-sref=\"main.institution\">\r\n      <i class=\"fa fa-chevron-left\"></i>\r\n    </a>\r\n    <div class=\"title\">选择城市</div>\r\n  </header>\r\n \t<ul tabindex=\"0\" class=\"ui-menu ui-widget ui-widget-content ui-autocomplete ui-front\">\r\n \t\t<li class=\"ui-autocomplete-type\">定位城市</li>\r\n \t\t<li class=\"ui-menu-item\">\r\n \t\t\t<a ui-sref=\"main.institution({city:'beijing', cityName:'北京'})\" tabindex=\"-1\" class=\"ui-menu-item-wrapper\">\r\n \t\t\t\t<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>\r\n \t\t\t\t<span>北京</span>\r\n \t\t\t</a>\r\n \t\t</li>\r\n \t\t<li class=\"ui-autocomplete-type\">全部城市</li>\r\n \t\t<li class=\"ui-menu-item\">\r\n \t\t\t<a ui-sref=\"main.institution({city:'beijing', cityName:'北京'})\" tabindex=\"-1\" class=\"ui-menu-item-wrapper\">\r\n \t\t\t\t<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>\r\n \t\t\t\t<span>北京</span>\r\n \t\t\t</a>\r\n \t\t</li>\r\n \t</ul>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/city/city.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
