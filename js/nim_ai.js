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

    function _miserRule(lineWithout1, lineWithout1Counter, lineWith1Counter) {
        return {
            stonesToRemove: lineWith1Counter %2 ==  0 ? lineWithout1.stones-1 : lineWithout1.stones,
            row: lineWithout1.i
        }
    };

    // New Miser Rule
    var lineWith1Counter = 0;
    var lineWithout1 = null;
    var lineWithout1Counter = 0;
    for(var i=0; i < list.length; i++) {
        if(list[i] == 1) lineWith1Counter++;
        if(list[i] > 1) {
            lineWithout1 = {i: i, stones: list[i]};
            lineWithout1Counter++;
        }
    }

    if(lineWithout1Counter == 1) {
        return _miserRule(lineWithout1, lineWithout1Counter, lineWith1Counter);
    }
    //

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
            /*
            * выберем любое из заданных чисел, в котором цифра
             над этим крестиком равна 1
            * */
            if(binTable[j][xTable[0]] == 1) {
                digitWith1 =  binTable[j];
                digitWith1Row = j;
                break; }
        }

        binNumber = digitWith1; // copy digit to new number to substruct

        /*
        * те цифры 1 и 0 двоичной записи это-
         го числа, под которыми оказались крес-
         тики, заменим на противоположные (0 на
         1 и 1 на 0), остальные цифры оставим без
         изменения
        * */

        for(var i=0; i < digitLength; i++) {
            for(var j=0; j < digitLength; j++) {
                if(i == xTable[j]) {
                    var newDigit = +digitWith1[i]^1;
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