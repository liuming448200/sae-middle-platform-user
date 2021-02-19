<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class LoginModel extends AjaxModel {

  public function GetResponse_ () {
    $username = trim(HttpRequestHelper::PostParam('username'));
    if (empty($username)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_NAME_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_NAME_EMPTY];
      return $response;
    } else if (!Utility::ValidateIsUserName($username)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_NAME_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_NAME_ERROR];
      return $response;
    }

    $password = trim(HttpRequestHelper::PostParam('password'));
    if (empty($password)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_PASSWD_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_PASSWD_EMPTY];
      return $response;
    } else if (!Utility::ValidatePassword($password)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_PASSWORD_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_PASSWORD_ERROR];
      return $response;
    }

    // 进行登录
    $response = Ucenter::Login($username, $password);
    if (STATUS_SUCCESS == $response['status']) {
      // 登录成功后，需要种Session和Cookie
      $response = Ucenter::SetCookieAndSession($response['data'], USER_AUTO_LOGIN);
      if (STATUS_SUCCESS != $response->status) {
        $response->status = ErrorMsg::USER_LOGIN_EMPTY;
        $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_LOGIN_EMPTY];
      }
    }

    if (is_array($response)) {
      return (object)$response;
    } else {
      return $response;
    }
  }
}
