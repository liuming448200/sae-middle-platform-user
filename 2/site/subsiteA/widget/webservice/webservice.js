angular.module('eduApp').factory('webservice', ['$http', '$q', 'md5', 'config', 'globals', 'baseAuth', 
	function ($http, $q, md5, config, globals, baseAuth) {

	var env = config.getENV();
	var server = '';
	if ('debug' === env) {
		server = config.getDebugServer();
	} else if ('sit' === env) {
		server = config.getSitServer();
	} else if ('prod' === env) {
		server = config.getProdServer();
	}

	var Authorization = baseAuth.getBaseAuth();

	var appToken = config.getAppToken();

	function getSecurityParams (method) {
		var ts = (new Date()).getTime()/1000;
		ts = Math.floor(ts);

		if (globals.GET === method) {
			method = 'GET';
		} else if (globals.POST === method) {
			method = 'POST';
		}

		var p = {
			token: appToken,
			method: method,
			ts: ts
		};

		var s = [];
		for (var i in p) {
			s.push(i + '=' + p[i]);
		}

		var params = s.sort();
		var sign = md5.createHash(params.join('&'));

		var q = {
			token: appToken,
			sign: sign,
			method: method,
			ts: ts
		};

		return q;
	}

	function getSecurityUrl (url) {
		var method = 'GET';

		var ts = (new Date()).getTime()/1000;
		ts = Math.floor(ts);

		var p = {
			token: appToken,
			method: method,
			ts: ts
		};

		var s = [];
		for (var i in p) {
			s.push(i + '=' + p[i]);
		}

		var params = s.sort();
		var sign = md5.createHash(params.join('&'));

		var q = {
			token: appToken,
			sign: sign,
			method: method,
			ts: ts
		};

		var t = [];
		for (var j in q) {
			t.push(j + '=' + q[j]);
		}

		var params2 = t.join('&');

		url += (url.indexOf('?') === -1 ? '?' : '&') + params2;
    return url;
	}

	function _http (method, url, info, more) {
		var defer = $q.defer();

		var securityParams = getSecurityParams(method);

		if (globals.GET === method) {
			var config = info ? info : {};
			if (!config.params) {
				config.params = {};
			}
			config.params.token = securityParams.token;
			config.params.sign = securityParams.sign;
			config.params.method = securityParams.method;
			config.params.ts = securityParams.ts;
			if (!config.headers) {
				config.headers = {
					'Authorization': Authorization
				};
			} else {
				config.headers.Authorization = Authorization;
			}
			$http.get(url, config).success(function (data) {
				defer.resolve(data);
			})
			.error(function (data) {
				defer.reject(data);
			});
		} else if (globals.POST === method) {
			var params = info ? info : {};
			var config = more ? more : {};
			if (!config.params) {
				config.params = {};
			}
			config.params.token = securityParams.token;
			config.params.sign = securityParams.sign;
			config.params.method = securityParams.method;
			config.params.ts = securityParams.ts;
			if (!config.headers) {
				config.headers = {
					'Authorization': Authorization
				};
			} else {
				config.headers.Authorization = Authorization;
			}
			$http.post(url, params, config).success(function (data) {
				defer.resolve(data);
			})
			.error(function (data) {
				defer.reject(data);
			});
		}

		return defer.promise;
	}

	var methods = {};

	methods.mobileCheckExist = function (mobile) {
		var path = config.getAPI('USER_MOBILE_CHECK');

		var url = server + path;

		var httpConfig = {
			params: {
				"mobile": mobile
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.sendSMS = function (mobile) {
		var path = config.getAPI('USER_SEND_SMS');

		var url = server + path;

		var data = {
			"mobile": mobile
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.verifySMS = function (mobile, verifyCode) {
		var path = config.getAPI('USER_VERIFY_SMS');

		var url = server + path;

		var httpConfig = {
			params: {
				"mobile": mobile,
				"verifyCode": verifyCode
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.sendImageVerifyCode = function (identity) {
		var path = config.getAPI('USER_SEND_IMAGE_CODE');

		var url = server + path;

		var ret = url + '?identity=' + identity;

		ret = getSecurityUrl(ret);

		return ret;
	};

	methods.checkImageVerifyCode = function (identity, verifyCode) {
		var path = config.getAPI('USER_CHECK_IMAGE_CODE');

		var url = server + path;

		var httpConfig = {
			params: {
				"identity": identity,
				"verifyCode": verifyCode
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.register = function (mobile, username, password) {
		var path = config.getAPI('USER_REGISTER');

		var url = server + path;

		var data = {
			"mobile": mobile,
			"username": username,
			"password": password
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.login = function (info) {
		var path = config.getAPI('USER_LOGIN');

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.logout = function () {
		var path = config.getAPI('USER_LOGOUT');

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.userInfo = function () {
		var path = config.getAPI('USER_INFO');

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.resetPassword = function (mobile, password) {
		var path = config.getAPI('USER_RESET_PASSWORD');

		var url = server + path;

		var data = {
			"mobile": mobile,
			"password": password
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.changePassword = function (oldpassword, newpassword) {
		var path = config.getAPI('USER_CHANGE_PASSWORD');

		var url = server + path;

		var data = {
			"oldpassword": oldpassword,
			"newpassword": newpassword
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.changeMobile = function (mobile) {
		var path = config.getAPI('USER_CHANGE_MOBILE');

		var url = server + path;

		var data = {
			"mobile": mobile
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.getUserInfoMoreRow = function () {
		var module = '/get';
		var path = config.getAPI('USER_INFO_MORE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"fieldsList": 'nickname,head_portrait,realname,gender,birthday,address'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getUserInfoMoreList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('USER_INFO_MORE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'nickname,realname,gender,birthday'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createUserInfoMoreRow = function (info) {
		var module = '/create';
		var path = config.getAPI('USER_INFO_MORE');
		path += module;

		var url = server + path;

		var data = info;

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.updateUserInfoMoreRow = function (params) {
		var module = '/update';
		var path = config.getAPI('USER_INFO_MORE');
		path += module;

		var url = server + path;

		var data = params;

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.deleteUserInfoMoreRow = function () {
		var module = '/delete';
		var path = config.getAPI('USER_INFO_MORE');
		path += module;

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getChildInfoRow = function (cid) {
		var module = '/get';
		var path = config.getAPI('USER_CHILD_INFO');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"cid": cid,
				"fieldsList": 'nickname,head_portrait,realname,gender,birthday,relationship,current'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getChildInfoList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('USER_CHILD_INFO');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'nickname,head_portrait,realname,birthday,current'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createChildInfoRow = function (info) {
		var module = '/create';
		var path = config.getAPI('USER_CHILD_INFO');
		path += module;

		var url = server + path;

		var data = info;

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.updateChildInfoRow = function (params) {
		var module = '/update';
		var path = config.getAPI('USER_CHILD_INFO');
		path += module;

		var url = server + path;

		var data = params;

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.deleteChildInfoRow = function (cid) {
		var module = '/delete';
		var path = config.getAPI('USER_CHILD_INFO');
		path += module + '?cid=' + cid;

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getStoryRow = function (story_id) {
		var module = '/get';
		var path = config.getAPI('STORY_BASE');
		path += module + '?story_id=' + story_id + '&fieldsList=' + 'story_id,name,content,implication,pic';

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getStoryList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('STORY_BASE');
		path += module + '?fieldsList=' + 'story_id,name';

		var url = server + path  + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getSongRow = function (language, song_id) {
		var module = '/get';
		var path = config.getAPI('SONG_BASE');
		path += module + '?language=' + language + '&song_id=' + song_id + '&fieldsList=' + 'song_id,name,content,song,pic';

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getSongList = function (language, limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('SONG_BASE');
		path += module + '?language=' + language + '&fieldsList=' + 'song_id,name';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getWordCategoryList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('WORD_CATEGORY');
		path += module + '?fieldsList=' + 'category_id,english,chinese';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getWordRow = function (word_id) {
		var module = '/get';
		var path = config.getAPI('WORD_BASE');
		path += module + '?word_id=' + word_id + '&fieldsList=' + 'word_id,category_id,english,chinese,example_en,example_cn,pic';

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getWordList = function (category_id, limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('WORD_BASE');
		path += module + '?category_id=' + category_id + '&fieldsList=' + 'word_id,english,chinese';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.uploadPic = function (file, type, limit, filename) {
		var path = config.getAPI('UPLOAD_PIC');
		path += '?upload_type=' + type;

		if (!!limit) {
			path += '&limit=' + limit;
		}

		var url = server + path;

		var imageFile = file;
		var fd = new FormData();
		if (!filename) {
			fd.append("image", imageFile);
		} else {
			fd.append("image", imageFile, filename);
		}

		var httpConfig = {
			headers: {'Content-Type': undefined },
      transformRequest: angular.identity
		};

		var ret = _http(globals.POST, url, fd, httpConfig);

		return ret;
	};

	methods.uploadFile = function (file, type, limit) {
		var path = config.getAPI('UPLOAD_FILE');
		path += '?upload_type=' + type;

		if (!!limit) {
			path += '&limit=' + limit;
		}

		var url = server + path;

		var File = file;
		var fd = new FormData();
		fd.append("file", File);

		var httpConfig = {
			headers: {'Content-Type': undefined },
      transformRequest: angular.identity
		};

		var ret = _http(globals.POST, url, fd, httpConfig);

		return ret;
	};

	methods.downloadFile = function (file) {
		var path = config.getAPI('DOWNLOAD_FILE');

		var url = server + path;

		var ret = url + '?path=' + file;

		ret = getSecurityUrl(ret);

		return ret;
	};

	methods.createSuggestionRow = function (content, contact) {
		var path = config.getAPI('SUGGESTION');

		var url = server + path;

		var data = {
			"content": content,
			"contact": contact
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.getRelatedResult = function (keyword) {
		var path = config.getAPI('RELATED_SEARCH');

		var url = server + path;

		var httpConfig = {
			params: {
				"keyword": keyword
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getExactResult = function (keyword) {
		var path = config.getAPI('EXACT_SEARCH');

		var url = server + path;

		var httpConfig = {
			params: {
				"keyword": keyword
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getAudio = function (text) {
		var path = config.getAPI('BAIDU_TTS');

		var url = server + path;

		var ret = url + '?text=' + encodeURIComponent(encodeURIComponent(text));

		ret = getSecurityUrl(ret);

		return ret;
	};

	return methods;
}]);
