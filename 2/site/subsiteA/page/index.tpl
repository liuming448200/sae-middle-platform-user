{%extends file="common/page/layout.tpl"%}
{%block name="image"%}
  <div style="display:none;">
    <img src="./static/images/logo.jpg" ng-src="{{pageImage}}" alt="方向教育">
  </div>
{%/block%}
{%block name="main"%}
  <div class="web-content">
    <div ui-view></div>
  </div>
  <div class="modal fade" id="fangxiangModal" tabindex="-1" role="dialog" aria-labelledby="fangxiangModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="fangxiangModalLabel">方向教育</h4>
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
  <script type="text/ng-template" id="share.html">
    <div class="modal-header">
      <button type="button" class="close" aria-hidden="true" ng-click="cancel()">&times;</button>
      <h4 class="modal-title">方向教育</h4>
    </div>
    <div class="modal-body">
      <a version="1.0" class="qzOpenerDiv" href="javascript:;" ng-click="openQZone()">
        <div class="share-icon qz-icon"></div>
        <span class="qz-font">QQ空间</span>
      </a>
      <a version="1.0" class="qzOpenerDiv" href="javascript:;" ng-click="openWeibo()">
        <div class="share-icon weibo-icon"></div>
        <span class="qz-font">微博</span>
      </a>
    </div>
    <div class="modal-footer" style="text-align:center;">
      <button type="button" class="btn btn-success" ng-click="cancel()">确定</button>
    </div>
  </script>
  <script type="text/ng-template" id="preorder.html">
    <div class="modal-header">
      <button type="button" class="close" aria-hidden="true" ng-click="cancel()">&times;</button>
      <h4 class="modal-title">方向教育</h4>
    </div>
    <div class="modal-body">
      <h4 class="h4 text-center">{{title}}</h4>
      <p class="help-block">时间：{{date|timeDateFormat}} {{date|weekDayFormat}} {{startTime}}-{{stopTime}}</p>
      <p class="help-block">地点：{{address}}</p>
    </div>
    <div class="modal-footer" style="text-align:center;">
      <button type="button" class="btn btn-success" ng-click="confirm()">确定</button>
      <button type="button" class="btn btn-default" ng-click="cancel()">取消</button>
    </div>
  </script>
  <script type="text/ng-template" id="weixinQrcodePay.html">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button>
      <h4 class="modal-title">微信支付</h4>
    </div>
    <div class="modal-body">
      <img class="img-responsive" style="margin:auto;" ng-mouseenter="scanHelp()" ng-mouseleave="scanHelp()" ng-src="{{qrcodeUrl}}" img-onload="onLoad()" img-onerror="onError()" ng-show="hasQrcode">
      <p ng-show="noQrcode">正在获取微信支付二维码...</p>
      <p ng-show="errorQrcode">获取微信支付二维码失败，请稍后重试</p>
    </div>
    <div class="modal-footer">
      <div style="text-align:center;">
        请使用 <span style="color:#ff6700; cursor: pointer;">微信</span> 扫一扫<br>二维码完成支付
      </div>
    </div>
    <div class="weixin-scan" ng-show="showHelp"></div>
  </script>
  <rd-waiting ng-if="waiting"></rd-waiting>
  <rd-toast toast="toast"></rd-toast>
  {%script%}
    require('./widget/main/main');
  {%/script%}
{%/block%}
