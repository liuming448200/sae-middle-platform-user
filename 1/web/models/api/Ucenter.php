<?php
/**
 * 用户中心相关的restful接口汇总
 */
require(WEB_ROOT. 'models/extra/ApiBase.php');

class Ucenter {

  const APPID = 'feifan'; // 飞凡通用APPID

  // 关键字类型(keywordType)
  const KEYWORD_TYPE_MERMBER_ID = 0; // 会员ID
  const KEYWORD_TYPE_MOBILE     = 1; // 手机号

  // 用户名类型(userNameType),注册用
  const USERNAME_TYPE_MOBILE = 2; // 手机号

  // 调用方细分渠道(channel)
  const CHANNEL_WEB = 0; // 通用细分渠道 web

  // 验证码类型(VerifyCodeType)
  const VERIFY_CODE_TYPE_REGIST = 1; // 注册
  const VERIFY_CODE_TYPE_LOGIN  = 2; // 登录
  const VERIFY_CODE_TYPE_RESET_LOGIN_PWD = 3; // 重置登录密码
  const VERIFY_CODE_MODIFY_PWD  = 11; //修改登录密码
  const VERIFY_CODE_TYPE_PAYPWD = 4; //重置支付密码
  const VERIFY_CODE_MODIFY_PAYPWD = 12; //新建或修改支付密码
  const VERIFY_CODE_SIGNIN = 14;        //二维码签到获取短信
  const VERIFY_CODE_LOTTERY = 1;       //百度抽奖
  const VERIFY_MODIFY_PASS = 3; //重置密码

  const USER_INFO_URL        = 'https://sandbox.api.wanhui.cn/ucenter/v2/users';   // 获取用户信息、注册都用此URL
  const MODIFY_USER_INFO_URL = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/%s'; // 修改用户信息
  const USER_GROW_LIST       = 'https://sandbox.api.wanhui.cn/ucenter/v2/%s/getGrowthRecordList'; //成长值记录列表
  const MODIFY_PASSWORD_URL  = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/%s/passwords'; // 修改用户登录密码
  const RESET_PASSWORD_URL   = 'https://sandbox.api.wanhui.cn/ucenter/v2/userNames/%s/passwords'; // 找回用户登录密码（重置登录密码）
  const VERIFY_MOBILE_URL    = "https://sandbox.api.wanhui.cn/ucenter/v2/verifyCodes/%s/statuses"; // 验证手机验证码
  const CHECK_NICK_NAME      = 'https://sandbox.api.wanhui.cn/ucenter/v2/nickNames/isAvailable'; //校验昵称是否可用
  const SEND_VERIFY_CODE_URL = 'https://sandbox.api.wanhui.cn/ucenter/v2/verifyCodes'; // 发送短信验证码
  const LOGIN_URL            = 'http://developapi.applinzi.com/admin/account/v1/login'; // 登录
  const CHILDREN_URL         = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/%s/kids'; //查看孩子信息
  const USER_CITY            = 'https://sandbox.api.wanhui.cn/v1/cdaservice/citys'; //城市列表
  const HAS_USER_URL       = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/userName/register';  //查询用户是否存在
  const USER_BENFIT          = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/getRights';  //会员权益
  const MY_BENFIT            = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/getRightsStatistics'; //我的权益
  const HISTORY_BENFIT       = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/getUserRightsUseHistory'; //历史权益
  const MYSCHEDULE           = 'https://sandbox.api.wanhui.cn/svr/agenda/v1/remind'; //我的日程
  const BATCH_USER_URL       = 'https://sandbox.api.wanhui.cn/ucenter/v2/users/batchQueryMemberInfo'; //批量获取会员信息
  const USER_CREDIT_URL      = 'http://api.sit.ffan.com/point/v1/accounts';                       //查询用户当前积分
  //签到相关
  const SIGNIN_DAY       = 'https://sandbox.api.wanhui.cn/ucenter/v2/signIn/signInSingleDay';  //某天是否签到
  const SIGNIN_MONTH     = 'https://sandbox.api.wanhui.cn/ucenter/v2/signIn/signInMonth';       //全月签到
  const SIGNIN_LEIJI         = 'https://sandbox.api.wanhui.cn/ucenter/v2/signIn/accumulateGiftInMonth'; //累计签到奖励
  const SIGNIN_DAYS          = 'https://sandbox.api.wanhui.cn/ucenter/v2/signIn/accumulateDays';    //累计签到天数
  const SIGNIN_GROWTH        = 'https://sandbox.api.wanhui.cn/ucenter/v2/signIn/growthValueHistory';    //成长值历史
  const SIGNIN_GIFT          = 'https://sandbox.api.wanhui.cn/ffan/v1/signInGiftHistory';           //奖品历史
  const MOBILE_LOGIN         = 'https://sandbox.api.wanhui.cn/ucenter/v2/mobileVerifyCodeLogin';    //手机号登录

