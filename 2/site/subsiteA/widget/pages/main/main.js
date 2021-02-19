var teach = require('./teach/teach');
var user = require('./user/user');
var institution = require('./institution/institution');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/main', '/main/teach');

  $stateProvider
    .state('main.teach', teach)
    .state('main.user', user)
    .state('main.institution', institution);
}]);

module.exports = {
  url: '/main',
  template: __inline('./main.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
  	require.async('main.async.js', function(ctrl) {
			$injector.invoke(ctrl, this, {'$scope': $scope});
		});
  }]
};
