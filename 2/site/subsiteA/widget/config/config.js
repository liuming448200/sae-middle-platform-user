angular.module('eduApp').factory('config', function () {

	var ENV = 'sit';//debug and sit and prod

	var debugServer = 'http://127.0.0.1';

	var sitServer = 'http://fangxiang.applinzi.com';

	var prodServer = 'http://fangxiang.applinzi.com';

	var userName = 'abcdefg';

	var password = '1234567';

	var appToken = '12qw34as56zx78er90df';

	var API = {
		USER_MOBILE_CHECK: '/account/mobileCheck',
		USER_REGISTER: '/account/register',
		USER_LOGIN: '/account/login',
		USER_LOGOUT: '/account/logout',
		USER_INFO: '/account/userInfo',
		USER_RESET_PASSWORD: '/account/resetPassword',
		USER_CHANGE_PASSWORD: '/account/changePassword',
		USER_CHANGE_MOBILE: '/account/changeMobile',
		USER_INFO_MORE: '/account/userInfoMore',
		USER_CHILD_INFO: '/account/childInfo',
		STORY_BASE: '/story/storyBaseInfo',
		SONG_BASE: '/song/songBaseInfo',
		WORD_CATEGORY: '/word/category',
		WORD_BASE: '/word/wordBaseInfo',
		UPLOAD_PIC: '/general/uploadpicture',
		UPLOAD_FILE: '/general/uploadfile',
		DOWNLOAD_FILE: '/general/downloadfile',
		SUGGESTION: '/general/suggestion',
		RELATED_SEARCH: '/general/relatedSearch',
		EXACT_SEARCH: '/general/exactSearch',
		USER_SEND_SMS: '/general/sendSMS',
		USER_VERIFY_SMS: '/general/verifySMS',
		USER_SEND_IMAGE_CODE: '/general/sendImageVerifyCode',
		USER_CHECK_IMAGE_CODE: '/general/checkImageVerifyCode',
		BAIDU_TTS: '/thirdparty/baidu/tts'
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

	methods.getUserName = function () {
		return userName;
	};

	methods.getPassword = function () {
		return password;
	};

	methods.getAppToken = function () {
		return appToken;
	};

	return methods;
});
