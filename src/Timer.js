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
    this._startedTime = new Date().getTime();
}

Timer.stop = function()
{
    this._isStarted = false;
}

Timer.update = function()
{
    if( this._isStarted ) {
        this._leftms = new Date().getTime() - this._startedTime;
    }
}

Timer.getHours = function()
{
    return this._leftms / (1000 * 60 * 60);
}

Timer.getMinutes = function()
{
    return this._leftms / (1000 * 60);
}

Timer.getSeconds = function()
{
    return this._leftms / 1000;
}

Timer.addHours = function(hours)
{
    this._leftms += 1000 * 60 * 60 * hours;
}

Timer.addMinutes = function(minutes)
{
    this._leftms += 1000 * 60 * minutes;
}

Timer.addSeconds = function(seconds)
{
    this.leftms += 1000 * seconds;
}

module.exports = Timer;
