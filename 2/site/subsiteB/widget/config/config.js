angular.module('eduApp').factory('config', function () {

	var ENV = 'sit';//debug and sit and prod

	var debugServer = 'http://127.0.0.1';

	var sitServer = 'http://fangxiangadmin.applinzi.com';

	var prodServer = 'http://fangxiangadmin.applinzi.com';

	var appToken = '90op78kl56nm34ui12hj';

	var API = {
		USER_MOBILE_CHECK: '/account/mobileCheck',
		ADD_USER: '/account/addUser',
		USER_LOGIN: '/account/login',
		USER_LOGOUT: '/account/logout',
		USER_INFO: '/account/userInfo',
		USER_RESET_PASSWORD: '/account/resetPassword',
		USER_MEMU: '/account/userMenu',
		USER_LIST: '/account/userList',
		SET_USER_STATUS: '/account/setUserStatus',
		SET_USER_INFO: '/account/setUserInfo',
		STORY_BASE: '/story/storyBaseInfo',
		STORY_BASE_SET: '/story/storyBaseInfoSet',
		SONG_BASE: '/song/songBaseInfo',
		SONG_BASE_SET: '/song/songBaseInfoSet',
		WORD_CATEGORY: '/word/category',
		WORD_CATEGORY_SET: '/word/categorySet',
		WORD_BASE: '/word/wordBaseInfo',
		WORD_BASE_SET: '/word/wordBaseInfoSet',
		UPLOAD_PIC: '/general/uploadpicture',
		UPLOAD_FILE: '/general/uploadfile',
		DOWNLOAD_FILE: '/general/downloadfile',
		APP_BASE: '/app/appBaseInfo',
		CONTENT_BASE: '/content/contentBaseInfo',
		AUTH_MENU: '/auth/menu',
		AUTH_ACTION: '/auth/action',
		AUTH_USER_GROUP: '/auth/usergroup',
		USER_SEND_SMS: '/general/sendSMS',
		USER_VERIFY_SMS: '/general/verifySMS'
	};

	var methods = {};

	methods.getENV = function () {
		return ENV;
	};

	methods.getDebugServer = function () {
		return debugServer;
	};

	methods.getSitServer = function () {
		return sitServer;
	};

	methods.getProdServer = function () {
		return prodServer;
	};

	methods.getAPI = function (name) {
		return API[name];
	};

	methods.getAppToken = function () {
		return appToken;
	};

	return methods;
});
