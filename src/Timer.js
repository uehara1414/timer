var Timer = {}

Timer._defaultms = 0;
Timer._leftms = 0;
Timer._isStarted = false;
Timer._startedTime = 0;
Timer._isFinished = false;

Timer.start = function()
{
    if(this._isStarted) {
        return;
    }

    this._isStarted = true;
    this._isFinished = false;
    this._startedTime = new Date().getTime();
    this._defaultms = this._leftms;
}

Timer.stop = function()
{
    this._isStarted = false;
}

Timer.update = function()
{
    if( this._isStarted ) {
        this._leftms = this._defaultms - (new Date().getTime() - this._startedTime);

        if( this._leftms <= 0 ) {
            this._isFinished = true;
            this.stop();
            this._leftms = 0;
        }
    }
}

Timer.getHours = function()
{
    return Math.floor(this._leftms / (1000 * 60 * 60));
}

Timer.getMinutes = function()
{
    return Math.floor( (this._leftms - 1000 * 60 * 60 * this.getHours()) / (1000 * 60));
}

Timer.getSeconds = function()
{
    return Math.floor((this._leftms - 1000 * 60 * 60 * this.getHours() - 1000 * 60 * this.getMinutes() ) / 1000);
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
    this._leftms += 1000 * seconds;
}

module.exports = Timer;
