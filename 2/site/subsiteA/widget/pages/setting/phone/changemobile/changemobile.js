module.exports = {
  url: '/changemobile?mobile',
  template: __inline('./changemobile.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('changemobile.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
