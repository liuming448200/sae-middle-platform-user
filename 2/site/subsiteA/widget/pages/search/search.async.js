return ['$rootScope', '$scope', '$stateParams', '$state', '$cookies', 'webservice', 'globals', 
	function ($rootScope, $scope, $stateParams, $state, $cookies, webservice, globals) {

	$rootScope.pageTitle = '搜索精彩的内容';
	$rootScope.pageImage = globals.LOGO_IMAGE;

	var teachFlag = false, institutionFlag = false;

	var searchHistory;

	var from = $stateParams.from;
	if (from.indexOf('main.teach') > -1) {
		$scope.searchTips = '请输入故事名、单词或者歌名等';
		teachFlag = true;
	} else if (from.indexOf('main.institution') > -1) {
		$scope.searchTips = '请输入学校名称';
		institutionFlag = true;
	}

	var searchInputElement = $('#search-input');

	searchInputElement.focus(function () {
		var keyword = $scope.keyword;
		if (!keyword) {
			if (teachFlag) {
				searchHistory = $cookies.getObject('teachHistory');
			} else if (institutionFlag) {
				searchHistory = $cookies.getObject('institutionHistory');
			}

			if (angular.isDefined(searchHistory)) {
				$scope.arr = searchHistory.data;
				$scope.showHistory = true;
			} else {
				$scope.showHistory = false;
			}
		} else {
			searchInputElement.catcomplete("search", keyword);
		}
		$scope.showData = false;
	});

	searchInputElement.focus();

	$scope.back = function () {
		if ('main.teach.english.detail' === from) {
			$state.go('main.teach.english.type');
		} else {
			$state.go(from  && 'search' !== from ? from : 'main');
		}
	};

	var cache = {};

	$.widget("custom.catcomplete", $.ui.autocomplete, {
    _renderMenu: function(ul, items) {
      var that = this;
			var currentType = '';
			$.each(items, function(index, item) {
	      if (item.typename !== currentType) {
	        ul.append("<li class='ui-autocomplete-type'>" + item.typename + "</li>");
	        currentType = item.typename;
	      }
	      that._renderItemData(ul, item);
	    });
    }
  });

	searchInputElement.catcomplete({
		source: function (request, response) {
			var term = request.term;
			if (term in cache) {
        response($.map(cache[term], function(item) {
          return {label: item.name, typename: item.typename};
        }));
        return;
      }
      if (teachFlag) {
      	webservice.getRelatedResult(request.term).then(function (res) {
	      	var status = res.status;
	      	if (globals.STATUS_OK === status) {
	      		cache[term] = res.data;
	      		response($.map(res.data, function(item) {
	            return {label: item.name, typename: item.typename};
	          }));
	          return;
	      	} else {
	      		cache[term] = [];
	      		response([]);
	      		return;
	      	}
	      }, function (res) {
	      	$scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
	      	var res = res;
	      });
      } else if (institutionFlag) {
      	//todo
      }
		},
		select: function (event, ui) {
			if (ui.item) {
        $scope.keyword = ui.item.label;
        $scope.startSearch();
      }
		},
		open: function (event, ui) {
			$scope.showHistory = false;
		},
		focus: function (event, ui) {
			return false;
		},
		appendTo: searchInputElement.parents('.search-container')
	})
	.data("custom-catcomplete")._renderItem = function (ul, item) {
		return $("<li>")
			.append("<a><i class='fa fa-search' aria-hidden='true'></i><span>" + item.label + "</span></a>")
      .appendTo(ul);
	};

	$scope.startSearch = function () {
		var keyword = $scope.keyword;
		if (!keyword) {
			var tip = '搜索关键字不能为空';
			$scope.$emit('TOAST', {msg: tip});

			return;
		}

		if (teachFlag) {
			searchHistory = $cookies.getObject('teachHistory');
		} else if (institutionFlag) {
			searchHistory = $cookies.getObject('institutionHistory');
		}

		if (angular.isDefined(searchHistory)) {
			var arr = searchHistory.data;
			var addFlag = true;
			for(var i = 0, len = arr.length; i < len; i++) {
				if (keyword === arr[i]) {
					addFlag = false;
					break;
				}
			}
			
			if (addFlag) {
				arr.push(keyword);
			}

			var info = {
				data: arr
			};
		} else {
			var arr = [];
			arr.push(keyword);
			var info = {
				data: arr
			};
		}

		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 30);
		if (teachFlag) {
			$cookies.putObject('teachHistory', info, {expires: expireDate});
		} else if (institutionFlag) {
			$cookies.putObject('institutionHistory', info, {expires: expireDate});
		}

		$scope.showHistory = false;
		$scope.showData = true;

	  if (teachFlag) {
	  	$scope.loading = true;
		  $scope.failing = false;
		  $scope.empty = false;
	  	webservice.getExactResult(keyword).then(function (res) {
				$scope.loading = false;
				var status = res.status;
				if (globals.STATUS_OK === status) {
					$scope.list = res.data;
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
	  } else if (institutionFlag) {
	  	//todo
	  }
	};

	$scope.clearInput = function () {
		$scope.keyword = '';
		searchInputElement.focus();
	};

	$scope.clearHistory = function () {
		if (teachFlag) {
			$cookies.remove('teachHistory');
		} else if (institutionFlag) {
			$cookies.remove('institutionHistory');
		}
		searchInputElement.focus();
	};

	$scope.go = function (item) {
		if (teachFlag) {
			var tid = item.tid;
			var id = item.story_id;
			var name = item.name;
			if (1 == tid) {
				$state.go('story', {story_id: id});
			} else if (2 == tid) {
				$state.go('english', {word_id: id, english: name});
			} else if (3 == tid) {
				var reg = /^[\u4e00-\u9fa5]+$/;
				if (reg.test(name)) {
					$state.go('song', {song_id: id, language: 'chinese'});
				} else {
					$state.go('song', {song_id: id, language: 'english'});
				}
			}
		} else if (institutionFlag) {
			//todo
		}
	};

	$scope.setKeyword = function (keyword) {
		$scope.keyword = keyword;
		$scope.startSearch();
	};

	searchInputElement.keyup(function () {
		var keyword = $scope.keyword;
		if (!keyword) {
			if (teachFlag) {
				searchHistory = $cookies.getObject('teachHistory');
			} else if (institutionFlag) {
				searchHistory = $cookies.getObject('institutionHistory');
			}

			if (angular.isDefined(searchHistory)) {
				$scope.arr = searchHistory.data;
				$scope.showHistory = true;
			} else {
				$scope.showHistory = false;
			}
		}
	});

	$scope.$on('$destroy', function () {
		$scope.scrollDisabled = true;
	});

	if (!$scope.$$phase) {
    $scope.$apply();
  }
}];
