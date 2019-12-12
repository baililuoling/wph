<?php
require './connect.php';
if(array_key_exists("username",$_COOKIE)&&array_key_exists("password",$_COOKIE)){
	$us=$_COOKIE["username"];
	$psd=$_COOKIE["password"];
}
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