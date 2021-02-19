return ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {

	var close;

	$scope.menus = [
		{
			id: 1,
			icon: 'fa-book',
			text: '教孩子',
			state: 'main.teach',
			active: false
		},
		{
			id: 2,
			icon: 'fa-university',
			text: '找学校',
			state: 'main.institution',
			active: false
		},
		{
			id: 3,
			icon: 'fa-tree',
			text: '成长树',
			state: 'main.user',
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

  if ('main' === $state.current.name) {
    $scope.menus[0].active = true;
  }

  $scope.switchMenu = function (menu) {
  	if (!!menu.active) {
  		return;
  	}

  	$(window).scrollTop(0);
  	
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
