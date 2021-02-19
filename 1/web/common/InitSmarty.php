<?php
require(PHP_ROOT . 'libs/util/SmartyHelper.php');

// smarty 配置
$g_smarty_conf = array(
  'tpl_path' => WEB_ROOT . '/smarty/template/',
  'tpc_path' => 'saemc://template_c/',
  'sconf_path' => WEB_ROOT . '/smarty/config/',
  'scache_path' => 'saemc://cache/',
  'splugin_path' => WEB_ROOT . '/smarty/plugin'
);

// 初始化Smarty
SmartyHelper::SetSmartyConfig($g_smarty_conf);
