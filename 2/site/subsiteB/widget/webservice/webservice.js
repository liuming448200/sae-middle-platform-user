angular.module('eduApp').factory('webservice', ['$http', '$q', 'md5', 'config', 'globals', function ($http, $q, md5, config, globals) {

	var env = config.getENV();
	var server = '';
	if ('debug' === env) {
		server = config.getDebugServer();
	} else if ('sit' === env) {
		server = config.getSitServer();
	} else if ('prod' === env) {
		server = config.getProdServer();
	}

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

	methods.addUser = function (mobile, username, password, usergroups) {
		var path = config.getAPI('ADD_USER');

		var url = server + path;

		var data = {
			"mobile": mobile,
			"username": username,
			"password": password,
			"usergroups": usergroups
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

	methods.userInfo = function (uid) {
		var path = config.getAPI('USER_INFO');

		var url = server + path;

		var httpConfig = {
			params: {
				"uid": uid
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

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

	methods.getUserList = function (limit, offset) {
		var path = config.getAPI('USER_LIST');

		var url = server + path;

		var httpConfig = {
			params: {
				"fieldsList": 'uid,username,status,create_time,update_time',
				"limit": limit,
				"offset": offset
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

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
		path += module + '?fieldsList=' + 'story_id,name,create_time,update_time';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.setUserStatus = function (uid, status) {
		var path = config.getAPI('SET_USER_STATUS');

		var url = server + path;

		var data = {
			"uid": uid,
			"status": status
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.setUserInfo = function (uid, usergroups) {
		var path = config.getAPI('SET_USER_INFO');

		var url = server + path;

		var data = {
			"uid": uid,
			"usergroups": usergroups
		};

		var ret = _http(globals.POST, url, data);

		return ret;
	};

	methods.getUserMenu = function (usergroups) {
		var path = config.getAPI('USER_MEMU');

		var url = server + path;

		var httpConfig = {
			params: {
				"usergroups": usergroups
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createStoryRow = function (info) {
		var module = '/create';
		var path = config.getAPI('STORY_BASE_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateStoryRow = function (params) {
		var module = '/update';
		var path = config.getAPI('STORY_BASE_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteStoryRow = function (story_id) {
		var module = '/delete';
		var path = config.getAPI('STORY_BASE_SET');
		path += module + '?story_id=' + story_id;

		var url = server + path;

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
		path += module + '?language=' + language + '&fieldsList=' + 'song_id,name,create_time,update_time';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.createSongRow = function (language, info) {
		var module = '/create';
		var path = config.getAPI('SONG_BASE_SET');
		path += module + '?language=' + language;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateSongRow = function (language, params) {
		var module = '/update';
		var path = config.getAPI('SONG_BASE_SET');
		path += module + '?language=' + language;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteSongRow = function (language, song_id) {
		var module = '/delete';
		var path = config.getAPI('SONG_BASE_SET');
		path += module + '?language=' + language + '&song_id=' + song_id;

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getWordCategoryRow = function (category_id) {
		var module = '/get';
		var path = config.getAPI('WORD_CATEGORY');
		path += module + '?category_id=' + category_id + '&fieldsList=' + 'category_id,english,chinese';

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.getWordCategoryList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('WORD_CATEGORY');
		path += module + '?fieldsList=' + 'category_id,english,create_time,update_time';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.createWordCategoryRow = function (info) {
		var module = '/create';
		var path = config.getAPI('WORD_CATEGORY_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateWordCategoryRow = function (params) {
		var module = '/update';
		var path = config.getAPI('WORD_CATEGORY_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteWordCategoryRow = function (category_id) {
		var module = '/delete';
		var path = config.getAPI('WORD_CATEGORY_SET');
		path += module + '?category_id=' + category_id;

		var url = server + path;

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

	methods.getWordList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('WORD_BASE');
		path += module + '?fieldsList=' + 'word_id,english,create_time,update_time';

		var url = server + path + '&limit=' + limit + '&offset=' + offset;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.createWordRow = function (info) {
		var module = '/create';
		var path = config.getAPI('WORD_BASE_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateWordRow = function (params) {
		var module = '/update';
		var path = config.getAPI('WORD_BASE_SET');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteWordRow = function (word_id) {
		var module = '/delete';
		var path = config.getAPI('WORD_BASE_SET');
		path += module + '?word_id=' + word_id;

		var url = server + path;

		var ret = _http(globals.GET, url);

		return ret;
	};

	methods.uploadPic = function (file, type, limit) {
		var path = config.getAPI('UPLOAD_PIC');
		path += '?upload_type=' + type;

		if (!!limit) {
			path += '&limit=' + limit;
		}

		var url = server + path;

		var imageFile = file;
		var fd = new FormData();
		fd.append("image", imageFile);

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

	methods.getAppList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('APP_BASE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'app_key,app_role,create_time,update_time'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getContentRow = function (tid) {
		var module = '/get';
		var path = config.getAPI('CONTENT_BASE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"tid": tid,
				"fieldsList": 'tid,typename,create_time,update_time'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getContentList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('CONTENT_BASE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'tid,typename,create_time,update_time'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createContentRow = function (info) {
		var module = '/create';
		var path = config.getAPI('CONTENT_BASE');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateContentRow = function (params) {
		var module = '/update';
		var path = config.getAPI('CONTENT_BASE');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteContentRow = function (tid) {
		var module = '/delete';
		var path = config.getAPI('CONTENT_BASE');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"tid": tid
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getMenuRow = function (menu_id) {
		var module = '/get';
		var path = config.getAPI('AUTH_MENU');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"menu_id": menu_id,
				"fieldsList": 'menu_id,menu_name,tid'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getMenuList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('AUTH_MENU');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'menu_id,menu_name,tid,create_time,update_time,operator_name'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createMenuRow = function (info) {
		var module = '/create';
		var path = config.getAPI('AUTH_MENU');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateMenuRow = function (params) {
		var module = '/update';
		var path = config.getAPI('AUTH_MENU');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteMenuRow = function (menu_id) {
		var module = '/delete';
		var path = config.getAPI('AUTH_MENU');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"menu_id": menu_id
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getActionRow = function (action_id) {
		var module = '/get';
		var path = config.getAPI('AUTH_ACTION');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"action_id": action_id,
				"fieldsList": 'action_id,action_name,menu_id,action'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getActionList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('AUTH_ACTION');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'action_id,action_name,menu_id,action,create_time,update_time,operator_name'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createAcitonRow = function (info) {
		var module = '/create';
		var path = config.getAPI('AUTH_ACTION');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateActionRow = function (params) {
		var module = '/update';
		var path = config.getAPI('AUTH_ACTION');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteActionRow = function (action_id) {
		var module = '/delete';
		var path = config.getAPI('AUTH_ACTION');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"action_id": action_id
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getUsergroupRow = function (group_id) {
		var module = '/get';
		var path = config.getAPI('AUTH_USER_GROUP');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"group_id": group_id,
				"fieldsList": 'group_id,group_name,group_info'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.getUsergroupList = function (limit, offset) {
		var module = '/getlist';
		var path = config.getAPI('AUTH_USER_GROUP');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"limit": limit,
				"offset": offset,
				"fieldsList": 'group_id,group_name,group_info,create_time,update_time,operator_name'
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	methods.createUsergroupRow = function (info) {
		var module = '/create';
		var path = config.getAPI('AUTH_USER_GROUP');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, info);

		return ret;
	};

	methods.updateUsergroupRow = function (params) {
		var module = '/update';
		var path = config.getAPI('AUTH_USER_GROUP');
		path += module;

		var url = server + path;

		var ret = _http(globals.POST, url, params);

		return ret;
	};

	methods.deleteUsergroupRow = function (group_id) {
		var module = '/delete';
		var path = config.getAPI('AUTH_USER_GROUP');
		path += module;

		var url = server + path;

		var httpConfig = {
			params: {
				"group_id": group_id
			}
		};

		var ret = _http(globals.GET, url, httpConfig);

		return ret;
	};

	return methods;
}]);
