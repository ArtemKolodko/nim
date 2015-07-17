<?php
require_once($_SERVER['DOCUMENT_ROOT']."/sharedAPI/LogicGameSessionManager.php");
require_once($_SERVER['DOCUMENT_ROOT']."/sharedAPI/LogicGameLocalization.php");
require_once($_SERVER['DOCUMENT_ROOT']."/sharedAPI/LogicGameVkAuth.php");
require_once($_SERVER['DOCUMENT_ROOT']."/sharedAPI/LogicGameResourceManager.php");

$sm = new LogicGameSessionManager($gameId);
$s = $sm->getAuthServerInstance();
$s->updateActivity();

// Vk auth
$isVk = false;
$vkAuth = new LogicGameVkAuth($s, $sm);
$vkAuth->tryVkAuth();
$isVk = $vkAuth->hasVkAuth();

$isFreshUser = $sm->isFreshUser();
$i18n = $s->getI18n();

// определяем, локально запущена игра или на сервере
$local = ($_SERVER['HTTP_HOST'] == "localhost" || $_SERVER['HTTP_HOST'] ==  "192.168.245.130");
$testServer = ($_SERVER['HTTP_HOST'] == "test.logic-games.spb.ru");
?>

<script type="text/javascript">
    var _sessionId = "<?php echo $s->getSessionId(); ?>";
    var _userId = <?php echo $s->getUserId(); ?>;
    var _sign = "<?php echo $s->getSign('666'); ?>";
    var _username = "<?php echo $s->getUsername(); ?>";
    var _isBot = _username == "Бот Yixin";
    var _isGuest = <?php if ($s->isGuest()) echo "true"; else echo "false"; ?>;
    var _gameVariationId = <?php echo $s->getGameVariationId(); ?>;
    var _isFreshUser = <?php echo $isFreshUser ? 'true' : 'false'; ?>;
    var _isVk = <?php echo $isVk ? 'true' : 'false'; ?>;
    var _isSuperUser = <?php echo $s->isSuperUser() ? 'true' : 'false'; ?>;
    var _isLocal = <?php echo $local ? 'true' : 'false'; ?>;
    var _isTest = <?php echo $testServer ? 'true' : 'false'; ?>;
    var GAME_ID = <?php echo $s->getGameVariationId(); ?>;

    if(_isVk) {
        console.log("Trying to apply VK styles...");
        try {
            var element = document.getElementById("gameHtml");
            element.classList.add("body-wrap__VK");
        } catch(e) {
            console.log("vk styles error", e);
        }
    }
</script>