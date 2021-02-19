<?php

class CheckLogin {
  public static function isLogin () {
    $uid = $_COOKIE['uid'];
    if (empty($uid) || !Utility::CheckSessionValid($uid)) {
      return false;
    }
    return true;
  }
}
