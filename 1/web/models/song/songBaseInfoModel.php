<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/songBase.php');

class songBaseInfoModel extends AjaxModel {

  public function GetResponse_ () {
    $uri = $_SERVER['REQUEST_URI'];
    $info = parse_url($uri);
    $action = substr($info['path'], strripos($info['path'], '/') + 1);
    switch ($action) {
      case 'get': //获取详情
        $response = $this->getAction();
        break;
      case 'getlist': //获取列表
        $response = $this->getListAction();
        break;
      default:
        $response = new Response();
        $response->status = ErrorMsg::REQUEST_URL_ERROR;
        $response->message = ErrorMsg::$error_msg_array[ErrorMsg::REQUEST_URL_ERROR];
        break;
    }

    return $response;
  }

  private function getAction () {
    $language = HttpRequestHelper::GetParam('language');
    if (empty($language)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '儿歌语言不能为空';
      return $response;
    }

    $songId = (int)HttpRequestHelper::GetParam('song_id');
    if (empty($songId)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '儿歌标识不能为空';
      return $response;
    }

    $fields = HttpRequestHelper::GetParam('fieldsList');

    $params = array();
    $params['language'] = $language;
    $params['song_id'] = $songId;
    if (!empty($fields)) {
      $params['fieldsList'] = $fields;
    }

    $response = songBase::getSongRow($params);

    return $response;
  }

  private function getListAction () {
    $language = HttpRequestHelper::GetParam('language');
    if (empty($language)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '儿歌语言不能为空';
      return $response;
    }

    $limit = (int)HttpRequestHelper::GetParam('limit');
    $offset = (int)HttpRequestHelper::GetParam('offset');

    $fields = HttpRequestHelper::GetParam('fieldsList');

    $params = array();
    $params['language'] = $language;
    if (!empty($limit)) {
      $params['limit'] = $limit;
    }
    if (!empty($offset)) {
      $params['offset'] = $offset;
    }
    if (!empty($fields)) {
      $params['fieldsList'] = $fields;
    }

    $response = songBase::getSongList($params);

    return $response;
  }
}
