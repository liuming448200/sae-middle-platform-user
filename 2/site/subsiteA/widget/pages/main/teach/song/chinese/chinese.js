module.exports = {
  url: '/chinese',
  template: __inline('./chinese.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('chinese.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
