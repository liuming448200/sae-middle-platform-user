<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/search.php');

class relatedSearchModel extends AjaxModel {

  public function GetResponse_ () {
    $keyword = trim(HttpRequestHelper::GetParam('keyword'));
    if (empty($keyword)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '搜索关键字不能为空';
      return $response;
    }

    $params = array(
    	'keyword' => $keyword
    );

    $response = search::getRelatedResult($params);

    return $response;
  }
}
