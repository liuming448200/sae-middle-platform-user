return ['$rootScope', '$scope', '$stateParams', '$state', '$filter', '$timeout', 
  'webservice', 'globals', 'uploadFileService', 'imgService', 'dialogService', 
  function ($rootScope, $scope, $stateParams, $state, $filter, $timeout, 
    webservice, globals, uploadFileService, imgService, dialogService) {

  $rootScope.pageTitle = '完善孩子信息';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var close;

  var cid = $stateParams.cid;

  var from = $stateParams.from;

  $scope.showRelations = false;

  $scope.relations = [
    {
      id: '1',
      name: '妈妈'
    },
    {
      id: '2',
      name: '爸爸'
    },
    {
      id: '3',
      name: '爷爷'
    },
    {
      id: '4',
      name: '奶奶'
    },
    {
      id: '5',
      name: '姥姥'
    },
    {
      id: '6',
      name: '姥爷'
    }
  ];

  $scope.childInfo = {};

  $scope.loading = true;
  $scope.failing = false;
  $scope.empty = false;
  webservice.getChildInfoRow(cid).then(function (res) {
    $scope.loading = false;
    var status = res.status;
    var tip = res.message;
    if (globals.STATUS_OK === status) {
      $scope.childInfo = res.data;
      if ($scope.childInfo.head_portrait) {
        $scope.head_portrait = webservice.downloadFile($scope.childInfo.head_portrait);
      }
      var birth = $scope.childInfo.birthday;
      var arr = birth.split("-");
      var date = new Date(arr[0], parseInt(arr[1])-1, arr[2]);
      $scope.birthday = date;
      if (0 == $scope.childInfo.current) {
        $scope.showCheckboxFlag = true;
      }
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

  $scope.focusRelation = function () {
    var relationship = $scope.childInfo.relationship;
    if (!relationship) {
      $scope.showRelations = true;
    }
  };

  $scope.checkRelation = function () {
    var relationship = $scope.childInfo.relationship;
    if (!relationship) {
      $scope.showRelations = true;
    } else {
      $scope.showRelations = false;
    }
  };

  $scope.blurRelation = function () {
    close = $timeout(function () {
      $scope.showRelations = false;
    }, 300);
  };

  $scope.selectRelation = function (name) {
    $scope.childInfo.relationship = name;
  };

  $scope.getPic = function (pic) {

    $scope.myPic = pic;

    uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
      var name = $scope.myPic.name;
      imgService.set(name, res);
      $state.go('imgcrop', {from: $state.current.name});
    }, function (res) {
      var tip = '图片读取失败，请重试';
      $scope.$emit('TOAST', {msg: tip});
      var res = res;
    });
  };

  $scope.editChildInfoSubmit = function () {
    if (!$scope.childInfo.nickname) {
      var tip = '孩子昵称不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    } else if ($scope.childInfo.nickname.length > 100) {
      var tip = '孩子昵称长度不能超过100个字符';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.childInfo.realname) {
      var tip = '孩子姓名不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    } else if ($scope.childInfo.realname.length > 50) {
      var tip = '孩子姓名长度不能超过50个字符';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.childInfo.gender) {
      var tip = '孩子性别不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.birthday) {
      var tip = '孩子出生日期不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    var birthday = $filter('date')($scope.birthday, 'yyyy-MM-dd');
    var temp = new Date(parseInt(Date.parse(birthday), 10));
    if (temp > new Date()) {
      var tip = '孩子出生日期不能超过当前日期，请重新选择';
      $scope.$emit('TOAST', {msg: tip});
      
      return;
    }

    $scope.childInfo.birthday = birthday;

    if (!!$scope.childInfo.picname) {
      delete $scope.childInfo.picname;
    }

    var info = angular.toJson($scope.childInfo);

    var data = {
      "cid": cid,
      "info": info
    };

    $scope.$emit('BUSY');
    webservice.updateChildInfoRow(data).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        if (1 == $scope.childInfo.current) {
          $rootScope.user.child = $scope.childInfo;
        }
        $state.go('child.list');
      } else {
        $scope.$emit('TOAST', {msg: tip});
      }
    }, function (res) {
      $scope.$emit('NOTBUSY');
      $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
      var res = res;
    });
  };

  $scope.upload = function () {
    $('#inputpic').trigger('click');
  };

  $scope.deleteChild = function () {
    var childName = $scope.childInfo.realname || '';
    var tip = '确定删除' + childName + '相关信息吗？';
    dialogService.dialog(tip, delChild);
  };

  $scope.$on('$destroy', function () {
    if (angular.isDefined(close)) {
      $timeout.cancel(close);
      close = undefined;
    }
  });

  function delChild () {
    $scope.$emit('BUSY');
    webservice.deleteChildInfoRow(cid).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        $state.go('child.list');
      } else {
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
