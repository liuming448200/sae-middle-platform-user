angular
  .module('eduApp')
  .directive('rdTouchStart', rdTouchStart);

function rdTouchStart () {
	var directive = {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('touchstart', function (e) {
				e.preventDefault();
      	e.stopPropagation();
      	
				scope.$apply(attrs.rdTouchStart);
			});

			element.bind('mousedown', function (e) {
				e.preventDefault();
      	e.stopPropagation();
      	
				scope.$apply(attrs.rdTouchStart);
			});
		}
	};

	return directive;
}
