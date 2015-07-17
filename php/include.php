<?php

if(!$isVk) echo '<script src="//vk.com/js/api/openapi.js" type="text/javascript"/></script>';
else echo "<script src='//vk.com/js/api/xd_connection.js?2' type='text/javascript'></script>";

echo "<script type='text/javascript' src='/js/build/public.min.js?v=$v'></script> \n\r";
echo "<script type='text/javascript' src='/js/build/shared-all.js?v=$v'></script> \n\r";

echo "<script type='text/javascript' src='/js/lang/lang.".$s->getI18n()->get("locale", "id").".js?v=$v'></script> \n\r";
echo "<link media='screen' href='/css/build/shared.css?v=$v' rel='stylesheet' type='text/css'>\n\r";

?>

<link rel="stylesheet" href="//logic-games.spb.ru/v6-game-client/build/v6-game-client.css?v=<?php echo $v;?>"/>

<link rel="stylesheet" type="text/css" href="stylesheets/header.css?v=<?php echo $ver;?>">
<link rel="stylesheet" type="text/css" href="stylesheets/menu.css?v=<?php echo $ver;?>">
<link rel="stylesheet" type="text/css" href="stylesheets/field.css?v=<?php echo $ver;?>">
<link rel="stylesheet" type="text/css" href="stylesheets/main.css?v=<?php echo $ver;?>">
<link rel="stylesheet" type="text/css" href="stylesheets/replaced.css?v=<?php echo $ver;?>">

<script src="js/actuator.js?v=<?php echo $ver;?>"></script>
<script src="js/bind_events.js?v=<?php echo $ver;?>"></script>
<script src="js/nim_ai.js?v=<?php echo $ver;?>"></script>
<script src="js/field.js?v=<?php echo $ver;?>"></script>
<script src="js/controller.js?v=<?php echo $ver;?>"></script>
<script src="js/application.js?v=<?php echo $ver;?>"></script>


<script src="//logic-games.spb.ru/v6-game-client/app/lib/underscore-min.js"></script>
<script src="//logic-games.spb.ru/v6-game-client/app/lib/backbone-min.js"></script>
<script src="//logic-games.spb.ru/v6-game-client/build/v6-game-client.js?v=<?php echo $v;?>"></script>
