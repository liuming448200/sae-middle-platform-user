var type = require('./type/type');
var detail = require('./detail/detail');

angular.module('eduApp.main.english', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('main.english.type', type)
    .state('main.english.detail', detail);
}]);

module.exports = {
	url: '/english',
	template: __inline('./english.html')
};
