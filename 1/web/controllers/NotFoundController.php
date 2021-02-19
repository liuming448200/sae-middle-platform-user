<?php
require(WEB_ROOT . 'controllers/extra/WebPageController.php');
require(WEB_ROOT . 'models/NotFoundModel.php');

class NotFoundController extends WebPageController {

	protected $template_ = WEB_ROOT . '404.html';
	
  protected function GetResponse_() {
    $model = new NotFoundModel();
    return $model->GetResponse();
  }
}
