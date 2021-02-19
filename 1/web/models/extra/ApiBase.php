<?php
require(WEB_ROOT. 'models/extra/ApiClient.php');

class ApiBase {

  private static $_instance = false;//类的实例，默认为false

  private $is_login = false;

  // 构造函数私有
  private function __construct () {
    
  }

  // 禁止clone对象
  private function __clone () {
    
  }

  public static function getInstance () {
    if (!self::$_instance) {
      self::$_instance = new self();
    }
    return self::$_instance;
  }

  public function ApiGet ($url, $need_login = true, $opts = array(), $assoc = false, $cache_flag = -1, $timeout = API_REQUEST_TIMEOUT) {
    $this->is_login = CheckLogin::isLogin();
    if (!$this->is_login) {
      $url = $this->getSecurityUrl($url, 'GET');
    } else {
      if (!$need_login) {
        $url = $this->getSecurityUrl($url, 'GET');
      } else {
        $url .= (strpos($url, '?') !== false ? '&': '?').'app_key='.APP_KEY;
      }
    }
    return ApiClient::ApiGet($url, $opts, $assoc, $cache_flag, $timeout);
  }

  public function ApiPost ($url, $query, $need_login = true, $opts = array(), $timeout = API_REQUEST_TIMEOUT) {
    $this->is_login = CheckLogin::isLogin();
    if (!$this->is_login) {
      $url = $this->getSecurityUrl($url, 'POST');
    } else {
      if (!$need_login) {
        $url = $this->getSecurityUrl($url, 'POST');
      } else {
        $query['app_key'] = APP_KEY;
      }
    }
    return ApiClient::ApiPost($url, $query, $opts , $timeout);
  }

  public function ApiPostFile ($url, $query, $opts = array(), $timeout = API_REQUEST_TIMEOUT) {
    $this->is_login = CheckLogin::isLogin();
    if (!$this->is_login) {
      $url = $this->getSecurityUrl($url, 'POST');
    } else {
      $query['app_key'] = APP_KEY;
    }
    return ApiClient::ApiPostFile($url, $query, $opts , $timeout);
  }

  public function ApiPut ($url, $query, $timeout = API_REQUEST_TIMEOUT) {
    $this->is_login = CheckLogin::isLogin();
    if (!$this->is_login) {
      $url = $this->getSecurityUrl($url, 'PUT');
    } else {
      $query['app_key'] = APP_KEY;
    }
    return ApiClient::ApiPut($url, $query, $timeout);
  }

  public function ApiDelete ($url, $query, $timeout = API_REQUEST_TIMEOUT) {
    $this->is_login = CheckLogin::isLogin();
    if (!$this->is_login) {
      $url = $this->getSecurityUrl($url, 'DELETE');
    } else {
      $query['app_key'] = APP_KEY;
    }
    return ApiClient::ApiDelete($url, $query, $timeout);
  }

  private function getSecurityUrl ($url, $method) {
    $app_key = APP_KEY;
    $app_secret = APP_SECRET;
    $ts = time();

    $params = array(
      'app_key='.$app_key,
      'app_secret='.$app_secret,
      'method='.$method,
      'ts='.$ts);

    sort($params);
    $sign = md5(join('&', $params));

    $params2 = array(
      'app_key='.$app_key,
      'sign='.$sign,
      'method='.$method,
      'ts='.$ts);

    $url .= (strpos($url, '?') === false ? '?' : '&') . join('&', $params2);
    return $url;
  }
}
