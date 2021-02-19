<?php
require(PHP_ROOT . 'libs/mvc/SmartyView.php');

class PageView extends SmartyView {

  protected $smarty = null;

  public function __construct() {
    $this->smarty = SmartyHelper::GetSmartyObj();
    if (DEBUG && defined('DEBUG_SMARTY') && DEBUG_SMARTY) {
      $this->smarty->debugging = TRUE;
    }
  }

  public function Display() {
    echo $this->Render();
  }

  public function Render() {
    if ($this->data_) {
      $this->smarty->assign('data', $this->data_);
    }
    return $this->smarty->fetch($this->template_name_);
  }
}
