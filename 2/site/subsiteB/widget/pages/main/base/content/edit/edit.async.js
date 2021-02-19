return ['$scope', '$stateParams', '$state', 'webservice', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, dialogService, globals) {

	var tid = $stateParams.tid || '';

	$scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getContentRow(tid).then(function (res) {
		$scope.loading = false;
    var status = res.status;
    if (globals.STATUS_OK === status) {
    	$scope.content = res.data;
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

	$scope.editContentSubmit = function () {
		var typename = $scope.content.typename;

		if (!typename) {
      var tip = '内容名称不能为空';
      $scope.$emit('TOAST', {msg: tip});
      return;
    } else if (typename.length > 10) {
      var tip = '内容名称长度不能超过10个字符';
      $scope.$emit('TOAST', {msg: tip});
      return;
    }

    var info = {
    	typename: typename
    };
    info = angular.toJson(info);

    var infoData = {
    	tid: tid,
      info: info
    };

    $scope.$emit('BUSY');
    webservice.updateContentRow(infoData).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goContentList, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	};

	$scope.deleteContent = function () {
		var typename = $scope.content.typename || '';
    var tip = '确定删除' + typename + '吗？';
    dialogService.dialog(tip, delContent);
	};

	function goContentList () {
		$state.go('main.base.content.list');
	}

	function delContent () {
		$scope.$emit('BUSY');
    webservice.deleteContentRow(tid).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.base.content.list');
      } else {
        var tip = res.message;
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
	}

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
