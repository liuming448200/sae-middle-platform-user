angular.module('eduApp', [
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'ngAnimate',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.buffering',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.poster',
  'ngImgCrop',
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
  USER_MOBILE_EXIST: 2029,
  GET: 'get',
  POST: 'post',
  HEAD_IMAGE: 'head',
  LOGO_IMAGE: location.origin + __uri('./static/images/logo.jpg'),
  NO_NETWORK_TEXT: '网络连接不可用，请稍后重试'
});

angular.module('eduApp').config(['$httpProvider', 'ScrollTriggerProvider', function ($httpProvider, ScrollTriggerProvider) {
  
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

  ScrollTriggerProvider.offset(200);
}]);

angular.module('eduApp').run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]);

angular.module('eduApp').filter('unescapeHTMLFilter', ['$sce', function ($sce) {
  return function (text) {
    if ('string' === typeof(text)) {
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
    if ('string' === typeof(text)) {
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

angular.module('eduApp').filter('getGenderZh', function () {
  return function (text) {
    if ('undefined' !== typeof(text)) {
      if (1 == text) {
        return '男';
      } else if (2 == text) {
        return '女';
      } else {
        return '-';
      }
    }
  };
});

angular.module('eduApp').filter('noTextFilter', function () {
  return function (text) {
    if ('undefined' !== typeof(text)) {
      if ('' === text) {
        return '-';
      } else {
        return text;
      }
    }
  };
});

angular.module('eduApp').filter('birthdayFormat', function () {
  return function (text) {
    if ('undefined' !== typeof(text)) {
      if (text.indexOf('-') > 0) {
        var birthArr = text.split('-'),
        birthYear = birthArr[0],
        birthMonth = birthArr[1];
      } else {
        var birthArr = text.split('/'),
        birthYear = birthArr[0],
        birthMonth = birthArr[1];
      }

      var now = new Date(),
          nowYear = now.getFullYear(),
          nowMonth = now.getMonth() + 1;

      var yearGap = nowYear - birthYear,
          monthGap = nowMonth - birthMonth;

      var ret;

      if (monthGap >= 0) {
        ret = yearGap + '岁' + monthGap + '个月';
      } else {
        ret = (yearGap - 1) + '岁' + (nowMonth + 12 - birthMonth) + '个月';
      }

      return ret;
    }
  };
});

angular.module('eduApp').filter('weekFormat', function () {
  return function (day) {
    switch (day) {
      case 0:
        day = '周日';
      break;

      case 1:
        day = '周一';
      break;

      case 2:
        day = '周二';
      break;

      case 3:
        day = '周三';
      break;

      case 4:
        day = '周四';
      break;

      case 5:
        day = '周五';
      break;

      case 6:
        day = '周六';
      break;
    }

    return day;
  };
});

angular.module('eduApp').filter('timeDateFormat', function () {
  return function (time) {
    if ('undefined' !== typeof(time)) {
      var da = new Date(time);
      var year = da.getFullYear();
      var month = da.getMonth() + 1;
      var date = da.getDate();

      var ret = year + '-' + month + '-' + date;

      return ret;
    }
  };
});

angular.module('eduApp').filter('monthFormat', function () {
  return function (da) {
    if ('object' === typeof(da)) {
      var year = da.getFullYear() + '年';
      var month = da.getMonth() + 1 + '月';
      
      var ret = year + month;

      return ret;
    }
  };
});

angular.module('eduApp').filter('weekDayFormat', function () {
  return function (time) {
    if ('undefined' !== typeof(time)) {
      var da = new Date(time);
      var day = da.getDay();
      switch (day) {
        case 0:
          day = '周日';
        break;

        case 1:
          day = '周一';
        break;

        case 2:
          day = '周二';
        break;

        case 3:
          day = '周三';
        break;

        case 4:
          day = '周四';
        break;

        case 5:
          day = '周五';
        break;

        case 6:
          day = '周六';
        break;
      }

      return day;
    }
  };
});

angular.module('eduApp').controller('MasterCtrl', ['$rootScope', '$timeout', '$cookies', 'webservice', 'globals', 'UAdetect', 
  function ($rootScope, $timeout, $cookies, webservice, globals, UAdetect) {

  $rootScope.pageTitle = '方向教育';
  $rootScope.pageImage = globals.LOGO_IMAGE;

  $rootScope.weixinFlag = UAdetect.isWeiXin();

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
      if (angular.isDefined($cookies.get('uid'))) {
        webservice.userInfo().then(function (res) {
          var status = res.status;
          if (globals.STATUS_OK === status) {
            $rootScope.user = res.data;
            if (!$rootScope.user.extra) {
              $rootScope.user.extra = {};
            }
            if (!$rootScope.user.child) {
              $rootScope.user.child = {};
            }
            var from = toState.name;
            $rootScope.$state.go(from && "login" !== from ? from : 'main', {}, {reload:true});
          } else {
            if (globals.UNLOGIN === status) {
              $cookies.remove('uid');
            }
            event.preventDefault();
            $rootScope.$state.go('login', {from:fromState.name});
          }
        }, function (res) {
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
require('../UAdetect/UAdetect');
require('../baseAuth/baseAuth');
require('../webservice/webservice');
require('../shareService/shareService');

require('common:widget/common/combo/toast');
require('common:widget/common/combo/widget');
require('common:widget/common/combo/waiting');
require('common:widget/common/lazyImg/lazyImg');
require('common:widget/common/mobile/touchEnd');
require('common:widget/common/mobile/touchStart');
require('common:widget/common/picupload/picupload');
require('common:widget/dialogService/dialogService');
require('common:widget/common/fileupload/fileupload');
require('common:widget/common/pagination/pagination');
require('common:widget/userInterceptor/userInterceptor');
require('common:widget/uploadFileService/uploadFileService');
