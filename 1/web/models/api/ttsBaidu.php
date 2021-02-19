<?php

class ttsBaidu {
  public static function getAudio ($text) {
    $query = array(
      'text' => $text
    );
    $query = http_build_query($query);

    $url = APIMap::getAPI(APIConfig::BAIDU_TTS);
    $url = $url . '?' . $query;
    
    $response = ApiBase::getInstance()->ApiGet($url, false, array('header' => true));

    return $response;
  }
}
