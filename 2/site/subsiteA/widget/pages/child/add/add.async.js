return ['$rootScope', '$scope', '$stateParams', '$state', '$filter', '$timeout', 'webservice', 'globals', 'uploadFileService', 'imgService', 
  function ($rootScope, $scope, $stateParams, $state, $filter, $timeout, webservice, globals, uploadFileService, imgService) {

  $rootScope.pageTitle = '添加孩子信息';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  var close;

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

  $scope.childInfo.current = $stateParams.current ? $stateParams.current : 0;
  if (0 == $scope.childInfo.current) {
    $scope.showCheckboxFlag = true;
  }

  if ('imgcrop' === from) {
    var imgFile = imgService.get();
    var filename = imgFile.filename;
    var file = imgFile.file;
    if (!!file) {
      $scope.childInfo.picname = filename;
      $scope.childInfo.head_portrait = file;
      $scope.head_portrait = webservice.downloadFile($scope.childInfo.head_portrait);
    }
  }

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

  $scope.getPic = function () {
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

  $scope.addChildInfoSubmit = function () {
    if ($scope.addChildInfoForm.nickname.$invalid) {
      if ($scope.addChildInfoForm.nickname.$error.required) {
        var tip = '孩子昵称不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addChildInfoForm.nickname.$error.maxlength) {
        var tip = '孩子昵称长度不能超过100个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if ($scope.addChildInfoForm.realname.$invalid) {
      if ($scope.addChildInfoForm.realname.$error.required) {
        var tip = '孩子姓名不能为空';
        $scope.$emit('TOAST', {msg: tip});
      } else if ($scope.addChildInfoForm.realname.$error.maxlength) {
        var tip = '孩子姓名长度不能超过50个字符';
        $scope.$emit('TOAST', {msg: tip});
      }

      return;
    }

    if (!$scope.childInfo.gender) {
      var tip = '孩子性别不能为空';
      $scope.$emit('TOAST', {msg: tip});

      return;
    }

    if ($scope.addChildInfoForm.birthday.$invalid) {
      if ($scope.addChildInfoForm.birthday.$error.required) {
        var tip = '孩子出生日期不能为空';
        $scope.$emit('TOAST', {msg: tip});
      }

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
      "info": info
    };

    $scope.$emit('BUSY');
    webservice.createChildInfoRow(data).then(function (res) {
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

  $scope.$on('$destroy', function () {
    if (angular.isDefined(close)) {
      $timeout.cancel(close);
      close = undefined;
    }
  });

  if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
