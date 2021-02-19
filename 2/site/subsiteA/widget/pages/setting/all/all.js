module.exports = {
  url: '/all',
  template: __inline('./all.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('all.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
