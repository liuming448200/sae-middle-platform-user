<?php

class downloadFile {
	public static function download ($path) {
		$url = APIMap::getAPI(APIConfig::DOWNLOAD_FILE);
		$url .= '?path=' . $path;

		$response = ApiBase::getInstance()->ApiGet($url, false, array('header' => true));

		return $response;
	}
}
