
// left button click
$(document).on("click", ".cell.closed:not(.flag)", function(e) {
    var x = $(this).attr("data-x");
    var y = $(this).attr("data-y");
    game.onCellClicked(x, y);

    if(game.type == "multiplayer" && game.field.active) {
        $(this).addClass("waiting");
    }

});

// right button click
$(document).on("mousedown", ".cell.closed", function(e){
    if( e.button == 2 ) {
        var x = parseInt($(this).attr("data-x"));
        var y = parseInt($(this).attr("data-y"));
        game.onCellClicked(x, y, true);
        return false;
    }
    return true;
});

$(document).on("click", ".menu-buttons__top a", function() {
    var index = parseInt($(this).attr("data-value"));

    switch(index) {
        case 0: break;
        case 1: break;
        case 2: break;
        case 3:
            if(game.type == "single") {
                game.actuator.hideCanvasStatus();
                game.computer__newGame();
            }
            break;
        case 4:
            if(game.type == "multiplayer") {
                client.gameManager.sendDraw();
            }
            break;
        case 5:
            if(game.type == "multiplayer") {
                client.gameManager.sendThrow();
            }
            break;
        case 6:
        if(game.type == "multiplayer") {
            client.gameManager.leaveGame();
        }
        break;
        case 7:
            if(game.type == "single") {
                game.computer__restartGame();
            } break;

        case 8: case 9:
            if(game.type == "single") {
                game.setMode(index == 8 ? "marienbad" : "nim");
            } break;
    }
});

$(document).on("click", ".menu-buttons__bottom a", function() {
    var index = parseInt($(this).attr("data-value"));

    if(index > 0 && index < 3) {
        game.actuator.scrollBottom();
    }

    switch(index) {
        case 0: client.viewsManager.showSettings(); break;
        case 1: client.historyManager.getHistory(); break;
        case 2: client.ratingManager.getRatings(); break;
        case 3: break;
    }
});

$(document).on("click", ".stonesLine .stone:visible", function() {

    if(!game.isYourTurn) {
        throw new Error("Not your turn!");
        return;
    }

    var stones = $(this).nextAll(".visible");

    game.onCellClicked({
        stonesToRemove: stones.length + 1,
        row: parseInt($(this).parent().attr("data-line"))
    });
});

$(document).on("mouseover", ".stonesLine .stone:visible", function() {
    $(".stonesLine .stone").removeClass("stone_hovered");
    var nextAll = $(this).addClass("stone_hovered").nextAll(".visible");

    nextAll.addClass("stone_hovered");
    for(var i=0; i < nextAll.length; i++) {
        //$(nextAll[i]).find(".digit").text(nextAll.length - i);
    }
    $(this).find(".digit").text(nextAll.length + 1);
});

$(document).on("mouseleave", ".stonesLine .stone", function() {
    $(".stonesLine .stone").removeClass("stone_hovered").find(".digit").text("");
});

$(document).on("click",".fieldWrapper", function(e) {
    if( ($(e.target).hasClass("linesWrapper") || $(e.target).hasClass("stonesLine")  ) && game.isGameOver() && game.type == "single") {
        game.computer__restartGame();
    }
});

$(document).on("click", ".giveTurn span", function() {
    if(game.type == "single" && game.isYourTurn) {
        game.setYourTurn(false);
        game.aiTimeout = setTimeout(function() {
            game.computer__makeMove();
        }, 1500);
    }

    $(this).parent().hide();
});