  public static function register ($mobile, $username, $password) {
    $query = array(
      'mobile'   => $mobile,
      'username' => $username,
      'password' => $password
    );
    
    $url = APIMap::getAPI(APIConfig::USER_REGISTER);

    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }

  // 通过手机号和密码登录
  public static function Login ($username, $password) {
    $query = array(
      'username' => $username,
      'password' => $password,
    );

    $url = APIMap::getAPI(APIConfig::USER_LOGIN);
    
    $response = ApiBase::getInstance()->ApiPost($url, $query, false, array('header' => true));

    Logg::Debug('url:' . $url . ' query:' . print_r($query, true) . ' response:' . print_r($response, true));
    
    list($response_headers, $response) = explode("\r\n\r\n", $response, 2);
    $response = json_decode($response, true); // 转成数组
    
    return $response;
  }

  // 登录或注册种上 cookie 和 session
  public static function SetCookieAndSession ($user_info, $autologin = 0) {
    self::SetCookie($user_info, $autologin);  // 先种cookie再种session
    $response = self::SetSession($user_info);
    return $response;
  }

  // 种上 cookie
  public static function SetCookie ($user_info, $autologin = 0) {
    if ($autologin) {
      $session_id = session_id();
      if (0 == SESSION_EXPIRE_TIME) {
        Cookie::Set(UID, $user_info['uid'], time() + SESSION_MAX_TIME);
        Cookie::Set(SESSIONID, $session_id, time() + SESSION_MAX_TIME);
      } else {
        Cookie::Set(UID, $user_info['uid'], time() + SESSION_EXPIRE_TIME);
        Cookie::Set(SESSIONID, $session_id, time() + SESSION_EXPIRE_TIME);
      }
    } else {
      Cookie::Set(UID, $user_info['uid']);
    }
    return true;
  }

  // 种上 session
  public static function SetSession ($user_info) {
    $result = Utility::BindSessionUid($user_info['uid']); // uid单独绑定
    if (!$result) {
      self::Logout();
      
      $response = new Response();
      ErrorMsg::FillResponseAndLog($response, ErrorMsg::ERROR_MESSAGE, array('用户标识绑定到会话失败'));
      return $response;
    }

    $sid = false;
    if (array_key_exists('accessToken', $user_info)) {
      $sid = $user_info['accessToken'];
      unset($user_info['accessToken']);
    }

    $result = Utility::SetUserInfoToSession($user_info, $sid);
    if ($result) {
      $response = new Response();
      $response->message = '登录成功';
      $response->data = $user_info;
    } else {
      self::Logout();
      
      $response = new Response();
      ErrorMsg::FillResponseAndLog($response, ErrorMsg::ERROR_MESSAGE, array('用户信息绑定到会话失败'));
    }

    return $response;
  }

  // 退出登录
  public static function Logout () {
    session_unset();
    session_destroy(); // 销毁session
    self::CookieDestroy(); // 销毁cookie
    return true;
  }

  // 销毁登录时种上的cookie
  public static function CookieDestroy () {
    Cookie::Set(UID, '', time() - 3600);
    $session_id = Cookie::Get(SESSIONID);
    Cookie::Set(SESSIONID, $session_id);
  }

