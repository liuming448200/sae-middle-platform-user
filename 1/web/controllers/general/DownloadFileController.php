<?php
require(WEB_ROOT . 'controllers/extra/WebAjaxController.php');
require(WEB_ROOT . 'models/general/DownloadFileModel.php');

class DownloadFileController extends WebAjaxController {
	
	protected function GetResponse_ () {
    $model = new DownloadFileModel();
    return $model->GetResponse();
  }
}
