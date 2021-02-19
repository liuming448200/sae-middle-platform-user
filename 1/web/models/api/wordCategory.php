<?php

class wordCategory {
    public static function getWordCategoryRow ($params) {
    	$url = APIMap::getAPI(APIConfig::WORD_CATEGORY);
        $url = $url . '/get';
        $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

        $response = ApiBase::getInstance()->ApiGet($url);

        return $response;
    }

	public static function getWordCategoryList ($params) {
		$url = APIMap::getAPI(APIConfig::WORD_CATEGORY);
        $url = $url . '/getlist';
        $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

        $response = ApiBase::getInstance()->ApiGet($url);
        
        return $response;
	}
}
