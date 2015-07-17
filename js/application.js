function StartApp() {

    var settingsTemplate = '<div>' +
        '<p>Настройки игры</p><div> ' +
        '<div class="option"><label><input type="checkbox" name="sounds">Включить звук</label></div> ' +
        '<div class="option"><label><input type="checkbox" name="disableInvite">Запретить приглашать меня в игру</label> </div>' +
        '</div>';

    var clientOptions = {
        port: 8032,
        https: true,
        game:'nim',
        //domain: "logic-games.spb.ru",
        resultDialogDelay: 1000,
        turnTime: 60,
        idleTimeout: 60,
        reload: true,
        autoShowProfile: true,
        getUserParams: function() {
            return game.generateUserParams();
        },
        generateInviteText: function(invite){
            console.log("invite: ", invite);

            var fieldInformation = " на поле <span style='color: #069'>"+invite.data.width+"x"+invite.data.height+"</span>, количество мин: от "+(invite.data.minesNumber-2) + " до "+(invite.data.minesNumber+2);

            var rank = invite.from.getRank() != "—" ? " ("+invite.from.getRank()+" место в рейтинге)" : " (отсутствует в рейтинге)";
            var inviteStr = 'Игрок «<span style="font-weight: bold;">' + invite.from.userName + '</span>»'+
                rank+' предлагает сыграть партию в ' +
                client.modesAlias[invite.data.mode] +
                fieldInformation;

            return inviteStr;
        },
        blocks:{
            userListId:'playerListWrapper',
            chatId:'chatWrapper',
            ratingId:'bottomDataWrapper',
            historyId:'bottomDataWrapper'
            ,profileId:'bottomDataWrapper'
        },
        images: {
            close: '//logic-games.spb.ru/v6-game-client/app/i/close.png',
            spin: '//logic-games.spb.ru/v6-game-client/app/i/spin.gif',
            sortAsc: '//logic-games.spb.ru/v6-game-client/app/i/sort-asc.png',
            sortDesc: '//logic-games.spb.ru/v6-game-client/app/i/sort-desc.png',
            sortBoth: '//logic-games.spb.ru/v6-game-client/app/i/sort-both.png',
            del: '//logic-games.spb.ru/v6-game-client/app/i/delete.png'
        },
        sounds: {
            start: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-game-start.ogg'
            },
            turn: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-game-turn.ogg',
                volume: 0.5,
                enable: false
            },
            win: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-game-win.ogg'
            },
            lose: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-game-lose.ogg'
            },
            invite: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-invite.ogg'
            },
            timeout: {
                src: '//logic-games.spb.ru/v6-game-client/app/audio/v6-timeout.ogg'
            }
        },
        settingsTemplate: settingsTemplate,
        settings: {
            fieldTemplate: "20x20"
        }
    };

    if(_isLocal) {
        clientOptions.https = false;
    }

    if(_isTest) {
        clientOptions.domain = "logic-games.spb.ru";
    }

    window.client = new Client(clientOptions).init();
    game = new SweeperController();
    $.ui.dialog.prototype._focusTabbable = function(){};

    client.on('login', function(data) {
        console.log('main;', 'login', data.userId, data.userName, data);
        var you =  client.getPlayer();
        game.onLogin(data);
    });

    client.gameManager.on('game_start', function(data){
        console.log('main;','game_start, room: ', data);

        game.gameStarted(data);
    });

    client.gameManager.on('round_start', function(data){
        console.log('main;','round_start, room: ', data);
        game.roundStart(data);
    });

    client.gameManager.on('turn', function(data){
        console.log('main;','turn', data.turn, 'is your turn: ', data.user == client.getPlayer().userId);
        game.onTurn(data, data.user == client.getPlayer().userId);
    });

    client.gameManager.on('switch_player', function(data){
        console.log('main;','switch_player', 'next: ', data, 'is your turn: ', data.userId == client.getPlayer().userId);
        game.onSwitchPlayer(data);
    });

    client.gameManager.on('timeout', function(data){
        console.log('main;','timeout', 'user: ', data.user, 'is your timeout: ', data.user == client.getPlayer().userId);
    });

    client.gameManager.on('round_end', function(data){
        console.log('main;','round_end', data, 'your win: ', data.winner == client.getPlayer().userId);
        game.roundEnd(data);
    });

    client.gameManager.on('game_leave', function(data){
        console.log('main;','game_leave room:', data);

        game.onLeaveGame(data);
    });

    client.historyManager.on('game_load', function(data) {
        console.log('history;','game_load', data);

    });

    client.gameManager.on('game_load', function(data) {
        console.log('game;','game_load', data);
        game.syncTurns(data);
    });

    client.gameManager.on('time', function(data){
        //console.log('main;','time user:', data);
        game.onTime(data);
    });

    client.on('show_profile', function(data){
        console.log('main;','show_profile user:', data);
        game.showProfile(data.userId);
    });

    // динамическое обновление настроек
    client.on('settings_changed', function(data) {
        //console.log('main;','settings_changed:', data);
        game.settingsChanged(data);
    });

    client.on('settings_saved', function(data) {
        console.log('main;','settings_saved:', data);
        game.settingsSaved(data);
    });

    client.gameManager.on('event', function(data){
        console.log('main;','game_event', data);
        game.onClientEvent(data);
    });
};

LogicGame.init(StartApp);