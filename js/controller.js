function FakePlayer(username) {
    this.userId = 0;
    this.userName = username || "Компьютер";
    this.getRank = function() {return 0;};
};

function SweeperController() {
    this.turns = [];
    this.type = "single";
    this.isYourTurn = true;
    this.gameOver = false;

    this.player1 = new FakePlayer("Игрок 1");
    this.player2 = new FakePlayer();
    this.ai = new NimAI();

    this.field = new Field([1,3,5,7]);
    this.actuator = new HTMLActuator(this);

    var self = this;
    setTimeout(function() {
        self.actuator.showCanvasStatus("Взявший последнюю спичку выигрывает",10*1000);
    },500);
};

SweeperController.prototype.generateUserParams = function( ) {
    return {

    };
};

SweeperController.prototype.setMode = function(data) {
    if(client.socket.isConnected) {
        client.setMode(data);
    } else {
        this.actuator.showCanvasStatus("Отсутствует соединение с сервером");
    }

};

SweeperController.prototype.setStatus = function(value) {
    $(".status .status_text").hide();
    $(".status .status_text[data-code='"+value+"']").show();
};

SweeperController.prototype.dropProgress = function() {

};

SweeperController.prototype.onCellClicked = function(data) {
    var self = this;

    if(this.type === "single") {

        client.soundManager.playSound('turn');

        data.player = this.player1;
        this.field.removeStones(data);
        if(this.isGameOver()) {
            this.setStatus(2);
            this.actuator.setScore(parseInt($(".score__1").text())+1, $(".score__2").text());
            client.soundManager.playSound('win');
        } else {
            this.aiTimeout = setTimeout(function() {
                self.computer__makeMove();
            }, 1500);
        }

        this.actuator.hideCanvasStatus();

    } else if(this.type === "multiplayer") {
        this.sendTurn(data);
    }

    this.setYourTurn(false);

};

SweeperController.prototype.sendTurn = function(turn) {
    client.gameManager.sendTurn({
        turn: turn
    });
};

SweeperController.prototype.computer__newGame = function() {
    clearTimeout(this.aiTimeout);
    this.field.createNew(client.currentMode === "marienbad" ? [1,3,5,7] : undefined);
    this.setYourTurn(true);
};

SweeperController.prototype.computer__makeMove = function() {
    var decision = this.ai.makeDecision(game.field.getList());
    if(decision) {
        decision.player = this.player2;
        this.field.removeStones(decision);
        client.soundManager.playSound('turn');

        if(this.isGameOver()) {
            this.setStatus(3);
            this.actuator.setScore($(".score__1").text(), parseInt($(".score__2").text())+1);
            setTimeout(function() {
                client.soundManager.playSound('lose');
            }, 100);
        } else {
            this.setYourTurn(true);
        }



    } else {
        throw new Error("Empty AI decision!");
    }
};

SweeperController.prototype.computer__restartGame = function() {
    clearTimeout(this.aiTimeout);
    game.field.restart();
    this.setYourTurn(true);
};

SweeperController.prototype.dropField = function() {
    this.dropProgress();
};

SweeperController.prototype.setType = function(type) {
    this.type = type;

    if(this.type == "single") {
        this.actuator.typeSingle();
    } else if(this.type == "multiplayer") {
        this.actuator.typeMultiplayer();
    }
};

SweeperController.prototype.setPlayers = function(players) {
    if(players[0].userId == client.getPlayer().userId) {
        this.player1 = players[0];
        this.player2 = players[1];
    } else if(players[1].userId == client.getPlayer().userId) {
        this.player1 = players[1];
        this.player2 = players[0];
    } else {
        this.player1 = players[0];
        this.player2 = players[1];
    }

    this.actuator.player1.update(this.player1);
    this.actuator.player2.update(this.player2);
};

SweeperController.prototype.setYourTurn = function(isYourTurn) {
    this.isYourTurn = isYourTurn;
    this.setStatus(isYourTurn ? 0 : 1);
};

SweeperController.prototype.isGameOver = function() {
    return this.field.isGameOver();
};

SweeperController.prototype.onLogin = function(data) {
    this.player1 = client.getPlayer();
    this.actuator.player1.update(this.player1);
    game.actuator.player2.update(this.player2);
};

SweeperController.prototype.onModeSwitch = function(data) {
    $(".mode").removeClass("active");
    $(".mode_"+data).addClass("active");
    if(this.type == "single") {
        this.computer__newGame();
        this.actuator.setScore(0,0);
    }

};

SweeperController.prototype.gameStarted = function(data) {
    clearTimeout(this.aiTimeout);
    this.setType("multiplayer");

    if(client.currentMode != data.inviteData.mode) {
        this.setMode(data.inviteData.mode);
    }

    this.setPlayers(data.players);

    this.actuator.setScore(data.score[this.player1.userId], data.score[this.player2.userId]);
    this.actuator.hideCanvasStatus();
};
SweeperController.prototype.roundStart = function(data) {
    this.dropField();
    this.dropProgress();

    this.field.createNew(data.inviteData.field);
    this.setYourTurn(data.first == this.player1);
};
SweeperController.prototype.onTurn = function(data) {
    this.field.removeStones(data.turn.turn);

};
SweeperController.prototype.onSwitchPlayer = function(data) {
    this.setYourTurn(data.userId == this.player1.userId);
};
SweeperController.prototype.roundEnd = function(data) {
    this.field.enable(false);

    if(this.type == "multiplayer") {
        var statusValue = data.winner == null ? 4 : data.winner == this.player1.userId ? 2 : 3;
        this.setStatus(statusValue);

    } else if(this.type == "spectator") {
        var text = "";
        if(data.result == "draw") {
            text = "Ничья";
        } else if(data.winner != null) {
            if(data.winner == this.player1.userId) text = this.player1.userName + " выиграл партию";
            else if(data.winner == this.player2.userId) text = this.player2.userName + " выиграл партию";
        } else {
            text = "Ничья";
        }
        this.actuator.showCanvasStatus(text, 5000);
    }

    this.actuator.setScore(data.score[this.player1.userId], data.score[this.player2.userId]);
};
SweeperController.prototype.onLeaveGame = function() {
    this.field.createNew(client.currentMode === "marienbad" ? [1,3,5,7] : undefined);
    this.setYourTurn(true);
    this.setType("single");
    this.setPlayers([client.getPlayer(), new FakePlayer()]);

    this.actuator.hideCanvasStatus();
    this.actuator.setScore(0, 0);

};
SweeperController.prototype.gameLoad = function(data) {};
SweeperController.prototype.syncTurns = function(data) {};
SweeperController.prototype.onTime = function(data) {
    this.actuator.setTime(data.userTimeFormat);
};
SweeperController.prototype.showProfile = function(data) {};
SweeperController.prototype.settingsChanged = function(data) {};
SweeperController.prototype.onClientEvent = function(data) {

    if(data.target === this.player1.userId) {

        this.actuator.hideCanvasStatus();

    } else if(data.target == "room") {
        if(data.user == this.player2.userId) {

        }
    }

    if(data.user == this.player1.userId) {

    } else if(data.user == this.player2.userId) {

    }


};

SweeperController.prototype.settingsChanged = function(data) {};
SweeperController.prototype.settingsSaved = function(data) {

};