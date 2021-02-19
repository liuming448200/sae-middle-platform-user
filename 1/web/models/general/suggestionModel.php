<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/suggestionBase.php');

class suggestionModel extends AjaxModel {

  public function GetResponse_ () {
    $content = trim(HttpRequestHelper::PostParam('content'));
    if (empty($content)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '建议内容不能为空';
      return $response;
    }

    $contact = trim(HttpRequestHelper::PostParam('contact'));
    if (empty($contact)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '联系方式不能为空';
      return $response;
    }

    $response = suggestionBase::createSuggestionRow($content, $contact);

    return $response;
  }
}
