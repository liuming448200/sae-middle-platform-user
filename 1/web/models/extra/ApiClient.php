<?php
require(PHP_ROOT . 'libs/util/IP.php');

define('CACHE_PREFIX_TIME', "key_time_");
define('CACHE_PREFIX_DATA', "key_data_");
define('CACHE_EXPIRE_DEFAULT', 86400);
define('MAX_LEN_KEY', 250);
define('CACHE_FLAG_NO_EXPIRE', 0);
define('CACHE_FLAG_NO_CACHE', -1);
define('CACHE_FLAG_FLUSH', -2);
define('CACHE_FLUSH_WEB', 1);
// define('CACHE_FLUSH_PROCESS', 2);
// define('CACHE_EXPIRE', 300);
/**
 * 单例的HTTP CUR CLIENT 获取接口内容
 */
class ApiClient {
  
  const MEMCACHE_GROUP = 'default';

  private static $_http = null;
  private static $_cookie_sid = null;
  private static $_stat_request_count = 0;
  private static $_stat_request_exec_time = 0;
  // private static $_stat_api_log_data = array();
  // public static $_debugapi_log = '';
  private static $_cache_flag = -1;
  private static $mem = null ;

  // 构造函数私有
  private function __construct () {
    
  }

  // 禁止clone对象
  private function __clone () {
    
  }

  /**
   * 获取单例对象
   */
  private static function _getHttp ($timeout) {
    if (self::$_http == null) {
      self::$_http = new HttpHandlerCurl(HttpHandlerCurl::CHARSET_UTF8, $timeout);

      $user_info = Utility::GetUserInfoFromSession();
      if (is_array($user_info) && array_key_exists('accessToken', $user_info)) {
        self::$_cookie_sid = $user_info['accessToken'];
      } else if (isset($_COOKIE['sid'])) {
        self::$_cookie_sid = $_COOKIE['sid'];
      }
    }
    return self::$_http;
  }

  private static function logAndReturn ($method, $url, $query, $opts, $assoc, $api_response, $runtime_ms, $timeout) {
    self::$_stat_request_count++;
    self::$_stat_request_exec_time += $runtime_ms;

    $is_timeout = 0;
    $ret = null;
    $api_status = -1;
    if ($runtime_ms > $timeout * 1000 && empty($api_response)) {
      $is_timeout = 1;
    } else if (!json_decode($api_response)) {
      $ret = $api_response;
    } else {
      $ret = $api_response_decode = json_decode($api_response, $assoc);
      if (is_array($api_response_decode) && isset($api_response_decode['status'])) {
        $api_status = $api_response_decode['status'] + 0;
        if (504 == $api_status) {
          $ret['message'] = '服务超时，请稍后重试';
        }
      } else if (is_object($api_response_decode) && isset($api_response_decode->status)) {
        $api_status = $api_response_decode->status + 0;
        if (504 == $api_status) {
          $ret->message = '服务超时，请稍后重试';
        }
      }
    }

    $key_time = 0;
    $key_data = 0;
    $cache_set_runtime = 0;
    $cache_set_result_message = 0;
    if ((CACHE_FLAG_NO_CACHE != self::$_cache_flag) && (0 == $api_status || 200 == $api_status) && !empty($api_response)) {// api respnose is valid, data will be stored in cache
      if (is_null(self::$mem)) {
        self::$mem = MemCachedClient::GetInstance(self::MEMCACHE_GROUP);
      }
      $keys = self::url_to_memcache_keys(self::$mem, $url);
      $key_time = $keys[0];
      $key_data = $keys[1];
      $time_cur = time();
      $expire = self::$_cache_flag > 0 ? self::$_cache_flag : CACHE_EXPIRE_DEFAULT;
      $items = array();
      $items[$key_time] = $time_cur.",".$expire.",".CACHE_FLUSH_WEB ;
      $items[$key_data] = $api_response;

      $start = microtime(TRUE);
      self::$mem->setMulti($items) ;
      $end = microtime(TRUE);
      $cache_set_runtime = intval((($end - $start) * 1000000)) / 1000;
      $cache_set_result_message = self::$mem->getResultMessage() ;
    }
    return $ret;
  }

