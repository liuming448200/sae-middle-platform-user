module.exports = {
  url: '/me?from&source',
  template: __inline('./me.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('me.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
