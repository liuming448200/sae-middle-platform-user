return ['$scope', '$state', 'webservice', 'globals', 'usergroupListService', 
  function ($scope, $state, webservice, globals, usergroupListService) {

  var USER_STATUS = {
    ACTIVE: 0,
    FORBIDDEN: 1,
    FROZEN: 2
  };

  $scope.paginationConf = {
    currentPage: 1,
    itemsPerPage: 10,
    pagesLength: 15,
    perPageOptions: [5, 10, 20, 30, 40, 50]
  };

  $scope.goEdit = function (item) {
    $state.go('main.auth.user.edit', {uid: item.uid});
  };

  $scope.activate = function (item) {
    $scope.$emit('BUSY');
    webservice.setUserStatus(item.uid, USER_STATUS.ACTIVE).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        item.status = USER_STATUS.ACTIVE;
        $scope.$emit('TOAST', {msg: tip});
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.forbid = function (item) {
    $scope.$emit('BUSY');
    webservice.setUserStatus(item.uid, USER_STATUS.FORBIDDEN).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        item.status = USER_STATUS.FORBIDDEN;
        $scope.$emit('TOAST', {msg: tip});
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.frozen = function (item) {
    $scope.$emit('BUSY');
    webservice.setUserStatus(item.uid, USER_STATUS.FROZEN).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        item.status = USER_STATUS.FROZEN;
        $scope.$emit('TOAST', {msg: tip});
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getList);

  function getList () {
    var limit = $scope.paginationConf.itemsPerPage;
    var offset = ($scope.paginationConf.currentPage - 1) * limit;

    $scope.loading = true;
    $scope.failing = false;
    $scope.empty = false;
    webservice.getUserList(limit, offset).then(function (res) {
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
  webservice.getUsergroupList(limit, offset).then(function (res) {
    var status = res.status;
    if (globals.STATUS_OK === status) {
      var usergroups = res.data.list;
      usergroupListService.set(usergroups);
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