  // 获取用户信息
  public static function GetUserInfo ($keyword, $keywordType = self::KEYWORD_TYPE_MERMBER_ID) {
    $query = array(
      'keywordType' => $keywordType,
    );
    $query = http_build_query($query);
    
    $url = APIMap::getAPI(APIConfig::USER_INFO);
    $url = $url . '/' . $keyword . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url);
    
    Logg::Debug('url:' . $url . ' response:' . print_r($response, true));

    return $response;
  }

  public static function resetPassword ($mobile, $password) {
    $query = array(
      'mobile'   => $mobile,
      'password' => $password,
    );

    $url = APIMap::getAPI(APIConfig::USER_RESET_PASSWORD);

    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }

  public static function changePassword ($oldpassword, $newpassword) {
    $query = array(
      'oldpassword' => $oldpassword,
      'newpassword' => $newpassword,
    );

    $url = APIMap::getAPI(APIConfig::USER_CHANGE_PASSWORD);

    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }

  public static function changeMobile ($mobile) {
    $query = array(
      'mobile' => $mobile
    );

    $url = APIMap::getAPI(APIConfig::USER_CHANGE_MOBILE);

    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }

  public static function checkMobileExist ($mobile) {
    $query = array(
      'mobile' => $mobile
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::USER_MOBILE_CHECK);
    $url = $url . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  // 发送短信验证码
  public static function sendSMS ($mobile) {
    $query = array(
      'mobile' => $mobile
    );

    $url = APIMap::getAPI(APIConfig::USER_SEND_SMS);

    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }

  // 验证手机验证码
  public static function verifySMS ($mobile, $verifyCode) {
    $query = array(
      'mobile'     => $mobile,
      'verifyCode' => $verifyCode
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::USER_VERIFY_SMS);
    $url = $url . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function sendImageVerifyCode ($identity) {
    $query = array(
      'identity' => $identity
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::USER_SEND_IMAGE_CODE);
    $url = $url . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url, false, array('header' => true));

    return $response;
  }

  public static function checkImageVerifyCode ($identity, $verifyCode) {
    $query = array(
      'identity'   => $identity,
      'verifyCode' => $verifyCode
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::USER_CHECK_IMAGE_CODE);
    $url = $url . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getUserInfoMoreRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_INFO_MORE);
    $url = $url . '/get';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getUserInfoMoreList ($params) {
    $url = APIMap::getAPI(APIConfig::USER_INFO_MORE);
    $url = $url . '/getlist';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function createUserInfoMoreRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_INFO_MORE);
    $url = $url . '/create';

    $response = ApiBase::getInstance()->ApiPost($url, $params);

    return $response;
  }

  public static function updateUserInfoMoreRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_INFO_MORE);
    $url = $url . '/update';

    $response = ApiBase::getInstance()->ApiPost($url, $params);

    return $response;
  }

  public static function deleteUserInfoMoreRow () {
    $url = APIMap::getAPI(APIConfig::USER_INFO_MORE);
    $url = $url . '/delete';

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getChildInfoRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_CHILD_INFO);
    $url = $url . '/get';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getChildInfoList ($params) {
    $url = APIMap::getAPI(APIConfig::USER_CHILD_INFO);
    $url = $url . '/getlist';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function createChildInfoRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_CHILD_INFO);
    $url = $url . '/create';

    $response = ApiBase::getInstance()->ApiPost($url, $params);

    return $response;
  }

  public static function updateChildInfoRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_CHILD_INFO);
    $url = $url . '/update';

    $response = ApiBase::getInstance()->ApiPost($url, $params);

    return $response;
  }

  public static function deleteChildInfoRow ($params) {
    $url = APIMap::getAPI(APIConfig::USER_CHILD_INFO);
    $url = $url . '/delete';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);
    
    return $response;
  }

  //批量获取用户信息
  public function GetBatchUserInfo ($uids, $keywordType = self::KEYWORD_TYPE_MERMBER_ID) {
    $query = array(
      'keywords'    => $uids,
      'keywordType' => $keywordType
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::USER_INFO);
    $url = $url . '?' . $query;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  //获取孩子信息
  public function GetChildren ($uid) {
    $url = sprintf(self::CHILDREN_URL, $uid);
    $query = array(
        'appid'  => self::APPID,
    );
    $query = http_build_query($query);
    $url = $url . '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //新增孩子信息
  public function AddChildren ($uid, $name, $birthday, $sex) {
    $url = sprintf(self::CHILDREN_URL, $uid);
    $query = array(
      'appid'  => self::APPID,
      'uid'    => $uid,
      'name'   => $name,
      'birthday' => $birthday,
      'sex'      => $sex
    );
    $info = ApiClient::ApiPost($url, $query);
    return $info;
  }

  //删除孩子信息
  public function DelChildren ($uid, $kidId) {
    $url = sprintf(self::CHILDREN_URL, $uid);
    $url = $url.'/'.$kidId;
    $info = ApiClient::ApiDelete($url);
    return $info;
  }

  //会员权益
  public function Benefit ($uid, $status, $offset, $limit) {
    $url = self::USER_BENFIT;
    $query = array(
      'appid'       => self::APPID,
      'uid'         => $uid,
      'statusList'  => $status,
      'offset'      => $offset,
      'limit'       => $limit,
      'displayNotAvail' => 1
    );
    $query = http_build_query($query);
    $url = $url . '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //我的权益
  public function myBenefit ($uid, $statisType, $rightsType, $status, $offset, $limit) {
    $url = self::MY_BENFIT;
    $query = array(
        'appid'       => self::APPID,
        'uid'       => $uid,
        'statisTypeList'  => $statisType,  //剩余次数
        'rightsTypeList'  => $rightsType,
        'statusList'  => $status,          //上架
        'offset'      => $offset,
        'limit'       => $limit,
    );
    $query = http_build_query($query);
    $url = $url . '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //历史权益记录
  public function hBenefit ($uid, $typeList, $offset, $limit) {
    $url = self::HISTORY_BENFIT;
    $query = array(
        'appid'       => self::APPID,
        'uid'       => $uid,
        'typeList'    => $typeList,
        'offset'      => $offset,
        'limit'       => $limit,
    );
    $query = http_build_query($query);
    $url = $url . '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  // 修改用户信息(除密码外)
  public function ModifyUserInfo ($uid, $sid, $data_arr) {
    if (!$uid) {
      return 0;
    }
    $query = array(
      'appid'        => self::APPID,
      'uid'          => $uid,
      'loginToken'   => $sid,
    );
    // 可选参数
    if (isset($data_arr['mobile'])) {
      $query['mobile'] = $data_arr['mobile']; // 可选，兼容外部系统短信认证
    }
    if (isset($data_arr['birthday'])) {
      $query['birthday'] = $data_arr['birthday'];
    }
    if (isset($data_arr['headPortrait'])) {
      $query['headPortrait'] = $data_arr['headPortrait'];
    }
    if (isset($data_arr['nickName'])) {
      $query['nickName'] = $data_arr['nickName'];
    }
    if (isset($data_arr['realName'])) {
      $query['realName'] = $data_arr['realName'];
    }
    if (isset($data_arr['gender'])) {
      $query['gender'] = $data_arr['gender'];
    }
    if (isset($data_arr['memberGrade'])) {
      $query['memberGrade'] = $data_arr['memberGrade'];
    }
    if (isset($data_arr['idcardType'])) {
      $query['idcardType'] = $data_arr['idcardType'];
    }
    if (isset($data_arr['idcardNo'])) {
      $query['idcardNo'] = $data_arr['idcardNo'];
    }
    if (isset($data_arr['phone'])) {
      $query['phone'] = $data_arr['phone']; // 固定电话
    }
    if (isset($data_arr['email'])) {
      $query['email'] = $data_arr['email'];
    }
    if (isset($data_arr['address'])) {
      $query['address'] = $data_arr['address'];
    }
    if (isset($data_arr['province'])) {
      $query['province'] = $data_arr['province'];
    }
    if (isset($data_arr['city'])) {
      $query['city'] = $data_arr['city'];
    }
    if (isset($data_arr['district'])) {
      $query['district'] = $data_arr['district'];
    }
    if (isset($data_arr['postcode'])) {
      $query['postcode'] = $data_arr['postcode'];
    }
    if (isset($data_arr['creator'])) {
      $query['creator'] = $data_arr['creator'];
    }
    if (isset($data_arr['liveCity'])) {
      $query['liveCity'] = $data_arr['liveCity'];
    }
    $url = sprintf(self::MODIFY_USER_INFO_URL, $uid);
    $info = ApiClient::ApiPut($url, $query);
    Logg::Debug('url:' . $url . ' query:' . print_r($query, true) . ' info:' . print_r($info, true));
    if (!$info || !is_array($info) || !isset($info['status'])) {
      return $info;
    }
    if (200 == $info['status']) {
      return 1;
    }
    return 0;
  }

  // 修改用户登录密码
  public function ModifyPassword ($uid, $sid, $old_password, $new_password) {
    if (!$uid) {
      return 0;
    }
    $query = array(
      'appid'      => self::APPID,
      'loginToken' => $sid,
      'oldPwd'     => $old_password,
      'newPwd'     => $new_password,
    );
    $url = sprintf(self::MODIFY_PASSWORD_URL, $uid); // 修改用户登录密码
    $info = ApiClient::ApiPut($url, $query);
    Logg::Debug('url:' . $url . ' query:' . print_r($query, true) . ' info:' . print_r($info, true));
    return $info;
  }

  // 找回用户登录密码（重置登录密码）
  public function ResetPasswordByMobile ($mobile, $verifycode, $password = '') {
    $query = array(
      'appid'        => self::APPID,
      'userName'     => $mobile,
      'userNameType' => self::USERNAME_TYPE_MOBILE, // 通过手机号重置登录密码
      'verifyCode'   => $verifycode,
    );
    // 可选密码，不填则系统通过短信将新密码发给用户
    if ($password) {
      $query['newPwd'] = $password;
    }
    $url = sprintf(self::RESET_PASSWORD_URL, urlencode($query['userName']));
    $info = ApiClient::ApiPut($url, $query);
    Logg::Debug('url:' . $url . ' query:' . print_r($query, true) . ' info:' . print_r($info, true));
    return $info;
  }

  //获取所有城市列表
  public function getCity () {
    $url = self::USER_CITY;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  /**
   * 获取用户成长值列表
   * @param $uid 用户uid
   * @param $sid 用户sid
   * @param $offset 偏移量
   * @param $limit  分页条数
   * @return 列表数据
   */
  public function GrowthList ($uid, $sid, $offset, $limit) {
    $url   = sprintf(self::USER_GROW_LIST, $uid);
    $query = array(
        'appid'      => self::APPID,
        'loginToken' => $sid,
        'offset'     => $offset,
        'limit'  => $limit,
    );
    $query = http_build_query($query);
    $url = $url . '?' . $query;
    $info  = ApiClient::ApiGet($url, $query);
    return $info;
  }

  // 校验昵称是否可用
  public function CheckNickName ($nick_name) {
    $query = array(
      'appid'    => self::APPID,
      'nickName' => $nick_name,
    );
    $query = http_build_query($query);
    $url = self::CHECK_NICK_NAME . '?' . $query;
    $info = ApiClient::ApiGet($url);
    Logg::Debug('url:' . $url . ' info:' . print_r($info, true));
    if (!$info || !is_array($info) || !isset($info['status'])) {
      return array();
    }
    return $info;
  }

  //查询用户是否存在
  public function haveUser ($user) {
    $url = self::HAS_USER_URL;
    $query = array(
        'appid'    => self::APPID,
        'userName' => $user,
        'userNameType' => 2,  //用户名类型为手机号
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //查询我的日程
  public function mySchedule ($user) {
    $url = self::MYSCHEDULE;
    $query = array(
      'userName' => $user,
      'start'    => 0,
      'num'      => 15
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //是否签到
  public function signDay ($uid,$day) {
    $url = self::SIGNIN_DAY;
    $query = array(
      'appid' => self::APPID,
      'uid' => $uid,
      'day'   => $day,
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //全月签到记录
  public function signMonth ($uid,$month) {
    $url = self::SIGNIN_MONTH;
    $query = array(
      'appid' => self::APPID,
      'uid' => $uid,
      'month' => $month,
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //累计签到奖励
  public function signLei ($uid,$month) {
    $url = self::SIGNIN_LEIJI;
    $query = array(
        'appid' => self::APPID,
        'uid' => $uid,
        'month' => $month,
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //累计签到天数
  public function signDays ($uid,$month) {
    $url = self::SIGNIN_DAYS;
    $query = array(
        'appid' => self::APPID,
        'uid' => $uid,
        'month' => $month,
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //签到
  public function userSign ($uid, $loginToken, $day, $source, $cityId, $plazaId) {
    $url = self::SIGNIN_DAY;
    $query = array(
        'appid'    => self::APPID,
        'uid'    => $uid,
        'loginToken' => $loginToken,
        'day'    => $day,
        'source'   => $source,
    );
    $cityId = intval($cityId);
    $plazaId = intval($plazaId);
    if (!empty($cityId)) {
      $query['cityId'] = $cityId;
    }
    if (!empty($plazaId)) {
      $query['plazaId'] = $plazaId;
    }
    $info = ApiClient::ApiPost($url, $query);
    return $info;
  }

  //签到成长值历史
  public function signGrowth ($uid, $offset, $limit) {
    $url = self::SIGNIN_GROWTH;
    $query = array(
      'appid'   => self::APPID,
      'uid'   => $uid,
      'offset'  => $offset,
      'limit'   => $limit
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //签到奖品历史
  public function signGift ($uid, $offset, $limit) {
    $url = self::SIGNIN_GIFT;
    $query = array(
        'appid'   => self::APPID,
        'uid'   => $uid,
        'offset'  => $offset,
        'limit'   => $limit
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }

  //手机号登录
  public function MobileLogin ($userName, $userNameType, $verifyCode, $channel) {
    $url = self::MOBILE_LOGIN;
    $query = array(
      'appid'       => self::APPID,
      'userName'    => $userName,
      'userNameType'  => $userNameType,
      'verifyCode'  => $verifyCode,
      'channel'       => $channel
    );
    $info = ApiClient::ApiPost($url, $query);
    return $info;
  }

  /**
   * 修改用户信息(除密码外)
   * @param $uid 用户id
   * @param $loginToken
   * @param $data 用户信息
   * @return 修改后的信息
   */
  public function UpdateUserInfo ($uid, $loginToken, $data) {
    if (!empty($uid)) {
      $query = array(
          'appid'         => self::APPID,
          'uid'           => $uid,
          'loginToken'    => $loginToken,
      );
      $fields = array(
          'mobile','birthday','headPortrait','nickName','realName','gender','memberGrade',
          'idcardType','idcardNo','phone','email','address','province','city','district',
          'postcode','creator','liveCity');
      //参数处理
      $user = array();
      foreach ($data as $key=>$value) {
        if (in_array($key, $fields)) {
          $user[$key] = $value;
        }
      }
      $query = array_merge($query, $user);
      $url = sprintf(self::MODIFY_USER_INFO_URL, $uid);
      $info = ApiClient::ApiPut($url, $query);
    }
    if (!empty($info)) {
      return $info;
    } else {
      return array();
    }
  }

  /**
   * 查询用户积分
   * @param  $uid 用户id
   * @return   用户积分信息
   */
  public function userCredit ($uid) {
    $url = self::USER_CREDIT_URL;
    $query = array(
        'platCode'    => '001',
        'accountOwnerId'    => $uid,
    );
    $query = http_build_query($query);
    $url = $url. '?' . $query;
    $info = ApiClient::ApiGet($url);
    return $info;
  }
}
