module.exports = {
  url: '/verifycode?mobile',
  template: __inline('./verifycode.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('verifycode.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
