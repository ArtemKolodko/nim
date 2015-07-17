<?php include_once("menu_top.php"); ?>

<div class="centerPanelWrapper">
    <?php include_once("header.php"); ?>
    <div class="gameWrapper" style="position: relative;min-height: 533px;">
        <div class="canvas-status"><span onclick="game.actuator.hideCanvasStatus();"></span></div>
        <div class="fieldWrapper">
            <div class="linesWrapper noselect">
                <div class="stonesLine stonesLine_0" data-line="0"></div>
                <div class="stonesLine stonesLine_1" data-line="1"></div>
                <div class="stonesLine stonesLine_2" data-line="2"></div>
                <div class="stonesLine stonesLine_3" data-line="3"></div>
                <div class="stonesLine stonesLine_4" data-line="4"></div>
            </div>
        </div>
    </div>

</div>

<div id="field""><?php include '../snippets/lg-login-register.htm';  ?></div>

<?php include_once("menu_bottom.php"); ?>