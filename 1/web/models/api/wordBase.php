<?php

class wordBase {
	public static function getWordRow ($params) {
		$url = APIMap::getAPI(APIConfig::WORD_BASE);
                $url = $url . '/get';
                $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

                $response = ApiBase::getInstance()->ApiGet($url);

                return $response;
	}

	public static function getWordList ($params) {
		$url = APIMap::getAPI(APIConfig::WORD_BASE);
                $url = $url . '/getlist';
                $url = is_array($params) ? $url.'?'.http_build_query($params) : $url.'?'.$params;

                $response = ApiBase::getInstance()->ApiGet($url);
                
                return $response;
	}
}
