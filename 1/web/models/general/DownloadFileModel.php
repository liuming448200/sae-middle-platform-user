<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/downloadFile.php');

class DownloadFileModel extends AjaxModel {

    protected $need_login = true;

	public function GetResponse_ () {
		$path = HttpRequestHelper::GetParam('path');
        if (empty($path)) {
          $response = new Response();
          $response->status = ErrorMsg::SORRY_MESSAGE;
          $response->message = '文件路径不能为空';
          return $response;
        }

        $response = downloadFile::download($path);

        list($response_headers, $response) = explode("\r\n\r\n", $response, 2);

        $arr = explode("\r\n", $response_headers);
        $contentTypeStr = $arr[3];
        $contentLengthStr = $arr[4];
        $contentType = substr($contentTypeStr, strpos($contentTypeStr, ':') + 2);
        $contentLength = substr($contentLengthStr, strpos($contentLengthStr, ':') + 2);

        $lastModifiedStr = $arr[6];
        $cacheControlStr = $arr[7];
        $expiresStr = $arr[8];
        $lastModified = substr($lastModifiedStr, strpos($lastModifiedStr, ':') + 2);
        $cacheControl = substr($cacheControlStr, strpos($cacheControlStr, ':') + 2);
        $expires = substr($expiresStr, strpos($expiresStr, ':') + 2);

        header('Content-Type: ' . $contentType);
        header('Content-Length: ' . $contentLength);
        header('Last-Modified: ' . $lastModified);
        header('Cache-Control: ' . $cacheControl);
        header("Expires: " . $expires);
        
        echo $response;
        exit;
	}
}
