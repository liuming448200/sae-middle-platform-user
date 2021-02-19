<?php
define('WEB_ROOT', dirname(__FILE__) . '/');

define('PHP_ROOT', dirname(WEB_ROOT) . '/');

require(WEB_ROOT . 'common/InitRootDomain.php');
require(WEB_ROOT . 'common/Enums.php');
require(WEB_ROOT . 'Config.php');
require(WEB_ROOT . 'common/InitSmarty.php');
require(WEB_ROOT . 'Globals.php');
require(WEB_ROOT . 'common/InitCookieAndSession.php');
require(WEB_ROOT . 'common/InitRouter.php');
