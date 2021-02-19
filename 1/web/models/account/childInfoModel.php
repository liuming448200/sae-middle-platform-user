<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class childInfoModel extends AjaxModel {

  protected $need_login = true;

  public function GetResponse_ () {
    $uri = $_SERVER['REQUEST_URI'];
    $info = parse_url($uri);
    $action = substr($info['path'], strripos($info['path'], '/') + 1);
    switch ($action) {
      case 'get':
        $response = $this->getAction();
        break;
      case 'getlist':
        $response = $this->getListAction();
        break;
      case 'create':
        $response = $this->createAction();
        break;
      case 'update':
        $response = $this->updateAction();
        break;
      case 'delete':
        $response = $this->deleteAction();
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
    $cid = (int)HttpRequestHelper::GetParam('cid');

    $fields = HttpRequestHelper::GetParam('fieldsList');

    $params = array();
    if (!empty($cid)) {
      $params['cid'] = $cid;
    }
    if (!empty($fields)) {
      $params['fieldsList'] = $fields;
    }

    $response = Ucenter::getChildInfoRow($params);

    return $response;
  }

  private function getListAction () {
    $limit = (int)HttpRequestHelper::GetParam('limit');
    $offset = (int)HttpRequestHelper::GetParam('offset');

    $fields = HttpRequestHelper::GetParam('fieldsList');

    $params = array();
    if (!empty($limit)) {
      $params['limit'] = $limit;
    }
    if (!empty($offset)) {
      $params['offset'] = $offset;
    }
    if (!empty($fields)) {
      $params['fieldsList'] = $fields;
    }

    $response = Ucenter::getChildInfoList($params);

    return $response;
  }

  private function createAction () {
    $info = HttpRequestHelper::PostParam('info');
    $info = json_decode($info, true);
    if (empty($info)) {
      $response = new Response();
      $response->status = ErrorMsg::REQUEST_PARAM_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::REQUEST_PARAM_ERROR];
      return;
    }

    $params = array(
      'info'=> json_encode($info)
    );

    $response = Ucenter::createChildInfoRow($params);

    return $response;
  }

  private function updateAction () {
    $cid = (int)HttpRequestHelper::PostParam('cid');
    if (empty($cid)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '孩子标识不能为空';
      return $response;
    }

    $info = HttpRequestHelper::PostParam('info');
    $info = json_decode($info, true);    
    if (empty($info)) {
      $response = new Response();
      $response->status = ErrorMsg::REQUEST_PARAM_ERROR;
      $response->message = ErrorMsg::$error_msg_array[ErrorMsg::REQUEST_PARAM_ERROR];
      return;
    }

    $params = array(
      'cid' => $cid,
      'info'=> json_encode($info)
    );

    $response = Ucenter::updateChildInfoRow($params);

    return $response;
  }

  private function deleteAction () {
    $cid = (int)HttpRequestHelper::GetParam('cid');
    if (empty($cid)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '孩子标识不能为空';
      return $response;
    }

    $params = array(
      'cid' => $cid
    );

    $response = Ucenter::deleteChildInfoRow($params);
    
    return $response;
  }
}
