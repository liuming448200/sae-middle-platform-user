module.exports = {
  url: '/list',
  template: __inline('./list.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('list.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
