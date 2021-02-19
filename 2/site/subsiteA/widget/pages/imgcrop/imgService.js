angular.module('eduApp').factory('imgService', function () {
  var imgFile = {
    filename: '',
    file: ''
  };

  var methods = {};

  methods.set = function (name, pic) {
    imgFile.filename = name;
    imgFile.file = pic;
  };

  methods.get = function () {
    return imgFile;
  };

  methods.reset = function () {
    imgFile.filename = '';
    imgFile.file = '';
  };

  return methods;
});
