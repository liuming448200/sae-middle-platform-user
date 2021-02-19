angular
  .module('eduApp')
  .directive('rdTouchEnd', rdTouchEnd);

function rdTouchEnd () {
	var directive = {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('touchend', function (e) {
				e.preventDefault();
      	e.stopPropagation();
      	
				scope.$apply(attrs.rdTouchEnd);
			});

			element.bind('mouseup', function (e) {
				e.preventDefault();
      	e.stopPropagation();
      	
				scope.$apply(attrs.rdTouchEnd);
			});
		}
	};

	return directive;
}
