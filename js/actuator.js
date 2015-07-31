function HTMLPlayer(wrapper) {
    this.wr = wrapper;
    this.leftPlayer = wrapper == ".onePlayer.floatL";

    this.update = function(data) {
        this.setUsername(data.userName, data.userId);
        this.setRank(data.getRank());
        this.setPoints(0);
    };

    this.setUsername = function(username, userid) {
        userid = typeof userid == "undefined" ? 0 : userid;
        $(this.wr+" .onePlayer__username").text(username).attr("attr-userid", userid);
    };

    this.setRank = function(rank) {
        rank = rank > 0 ? rank : "—";
        $(this.wr+" .onePlayer__rank").text(rank);
    };

    this.setPoints = function(points) {
        $(this.wr+" .onePlayer__additional .points .points_number").text(points);
    };

    this.setProgress = function(total, opened) {
        var wrapper = this.leftPlayer ? ".results_player1" : ".results_player2";
        var percent = ( (opened) / (total - game.field.minesNumber))*100;

        if(opened > 0) {
            $(wrapper+" .resultsLine").animate({ "height": percent+"%" }, 300, function() {});
        } else {
            $(wrapper+" .resultsLine").stop().css("height", percent+"%");
        }


        var openedText = opened == 0 ? "-" : opened;
        $(wrapper+" span").text(openedText);
    };
};

function HTMLActuator(controller) {
    this.controller = controller;
    this.player1 = new HTMLPlayer(".onePlayer.floatL");
    this.player2 = new HTMLPlayer(".onePlayer.floatR");
};

HTMLActuator.prototype.typeSingle = function() {
    $(" .button_leavegame, .button_draw, .button_throw, .onePlayer__additional,.timeWrapper").hide();
    $(".button_newgame, .button_restart").show();

};

HTMLActuator.prototype.typeMultiplayer = function() {
    $(" .button_leavegame, .button_draw, .button_throw, .onePlayer__additional, .timeWrapper").show();
    $(".button_newgame, .button_restart").hide();

};

HTMLActuator.prototype.setScore = function( score1, score2 ) {
    $(".score__1").text(score1);
    $(".score__2").text(score2);
};

HTMLActuator.prototype.setTime = function( time ) {
    $(".timeWrapper .time").text(time);
};


HTMLActuator.prototype.onSizeChanged = function(data) {
    paddingTable = {
        15: 20,
        20: 20,
        25: 0
    };

    var padding = typeof paddingTable[data.width] != "undefined" ? paddingTable[data.width] : 0;

    $(".gameWrapper").css({
        "padding-top": padding+"px"
    });
};


HTMLActuator.prototype.showCanvasStatus = function (text, latency) {
    var visibleOnPage = $(".canvas-status span").is(":visible");
    var latency = parseInt(latency) || 3000;
    var fadeInDuration = visibleOnPage ? 0 : 400;
    clearTimeout(this.canvasStatusTimeout);

    $(".canvas-status span").html(text).fadeIn({duration: fadeInDuration});
    $(".canvas-status").fadeIn({duration: fadeInDuration}).css("left", $(".centerPanelWrapper").width()/2-($(".canvas-status span").width()/2+10));
    this.canvasStatusTimeout = setTimeout(this.hideCanvasStatus, latency);
};

HTMLActuator.prototype.hideCanvasStatus = function () {
    var visibleOnPage = $(".canvas-status span").is(":visible");
    var fadeOutDuration = visibleOnPage ? 0 : 400;
    clearTimeout(this.canvasStatusTimeout);
    $(".canvas-status span").fadeOut({duration: fadeOutDuration});
};

HTMLActuator.prototype.scrollTop = function() {
    $('html, body').animate({ scrollTop: 0 }, 300);
}

HTMLActuator.prototype.scrollBottom = function() {
    $('html, body').animate({ scrollTop: $("#bottomDataWrapper").offset().top - 200 }, 300);
};