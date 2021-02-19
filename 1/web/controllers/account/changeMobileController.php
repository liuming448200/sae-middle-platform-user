<?php
require(WEB_ROOT . 'controllers/extra/WebAjaxController.php');
require(WEB_ROOT . 'models/account/changeMobileModel.php');

class changeMobileController extends WebAjaxController {

	protected function GetResponse_ () {
    $model = new changeMobileModel();
    return $model->GetResponse();
  }
}
