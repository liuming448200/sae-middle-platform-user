define('common:widget/uploadFileService/uploadFileService', function(require, exports, module) {

  angular.module('eduApp').service('uploadFileService', ['$q', function ($q) {
    var onLoad = function(reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };
  
    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };
  
    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      return reader;
    };
  
    var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);
      return deferred.promise;
    };
  
    var methods = {};
  
    methods.readAsDataUrl = readAsDataURL;
  
    return methods;
  }]);
  

});
