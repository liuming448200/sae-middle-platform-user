define('A:widget/pages/institution/institution.async', function(require, exports, module) {

  return ['$scope', function ($scope) {
  
  	$scope.closeModal = function () {
  		$('#menuModal').modal('hide');
  	};
  
  	if (!$scope.$$phase) {
      $scope.$apply();
    }
  }];
  

});
