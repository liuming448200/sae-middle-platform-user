angular.module('eduApp').factory('UAdetect', function () {
	
	var ua = detect.parse(navigator.userAgent);

	var methods = {};

	methods.isWeiXin = function () {
		if(/MicroMessenger/i.test(ua.source)) {
	    return true;
	  } else {
	    return false;
	  }
	};

	methods.isPC = function () {
		if (ua.device.type === 'Desktop') {
			return true;
		} else {
			return false;
		}
	};

	methods.isMobile = function () {
		if (ua.device.type === 'Mobile') {
			return true;
		} else {
			return false;
		}
	};

	methods.isQQBrowser = function () {
		if(/QQBrowser/i.test(ua.source)) {
	    return true;
	  } else {
	    return false;
	  }
	};

	methods.isUCBrowser = function () {
		if(/UCBrowser/i.test(ua.source)) {
	    return true;
	  } else {
	    return false;
	  }
	};

	return methods;
});
