/**
 * 提示IE6不兼容
 * Created by tommyshao@ipiao.com on 2014/5/31.
 * MIT
 */
~(function(window, $, undefined){
    var browserLink = {
        firefox: "http://download.firefox.com.cn/releases/webins3.0/official/zh-CN/Firefox-latest.exe",
        chrome: "http://dlc2.pconline.com.cn/filedown_51614_6750119/F09ttWy3/CHRZ_Chrome_non_defaultV5.exe",
        opera: "http://www.opera.com/download/get.pl?id=35318&amp;location=381&nothanks=yes&sub=marine",
        safari: "http://dlc2.pconline.com.cn/filedown_44487_6712048/tNzpSqke/SafariSetup.exe",
        ie8: "http://download.microsoft.com/download/7/5/F/75F4B95A-4F42-4782-BD91-6DE0F7342F5F/IE8-WindowsXP-KB2618444-x86-CHS.exe"
    };

    var template = [
        '<div class="kill-ie6">',
        '   <div class="kill-ie6-info">您正在使用 Internet Explorer 6 或 更低版本浏览网页，这些过时的浏览器会导致页面出现不可预知的问题。</div>',
        '   <div class="kill-ie6-info">推荐您使用以下<b>安全</b>、<b>高效</b>、<b>快速</b>的高级浏览器，它可以使您获得更好的浏览体验。</div>',
        '   <ul>',
        '   </ul>',
        '   <a href="javascript:;" id="closeKillIe6" class="kill-ie6-btn">关闭，继续浏览</a>',
        '</div>'
    ];
    for(var b in browserLink){
        template.splice(template.length-3, 0 ,'<li><a target="_blank" class="'+ b +'" href="'+ browserLink[b]+'"></a><div>'+ b +'</div></li>');
    }

    var style = $.createElement('link');
    var maskLayer = $.createElement('div');
    var showModal = $.createElement('div');

    // style
    style.setAttribute('type', 'text/css');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', 'style.css');

    maskLayer.className = 'kill-ie6-mask';
    showModal.className = 'kill-ie6-layer';
    showModal.innerHTML = template.join('');

    maskLayer.style.height = $.body.clientHeight+'px';

    $.getElementsByTagName('head')[0].appendChild(style);

    $.body.appendChild(showModal);
    $.body.appendChild(maskLayer);

    var closeBtn = $.getElementById('closeKillIe6');
    closeBtn.attachEvent('onclick', function(){
        $.body.removeChild(maskLayer);
        $.body.removeChild(showModal);
    });

})(window, document, undefined);