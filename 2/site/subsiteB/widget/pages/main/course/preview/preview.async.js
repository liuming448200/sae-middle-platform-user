return ['$scope', function ($scope) {
  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
