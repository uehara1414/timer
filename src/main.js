var gui = require("nw.gui");
var Settings = require("./src/Settings.js")
var Timer = require("./src/Timer.js");
var timerID = null;
var execpath = null;

var button1, button2, button3;

function zfill(number)
{
    if( number < 10 ) {
        return 0 + String(number);
    } else {
        return number;
    }
}

function changeButtonStartToStop()
{
    button1.changeText("stop");
}

function changeButtonStopToStart()
{
    button1.changeText("start");
}

function startOrStop()
{
    if ( Timer.isStarted() ) {
        stop();
    } else {
        start();
    }
}

function start()
{
    if (Timer.isStarted()) {
        return;
    }

    Timer.start();
    timerID = setInterval(update, 100);
    changeButtonStartToStop();
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

function display()
{
    var prehours = $("text.hoursbox").text();
    var hours = String(zfill(Timer.getHours()));
    var minutes = String(zfill(Timer.getMinutes()));
    var seconds = String(zfill(Timer.getSeconds()));
    $("text.hoursbox").text(hours);
    $("text.minutesbox").text(minutes);
    $("text.secondsbox").text(seconds);
    $("text.hoursbox").velocity("stop")
                      .velocity("callout.shake")
}

function stop()
{
    Timer.stop();
    clearInterval(timerID);
    changeButtonStopToStart();
}

function reset()
{
    stop();
    Timer.clear();
    Timer.addHours(Settings.defaultHours);
    Timer.addMinutes(Settings.defaultMinutes);
    Timer.addSeconds(Settings.defaultSeconds);
    update();
}

window.onload = function(){
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

    $(".start_or_stop").click(function(){
        startOrStop();
    })

    $(".reset").click(function(){
        reset();
    })

    $(".save").click(function(){
        save();
    })

    window.ondragover = function(e)
    {
        e.preventDefault();
    }
    window.ondrop = function(e)
    {
        e.preventDefault();
        execpath = e.dataTransfer.files[0].path;
    }

    var paper = Snap("#pep");
    var c1 = paper.circle(200, 200, 190).attr({stroke: "rgba(244, 33, 222, 0.8)", strokeWidth: 11, fill: "none"})
    var c2 = paper.circle(200, 200, 170).attr({stroke: "rgba(244, 33, 222, 0.8)", strokeWidth: 2, fill: "none"})
    var c3 = paper.circle(200, 200, 175).attr({stroke: "rgba(244, 33, 222, 0.8)", stroekWidth: 2, fill: "none"})
    var c4 = paper.circle(200, 200, 150).attr({fill: "rgba(244, 33, 222, 0.8)"})
    var back = paper.g();
    back.add(c1, c2, c3, c4)

    // view
    var hoursbox = paper.g();
    var hoursrect = paper.rect(80, 150, 80, 100).attr({fill: "none"});
    var hourstext = paper.text(120, 215, "00").attr({textAnchor: "middle", fontSize: "70", fill: "white"});
    hourstext.addClass("hoursbox");
    hoursbox.add(hoursrect, hourstext);
    hoursbox.addClass("hoursbox");

    var colon1 = paper.text(160, 208, ":").attr({textAnchor: "middle", fontSize: "70", fill: "white"});

    var minutesbox = paper.g();
    var minutesrect = paper.rect(160, 150, 80, 100).attr({fill: "none"});
    var minutestext = paper.text(200, 215, "00").attr({textAnchor: "middle", fontSize: "70", fill: "white"});
    minutestext.addClass("minutesbox");
    minutesbox.add(minutesrect, minutestext);
    minutesbox.addClass("minutesbox");

    var colon2 = paper.text(240, 208, ":").attr({textAnchor: "middle", fontSize: "70", fill: "white"});

    var secondsbox = paper.g();
    var secondsrect = paper.rect(240, 150, 80, 100).attr({fill: "none"});
    var secondstext = paper.text(280, 215, "00").attr({textAnchor: "middle", fontSize: "70", fill: "white"});
    secondstext.addClass("secondsbox");
    secondsbox.addClass("secondsbox");
    secondsbox.add(secondsrect, secondstext);

    button1 = new Button(paper, 80, 300, "start", 50, function(){ startOrStop(); });
    button2 = new Button(paper, 200, 300, "reset", 50, function(){ reset(); });
    button3 = new Button(paper, 320, 300, "save", 50, function(){ save(); });

    var container = document.querySelector(".container");
    paper.appendTo(container);


    $("g.minutesbox").mousewheel(function(eo, delta, deltaX, deltaY){
        Timer.addMinutes(deltaY);
        update();
    });

    $("g.secondsbox").mousewheel(function(eo, delta, deltaX, deltaY){
        Timer.addSeconds(deltaY);
        update();
    });

    $("g.hoursbox").mousewheel(function(eo, delta, deltaX, deltaY){
        Timer.addHours(deltaY);
        update();
    });

    reset();
    update();
    setGlobalHotKey();
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
