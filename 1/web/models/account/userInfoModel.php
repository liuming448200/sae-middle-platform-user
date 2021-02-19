<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class userInfoModel extends AjaxModel {

	protected $need_login = true;

	public function GetResponse_ () {
		$uid = $this->userinfo['uid'];
		if (empty($uid)) {
			$response = new Response();
			$response->status = ErrorMsg::USER_UID_EMPTY;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::USER_UID_EMPTY];
      return $response;
    }

    $response = Ucenter::GetUserInfo($uid);

		return $response;
	}
}
