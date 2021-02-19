<?php
require(WEB_ROOT . 'models/extra/AjaxModel.php');
require(WEB_ROOT . 'models/api/wordBase.php');

class wordBaseInfoModel extends AjaxModel {

	public function GetResponse_ () {
		$uri = $_SERVER['REQUEST_URI'];
        $info = parse_url($uri);
        $action = substr($info['path'], strripos($info['path'], '/') + 1);
        switch ($action) {
          case 'get': //获取详情
            $response = $this->getAction();
            break;
          case 'getlist': //获取列表
            $response = $this->getListAction();
            break;
          default:
            $response = new Response();
            $response->status = ErrorMsg::REQUEST_URL_ERROR;
            $response->message = ErrorMsg::$error_msg_array[ErrorMsg::REQUEST_URL_ERROR];
            break;
        }

        return $response;
	}

	private function getAction () {
        $wordId = (int)HttpRequestHelper::GetParam('word_id');
		if (empty($wordId)) {
			$response = new Response();
            $response->status = ErrorMsg::SORRY_MESSAGE;
            $response->message = '单词标识不能为空';
            return $response;
        }

        $fields = HttpRequestHelper::GetParam('fieldsList');

        $params = array();
        $params['word_id'] = $wordId;
        if (!empty($fields)) {
          $params['fieldsList'] = $fields;
        }

        $response = wordBase::getWordRow($params);

        return $response;
	}

	private function getListAction () {
		$categoryId = (int)HttpRequestHelper::GetParam('category_id');
		if (empty($categoryId)) {
			$response = new Response();
            $response->status = ErrorMsg::SORRY_MESSAGE;
            $response->message = '单词分类标识不能为空';
            return $response;
        }

        $limit = (int)HttpRequestHelper::GetParam('limit');
        $offset = (int)HttpRequestHelper::GetParam('offset');

        $fields = HttpRequestHelper::GetParam('fieldsList');

        $params = array();
        $params['category_id'] = $categoryId;
        if (!empty($limit)) {
          $params['limit'] = $limit;
        }
        if (!empty($offset)) {
          $params['offset'] = $offset;
        }
        if (!empty($fields)) {
          $params['fieldsList'] = $fields;
        }

        $response = wordBase::getWordList($params);

        return $response;
	}
}
