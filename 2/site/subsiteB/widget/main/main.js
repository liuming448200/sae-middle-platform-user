angular.module('eduApp', [
  'eduApp.main',
  'eduApp.main.story',
  'eduApp.main.english',
  'eduApp.main.english.type',
  'eduApp.main.english.detail',
  'eduApp.main.song',
  'eduApp.main.song.chinese',
  'eduApp.main.song.english',
  'eduApp.main.auth',
  'eduApp.main.auth.user',
  'eduApp.main.auth.usergroup',
  'eduApp.main.auth.action',
  'eduApp.main.auth.menu',
  'eduApp.main.base',
  'eduApp.main.base.content',
  'eduApp.main.base.application',
  'eduApp.main.course',
  'eduApp.main.activity',
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'ngAnimate',
  'scroll-trigger',
  'angular-md5']);
  // 'chart.js']);

// Chart.defaults.global.colours = [
//     '#519FCE', // light grey
//     '#38B7C0', // red
//     '#FF6969', // blue
//     '#46BFBD', // green
//     '#FDB45C', // yellow
//     '#949FB1', // grey
//     '#4D5360'  // dark grey
// ];

angular.module('eduApp').constant('globals', {
  STATUS_OK: 200,
  SPECIFIC_ERROR: 1007,
  UNLOGIN: -1,
  GET: 'get',
  POST: 'post',
  STORY: 'story',
  SONG: 'song',
  ENGLISH: 'english',
  NO_NETWORK_TEXT: '网络连接不可用，请稍后重试'
});

angular.module('eduApp').config(['$httpProvider', function ($httpProvider) {
  
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length;i++) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];

  $httpProvider.interceptors.push('userInterceptor');
}]);

angular.module('eduApp').run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

angular.module('eduApp').filter('unescapeHTMLFilter', ['$sce', function ($sce) {
  return function (text) {
    if (('string' === typeof(text))) {
      var space = '    ';
      text = space.concat(text);
      text = text.replace(/ /g, '&nbsp;&nbsp;');
      text = text.replace(/\n/g, '<br>');
    }
    return $sce.trustAsHtml(text);
  };
}]);

angular.module('eduApp').filter('unescapeHTMLFilterNoSpace', ['$sce', function ($sce) {
  return function (text) {
    if (('string' === typeof(text))) {
      text = text.replace(/ /g, '&nbsp;&nbsp;');
      text = text.replace(/\n/g, '<br>');
    }
    return $sce.trustAsHtml(text);
  };
}]);

angular.module('eduApp').filter('trustSrc', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);

angular.module('eduApp').filter('trustHtml', ['$sce', function ($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);

angular.module('eduApp').controller('MasterCtrl', ['$rootScope', '$scope', '$cookies', '$timeout', 'webservice', 'globals', 
  function ($rootScope, $scope, $cookies, $timeout, webservice, globals) {
  /**
   * Sidebar Toggle & Cookie Control
   */
  var mobileView = 992;

  $scope.getWidth = function () {
    return window.innerWidth;
  };

  $scope.$watch($scope.getWidth, function (newValue, oldValue) {
    if (newValue >= mobileView) {
      if (angular.isDefined($cookies.get('toggle'))) {
        $scope.toggle = !$cookies.get('toggle') ? false : true;
      } else {
        $scope.toggle = true;
      }
    } else {
      $scope.toggle = false;
    }
  });

  $scope.toggleSidebar = function () {
    $scope.toggle = !$scope.toggle;
    $cookies.put('toggle', $scope.toggle);
  };

  window.onresize = function () {
    $scope.$apply();
  };

  $.scrollUp({
    scrollName: 'scrollUp',      // Element ID
    scrollDistance: 300,         // Distance from top/bottom before showing element (px)
    scrollFrom: 'top',           // 'top' or 'bottom'
    scrollSpeed: 300,            // Speed back to top (ms)
    easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
    animation: 'fade',           // Fade, slide, none
    animationSpeed: 200,         // Animation speed (ms)
    scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
    scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
    scrollText: '<i class="fa fa-angle-up"></i>', // Text for element, can contain HTML
    scrollTitle: false,          // Set a custom <a> title if required.
    scrollImg: false,            // Set true to use image
    activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    zIndex: 2147483647           // Z-Index for the overlay
  });

  $rootScope.$on("BUSY", function() {
    $rootScope.waiting = true;
  });
    
  $rootScope.$on("NOTBUSY", function() {
    $rootScope.waiting = false;
  });

  var close;

  $rootScope.toast = '';

  $rootScope.$on("TOAST", function (event, data) {
    $rootScope.toast = data.msg;
    close = $timeout(function () {
      $rootScope.toast = '';
      $timeout.cancel(close);
      close = undefined;
    }, 1500);
  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (!$rootScope.user) {
      var uid = $cookies.get('uid');
      if (angular.isDefined(uid)) {
        webservice.userInfo(uid).then(function (res) {
          var status = res.status;
          if (globals.STATUS_OK === status) {
            $rootScope.user = res.data;
            var usergroups = [];
            angular.forEach($rootScope.user.usergroups, function (usergroup) {
              usergroups.push(usergroup.group_id);
            });
            usergroups = usergroups.join(',');
            webservice.getUserMenu(usergroups).then(function (res) {
              var status = res.status;
              if (globals.STATUS_OK === status) {
                $rootScope.user.menus = res.data;
              } else {
                if (globals.UNLOGIN === status) {
                  $cookies.remove('uid');
                }
                event.preventDefault();
                $rootScope.$state.go('login', {from:fromState.name});
              }
            }, function (res) {
              $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
              var res = res;
            });
            var from = toState.name;
            $rootScope.$state.go(from && "login" !== from ? from : 'main');
          } else {
            if (globals.UNLOGIN === status) {
              $cookies.remove('uid');
            }
            event.preventDefault();
            $rootScope.$state.go('login', {from:fromState.name});
          }
        }, function (res) {
          $scope.$emit('TOAST', {msg: globals.NO_NETWORK_TEXT});
          var res = res;
        });
      }
    }
  });

  $rootScope.$on('userIntercepted', function () {
    $rootScope.$state.go('login', {from: $rootScope.$state.current.name});
  });
}]);

require('../router/router');
require('../config/config');
require('../webservice/webservice');

require('common:widget/common/combo/toast');
require('common:widget/common/combo/widget');
require('common:widget/common/combo/waiting');
require('common:widget/common/lazyImg/lazyImg');
require('common:widget/common/picupload/picupload');
require('common:widget/dialogService/dialogService');
require('common:widget/common/fileupload/fileupload');
require('common:widget/common/pagination/pagination');
require('common:widget/userInterceptor/userInterceptor');
require('common:widget/uploadFileService/uploadFileService');
