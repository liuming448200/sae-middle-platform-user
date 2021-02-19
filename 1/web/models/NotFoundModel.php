<?php
require(WEB_ROOT . 'models/extra/PageModel.php');

class NotFoundModel extends PageModel {
  public function GetResponse_ () {
    $response = new Response();

    $response->status = ErrorMsg::PAGE_404;
    $response->message = ErrorMsg::$error_msg_array[ErrorMsg::PAGE_404];

    return $response;
  }
}
