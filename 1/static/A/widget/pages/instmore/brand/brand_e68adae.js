define('A:widget/pages/instmore/brand/brand', function(require, exports, module) {

  module.exports = {
    url: '/brand',
    template: "<!--\r\n    @require \"A:widget/pages/instmore/brand/brand.css\"\r\n-->\r\n\r\n<div class=\"brand-container\">\r\n\t<header class=\"header-container navbar-fixed-top\">\r\n    <a href=\"javascript:;\" class=\"header-btn header-pos-left\" ng-click=\"back()\">\r\n      <i class=\"fa fa-times\"></i>\r\n    </a>\r\n    <a class=\"header-btn header-pos-right\" href=\"javascript:;\" ng-click=\"share()\" ng-hide=\"weixinFlag\">\r\n      <i class=\"fa fa-share\"></i>\r\n    </a>\r\n    <div class=\"title\">品牌故事</div>\r\n  </header>\r\n  <div class=\"container\">\r\n  \t<article>\r\n      <div class=\"head\">\r\n        <h1 class=\"title\">纽约国际儿童俱乐部</h1>\r\n        <div class=\"info\">\r\n          <span class=\"time js-time\">NYC</span>\r\n        </div>\r\n      </div>\r\n      <div class=\"content\">\r\n        <div class=\"page js-page on\">\r\n          <div class=\"photo\">\r\n            <a href=\"javascript:;\">\r\n              <img class=\"img-responsive\" src=\"/static/A/images/default_0e3a6a2.jpg\" alt=\"纽约国际儿童俱乐部\">\r\n            </a>\r\n          </div>\r\n          <p>纽约国际儿童俱乐部(New York City Kids Club),起源于美国纽约，是经过美国权威幼儿教育机构 NAEYC (美国幼儿教育协会）认证的儿童早期教育品牌，致力于为全球0—12岁儿童提供高品质的早期教育核心课程和早期教育服务，拥有16年的品牌历史，2012年登陆中国，是国内唯一具有“儿童俱乐部”概念的高品质早期教育机构。</p>\r\n          <p>纽约国际儿童俱乐部，依托美国著名教育心理学家——霍华德•加德纳创立的“多元智能”经典教育理论，提供健身、音乐、艺术、球类运动、厨艺、街舞、芭蕾、戏剧表演8大类课程，同时提供丰富多样的俱乐部实践活动，为孩子的健康成长提供立体、充分、多样的锻炼机会和优质的早期教育生态环境，全面增强孩子的社会适应性，为他们将来的成功打下坚实的基础。</p>\r\n          <p>纽约国际儿童俱乐部,作为美国幼儿教育协会(NAEYC) 成员，是全球儿童运动技能、智力发展、社交能力、领导能力以及创新探索能力的领导者和先行者，代表着美国儿童早期教育行业的高品质标准，多次被知名媒体评为“五星级早教品牌”。</p>\r\n          <p>自2012年进入中国以来，纽约国际儿童俱乐部快速发展，短短四年时间，拥有会员近10万名，为推动中国儿童早期教育的发展做出了卓越贡献。未来，纽约国际儿童俱乐部还将计划在加拿大、西班牙等地开设新的儿童活动中心，将高品质的早教课程带给全世界的儿童，让更多的孩子享受到更好的早期教育。</p>\r\n        </div>\r\n      </div>\r\n    </article>\r\n  </div>\r\n</div>\r\n",
    controller: ['$scope', '$injector', function ($scope, $injector) {
    	require.async(['A:widget/pages/instmore/brand/brand.async'], function(ctrl) {
  			$injector.invoke(ctrl, this, {'$scope': $scope});
  		});
    }]
  };
  

});
