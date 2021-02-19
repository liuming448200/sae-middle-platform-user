return ['$scope', 'webservice', 'wordTypeService', 'globals', function ($scope, webservice, wordTypeService, globals) {

	$scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    pagesLength: 15,
    perPageOptions: [5, 10, 20, 30, 40, 50]
  };

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getList);

  function getList () {
  	var limit = $scope.paginationConf.itemsPerPage;
    var offset = ($scope.paginationConf.currentPage - 1) * limit;

    $scope.loading = true;
    $scope.failing = false;
    $scope.empty = false;
    webservice.getWordList(limit, offset).then(function (res) {
      $scope.loading = false;
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $scope.paginationConf.totalItems = res.data.total;
        $scope.list = res.data.list;
      } else if (globals.SPECIFIC_ERROR === status) {
        $scope.empty = true;
      } else {
        $scope.failing = true;
      }
    }, function (res) {
      $scope.loading = false;
      $scope.failing = true;
      var res = res;
    });
  }

  var limit = 999;
  var offset = 0;
  webservice.getWordCategoryList(limit, offset).then(function (res) {
    var status = res.status;
    if (globals.STATUS_OK === status) {
      var categories = res.data.list;
      wordTypeService.set(categories);
    } else {
      var tip = res.message;
      $scope.$emit('TOAST', {msg: tip});
    }
  }, function (res) {
    $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
    var res = res;
  });

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
