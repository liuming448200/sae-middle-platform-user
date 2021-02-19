<?php
require(WEB_ROOT . 'controllers/extra/WebPageController.php');
require(WEB_ROOT . 'models/IndexModel.php');

class IndexController extends WebPageController {

	protected $template_ = 'A/page/index.tpl';
	
  protected function GetResponse_() {
    $model = new IndexModel();
    return $model->GetResponse();
  }
}
