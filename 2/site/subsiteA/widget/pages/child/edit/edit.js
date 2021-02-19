module.exports = {
  url: '/edit/:cid?from',
  template: __inline('./edit.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('edit.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
