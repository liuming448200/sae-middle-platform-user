var list = require('./list/list');
var detail = require('./detail/detail');

angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/myorder/course', '/myorder/course/list');

  $stateProvider
    .state('myorder.course.list', list)
    .state('myorder.course.detail', detail);
}]);

module.exports = {
  url: '/course',
  template: __inline('./course.html')
};
