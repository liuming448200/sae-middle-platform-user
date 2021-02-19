return ['$scope', '$stateParams', '$state', 'webservice', 'storyService', 'dialogService', 'globals', 
  function ($scope, $stateParams, $state, webservice, storyService, dialogService, globals) {

	$scope.story_id = $stateParams.story_id || '';

  $scope.story = storyService.get();

  $scope.submit = function () {
    var storyName = $scope.story.name;
    var storyContent = $scope.story.content;
    var storyImplication = $scope.story.implication;
    var storyPic = $scope.story.pic;

    var info = {
      name: storyName,
      content: storyContent,
      implication: storyImplication,
      pic: storyPic
    };
    info = angular.toJson(info);

    if ($scope.story_id) {
      var infoData = {
        story_id: $scope.story_id,
        info: info
      };

      $scope.$emit('BUSY');
      webservice.updateStoryRow(infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goStoryList, true);
        } else {
          $scope.$emit('TOAST', {msg: tip});
        }
      }, function (res) {
        $scope.$emit('NOTBUSY');
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
    } else {
      var infoData = {
        info: info
      };

      $scope.$emit('BUSY');
      webservice.createStoryRow(infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goStoryList, true);
        } else {
          $scope.$emit('TOAST', {msg: tip});
        }
      }, function (res) {
        $scope.$emit('NOTBUSY');
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
    }
  };

	$scope.deleteStory = function () {
    var storyName = $scope.story.name || '';
    var tip = '确定删除' + storyName + '吗？';
    dialogService.dialog(tip, delStory);
	};

  $scope.back = function () {
    if ($scope.story_id) {
      $state.go('main.story.edit', {
        story_id: $scope.story_id,
        back: 1
      });
    } else {
      $state.go('main.story.add', {
        back: 1
      });
    }
  };

  function goStoryList () {
    $state.go('main.story.list');
  }

  function delStory () {
    $scope.$emit('BUSY');
    webservice.deleteStoryRow($scope.story_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.story.list');
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
