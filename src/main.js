var gui = require("nw.gui");
var Settings = require("./src/Settings.js")
var Timer = require("./src/Timer.js");
var timerID = null;
var execpath = null;

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
    if (Timer.isStarted()) {
        return;
    }

    Timer.start();
    timerID = setInterval(update, 100);
    changeButtonResetToStop();
}

function save()
{
    Settings.defaultHours = Timer.getHours();
    Settings.defaultMinutes = Timer.getMinutes();
    Settings.defaultSeconds = Timer.getSeconds();
}

function update()
{
    Timer.update();
    if( Timer.isJustFinished() )
    {
        finish();
    }
    display();
}

function finish()
{
    stop();
    if (execpath === null) {
        return;
    }

    gui.Shell.openItem(execpath);
}

function changeButtonStopToReset()
{
    $(".stop").text("reset");
    $(".stop").attr("class", "reset");
    $(".reset").click(function(){reset()});
}

function changeButtonResetToStop()
{
    $(".reset").text("stop");
    $(".reset").attr("class", "stop");
    $(".stop").click(function(){stop()});
}

function display()
{
    var hours = String(zfill(Timer.getHours()));
    var minutes = String(zfill(Timer.getMinutes()));
    var seconds = String(zfill(Timer.getSeconds()));
    $("text.hoursbox").text(hours);
    $("text.minutesbox").text(minutes);
    $("text.secondsbox").text(seconds);
}

function stop()
{
    Timer.stop();
    clearInterval(timerID);
    changeButtonStopToReset();
}


window.onload = function()
{
    $(".secondsbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addSeconds(-1);
        } else {
            Timer.addSeconds(1);
        }
        update();
    });

    $(".minutesbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addMinutes(-1);
        } else {
            Timer.addMinutes(1);
        }
        update();
    });

    $(".hoursbox").mousedown(function(e){
        if ( e.button == 2 ) {
            Timer.addHours(-1);
        } else {
            Timer.addHours(1);
        }
        update();
    });

    $(".minutesbox").mousewheel(function(eo, delta, deltaX, deltaY){
        Timer.addMinutes(deltaY);
        update();
    });

    $(".secondsbox").mousewheel(function(eo, delta, deltaX, deltaY){
        Timer.addSeconds(deltaY);
        update();
    });

    $(".hoursbox").mousewheel(function(eo, delta, deltaX, deltaY){
        alert(eo);
        Timer.addHours(deltaY);
        update();
    });

    reset();
    update();
    setGlobalHotKey()
}

function reset()
{
    Timer.clear();
    Timer.addHours(Settings.defaultHours);
    Timer.addMinutes(Settings.defaultMinutes);
    Timer.addSeconds(Settings.defaultSeconds);
    update();
}

function setGlobalHotKey()
{
    /*
        start: Ctrl+Shift+I
        stop: --
        reset: Ctrl+Shift+R
    */
    var option0 = {
        key: "Ctrl+Shift+I",
        active: function() {
            start();
        },
        failed: function() {
            console.log("hotkey action failed");
        }
    }
    var shortcut0 = new gui.Shortcut(option0);
    gui.App.registerGlobalHotKey(shortcut0);

    var option1 = {
        key: "Ctrl+Shift+R",
        active: function() {
            stop();
            reset();
        },
        failed: function() {
            console.log("hotkey action failed");
        }
    }
    var shortcut1 = new gui.Shortcut(option1);
    gui.App.registerGlobalHotKey(shortcut1);
}
