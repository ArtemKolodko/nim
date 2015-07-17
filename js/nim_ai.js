function NimAI() {

};

NimAI.prototype.makeDecision = function(list) {
    var binTable = [];
    var xTable = []; // index of list item with X label
    var digitLength = 4;
    var binNumber = "";
    var digitWith1Row = null;

    function _decToBin(dec,length){
        var out = "";
        while(length--)
            out += (dec >> length ) & 1;
        return out;
    }

    for(var i=0; i < list.length; i++) {
        binTable[i] = _decToBin(list[i], digitLength);
    }

    for(var i=0; i < digitLength; i++) { // по рязрядам
        var numberOf1 = 0;
        var digitWith1 = null;
        for(var j=0; j < binTable.length; j++) {
            if(binTable[j][i] == 1) { numberOf1++; }
        }
        if(numberOf1 % 2 == 1) xTable.push(i);
    }

    // если крестик найден, берем первый из всех
    if(xTable.length > 0) {
        var digitWith1 = null;
        for(var j=0; j < binTable.length; j++) {
            if(binTable[j][xTable[0]] == 1) {
                digitWith1 =  binTable[j];
                digitWith1Row = j;
                break; }
        }

        binNumber = digitWith1; // copy digit to new number to substruct

        for(var i=0; i < digitLength; i++) {
            for(var j=0; j < digitLength; j++) {
                if(i == xTable[j]) {
                    var newDigit = digitWith1[i] === "1" ? "0" : "1";
                    binNumber = binNumber.substring(0, i) + newDigit + binNumber.substring(i+1);
                }
            }
        }

        return {
            // сколько камней убрать
            stonesToRemove: parseInt(digitWith1, 2) - parseInt(binNumber, 2),
            // откуда
            row: digitWith1Row
        }
    } else {
        // совершим любой ход

        var linesWithDigits = [];
        for(var i=0; i < list.length; i++) {
            if(list[i] > 0) { linesWithDigits.push(i); }
        }

        if(linesWithDigits.length > 0) {
            var randomLine = linesWithDigits[0];
            var stonesToRemove = list[randomLine] == 1 ? 1 : Math.floor((Math.random() * list[randomLine] + 1));
            return {
                stonesToRemove: stonesToRemove,
                row: randomLine
            }
        }
    }

    return null;

};