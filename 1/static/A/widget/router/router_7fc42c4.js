define('A:widget/router/router', function(require, exports, module) {

  var main = require('A:widget/pages/main/main');
  var story = require('A:widget/pages/story/story');
  var english = require('A:widget/pages/english/english');
  var song = require('A:widget/pages/song/song');
  var child = require('A:widget/pages/child/child');
  var growth = require('A:widget/pages/growth/growth');
  var setting = require('A:widget/pages/setting/setting');
  var register = require('A:widget/pages/register/register');
  var login = require('A:widget/pages/login/login');
  var reset = require('A:widget/pages/reset/reset');
  var search = require('A:widget/pages/search/search');
  var imgcrop = require('A:widget/pages/imgcrop/imgcrop');
  var activity = require('A:widget/pages/activity/activity');
  var discover = require('A:widget/pages/discover/discover');
  var institution = require('A:widget/pages/institution/institution');
  var city = require('A:widget/pages/city/city');
  var instmore = require('A:widget/pages/instmore/instmore');
  var course = require('A:widget/pages/course/course');
  var message = require('A:widget/pages/message/message');
  var mycourse = require('A:widget/pages/mycourse/mycourse');
  var myactivity = require('A:widget/pages/myactivity/myactivity');
  var order = require('A:widget/pages/order/order');
  var pay = require('A:widget/pages/pay/pay');
  var score = require('A:widget/pages/score/score');
  var coupon = require('A:widget/pages/coupon/coupon');
  var myorder = require('A:widget/pages/myorder/myorder');
  
  angular.module('eduApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise('/main');
  
    $stateProvider
      .state('main', main)
      .state('story', story)
      .state('english', english)
      .state('song', song)
      .state('child', child)
      .state('growth', growth)
      .state('setting', setting)
      .state('register', register)
      .state('login', login)
      .state('reset', reset)
      .state('search', search)
      .state('imgcrop', imgcrop)
      .state('activity', activity)
      .state('discover', discover)
      .state('institution', institution)
      .state('city', city)
      .state('instmore', instmore)
      .state('course', course)
      .state('message', message)
      .state('mycourse', mycourse)
      .state('myactivity', myactivity)
      .state('order', order)
      .state('pay', pay)
      .state('score', score)
      .state('coupon', coupon)
      .state('myorder', myorder);
  }]);
  

});
