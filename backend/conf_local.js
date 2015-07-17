module.exports = {
    game: 'nim',
    port: 8032,
    pingTimeout:100000,
    pingInterval:10000,
    logLevel:1,
    turnTime: 60*60,
    minTurns: 0,
    maxTimeouts: 1,
    adminList: ["18136", "144", "40", "448039"],
    mode: 'develop',
    gameModes: ['nim'],
    modesAlias:{'nim':'Ним'}, // visible client mode alias

    ratingElo: true,        // compute rating elo flag
    mongo:{ // mongodb configuration
        host: '192.168.250.40',
        port: '27001'
    },
    closeOldConnection: true,
    loseOnLeave: true,     // player lose game or not after leave
    reconnectOldGame: false, // continue old game on reconnect or auto leave
    spectateEnable: false   // on/off spectate games
    //,https:true,
    //httpsKey: '/etc/apache2/ssl/serv.key',
    //httpsCert: '/etc/apache2/ssl/serv.crt',
    //httpsCa: ["/etc/apache2/ssl/sub.class1.server.ca.pem", "/etc/apache2/ssl/ca.pem"]
};