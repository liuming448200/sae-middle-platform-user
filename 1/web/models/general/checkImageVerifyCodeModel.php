<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class checkImageVerifyCodeModel extends AjaxModel {

	public function GetResponse_ () {
		$identity = HttpRequestHelper::GetParam('identity');
		if (empty($identity)) {
			$response = new Response();
			$response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '图片验证码标识符不能为空';
			return $response;
		}

		$verifyCode = trim(HttpRequestHelper::GetParam('verifyCode'));
		if (empty($verifyCode)) {
			$response = new Response();
			$response->status = ErrorMsg::USER_AUTHCODE_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_AUTHCODE_EMPTY];
      return $response;
    }

    $response = Ucenter::checkImageVerifyCode($identity, $verifyCode);

    return $response;
	}
}
