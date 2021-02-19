<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');

class LogoutModel extends AjaxModel {

  protected $need_login = true;

  public function GetResponse_ () {
    Ucenter::Logout();

    $response = new Response();
    $response->status = 200;
    $response->message = '用户退出成功';
    
    return $response;
  }
}
