module.exports = {
  url: '/suggestion',
  template: __inline('./suggestion.html'),
  controller: ['$scope', '$injector', function ($scope, $injector) {
    require.async('suggestion.async.js', function(ctrl) {
      $injector.invoke(ctrl, this, {'$scope': $scope});
    });
  }]
};
