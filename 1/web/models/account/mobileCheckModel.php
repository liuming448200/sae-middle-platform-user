<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class mobileCheckModel extends AjaxModel {

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

    $response = Ucenter::checkMobileExist($mobile);

    return $response;
	}
}
