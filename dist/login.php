<?php
require './connect.php';
$us=$_REQUEST["us"];
$psd=$_REQUEST["psd"];
$sql="SELECT * FROM info WHERE username='$us' AND password='$psd'";
$result=mysqli_query($connect,$sql);
$rows=mysqli_num_rows($result);
if($rows>0){
	echo "1";
	setcookie("username",$us,time()+24*3600);
	setcookie("password",$psd,time()+24*3600);
}else{
	echo "0";
	setcookie("username",$us,time()-1);
	setcookie("password",$psd,time()-1);
}
?>