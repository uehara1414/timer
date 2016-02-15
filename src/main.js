var Timer = null;
var timerID = null;

function zfill(number)
{
    if( number < 10 ) {
        return 0 + String(number);
    } else {
        return number;
    }
}

function start()
{
    Timer.start();
    timerID = setInterval(update, 100)
}

function update()
{
    Timer.update();
    display();
}

function display()
{
    var hours = String(zfill(Timer.getHours()));
    var minutes = String(zfill(Timer.getMinutes()));
    var seconds = String(zfill(Timer.getSeconds()));
    $("img.hour1").attr("src", "images/gif34/" + hours[0] + ".gif");
    $("img.hour2").attr("src", "images/gif34/" + hours[1] + ".gif");
    $("img.minute1").attr("src", "images/gif34/" + minutes[0] + ".gif");
    $("img.minute2").attr("src", "images/gif34/" + minutes[1] + ".gif");
    $("img.second1").attr("src", "images/gif34/" + seconds[0] + ".gif");
    $("img.second2").attr("src", "images/gif34/" + seconds[1] + ".gif");    
}

function stop()
{
    Timer.stop();
    clearInterval(timerID);
}


window.onload = function()
{
    $("div.secondsbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addSeconds(-1);
        } else {
            Timer.addSeconds(1);
        }
        update();
    });

    $("div.minutesbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addMinutes(-1);
        } else {
            Timer.addMinutes(1);
        }
        update();
    });

    $("div.hoursbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addHours(-1);
        } else {
            Timer.addHours(1);
        }
        update();
    });

    Timer = require("./src/Timer.js");
    Timer.addSeconds(63);
    update();
    
}
