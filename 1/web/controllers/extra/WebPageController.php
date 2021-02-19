<?php
/**
 * 本站所有Controller基类
 */
 require(PHP_ROOT . 'libs/mvc/ControllerBase.php');
 require(WEB_ROOT . 'views/PageView.php');

 abstract class WebPageController extends ControllerBase {

  protected $template_;

  protected function SeeError ($response) {
    $view = new PageView();
    if (is_array($response->data) && isset($response->data['url'])) {
      $view->Redirect($response->data['url']);
    } else {
      $this->redirect('/');
    }
    exit();
  }

  abstract protected function GetResponse_();

  protected function GetViewObject() {
    return new PageView();
  }

  protected function GetView_() {
    $view = $this->GetViewObject();
    $view->SetTemplate($this->template_);
    return $view;
  }
  
  public function Run() {
    $response = $this->GetResponse_();
    if (302 === $response->status) {
      $this->SeeError($response);
      return;
    }
    $data = $response->data;
    $view = $this->GetView_();
    $view->SetData($data);
    $view->Display();
  }
 }
