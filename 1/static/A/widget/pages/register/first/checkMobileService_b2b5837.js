define('A:widget/pages/register/first/checkMobileService', function(require, exports, module) {

  angular.module('eduApp').factory('checkMobileService', function () {
    var mobileExist = true;
  
    var methods = {};
  
    methods.set = function (exist) {
      mobileExist = exist;
    };
  
    methods.get = function () {
      return mobileExist;
    };
  
    return methods;
  });
  

});
