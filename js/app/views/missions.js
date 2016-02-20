var Missions = function(){

    this.id = 'missions';

    View.apply(this, arguments);

};

Missions.prototype = Object.create(View.prototype);

Missions.prototype.bind = function() {
};

Missions.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

};

Missions.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};


