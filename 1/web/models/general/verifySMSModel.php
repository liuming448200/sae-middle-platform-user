<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class verifySMSModel extends AjaxModel {

	public function GetResponse_ () {
		$mobile = trim(HttpRequestHelper::GetParam('mobile'));
		if (empty($mobile)) {
      $response = new Response();
      $response->status = ErrorMsg::USER_MOBILE_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_MOBILE_EMPTY];
      return $response;
    } else if (!Utility::ValidateIsMobile($mobile)) {
			$response = new Response();
      $response->status = ErrorMsg::USER_MOBILE_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_MOBILE_ERROR];
      return $response;
    }

    $verifyCode = trim(HttpRequestHelper::GetParam('verifyCode'));
    if (empty($verifyCode)) {
    	$response = new Response();
      $response->status = ErrorMsg::USER_AUTHCODE_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_AUTHCODE_EMPTY];
      return $response;
    }

    $response = Ucenter::verifySMS($mobile, $verifyCode);

    return $response;
	}
}
