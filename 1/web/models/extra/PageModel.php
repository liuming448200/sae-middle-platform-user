<?php
require(PHP_ROOT . 'libs/mvc/ModelBase.php');
require(WEB_ROOT . 'models/extra/ErrorMsg.php');

abstract class PageModel extends ModelBase {
  public function GetResponse() {
    $response = $this->GetResponse_();
    return $response;
  }
}
