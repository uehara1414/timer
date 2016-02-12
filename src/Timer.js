var moment = require("moment");
var Timer = {}

Timer._leftms = 0;
Timer._isStarted = false;
Timer._startedTime = 0;

Timer.start = function()
{
    if(this._isStarted) {
        return;
    }

    this._isStarted = true;
    this._startedTime = moment().unix();
}

Timer.stop = function()
{
    this.update();
    this._isStarted = false;
}

Timer.update = function()
{
    if( this._isStarted ) {
        this._leftms = moment().unix() - this._startedTime;
    }
}

Timer.getHours = function()
{

}

Timer.getMinutes = function()
{

}

Timer.getSeconds = function()
{

}

Timer.addHours = function(hours)
{

}

Timer.addMinutes = function(minutes)
{

}

Timer.addSeconds = function(seconds)
{

}

module.exports = Timer;
