return ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

	var close;

	$scope.menus = [
		{
			id: 1,
			text: '讲故事',
			state: 'main.teach.story',
			active: false
		},
		{
			id: 2,
			text: '学英语',
			state: 'main.teach.english',
			active: false
		},
		{
			id: 3,
			text: '唱儿歌',
			state: 'main.teach.song',
			active: false
		}
	];

	for (var i = 0, len = $scope.menus.length; i < len; i++) {
    var menu = $scope.menus[i];
    if ($state.includes(menu.state)) {
    	menu.active = true;
    	break;
    }
  }

  if ('main.teach' === $state.current.name) {
    $scope.menus[0].active = true;
  }

  $scope.switchMenu = function (menu) {
  	if (!!menu.active) {
  		if ('main.teach.song' === menu.state) {
  			return;
  		} else if ('main.teach.english' === menu.state) {
  			if ('main.teach.english.type' === $state.current.name) {
  				return;
  			}
  		}
  	}

		close = $timeout(function () {
			for (var i = 0, len = $scope.menus.length; i < len; i++) {
				var item = $scope.menus[i];
				item.active = false;
				if (menu.id === item.id) {
					item.active = true;
				}
			}
			$state.go(menu.state);
		}, 10);
  };

  $scope.search = function () {
		$state.go('search', {from: $state.current.name});
	};

	$scope.discover = function () {
		$state.go('discover', {from: $state.current.name});
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
