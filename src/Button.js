var Button = function(paper, _cx, _cy, _text, _r, onclick){
    var self = this;
    this.cx = _cx;
    this.cy = _cy;
    this.r = _r;
    this.text = _text;

    this.gradient = paper.gradient("r(0.5, 0.5, 1.0)rgba(232, 68, 186, 0.7)-rgba(232, 68, 186, 0.1)")
    this.circle1 = paper.circle(this.cx, this.cy, this.r).attr({stroke: "rgba(232, 68, 186, 0.7)", strokeWidth: this.r*0.02, fill: "none"});
    this.circle2 = paper.circle(this.cx, this.cy, this.r * 0.9).attr({fill: this.gradient});
    this.back = paper.g();
    this.back.add(this.circle1, this.circle2);
    this.buttontext = paper.text(this.cx, this.cy + this.r * 0.05, this.text).attr({textAnchor: "middle", fontSize: 30, fill: "white"});
    this.button = paper.g(this.back, this.buttontext);

    if ( !onclick ) {
        this.onclick = function(){}
    } else {
        this.onclick = onclick
    }

    this.bindHoverEvent = function(){
        self.button.hover(function(){
            var matrix = new Snap.Matrix();
            matrix.scale(1.1, 1.1, self.cx, self.cy);
            self.button.animate({transform: matrix}, 30);
        },function(){
            var matrix = new Snap.Matrix();
            matrix.scale(1, 1, self.cx, self.cy);
            self.button.animate({transform: matrix}, 30);
        });
    }

    this.bindHoverEvent();

    this.button.click(function(){
        self.onclick();
        self.button.unhover();
        var matrix = new Snap.Matrix();
        self.gradient.animate({r: "0.5"}, 50, mina.linear, function(){
            self.gradient.animate({r: "1.0"}, 50);
        });
        self.button.animate({transform: matrix}, 100, mina.linear, function(){
            var matrix = new Snap.Matrix();
            matrix.scale(1.1, 1.1, self.cx, self.cy);
            self.button.attr({transform: matrix});
            self.bindHoverEvent();
        });
    });
}

Button.prototype.changeText = function(text)
{
    this.buttontext.attr({text: text});
}

Button.prototype.remove = function()
{
    button.remove();
}
