module.exports = {
  url: '/aboutus',
  template: __inline('./aboutus.html'),
  controller: ['$rootScope', 'globals', function ($rootScope, globals) {
  	$rootScope.pageTitle = '欢迎走进我们';
  	$rootScope.pageImage = globals.LOGO_IMAGE;
  }]
};
