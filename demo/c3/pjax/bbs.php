<?php
    $pjax = isset($_GET['pjax']) ? $_GET['pjax'] : '';
?>

<?php
if(empty($pjax)){
?>
<!doctype html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>SPA</title>
	<link rel="stylesheet" href="http://v3.bootcss.com/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="style.css">
	<script src="http://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
</head>
<body>
	<header class="navbar navbar-fixed-top">
		<a href="/" class="navbar-brand logo"><span class="glyphicon glyphicon-qrcode"></span></a>
		<h1>PhotoShop学习教室-BBS</h1>
	</header>
	<nav class="navbar navbar-default navbar-fixed-left">
		<div class="navbar-inner">
			<ul class="nav navbar-nav">
				<li>
					<a href="index.php">
						<span class="glyphicon glyphicon-home"></span>
						<div>教室大厅</div>
					</a>
				</li>
				<li>
					<a href="live.php">
						<span class="glyphicon glyphicon-facetime-video"></span>
						<div>直播区</div>
					</a>
				</li>
				<li>
					<a href="bbs.php" class="current">
						<span class="glyphicon glyphicon-comment"></span>
						<div>交流区</div>
					</a>
				</li>
			</ul>
		</div>
	</nav>
	<main class="main">
		<div class="main-inner">
			<div class="container">
				<div id="content" class="content">
<?php } ?>					
            <!-- 讨论区 -->
            <div class="r-t r-t-b bbs-title">
                <span class="r-t-line"></span>
                <h3>交流区</h3>
                <div class="r-t-txt">主题：<span class="fc-ff90">5</span> | 帖子：<span class="fc-ff90">14</span>　　管理员：<span class="fc-ff90"><a href="/home/1" target="_blank">龙腾虎跃</a></span>、<span class="fc-ff90"><a href="/home/164" target="_blank">SK</a></span>、<span class="fc-ff90"><a href="/home/49502" target="_blank">Simon</a></span>、<span class="fc-ff90"><a href="/home/112001" target="_blank">DreamX</a></span>、<span class="fc-ff90"><a href="/home/460119" target="_blank">小阿</a></span>、<span class="fc-ff90"><a href="/home/1061668" target="_blank">很炫的昵称</a></span>、<span class="fc-ff90"><a href="/home/1290932" target="_blank">洪少V</a></span>、<span class="fc-ff90"><a href="/home/1577276" target="_blank">Lee</a></span></div>
                
                            </div>
            <form action="/courses/GliveApi.php" method="post" id="J_bbsform">
            <table class="bbs-tb">
                <thead>
                    <tr>
                        <th class="bbs-filter">
                            <a href="/classroom/s4/bbs?by=re" class="current">最新回复</a>
                            <a href="/classroom/s4/bbs?by=new">最新主题</a>
                            <a href="/classroom/s4/bbs?by=hot">热门主题</a>
                                                    </th>
                        <th class="bbs-author">作者</th>
                        <th class="bbs-commit fn-text-m">回复/查看</th>
                        <th class="bbs-publish">最后发布</th>
                    </tr>
                </thead>                
                <tbody>
                	                    <tr>
                        <td>
                                                        <a href="/classroom/s4/bbs/42" class="bbs-t">翼虎网学习教室交流区管理条例</a>                                                                                </td>
                        <td>
                            <a href="/home/460119" target="_blank">小阿</a>
                            <span class="d-b">2013-10-17 10:27</span>
                        </td>
                        <td class="fn-text-m">
                            <b><a href="/classroom/s4/bbs/42">4</a></b>
                            <span class="d-b">184</span>
                        </td>
                        <td>
                        	                            <a href="/home/1290932" target="_blank">洪少V</a>
                            <span class="d-b">2013-10-17 17:17</span>
                                                    </td>
                    </tr>
                                        <tr>
                        <td>
                                                        <a href="/classroom/s4/bbs/64" class="bbs-t">Photoshop案例公开课-按钮的制作</a>
                                                                                                            </td>
                        <td>
                            <a href="/home/1577276" target="_blank">Lee</a>
                            <span class="d-b">2013-10-17 16:50</span>
                        </td>
                        <td class="fn-text-m">
                            <b><a href="/classroom/s4/bbs/64">1</a></b>
                            <span class="d-b">70</span>
                        </td>
                        <td>
                        	                            <a href="/home/19" target="_blank">bear</a>
                            <span class="d-b">2013-10-21 13:13</span>
                                                    </td>
                    </tr>
                                        <tr>
                        <td>
                                                        <a href="/classroom/s4/bbs/86" class="bbs-t">翼虎.yh视频格式转换成其它格式，怎么做？</a>
                                                                                                            </td>
                        <td>
                            <a href="/home/1586556" target="_blank">veryip7</a>
                            <span class="d-b">2013-10-20 22:06</span>
                        </td>
                        <td class="fn-text-m">
                            <b><a href="/classroom/s4/bbs/86">1</a></b>
                            <span class="d-b">15</span>
                        </td>
                        <td>
                        	                            <a href="/home/19" target="_blank">bear</a>
                            <span class="d-b">2013-10-21 10:58</span>
                                                    </td>
                    </tr>
                                        <tr>
                        <td>
                                                        <a href="/classroom/s4/bbs/73" class="bbs-t">50个国外电子商务网站欣赏</a>
                                                                                                            </td>
                        <td>
                            <a href="/home/1577276" target="_blank">Lee</a>
                            <span class="d-b">2013-10-17 17:43</span>
                        </td>
                        <td class="fn-text-m">
                            <b><a href="/classroom/s4/bbs/73">5</a></b>
                            <span class="d-b">96</span>
                        </td>
                        <td>
                        	                            <a href="/home/460119" target="_blank">小阿</a>
                            <span class="d-b">2013-10-18 18:03</span>
                                                    </td>
                    </tr>
                                        <tr>
                        <td>
                                                        <a href="/classroom/s4/bbs/65" class="bbs-t">Photoshop案例公开课-创意APP ICON</a>
                                                                                                            </td>
                        <td>
                            <a href="/home/1577276" target="_blank">Lee</a>
                            <span class="d-b">2013-10-17 16:52</span>
                        </td>
                        <td class="fn-text-m">
                            <b><a href="/classroom/s4/bbs/65">1</a></b>
                            <span class="d-b">66</span>
                        </td>
                        <td>
                        	                            <a href="/home/724811" target="_blank">你de账号被盗</a>
                            <span class="d-b">2013-10-17 17:31</span>
                                                    </td>
                    </tr>
                                    </tbody>
                            </table>
            </form>
            <div class="ui-page data-table-ft"><span class="PAGE_INFO">共5条 10/页</span><a class="PAGE_NUM current">1</a></div>

<?php if(empty($pjax)){ ?>
				</div>
			</div>
		</div>
	</main>
	<script>
		/*$(function(){
			var content = $("#content");
			
			var auto = function(){
				var winH = $(window).height();
				content.css('height', (winH - 80) +'px');
			};

			auto;
			$(window).on("resize", auto);
		});*/
	</script>
</body>
</html>
<?php }?>