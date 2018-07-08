var solts = $(".slot");
//Player class
var player = "player1";
//Player name display
var playerName = prompt("Player1 Name");
var playerName2 = prompt("Player2 Name");
if(playerName == "" || playerName == null){
    playerName = "Player1";
}
if(playerName2 == "" || playerName2 == null){
    playerName2 = "Player2";
}
var counter1 = 0;
var counter2 = 0;
//check diagonal string
var str="";
// arrowkey function
var keyDownCounter = 0;
var startArrows = 0;
var spalte = $(".column");


$("#player1").html(playerName);
$("#player2").html(playerName2);

reset();
function reset(){
    $(".column").on("mousedown", function(e){
        //reset arrowkey function
        keyDownCounter = 0;
        startArrows = 0;
        for(var c = 0; c < 7; c++){
            spalte.eq(c).removeClass("select");
        }
        ///////////////////////////////////////

        var slot = $(e.currentTarget).find(".slot");
        for(var i = 5; i >= 0; i--){
            if(!slot.eq(i).hasClass("player1") && !slot.eq(i).hasClass("player2")){
                break;
            }
        }
        slot.eq(i).addClass(player);
        if(checkCol(slot)){
            setTimeout(winner, 1500);
        }
        if(checkCol($(".row" + i))){
            setTimeout(winner, 1500);
        }
        if(checkDia(solts)){
            setTimeout(winner, 1500);
        }
        if(checkDia2(solts)){
            setTimeout(winner, 1500);
        }
        if(player == "player1"){
            player = "player2";
            $("main").addClass("ply");
        }else{
            $("main").removeClass("ply");
            $("main").addClass("ply2");
            player = "player1";
        }
    });
}
function winner(){
    keyDownCounter = 0;
    startArrows = 0;
    for(var c = 0; c < 7; c++){
        spalte.eq(c).removeClass("select");
    }
    $("#winner").addClass("show");
    if(player == "player2"){
        $("#winnertext").html(playerName + " won.");
        counter1++;
    }
    if(player == "player1"){
        $("#winnertext").html(playerName2 + " won.");
        counter2++;
    }
}

$("#button").on("mousedown", function(){
    $("#counter1").html(counter1);
    $("#counter2").html(counter2);
    if(player == "player2"){
        player = "player1";
        $("main").removeClass("ply2");
        $("main").removeClass("ply");
    }
    str = "";
    var slots = $(".slot");
    for(var i = 0; i < slots.length; i++){
        slots.eq(i).removeClass("player1");
        slots.eq(i).removeClass("player2");
        slots.eq(i).removeClass("winning");
    }
    $("#restart").css("color", "grey");
    $("#button").css("border", "2px solid grey");
    $("#button").css("background-color", "white");
    $("#button").css("cursor", "default");
    reset();
});

function checkDia(slots){
    for(var i = 0; i < slots.length; i++){
        if(slots.eq(i).hasClass(player) && slots.eq(i+7).hasClass(player) && slots.eq(i+14).hasClass(player) && slots.eq(i+21).hasClass(player)){
            checkNachbar(i); checkNachbar(i+7); checkNachbar(i+14); checkNachbar(i+21);
            if(str.indexOf("0123") > -1 ||str.indexOf("1234") > -1 ||str.indexOf("2345") > -1 ||str.indexOf("3456") > -1){
                setTimeout(function(){
                    slots.eq(i).addClass("winning");
                    slots.eq(i+7).addClass("winning");
                    slots.eq(i+14).addClass("winning");
                    slots.eq(i+21).addClass("winning");
                }, 1000);

                return true;
            }
            else return false;
        }
    }
}

function checkDia2(slots){
    for(var i = 0; i < slots.length; i++){
        if(slots.eq(i).hasClass(player) && slots.eq(i+5).hasClass(player) && slots.eq(i+10).hasClass(player) && slots.eq(i+15).hasClass(player)){
            checkNachbar(i); checkNachbar(i+5); checkNachbar(i+10); checkNachbar(i+15);
            if(str.indexOf("0123") > -1 ||str.indexOf("1234") > -1 ||str.indexOf("2345") > -1 ||str.indexOf("3456") > -1){
                setTimeout(function(){
                    slots.eq(i).addClass("winning");
                    slots.eq(i+5).addClass("winning");
                    slots.eq(i+10).addClass("winning");
                    slots.eq(i+15).addClass("winning");
                }, 1000);
                return true;
            }
            else return false;
        }
    }
}

function checkCol(slots){
    var str = "";
    for(var i = 0; i < slots.length; i++){
        if(slots.eq(i).hasClass(player)){
            str += "1";
            console.log(i);
        }
        else{
            str += "0";
        }
    }
    if(str.indexOf("1111") > -1){
        slots.eq(str.indexOf("1111")).addClass("winning");
        slots.eq(str.indexOf("1111") + 1).addClass("winning");
        slots.eq(str.indexOf("1111") + 2).addClass("winning");
        slots.eq(str.indexOf("1111") + 3).addClass("winning");
        return true;
    }
}


// var str = "";
function checkNachbar(slot){
    if(slot >= 0 && slot <=5 ){
        str +="0";
    }
    if(slot >= 6 && slot <=11 ){
        str +="1";
    }
    if(slot >= 12 && slot <=17 ){
        str +="2";
    }
    if(slot >= 18 && slot <=23 ){
        str +="3";
    }
    if(slot >= 24 && slot <=29 ){
        str +="4";
    }
    if(slot >= 30 && slot <=35 ){
        str +="5";
    }
    if(slot >= 36 && slot <= 41 ){
        str +="6";
    }
}

//Winner Alert
$("#winner").on("click", function(){
    $("#winner").removeClass("show");
    $(".column").off("mousedown");
    $("#restart").css("color", "#ff0dbf");
    $("#button").css("border", "2px solid #ff0dbf");
    $("#button").css("background-color", "white");
    $("#button").css("cursor", "pointer");
});
//var keyDownCounter = 0;
//var startArrows = 0;

$(document).on("keydown", function(e){
    if(e.keyCode == 32 && keyDownCounter == 0 && startArrows == 0){
        keyDownCounter = 3;
        startArrows = 1;
        spalte.eq(keyDownCounter).addClass("select");
    }
    if(e.keyCode == 39 && startArrows == 1){
        spalte.eq(keyDownCounter).removeClass("select");
        keyDownCounter++;
        if(keyDownCounter > 6){
            keyDownCounter = 0;
        }
        spalte.eq(keyDownCounter).addClass("select");
    }
    if(e.keyCode == 37 && startArrows == 1){
        spalte.eq(keyDownCounter).removeClass("select");
        keyDownCounter--;
        if(keyDownCounter < 0){
            keyDownCounter = 6;
        }
        spalte.eq(keyDownCounter).addClass("select");
    }
    if(e.keyCode == 13 && startArrows == 1){
        var slot = spalte.eq(keyDownCounter).find(".slot");
        for(var i = 5; i >= 0; i--){
            if(!slot.eq(i).hasClass("player1") && !slot.eq(i).hasClass("player2")){
                break;
            }
        }
        slot.eq(i).addClass(player);
        if(checkCol(slot)){
            setTimeout(winner, 1500);
        }
        if(checkCol($(".row" + i))){
            setTimeout(winner, 1500);
        }
        if(checkDia(solts)){
            setTimeout(winner, 1500);
        }
        if(checkDia2(solts)){
            setTimeout(winner, 1500);
        }
        if(player == "player1"){
            player = "player2";
            $("main").addClass("ply");
        }else{
            $("main").removeClass("ply");
            $("main").addClass("ply2");
            player = "player1";
        }
    }
});
