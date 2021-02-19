module.exports = {
  url: '/newphone',
  template: __inline('./newphone.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('newphone.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
