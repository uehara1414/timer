var Timer = {}

Timer._defaultms = 0;
Timer._leftms = 0;
Timer._isStarted = false;
Timer._startedTime = 0;
Timer._isJustFinished = false;

Timer.start = function()
{
    if(this._isStarted) {
        return;
    }

    this._isStarted = true;
    this._isJustFinished = false;
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
            this._isJustFinished = true;
            this.stop();
            this._leftms = 0;
        }
    }
}

Timer.clear = function()
{
    this._leftms = 0;
}

Timer.isStarted = function()
{
    return this._isStarted;
}

Timer.isJustFinished = function()
{
    if ( this._isJustFinished ) {
        this._isJustFinished = false;
        return true;
    } else {
        return false;
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
    if ( this._leftms < 0 ) {
        this._leftms = 0;
    }
}

Timer.addMinutes = function(minutes)
{
    this._leftms += 1000 * 60 * minutes;
    if ( this._leftms < 0 ) {
        this._leftms = 0;
    }
}

Timer.addSeconds = function(seconds)
{
    this._leftms += 1000 * seconds;
    if ( this._leftms < 0 ) {
        this._leftms = 0;
    }
}

module.exports = Timer;
