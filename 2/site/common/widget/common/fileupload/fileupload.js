angular
	.module('eduApp')
	.directive('rdFileupload', ['$parse', 'dialogService', rdFileupload]);

function rdFileupload ($parse, dialogService) {
	var directive = {
		restrict: 'A',
		link: function(scope, element, attrs) {
      var model = $parse(attrs.rdFileupload);
      var modelSetter = model.assign;
      
      element.bind('change', function(event){
        var oldFileName = scope.myFile && scope.myFile.name;
        var file = element[0].files[0];

        var fileType = attrs.accept;
        if ('audio/*' === fileType) {
          if ('audio/mp3' !== file.type) {
            element.val(oldFileName);
            var tip = '请上传MP3格式的音频文件';
            dialogService.dialog(tip);

            return;
          }
        } else if ('video/*' === fileType) {
          if ('audio/mp4' !== file.type) {
            element.val(oldFileName);
            var tip = '请上传MP4格式的视频文件';
            dialogService.dialog(tip);

            return;
          }
        } else {
          element.val(oldFileName);
          var tip = '上传文件的格式不支持';
          dialogService.dialog(tip);

          return;
        }

        scope.$apply(function(){
          modelSetter(scope, file);
        });

        scope.getFile(scope.myFile);
      });
    }
	};

	return directive;
}
