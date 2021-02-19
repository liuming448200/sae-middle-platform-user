<?php

class suggestionBase {
  public static function createSuggestionRow ($content, $contact) {
    $query = array(
      'content' => $content,
      'contact' => $contact
    );

    $url = APIMap::getAPI(APIConfig::SUGGESTION);
    
    $response = ApiBase::getInstance()->ApiPost($url, $query);
    
    return $response;
  }
}
