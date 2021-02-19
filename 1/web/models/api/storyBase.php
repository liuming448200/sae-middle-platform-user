<?php

class storyBase {
  public static function getStoryRow ($params) {
    $url = APIMap::getAPI(APIConfig::STORY_BASE);
    $url = $url . '/get';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getStoryList ($params) {
    $url = APIMap::getAPI(APIConfig::STORY_BASE);
    $url = $url . '/getlist';
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);
    
    return $response;
  }
}
