<?php

class uploadPic {
  public static function upload ($type, $params, $limit) {
    $url = APIMap::getAPI(APIConfig::UPLOAD_PIC);
    $url .= '?upload_type=' . $type;

    if(isset($limit)) {
    	$url .= '&limit=' . $limit;
    }

    $response = ApiBase::getInstance()->ApiPostFile($url, $params);
    
    return $response;
  }
}
