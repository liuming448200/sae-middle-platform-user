return ['$scope', '$stateParams', '$state', 'webservice', 'songService', 'dialogService', 'globals', 
	function ($scope, $stateParams, $state, webservice, songService, dialogService, globals) {

	$scope.song_id = $stateParams.song_id || '';

	$scope.song = songService.get();
  var items = [];
  items.push($scope.song.song);
  $scope.items = items;

  var language = 'chinese';

	$scope.submit = function () {
		var songName = $scope.song.name;
		var songContent = $scope.song.content;
		var songSong = $scope.song.song;
		var songPic = $scope.song.pic;

		var info = {
      name: songName,
      content: songContent,
      song: songSong,
      pic: songPic
    };
    info = angular.toJson(info);

    if ($scope.song_id) {
    	var infoData = {
        song_id: $scope.song_id,
        info: info
      };

      $scope.$emit('BUSY');
      webservice.updateSongRow(language, infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goSongList, true);
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
      webservice.createSongRow(language, infoData).then(function (res) {
        $scope.$emit('NOTBUSY');
        var status = res.status;
        var tip = res.message;
        if (globals.STATUS_OK === status) {
          dialogService.dialog(tip, goSongList, true);
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

	$scope.deleteSong = function () {
    var songName = $scope.song.name || '';
    var tip = '确定删除' + songName + '吗？';
    dialogService.dialog(tip, delSong);
	};

	$scope.back = function () {
    if ($scope.song_id) {
      $state.go('main.song.chinese.edit', {
        song_id: $scope.song_id,
        back: 1
      });
    } else {
      $state.go('main.song.chinese.add', {
        back: 1
      });
    }
  };

  function goSongList () {
    $state.go('main.song.chinese.list');
  }

  function delSong () {
  	$scope.$emit('BUSY');
    webservice.deleteSongRow(language, $scope.song_id).then(function (res) {
      $scope.$emit('NOTBUSY');
      var status = res.status;
      if (globals.STATUS_OK === status) {
        $state.go('main.song.chinese.list');
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
