<?php

/**
 * jQuery图片剪裁插件Jcrop示例脚本
 * @copyright 2008 Kelly Hallman
 * 此处由张鑫旭翻译以及删改，使更方便理解与掌握
 * 修改by tomieric(www.fenxiangyuan.com)
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	$targ_w = $targ_h = 150; //保存的图片的大小
	$jpeg_quality = 90;

	$src = $_POST['imgurl'];
	$img_r = imagecreatefromjpeg($src);
	$dst_r = ImageCreateTrueColor( $targ_w, $targ_h );

	imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
	$targ_w,$targ_h,$_POST['w'],$_POST['h']);

	header('Content-type: image/jpeg');
	imagejpeg($dst_r,null,$jpeg_quality);

	exit;
}
?>