angular.module('eduApp').factory('dialogService', function () {

	var methods = {};

	methods.dialog = function (tip, callback, hideFlag) {
		$('#fangxiangModal').on('show.bs.modal', function () {
      $(this).off('show.bs.modal');
      $(this).find('.modal-body').html(tip);

      var dom = $(this).find('.btn-success');
      dom.on('click', function () {
        $(this).off('click');
        $('#fangxiangModal').modal('hide');
        callback && callback();
      });

      if ('undefined' === typeof(callback) || hideFlag) {
        var dom1 = $(this).find('.btn-default');
        dom1.hide();
      }
    }).on('hiden.bs.modal', function () {
      $(this).off('hiden.bs.modal');

      if ('undefined' === typeof(callback) || hideFlag) {
        var dom1 = $(this).find('.btn-default');
        dom1.show();
      }
    }).modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
	};

	return methods;
});
