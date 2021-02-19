angular.module('eduApp').factory('shareService', ['$rootScope', '$uibModal', function ($rootScope, $uibModal) {

	var methods = {};

	methods.open = function (summary, desc) {
		var uibModalInstance = $uibModal.open({
			templateUrl: 'share.html',
			controller: ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
				var p = {
					url:       location.href,
					showcount: '1',/*是否显示分享总数,显示：'1'，不显示：'0' */
					desc:      desc || '',/*默认分享理由(可选)*/
					summary:   summary || '',/*分享摘要(可选)*/
					title:     $rootScope.pageTitle || '',/*分享标题(可选)*/
					site:      '方向教育',/*分享来源 如：腾讯网(可选)*/
					pics:      $rootScope.pageImage || '', /*分享图片的路径(可选)*/
					style:     '201',
					width:     113,
					height:    39
				};

				var s = [];
				for (var i in p) {
					s.push(i + '=' + encodeURIComponent(p[i]||''));
				}

				var QzoneUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');

				var q = {
					appkey:    '',
					title:     $rootScope.pageTitle || '',
					url:       location.href,
					pic:       $rootScope.pageImage || '',
					searchPic: false,
					style:     'simple'
				};

				var m = [];
				for (var i in q) {
					m.push(i + '=' + encodeURIComponent(q[i]||''));
				}

				var weiboUrl = 'http://service.weibo.com/share/share.php?' + m.join('&');

				$scope.openQZone = function () {
					$uibModalInstance.close();
					window.open(QzoneUrl);
				};

				$scope.openWeibo = function () {
					$uibModalInstance.close();
					window.open(weiboUrl);
				};

				$scope.cancel = function () {
					$uibModalInstance.dismiss('cancel');
				};
			}],
			size: 'md'
		});
	};

	return methods;
}]);
