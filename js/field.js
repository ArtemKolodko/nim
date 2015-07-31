function Stone() {
    this.visible = true;

    this.setVisible = function(v) {
        this.visible = v;
    };

    this.getHTML = function() {
        var classVisible = this.visible ? "visible" : "removed";
        return '<div class="stone '+classVisible+'"><div class="digit"></div></div>';
    };
};

function Field(list) {
    this.sum = 40;
    this.lines = 5;
    this.map = [];
    this.enabled = true;
    this.createNew(list);
};

Field.prototype.enable = function(e) {
    this.enabled = e;
};

Field.prototype.restart = function() {
    var self = this;
    this.eachStone(function(x, y) {
        self.map[x][y].setVisible(true);
    });
    this.actuate({clear: true});
};

Field.prototype.createNew = function(list) {
    function _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function _randomSum() {

        function __shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        var patterns = [
            [7, 7, 8, 10, 8], [9, 8, 9, 5, 9],
            [5, 7, 10, 9, 9], [6, 8, 9, 7, 10],
            [8, 7, 10, 7, 8], [6, 6, 8, 10, 10],
            [10, 8, 6, 8, 8], [5, 10, 10, 5, 10]
        ];
        var randPattern = patterns[_getRandomInt(0, patterns.length-1)];
        //console.log(randPattern);
        return __shuffle(randPattern);
    };

    this.map = [];
    var list = list ? list : _randomSum(this.sum, this.lines);

    for(var i=0; i < this.lines; i++) {
        this.map[i] = [];
        for(var j=0; j < list[i]; j++) {
            this.map[i][j] = new Stone();
        }
    }
    this.actuate({clear: true});
};

Field.prototype.getRowData = function(index) {
    var row = this.map[index];
    var l = 0;
    for(var i=0; i < row.length; i++) {
        if(row[i].visible) l++;
    }
    return {
        length: l
    }
};

Field.prototype.getList = function() {
    var list = [];
    for(var i=0; i < this.map.length; i++) {
        var lineCounter = 0;
        for(var j=0; j < this.map[i].length; j++) {
            if(this.map[i][j].visible) {
                lineCounter++;
            }
        }
        list.push(lineCounter);
    }
    return list;
};



Field.prototype.removeStones = function(data) {
    if(data.stonesToRemove && data.row !== null) {

        var rowData = this.getRowData(data.row);
        var row = this.map[data.row];
        for(var i=0; i < rowData.length; i++) {
            if( (rowData.length - i) <= data.stonesToRemove) {
                row[i].setVisible(false);
            }
        }
        this.actuate(data);
    } else {
        console.log("Cannot remove stones ", data);
    }
};

Field.prototype.isGameOver = function() {
    var list = this.getList();
    var gameOver = true;
    for(var i=0; i < list.length; i++) {
        if(list[i] != 0) gameOver = false;
    }
    return gameOver;
};

Field.prototype.eachStone = function(callback) {
    for(var i=0; i < this.map.length; i++) {
        var lineCounter = 0;
        for(var j=0; j < this.map[i].length; j++) {
            if(callback) {
                callback(i, j, this.map[i][j]);
            }
        }
    }
};

Field.prototype.actuate = function() {};
Field.prototype.animateRemoveStones = function() {};

// Client-side
Field.prototype.actuate = function(data) {
    if(data.clear) {
        for(var i=0; i < this.map.length; i++) {
            var line = $(".stonesLine_"+i);
            line.empty();
            for(var j=0; j < this.map[i].length; j++) {
                line.append(this.map[i][j].getHTML());
            }
        }
    } else {
        console.log("Actuate", data);
        if(data.stonesToRemove) {
            var stones = $(".stonesLine_"+data.row + " .stone.visible");
            var remove = stones.slice(Math.max(stones.length - data.stonesToRemove, 0));

            for(var i=0 ; i < remove.length; i++) {
                $(remove[i]).removeClass("visible").addClass("removed");
            }

        } else {
            throw new Error("Wrong field data [field actuator]", data);
        }

    }

};