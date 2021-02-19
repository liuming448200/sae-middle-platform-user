<?php

abstract class RouterConfig {
  const INDEX = '/';
  const USER_MOBILE_CHECK = '/account/mobileCheck';
  const USER_REGISTER = '/account/register';
  const USER_LOGIN = '/account/login';
  const USER_LOGOUT = '/account/logout';
  const USER_INFO = '/account/userInfo';
  const USER_RESET_PASSWORD = '/account/resetPassword';
  const USER_CHANGE_PASSWORD = '/account/changePassword';
  const USER_CHANGE_MOBILE = '/account/changeMobile';
  const USER_INFO_MORE = '/account/userInfoMore';
  const USER_CHILD_INFO = '/account/childInfo';
  const STORY_BASE = '/story/storyBaseInfo';
  const SONG_BASE = '/song/songBaseInfo';
  const WORD_CATEGORY = '/word/category';
  const WORD_BASE = '/word/wordBaseInfo';
  const COURSE_BASE = '/course/courseBaseInfo';
  const ACTIVITY_BASE = '/activity/activityBaseInfo';
  const UPLOAD_PIC = '/general/uploadpicture';
  const UPLOAD_FILE = '/general/uploadfile';
  const DOWNLOAD_FILE = '/general/downloadfile';
  const SUGGESTION = '/general/suggestion';
  const SEARCH = '/general/search';
  const RELATED_SEARCH = '/general/relatedSearch';
  const EXACT_SEARCH = '/general/exactSearch';
  const USER_SEND_SMS = '/general/sendSMS';
  const USER_VERIFY_SMS = '/general/verifySMS';
  const USER_SEND_IMAGE_CODE = '/general/sendImageVerifyCode';
  const USER_CHECK_IMAGE_CODE = '/general/checkImageVerifyCode';
  const BAIDU_TTS = '/thirdparty/baidu/tts';
}

abstract class RouterMap {
  public static $router = array(
    RouterConfig::INDEX  => 'IndexController',
    RouterConfig::USER_MOBILE_CHECK => 'account/mobileCheckController',
    RouterConfig::USER_REGISTER => 'account/RegisterController',
    RouterConfig::USER_LOGIN => 'account/LoginController',
    RouterConfig::USER_LOGOUT => 'account/LogoutController',
    RouterConfig::USER_INFO => 'account/userInfoController',
    RouterConfig::USER_RESET_PASSWORD => 'account/resetPasswordController',
    RouterConfig::USER_CHANGE_PASSWORD => 'account/changePasswordController',
    RouterConfig::USER_CHANGE_MOBILE => 'account/changeMobileController',
    RouterConfig::USER_INFO_MORE => 'account/userInfoMoreController',
    RouterConfig::USER_CHILD_INFO => 'account/childInfoController',
    RouterConfig::STORY_BASE => 'story/storyBaseInfoController',
    RouterConfig::SONG_BASE => 'song/songBaseInfoController',
    RouterConfig::WORD_CATEGORY => 'word/wordCategoryController',
    RouterConfig::WORD_BASE => 'word/wordBaseInfoController',
    RouterConfig::COURSE_BASE => 'course/courseBaseInfoController',
    RouterConfig::ACTIVITY_BASE => 'activity/activityBaseInfoController',
    RouterConfig::UPLOAD_PIC => 'general/UploadPictureController',
    RouterConfig::UPLOAD_FILE => 'general/UploadFileController',
    RouterConfig::DOWNLOAD_FILE => 'general/DownloadFileController',
    RouterConfig::SUGGESTION => 'general/suggestionController',
    RouterConfig::SEARCH => 'general/searchController',
    RouterConfig::RELATED_SEARCH => 'general/relatedSearchController',
    RouterConfig::EXACT_SEARCH => 'general/exactSearchController',
    RouterConfig::USER_SEND_SMS => 'general/sendSMSController',
    RouterConfig::USER_VERIFY_SMS => 'general/verifySMSController',
    RouterConfig::USER_SEND_IMAGE_CODE => 'general/sendImageVerifyCodeController',
    RouterConfig::USER_CHECK_IMAGE_CODE => 'general/checkImageVerifyCodeController',
    RouterConfig::BAIDU_TTS => 'thirdparty/baidu/ttsController'
  );
}

abstract class APIConfig {
  const USER_MOBILE_CHECK = 'account/web/v1/mobileCheck';
  const USER_REGISTER = 'account/web/v1/register';
  const USER_LOGIN = 'account/web/v1/login';
  const USER_INFO = 'account/web/v1/userInfo';
  const USER_RESET_PASSWORD = 'account/web/v1/resetPassword';
  const USER_CHANGE_PASSWORD = 'account/web/v1/changePassword';
  const USER_CHANGE_MOBILE = 'account/web/v1/changeMobile';
  const USER_INFO_MORE = 'account/web/v1/userInfoMore';
  const USER_CHILD_INFO = 'account/web/v1/childInfo';
  const STORY_BASE = 'story/v1/baseinfo';
  const SONG_BASE = 'song/v1/baseinfo';
  const WORD_CATEGORY = 'word/v1/category';
  const WORD_BASE = 'word/v1/baseinfo';
  const COURSE_BASE = 'course/v1/baseinfo';
  const ACTIVITY_BASE = 'activity/v1/baseinfo';
  const UPLOAD_PIC = 'general/uploadpicture';
  const UPLOAD_FILE = 'general/uploadfile';
  const DOWNLOAD_FILE = 'general/downloadfile';
  const SUGGESTION = 'general/suggestion';
  const SEARCH = 'general/search';
  const RELATED_SEARCH = 'general/relatedSearch';
  const EXACT_SEARCH = 'general/exactSearch';
  const USER_SEND_SMS = 'general/sendSMS';
  const USER_VERIFY_SMS = 'general/verifySMS';
  const USER_SEND_IMAGE_CODE = 'general/sendImageVerifyCode';
  const USER_CHECK_IMAGE_CODE = 'general/checkImageVerifyCode';
  const BAIDU_TTS = 'thirdparty/baidu/tts';
}

abstract class APIMap {
  public static function getAPI ($name) {
    return GATEWAY_URL_ROOT . $name;
  }
}
