define('A:widget/pages/score/score', function(require, exports, module) {

  var pointrule = require('A:widget/pages/score/pointrule/pointrule');
  var pointdetail = require('A:widget/pages/score/pointdetail/pointdetail');
  var availpoints = require('A:widget/pages/score/availpoints/availpoints');
  var memberlevel = require('A:widget/pages/score/memberlevel/memberlevel');
  var chargedetail = require('A:widget/pages/score/chargedetail/chargedetail');
  var chargerecord = require('A:widget/pages/score/chargerecord/chargerecord');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $stateProvider
      .state('score.pointrule', pointrule)
      .state('score.pointdetail', pointdetail)
      .state('score.availpoints', availpoints)
      .state('score.memberlevel', memberlevel)
      .state('score.chargedetail', chargedetail)
      .state('score.chargerecord', chargerecord);
  }]);
  
  module.exports = {
  	url: '/score',
  	template: "<!--\r\n    @require \"A:widget/pages/score/score.css\"\r\n-->\r\n\r\n<div class=\"score-container\">\r\n\t<div ui-view></div>\r\n</div>\r\n"
  };
  

});
