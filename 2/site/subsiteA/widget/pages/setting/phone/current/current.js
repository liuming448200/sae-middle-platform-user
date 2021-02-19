module.exports = {
  url: '/current',
  template: __inline('./current.html'),
  controller: ['$rootScope', 'globals', function ($rootScope, globals) {
  	$rootScope.pageTitle = '当前手机号码';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  }]
};
