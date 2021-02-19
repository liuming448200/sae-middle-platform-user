return ['$rootScope', '$scope', '$stateParams', '$state', '$filter', 'webservice', 'globals', 'uploadFileService', 'imgService', 
  function ($rootScope, $scope, $stateParams, $state, $filter, webservice, globals, uploadFileService, imgService) {

  $rootScope.pageTitle = '用户信息';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var from = $stateParams.from;
  if (!from) {
    window.history.back();
    return;
  } else if ('imgcrop' === from) {
    var source = $stateParams.source;
    if (!source) {
      window.history.back();
      return;
    }
  }

  var updateFlag = false;

  if ($rootScope.user) {
    $scope.userInfo = angular.copy($rootScope.user.extra);
  } else {
    $scope.userInfo = {};
  }
  
  if ($scope.userInfo.nickname) {
    var birthday = $scope.userInfo.birthday;
    var arr = birthday.split("-");
    var date = new Date(arr[0], parseInt(arr[1])-1, arr[2]);
    $scope.birthday = date;
    if ('imgcrop' === from) {
      var imgFile = imgService.get();
      var filename = imgFile.filename;
      var file = imgFile.file;
      if (!!file) {
        $scope.userInfo.picname = filename;
        $scope.userInfo.head_portrait = file;
        $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
      } else if ($scope.userInfo.head_portrait) {
        $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
      }
    } else if ($scope.userInfo.head_portrait) {
      $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
    }
    updateFlag = true;
  } else {
    $scope.loading = true;
    $scope.failing = false;
    $scope.empty = false;
    webservice.getUserInfoMoreRow().then(function (res) {
      $scope.loading = false;
      var status = res.status;
      var tip = res.message;
      if (globals.STATUS_OK === status) {
        $scope.userInfo = res.data;
        $rootScope.user.extra = $scope.userInfo;
        if ($scope.userInfo.head_portrait) {
          $scope.head_portrait = webservice.downloadFile($scope.userInfo.head_portrait);
        }
        var birthday = $scope.userInfo.birthday;
        var arr = birthday.split("-");
        var date = new Date(arr[0], parseInt(arr[1])-1, arr[2]);
        $scope.birthday = date;
        updateFlag = true;
      } else if (globals.SPECIFIC_ERROR === status) {
        $scope.userInfo.picname = '用户头像';
        $scope.userInfo.head_portrait = '';
      } else {
        $scope.failing = true;
      }
    }, function (res) {
      $scope.loading = false;
      $scope.failing = true;
      var res = res;
    });
  }

  $scope.getPic = function (pic) {
    
    $scope.myPic = pic;

    uploadFileService.readAsDataUrl($scope.myPic, $scope).then(function (res) {
      var name = $scope.myPic.name;
      imgService.set(name, res);
      $state.go('imgcrop', {from: $state.current.name, source: from});
    }, function (res) {
      var tip = '图片读取失败，请重试';
      $scope.$emit('TOAST', {msg: tip});
      var res = res;
    });
  };

  $scope.editUserInfoSubmit = function () {
    if (!$scope.userInfo.nickname) {
      var tip = '昵称不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    } else if ($scope.userInfo.nickname.length > 100) {
      var tip = '昵称长度不能超过100个字符';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.userInfo.realname) {
      var tip = '姓名不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    } else if ($scope.userInfo.realname.length > 50) {
      var tip = '姓名长度不能超过50个字符';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.userInfo.gender) {
      var tip = '性别不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!$scope.birthday) {
      var tip = '出生日期不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    var birthday = $filter('date')($scope.birthday, 'yyyy-MM-dd');
    var temp = new Date(parseInt(Date.parse(birthday), 10));
    if (temp > new Date()) {
      var tip = '出生日期不能超过当前日期，请重新选择';
      $scope.$emit('TOAST', {msg: tip});
      
      return;
    }

    $scope.userInfo.birthday = birthday;

    if (!$scope.userInfo.address) {
      var tip = '联系地址不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    } else if ($scope.userInfo.address.length > 500) {
      var tip = '联系地址长度不能超过500个字符';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if (!!$scope.userInfo.picname) {
      delete $scope.userInfo.picname;
    }

    var info = angular.toJson($scope.userInfo);

    var data = {
      "info": info
    };

    $scope.$emit('BUSY');

    if (updateFlag) {
      webservice.updateUserInfoMoreRow(data).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          $rootScope.user.extra = $scope.userInfo;
          if ("imgcrop" === from) {
            $state.go(source);
          } else {
            $state.go(from);
          }
        } else {
          $scope.$emit('TOAST', {msg: tip});
        }
      }, function (res) {
        $scope.$emit('NOTBUSY');
        $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
        var res = res;
      });
    } else {
      webservice.createUserInfoMoreRow(data).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          $rootScope.user.extra = $scope.userInfo;
          if ("imgcrop" === from) {
            $state.go(source);
          } else {
            $state.go(from);
          }
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

  $scope.changeBirthday = function (e) {
    var birthday = $('#birthday').val();
    var arr = birthday.split("-");
    var date = new Date(arr[0], parseInt(arr[1])-1, arr[2]);
    $scope.birthday = date;
  };

  $scope.upload = function () {
    $('#inputpic').trigger('click');
  };

  $scope.back = function () {
    if ("imgcrop" === from) {
      $state.go(source);
    } else {
      $state.go(from);
    }
  };

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];