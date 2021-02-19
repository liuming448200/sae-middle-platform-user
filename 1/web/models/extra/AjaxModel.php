<?php
require(PHP_ROOT . 'libs/mvc/ModelBase.php');
require(WEB_ROOT . 'models/extra/ErrorMsg.php');
require(WEB_ROOT . 'common/utility/CheckLogin.php');
require(WEB_ROOT . 'models/api/Ucenter.php');
require(PHP_ROOT . 'libs/util/HttpRequestHelper.php');

abstract class AjaxModel extends ModelBase {

  protected $need_login = false;

  protected $is_login = false;
  protected $userinfo = null;

  public function __construct () {
    $this->is_login = CheckLogin::isLogin();
    if ($this->is_login) {
      $this->userinfo = Utility::GetUserInfoFromSession();
    }
  }

  public function GetResponse () {
    if ($this->need_login && !$this->is_login) {
      $response = new Response();
      $response->status = ErrorMsg::UNLOGIN;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::UNLOGIN];
      return $response;
    }

    if (!$this->need_login) {
      $ret = $this->isInitPermission();
      if (STATUS_SUCCESS != $ret['status']) {
        $response = new Response();
        $response->status = $ret['status'];
        $response->message = $ret['message'];
        return $response;
      }
    }

    $response = $this->GetResponse_();
    if ((ErrorMsg::ACCESS_TOKEN_EMPTY == $response->status) || 
      (ErrorMsg::ACCESS_TOKEN_TIMEOUT == $response->status) || 
      (ErrorMsg::ACCESS_TOKEN_INVALID == $response->status) || 
      (ErrorMsg::ACCESS_TOKEN_ERROR == $response->status)) {

      Ucenter::Logout();

      $response->status = ErrorMsg::UNLOGIN;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::UNLOGIN];
    }

    return $response;
  }

  private function isInitPermission () {
    $ret = array(
      'status' => STATUS_SUCCESS,
      'message' => '调用者身份认证通过',
    );

    $token = HttpRequestHelper::RequestParam('token');
    if (APP_TOKEN != $token) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '调用者身份认证失败';
      return $ret;
    }

    //判断时间戳是否合法
    $ts = HttpRequestHelper::RequestParam('ts');
    $now = time();
    if (abs($ts - $now) > REQUEST_TIMERANGE) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '请求超时';
      return $ret;
    }

    //签名是否正确
    $sign = HttpRequestHelper::RequestParam('sign');
    $method = HttpRequestHelper::RequestParam('method');
    $params = array(
      'token='.APP_TOKEN,
      'method='.$method,
      'ts='.$ts);
    sort($params);
    $checkSign = md5(join('&', $params));

    if ($sign != $checkSign) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '签名不正确';
    }

    return $ret;
  }
}
