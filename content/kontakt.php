<?php
session_start();
header("Content-Type: text/html; charset=utf-8");
require_once '../php/securimage/securimage.php';
$options = array("show_audio_button"=>false,
    "image_attributes"=>array(
        "height"=>"40px",
        "margin"=>"-2px"
        ),
    "show_refresh_button"=>false,
    "show_text_input"=>false
    );
?>

<div class="row row-centered content-inner">           
  <div class="col-md-6 col-centered col-left" ng-class="target+'_leftback'">
      <p class="white">ALPGAUER</p>
        <p class="white">
          Ralf Hindsches<br>
          Klosterstrasse 34<br>
          D-79777 Ühlingen-Berau<br>
          +49 (0) 7747 91 0 91<br>
          +49 (0) 171 532 79 66<br>
        </p>
        <p class="white">
        <a href="#/impressum" style="color:white; text-decoration:none" ng-click="go('impressum')">Impressum</a>
        </p>
  </div>
  <div class="col-md-6 col-centered col-right" ng-controller="FormCtrl">
    <div ng-show="!sent">
      <form name="kontakt" ng-submit="submit()">
        <label>Anrede</label>
        <select ng-model="formular.gender">
          <option></option>
          <option>Frau</option>
          <option>Herr</option>
        </select>
        <br>
        <label>Vorname</label>
        <input ng-model="formular.vorname" />
        <br>
        <label>Nachname</label>
        <input ng-model="formular.nachname" />
        <br>
        <label>Email</label>
        <input type="email" ng-required="true" ng-model="formular.email" name="email" placeholder="name@example.com" />
        <span class="error" ng-show="kontakt.email.$error.email">keine E-Mail adresse</span>
        <br>      
        <label class="inline">Ihre Nachricht</label><br>
        <textarea name="nachricht" required ng-model="formular.nachricht" rows="6" cols="30" ></textarea>
        <br>
        <div>
            <?php echo Securimage::getCaptchaHtml($options) ?>
        </div>
        <input class="white" name="captcha" ng-model="formular.captcha" placeholder="{{formular.captchaPlaceholder}}"/>
        <input type="submit" value="Senden" style="border-color:rgb(228, 220, 220)">
      </form>
    </div>
    <div ng-show="sent">
      <h2>Danke für Ihre Nachricht. Wir werden uns umgehend bei Ihnen melden</h2>
    </div>
  </div>           
</div>