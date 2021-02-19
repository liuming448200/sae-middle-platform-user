<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class changePasswordModel extends AjaxModel {

  protected $need_login = true;

	public function GetResponse_ () {
		$oldpassword = trim(HttpRequestHelper::PostParam('oldpassword'));
    if (empty($oldpassword)) {
    	$response = new Response();
      $response->status = ErrorMsg::USER_OLD_PASSWORD_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_OLD_PASSWORD_EMPTY];
      return $response;
    } else if (!Utility::ValidatePassword($oldpassword)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_OLD_PASSWORD_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_OLD_PASSWORD_ERROR];
      return $response;
    }

    $newpassword = trim(HttpRequestHelper::PostParam('newpassword'));
    if (empty($newpassword)) {
    	$response = new Response();
      $response->status = ErrorMsg::USER_NEW_PASSWOED_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_NEW_PASSWOED_EMPTY];
      return $response;
    } else if (!Utility::ValidatePassword($newpassword)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_NEW_PASSWOED_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_NEW_PASSWOED_ERROR];
      return $response;
    }

    if ($oldpassword == $newpassword) {
    	$response = new Response();
    	$response->status = ErrorMsg::USER_PASSWORD_SAME;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_PASSWORD_SAME];
      return $response;
    }

    $response = Ucenter::changePassword($oldpassword, $newpassword);

    return $response;
	}
}
