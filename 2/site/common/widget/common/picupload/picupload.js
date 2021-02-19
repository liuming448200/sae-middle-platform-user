angular
	.module('eduApp')
	.directive('rdPicupload', ['$parse', 'dialogService', rdPicupload]);

function rdPicupload ($parse, dialogService) {
	var directive = {
		restrict: 'A',
		link: function(scope, element, attrs) {
      var model = $parse(attrs.rdPicupload);
      var modelSetter = model.assign;
      
      element.bind('change', function(event){
        var oldFileName = scope.myPic && scope.myPic.name;
        var file = element[0].files[0];
        if (!/image\/\w+/.test(file.type)) {
          element.val(oldFileName);
          var tip = '请上传JPG,PNG,BMP格式的图片';
          dialogService.dialog(tip);

          return;
        }

        scope.$apply(function(){
          modelSetter(scope, file);
        });

        scope.getPic(scope.myPic);
      });
    }
	};

	return directive;
}
