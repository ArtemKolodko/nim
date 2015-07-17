function Dialog() {
    this.target = $(".fieldWrapper");
};

Dialog.prototype.newGameDialog = function(headerText, callbackYes, callbackNo) {
    var self = this;
    var buttons = [{
        text: "Да, начать новую игру",
        click: function() {
            $( this ).dialog( "close" );
            if(callbackYes) callbackYes();
        }
    },
        {
            text: "Нет, выйти",
            click: function() {
                $( this ).dialog( "close" );
                if(callbackNo) callbackNo();
            }
        }];



    client.viewsManager.dialogsView.showDialog(headerText, {
            buttons: buttons,
            dialogClass: "newgame-dialog",
            position: {
                my: 'bottom',
                at: 'center',
                of: self.target
            }

        },
        true, // draggable
        true); // notification
};