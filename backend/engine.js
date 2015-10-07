var util = require('util');
var Field = require('./engine_field.js').Field;

module.exports = {
    initUserData: function(mode, modeData){
        return modeData;
    },
    getUsersScores: function(room, result){
        return result;
    },
    doTurn: function(room, user, turn, type){
        if(type == 'turn') {
            var field = room.data.field;
            field.removeStones(turn.turn);
            turn.list = field.getList();
        }

        return turn;
    },

    getGameResult: function(room, user, turn, type) {
        var field = room.data.field;
        var result = null;
        var gameOver = field.isGameOver();

        if(type == 'timeout') {
            return {
                winner: room.getOpponent(user),
                action: 'timeout'
            }
        }

        if(gameOver) {
            result = {
                winner: room.getOpponent(user)
            }
        }

        return result;

        throw new Error('can not compute winner! room:' + room.id + ' result: ' + turn.result);
    },
    // перед roundStart
    initGame: function (room) {

        //console.log("START", room.inviteData.mode == "marienbad");

        room.data.field = new Field(room.inviteData.mode == "marienbad" ? [1,3,5,7] : undefined);
        room.inviteData.field = room.data.field.getList();
        return {
            inviteData: room.inviteData
        }
    },
    switchPlayer:function(room, user, turn){
        if (room.players[0] == user) return room.players[1];
        else return room.players[0];
    },
    setFirst: function (room) {
        if(room.games == 0) return room.owner;
        else {
            if (room.players[0] == room.game.first) return room.players[1];
            else return room.players[0];
        }
    },
    userEvent: function(room, user, event) {

        var field = room.data.field;
        event.response = "secure data";

        return [
            { // сообщение только отправившему event (только в его истории будет событие с его расстановкой)
                event: event,
                target: user
            },
            { // сообщение всем в комнату
                event: {
                    type            : event.type,
                    user            : user.userId
                },
                target: room
            }
        ]
    }
};