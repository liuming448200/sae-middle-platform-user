<?php

class uploadFile {
  public static function upload ($type, $params, $limit) {
    $url = APIMap::getAPI(APIConfig::UPLOAD_FILE);
    $url .= '?upload_type=' . $type;

    if(isset($limit)) {
    	$url .= '&limit=' . $limit;
    }

    $response = ApiBase::getInstance()->ApiPostFile($url, $params);
    
    return $response;
  }
}