  /**
   * GET 获取数据
   * @param string $url 接口链接
   * @param bool $assoc
   * @param int $cache_flag:
   *    -2:       使用缓存: 强刷缓存, 先请求后台资源，再缓存最新数据, 失效时间为默认值
   *    -1:       不使用缓存, 直接请求后台资源
   *        0:          使用缓存：先请求缓存，如果缓存数据的时间大于失效时间, 再请求后台资源,再缓存, 失效时间为默认值:
   *        1-n(n>0):   使用缓存：先请求缓存，如果缓存数据的时间大于失效时间, 再请求后台资源,再缓存, n表示失效时间
   * @param int $timeout 请求过期时间
   */
  public static function ApiGet ($url, $opts = array(), $assoc = true, $cache_flag = -1, $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);
    self::$_cache_flag = $cache_flag;
    // Judge: request is from self machine, to flush cache
    if ($_SERVER['SERVER_ADDR'] == $_SERVER['REMOTE_ADDR']) {
      $cache_flag = CACHE_FLAG_FLUSH;
    }

    // Judge to fetch data from memcached
    if (CACHE_FLAG_NO_CACHE != $cache_flag && CACHE_FLAG_FLUSH != $cache_flag) {
      $mem_result = self::MemGet($url, $assoc, $cache_flag);
      if (!is_null($mem_result)) {
        return $mem_result;
      }
    }

    // Http request for api url.
    $_http = self::_getHttp($timeout);

