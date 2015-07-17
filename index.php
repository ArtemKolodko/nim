<!DOCTYPE html>
<html id="gameHtml">
<head>
    <title>Ним</title>
    <meta charset="utf-8">
    <meta name="description" content="Сапер - онлайн игра для двух соперников. История, рейтинги."/>
    <meta name="robots" content="all"/>
    <link rel="shortcut icon" href="/minesweeper/favicon.ico" type="image/x-icon">
    <?php
        $gameId = 32;
        include_once("php/auth.php");
        $ver = $v."_0.0.1";
        include_once("php/include.php");
    ?>
</head>

<body>
    <?php include_once("layots/about_game.html"); ?>
    <div class="mainWrapper">
        <div class="mainWrapper__column column1" style="min-width: 260px;"><?php include_once("layots/column1.php"); ?></div>
        <div class="mainWrapper__column column2"><div class="gameSquare"><?php include_once("layots/column2.php"); ?>
            </div>
            <div id="bottomDataWrapper">
                <?php
                    include '../snippets/lg-profile.htm';
                    include '../snippets/lg-guestbook.htm';
                ?>
            </div>
            <div class="stats__container" style="text-align: center;font-size: 12px;  margin-top: 10px;">
                <?php
                    include_once("../snippets/lg-activity.htm");
                ?>
            </div>
        </div>
    </div>
</body>
</html>