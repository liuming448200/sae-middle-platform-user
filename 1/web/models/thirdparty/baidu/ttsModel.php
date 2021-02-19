<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/ttsBaidu.php');

class ttsModel extends AjaxModel {

  public function GetResponse_ () {
    $text = HttpRequestHelper::GetParam('text');
    if (empty($text)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '文本不能为空';
      return $response;
    } else if (strlen($text) >= 1024) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '文本长度必须小于1024字节';
      return $response;
    }

    $response = ttsBaidu::getAudio($text);

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
