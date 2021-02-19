var pointrule = require('./pointrule/pointrule');
var pointdetail = require('./pointdetail/pointdetail');
var availpoints = require('./availpoints/availpoints');
var memberlevel = require('./memberlevel/memberlevel');
var chargedetail = require('./chargedetail/chargedetail');
var chargerecord = require('./chargerecord/chargerecord');

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
	template: __inline('./score.html')
};
