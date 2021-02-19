<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class sendImageVerifyCodeModel extends AjaxModel {

	public function GetResponse_ () {
		$identity = HttpRequestHelper::GetParam('identity');
		if (empty($identity)) {
			$response = new Response();
			$response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '图片验证码标识符不能为空';
			return $response;
		}

		$response = Ucenter::sendImageVerifyCode($identity);

		list($response_headers, $response) = explode("\r\n\r\n", $response, 2);

		$arr = explode("\r\n", $response_headers);
		$contentTypeStr = $arr[3];
		$contentLengthStr = $arr[4];
		$contentType = substr($contentTypeStr, strpos($contentTypeStr, ':') + 2);
		$contentLength = substr($contentLengthStr, strpos($contentLengthStr, ':') + 2);

		header("Content-type: " . $contentType);
		header("Content-Length: " . $contentLength);
		echo $response;
		exit;
	}
}
