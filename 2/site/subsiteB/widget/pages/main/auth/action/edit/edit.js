module.exports = {
  url: '/edit/:action_id',
  template: __inline('./edit.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('edit.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
