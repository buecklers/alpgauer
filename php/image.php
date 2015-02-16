<?php
require_once 'securimage/securimage.php';
$options = array("show_audio_button"=>false, "image_attributes"=>array("height"=>"40px"), "show_refresh_button"=>false);
?>

<div>
   <?php echo Securimage::getCaptchaHtml($options) ?>
</div>