return ['$rootScope', '$scope', '$state', 'webservice', 'globals', 
  function ($rootScope, $scope, $state, webservice, globals) {

  $scope.togglesong = false;
  $scope.toggleenglish = false;
  $scope.toggleauth = false;
  $scope.togglebase = false;
  $scope.toggletrade = false;
  $scope.togglefinance = false;
  $scope.togglecomment = false;
  $scope.togglemessage = false;

  $scope.exit = function () {
    $scope.$emit("BUSY");
    webservice.logout().then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        $rootScope.user = undefined;
        $state.go('login');
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.toggleSong = function () {
    $scope.togglesong = !$scope.togglesong;
  };

  $scope.toggleEnglish = function () {
    $scope.toggleenglish = !$scope.toggleenglish;
  };

  $scope.toggleAuth = function () {
    $scope.toggleauth = !$scope.toggleauth;
  };

  $scope.toggleBase = function () {
    $scope.togglebase = !$scope.togglebase;
  };

  $scope.toggleTrade = function () {
    $scope.toggletrade = !$scope.toggletrade;
  };

  $scope.toggleFinance = function () {
    $scope.togglefinance = !$scope.togglefinance;
  };

  $scope.toggleComment = function () {
    $scope.togglecomment = !$scope.togglecomment;
  };

  $scope.toggleMessage = function () {
    $scope.togglemessage = !$scope.togglemessage;
  };

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
