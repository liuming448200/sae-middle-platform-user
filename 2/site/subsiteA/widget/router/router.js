var main = require('./widget/pages/main/main');
var story = require('./widget/pages/story/story');
var english = require('./widget/pages/english/english');
var song = require('./widget/pages/song/song');
var child = require('./widget/pages/child/child');
var growth = require('./widget/pages/growth/growth');
var setting = require('./widget/pages/setting/setting');
var register = require('./widget/pages/register/register');
var login = require('./widget/pages/login/login');
var reset = require('./widget/pages/reset/reset');
var search = require('./widget/pages/search/search');
var imgcrop = require('./widget/pages/imgcrop/imgcrop');
var activity = require('./widget/pages/activity/activity');
var discover = require('./widget/pages/discover/discover');
var institution = require('./widget/pages/institution/institution');
var city = require('./widget/pages/city/city');
var instmore = require('./widget/pages/instmore/instmore');
var course = require('./widget/pages/course/course');
var message = require('./widget/pages/message/message');
var mycourse = require('./widget/pages/mycourse/mycourse');
var myactivity = require('./widget/pages/myactivity/myactivity');
var order = require('./widget/pages/order/order');
var pay = require('./widget/pages/pay/pay');
var score = require('./widget/pages/score/score');
var coupon = require('./widget/pages/coupon/coupon');
var myorder = require('./widget/pages/myorder/myorder');

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
