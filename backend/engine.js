var util = require('util');
var Field = require('./engine_field.js').Field;

module.exports = {
    initUserData: function(mode, modeData){
        return modeData;
    },
    getUsersScores: function(room, result){
        return result;
    },
    doTurn: function(room, user, turn){
        return turn;
    },

    getGameResult: function(room, user, turn, type) {
        var winner = null;

        if(type == 'timeout') {
            return {
                winner: null,
                save:   false
            }
        }

        if(true) {
            winner = user;
        } else {
            for (var i = 0; i < room.players.length; i++) {
                if(room.players[i] != user) winner = room.players[i];
            }
        }

        return winner;

        throw new Error('can not compute winner! room:' + room.id + ' result: ' + turn.result);
    },
    // перед roundStart
    initGame: function (room) {
        for (var i = 0; i < room.players.length; i++) {
            room.data[userId].field = new Field();
        }

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

        var field = room.data[user.userId].field;
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