{%extends file="common/page/layout.tpl"%}
{%block name="main"%}
  <div class="admin-content">
    <div ui-view></div>
  </div>
  <div class="modal fade" id="fangxiangModal" tabindex="-1" role="dialog" aria-labelledby="fangxiangModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="fangxiangModalLabel">方向教育管理平台</h4>
        </div>
        <div class="modal-body">

        </div>
        <div class="modal-footer" style="text-align:center;">
          <button type="button" class="btn btn-success">确定</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
  <rd-waiting ng-if="waiting"></rd-waiting>
  <rd-toast toast="toast"></rd-toast>
  {%script%}
    require('./widget/main/main');
  {%/script%}
{%/block%}
