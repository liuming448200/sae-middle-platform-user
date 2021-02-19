return ['$rootScope', '$scope', '$state', 'webservice', 'dialogService', 'globals', 
  function ($rootScope, $scope, $state, webservice, dialogService, globals) {

  $rootScope.pageTitle = '欢迎吐槽';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  $scope.suggestionSubmit = function () {
    if ($scope.suggestionForm.content.$invalid) {
      if ($scope.suggestionForm.content.$error.required) {
        var tip = '建议内容不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.suggestionForm.content.$error.maxlength) {
        var tip = '建议内容长度不能超过1000个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.suggestionForm.contact.$invalid) {
      if ($scope.suggestionForm.contact.$error.required) {
        var tip = '联系方式不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.suggestionForm.contact.$error.maxlength) {
        var tip = '联系方式长度不能超过100个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    var content = $scope.content;
    var contact = $scope.contact;

    $scope.$emit("BUSY");
    webservice.createSuggestionRow(content, contact).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        dialogService.dialog(tip, goSetting, true);
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  function goSetting () {
    $state.go('setting');
  }

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
