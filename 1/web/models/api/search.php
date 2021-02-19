<?php

class search {
  public static function getRelatedResult ($params) {
  	$url = APIMap::getAPI(APIConfig::RELATED_SEARCH);
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);

    return $response;
  }

  public static function getExactResult ($params) {
  	$url = APIMap::getAPI(APIConfig::EXACT_SEARCH);
    $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

    $response = ApiBase::getInstance()->ApiGet($url);
    
    return $response;
  }
}
