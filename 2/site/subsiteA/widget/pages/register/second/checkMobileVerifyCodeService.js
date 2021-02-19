angular.module('eduApp').factory('checkMobileVerifyCodeService', function () {
  var verifyCodeChecked = false;

  var methods = {};

  methods.set = function (checked) {
    verifyCodeChecked = checked;
  };

  methods.get = function () {
    return verifyCodeChecked;
  };

  return methods;
});
