<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/uploadFile.php');

class UploadFileModel extends AjaxModel {

  protected $need_login = true;

  public function GetResponse_ () {

    $upload_type = HttpRequestHelper::RequestParam('upload_type');
    if (empty($upload_type)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '文件二级分类参数不能为空';
      return $response;
    }

    $paramname = HttpRequestHelper::PostParam('paramname', 'file'); // 文件参数

    $limit = HttpRequestHelper::RequestParam('limit');

    //是否上传了文件
    if (empty($_FILES)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '未接收到上传文件';
      return $response;
    }

    $file = $_FILES[$paramname];

    $tmpName = realpath($file['tmp_name']);
    $type = $file['type'];
    $filename = $file['name'];

    $params = array(
      'file' => '@' . $tmpName.";type=".$type.";filename=".$filename,
    );

    $response = uploadFile::upload($upload_type, $params, $limit);

    return $response;
  }
}
