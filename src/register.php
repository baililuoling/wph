<?php
require './connect.php';
$us=$_REQUEST["us"];
$psd=$_REQUEST["psd"];
$sql01="SELECT * FROM info WHERE username='$us'";
$result01=mysqli_query($connect,$sql01);
$rows=mysqli_num_rows($result01);
if($rows>0){
	echo "0";
}else{
	$sql02="INSERT INTO info (username,password) VALUES ('$us','$psd')";
	$result02=mysqli_query($connect,$sql02);
	if($result02){
		echo "注册成功";
	}else{
		echo "添加失败";
	}
}
?>