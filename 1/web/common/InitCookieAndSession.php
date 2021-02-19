<?php
require(PHP_ROOT . 'libs/util/Utility.php');

Session::Init();

// 初始化Cookie SESSIONID
$session_id = Cookie::Get(SESSIONID);
if (empty($session_id)) {
  $session_id = session_id();
  Cookie::Set(SESSIONID, $session_id);
}

// 全站唯一标识
$u_uid = Cookie::Get(U_UID);
if (empty($u_uid)) {
  $u_uid = $session_id;
  Cookie::Set(U_UID, $u_uid, time() + 86400 * 180);
}
