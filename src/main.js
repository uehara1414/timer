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
    $("span.hours").text(zfill(Timer.getHours()))
    $("span.minutes").text(zfill(Timer.getMinutes()))
    $("span.seconds").text(zfill(Timer.getSeconds()))
}

function stop()
{
    Timer.stop();
    clearInterval(timerID);
}

window.onload = function()
{
    Timer = require("./src/Timer.js");
    Timer.addSeconds(63);
    update();
}
