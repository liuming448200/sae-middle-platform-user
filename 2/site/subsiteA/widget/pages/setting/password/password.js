module.exports = {
  url: '/password',
  template: __inline('./password.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('password.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
