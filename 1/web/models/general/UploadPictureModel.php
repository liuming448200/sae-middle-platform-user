<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/uploadPic.php');

class UploadPictureModel extends AjaxModel {

  protected $need_login = true;

  public function GetResponse_ () {

    $upload_type = HttpRequestHelper::RequestParam('upload_type');
    if (empty($upload_type)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '图片二级分类参数不能为空';
      return $response;
    }

    $paramname = HttpRequestHelper::PostParam('paramname', 'image'); // 图片参数

    $limit = HttpRequestHelper::RequestParam('limit');

    //是否上传了图片
    if (empty($_FILES)) {
      $response = new Response();
      $response->status = ErrorMsg::SORRY_MESSAGE;
      $response->message = '未接收到上传图片';
      return $response;
    }

    //检测上传图片属性
    $file = $_FILES[$paramname];
    $check = $this->checkUpload($file);
    if (STATUS_SUCCESS != $check['status']) {
      $response = new Response();
      $response->status = $check['status'];
      $response->message = $check['message'];
      return $response;
    }

    $tmpName = realpath($file['tmp_name']);
    $type = $file['type'];
    $filename = $file['name'];

    $params = array(
      'image' => '@' . $tmpName.";type=".$type.";filename=".$filename,
    );

    $response = uploadPic::upload($upload_type, $params, $limit);
    
    return $response;
  }

  public function checkUpload ($uploadFile) {
    $ret = array(
      'status' => STATUS_SUCCESS,
      'message' => '图片符合要求',
    );

    $source = $uploadFile;
    $file = $source['tmp_name'];
    $file_size = (int)filesize($file);
    $size = @getimagesize($file);
    $width = $size ? $size[0] : 0;
    $height = $size ? $size[1] : 0;

    if (empty($file) || $file_size < 1024 || $file_size > 10 * pow(1024, 2)) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '图片大小须大于1KB且不能超过2MB';
      return $ret;
    }
    //flash传的话type为application/octet-stream 需判断文件前两个字节来确定文件类型
    if (strtolower($source['type']) == 'application/octet-stream') {
      $file     = fopen($uploadFile['tmp_name'], "rb");
      $bin      = fread($file, 2); //只读2字节
      fclose($file);
      $strInfo  = @unpack("C2chars", $bin);// C为无符号整数，网上搜到的都是c，为有符号整数，这样会产生负数判断不正常
      $typeCode = intval($strInfo['chars1'].$strInfo['chars2']);
      $allowTypeArr = array(
        255216,//JPG
        13780,//PNG
        6677,//BMP
      );
      if (!in_array($typeCode,$allowTypeArr)) {
        $ret['status'] = ErrorMsg::ERROR_MESSAGE;
        $ret['message'] = '只能上传JPG,BMP,PNG格式的图片';
        return $ret;
      }
    } else if (!in_array(strtolower($source['type']),array('image/jpeg','image/jpg','image/png'))) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '只能上传JPG,BMP,PNG格式的图片';
      return $ret;
    }
    if ($width < 30 || $height < 30) {
      $ret['status'] = ErrorMsg::ERROR_MESSAGE;
      $ret['message'] = '图片不合法，图片尺寸须大于30 x 30';
      return $ret;
    }

    return $ret;
  }
}