    $_opts = $opts;
    if (self::$_cookie_sid) {
      $_opts['cookies'] = 'sid=' . self::$_cookie_sid;
    }
    if (self::$_cookie_sid) {
      $url .= (strpos($url, '?') !== false ? '&': '?').'accessToken='.self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->get($url, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;
    return self::logAndReturn('GET', $url, array(), $_opts, $assoc, $api_response, $runtime_ms, $timeout);
  }

  public static function MemGet ($url, $assoc = true,  $cache_flag = -1) {
    self::$mem = MemCachedClient::GetInstance(self::MEMCACHE_GROUP);
    if ($cache_flag >= 0) {// request memcache first
      $keys = self::url_to_memcache_keys(self::$mem, $url);
      $key_time = $keys[0];
      $key_data = $keys[1];

      $start = microtime(TRUE);
      $vals = self::$mem->getMulti($keys);
      $result_code = self::$mem->getResultCode();
      $end = microtime(TRUE);
      $cache_getMulti_runtime = intval((($end - $start) * 1000000)) / 1000;

      if (Memcached::RES_NOTFOUND != $result_code && false != $vals && "array" == gettype($vals) && sizeof($vals) > 0) {// fetch data from cache successful
        $val_time = $vals[$key_time];
        $val_data = $vals[$key_data];
        $val_time_arr = explode(",", $val_time);
        $time_cache = intval($val_time_arr[0]);
        $expire = intval($val_time_arr[1]);
        $lastProcess = intval($val_time_arr[2]);
        $time_cur = time();

        // Judge expire
        $time_offset = $time_cur - $time_cache;
        if ($time_offset > 0 && $time_offset < $expire && ($expire == $cache_flag || (CACHE_EXPIRE_DEFAULT== $expire && CACHE_FLAG_NO_EXPIRE == $cache_flag))) {
          $val_data_json = json_decode($val_data, $assoc);
          return $val_data_json;
        }
      }
    }
    return null;
  }

  private static function url_to_memcache_keys ($mem, $url) {
    if (is_null($mem) || empty($mem)) {
      return null;
    }
    if (is_null($url) || empty($url)) {
      return null;
    }
    $key_time = CACHE_PREFIX_TIME.$url;
    $key_data = CACHE_PREFIX_DATA.$url;
    $key_time = self::format_key($mem, $key_time);
    $key_data = self::format_key($mem, $key_data);
    $keys = array($key_time, $key_data);
    return $keys;
  }

  private static function format_key ($mem, $key) {
    if (is_null($mem) || empty($mem)) {
      return null;
    }
    if (is_null($key) || empty($key)) {
      return null;
    }
    $len_of_key = strlen($key);
    $pre_key = $mem->getOption(Memcached::OPT_PREFIX_KEY);
    $len_of_prekey = strlen($pre_key);
    if (($len_of_key + $len_of_prekey) > MAX_LEN_KEY) {
      $key = md5($key);
    }
    return $key;
  }

  /**
   * POST 获取数据
   * @param sting $url 接口链接
   * @param array  $query 数据
   * @param int $timeout 请求过期时间
   */
  public static function ApiPost ($url, $query, $opts = array(), $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);

    $_http = self::_getHttp($timeout);

    $_opts = $opts;
    if (self::$_cookie_sid) {
      $_opts['cookies'] = 'sid=' . self::$_cookie_sid;
    }
    if (self::$_cookie_sid) {
      $query['accessToken'] = self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->post($url, $query, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;

    return self::logAndReturn('POST', $url, $query, $_opts, false, $api_response, $runtime_ms, $timeout);
  }

  public static function ApiPostFile ($url, $query, $opts = array(), $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);

    $_http = self::_getHttp($timeout);

    $_opts = $opts;
    if (self::$_cookie_sid) {
      $_opts['cookies'] = 'sid=' . self::$_cookie_sid;
    }
    if (self::$_cookie_sid) {
      $query['accessToken'] = self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->postFile($url, $query, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;

    return self::logAndReturn('POST', $url, $query, $_opts, false, $api_response, $runtime_ms, $timeout);
  }

  /**
   * POST提交json数据
   * @param sting $url 接口链接
   * @param array  $query 数据
   * @param int $timeout 请求过期时间
   */
  public static function ApiPostJson ($url, $query, $opts = array(), $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);

    $_http = self::_getHttp($timeout);

    $_opts = $opts;
    if (self::$_cookie_sid) {
      $_opts['cookies'] = 'sid=' . self::$_cookie_sid;
    }
    if (self::$_cookie_sid) {
      $query['accessToken'] = self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->postJson($url, $query, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;

    return self::logAndReturn('POST', $url, $query, $_opts, false, $api_response, $runtime_ms, $timeout);
  }

  /**
   * PUT 修改信息
   * @param sting $url 接口链接
   * @param array  $query 数据
   * @parma int timeout 请求过期时间
   */
  public static function ApiPut ($url, $query, $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);

    $_http = self::_getHttp($timeout);
    $_opts = array(
      'cookies' => 'sid=' . self::$_cookie_sid
    );
    if (self::$_cookie_sid) {
      $query['accessToken'] = self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->put($url, $query, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;

    return self::logAndReturn('PUT', $url, $query, $_opts, false, $api_response, $runtime_ms, $timeout);
  }

  /**
   * DELETE 删除信息
   * @param sting $url 接口链接
   * @param array/string $query 数据
   * @param int $timeout 请求过期时间
   */
  public static function ApiDelete ($url, $query = '', $timeout = API_REQUEST_TIMEOUT) {
    $url .= (strpos($url, '?') !== false ? '&': '?').'_realip='.IP::getRemoteIp(TRUE);

    $_http = self::_getHttp($timeout);
    $_opts = array(
      'cookies' => 'sid=' . self::$_cookie_sid
    );
    if (self::$_cookie_sid) {
      $query['accessToken'] = self::$_cookie_sid;
    }
    $start = microtime(TRUE);
    $api_response = $_http->delete($url, $query, array(), $_opts);
    $end = microtime(TRUE);
    $runtime_ms = intval((($end - $start) * 1000000)) / 1000;

    return self::logAndReturn('DELETE', $url, $query, $_opts, false, $api_response, $runtime_ms, $timeout);
  }
}
