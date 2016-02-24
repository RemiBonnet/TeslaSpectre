var Missions = function(){

    this.id = 'missions';

    View.apply(this, arguments);

};

Missions.prototype = Object.create(View.prototype);

Missions.prototype.bind = function() {
    this.radar();
    this.video();
};

Missions.prototype.animateIn = function() {

    View.prototype.animateIn.call(this);

    var self = this;

    if ( !this.loaded ) return;

    this.domElem.fadeIn(function(){
        self.onAnimateIn();
    });

    $(".card, .profile-title").velocity({
        opacity: [1, 0.5],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 200,
        display: 'block',
    });
    $("div#map").velocity({
        opacity: [1, 0.1]
    }, {
        duration: 1000,
        delay: 200,
        display: 'block',
    });
    $("div.dotMission").velocity({
        opacity: [1, 0]
    }, {
        duration: 1000,
        delay: 800,
        display: 'block',
    });
    $(".cityMission").velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 500,
        delay: 1000,
        display: 'block',
    });
    $(".addressMission").velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 1000,
        delay: 1000,
        display: 'block',
    });
    $(".zip").velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 1000,
        delay: 1100,
        display: 'block',
    });
    $(".infos-list").velocity({
        opacity: [1, 0],
    }, {
        duration: 1000,
        delay: 800,
        display: 'block',
    });
    $(".bodywork .damage").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        duration: 1000,
        display: 'block',
    });
    $(".bodywork .bullet-holes").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        delay: 50,
        duration: 1000,
        display: 'block',
    });
    $(".engine .damage").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        delay: 100,
        duration: 1000,
        display: 'block',
    });
    $(".engine .power").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        delay: 150,
        duration: 1000,
        display: 'block',
    });
    $(".mission-title").velocity({
        opacity: [1, 0],
    }, {
        delay: 300,
        duration: 1000,
        display: 'block',
    });
    $(".mission-info").velocity({
        opacity: [1, 0],
    }, {
        delay: 500,
        duration: 1000,
        display: 'inline',
    });
    $(".mission-desc").velocity({
        opacity: [1, 0],
    }, {
        delay: 700,
        duration: 1000,
        display: 'block',
    });
};

Missions.prototype.animateOut = function() {

    View.prototype.animateOut.call(this);

    var self = this;

    this.domElem.fadeOut(function(){
        self.onAnimateOut();
    });

};

Missions.prototype.radar = function() {
    var time = 5;
    var peopleCount = 20;
    var peoples = [];

    for (i = 0; i < peopleCount; i++) {
        peoples.push({
            distance : Math.floor((Math.random() * 140) + 1),
            angle    : Math.floor((Math.random() * 360) + 1)
        });
    }

    (function radar(){

        var radius = 150;
        for (i = 0; i < peoples.length; i++) {
            var disX = (90 < peoples[i].angle + 90 < 270) ? radius - peoples[i].distance : radius,
                disY = (180 < peoples[i].angle + 90 < 360) ? radius - peoples[i].distance : radius,
                angleNew = (peoples[i].angle + 90) * Math.PI / 180,
                getDegX = disX + peoples[i].distance - Math.round(peoples[i].distance * Math.cos(angleNew)),
                getDegY = disY + peoples[i].distance - Math.round(peoples[i].distance * Math.sin(angleNew)),
                delay = time / 360 * peoples[i].angle;

            $('#guides').append($('<span>')
                .addClass('dot')
                .css({
                    left : getDegX,
                    top  : getDegY,
                    '-webkit-animation-delay' : delay + 's',
                    'animation-delay' : delay + 's'
                })
                .attr({
                    'data-atDeg' : peoples[i].angle
                }));
            $("#radar").addClass('animated');
        }

    })();
}

Missions.prototype.video = function() {
    var cta = $('#weapon .weapon-center');
    var container = $('#radar-container');
    var video = $('#video-mission video')[0];
    var sound = $('#video-mission .sound')[0];
    var warning = $('#warning-imminent');
    var crosshair = $('#weapon .weapon-center svg')[0];

    cta.on('click', function() {

        crosshair.style.fill = '#d62b2b';

        container.fadeIn(function() {
            video.play();
            setTimeout(function() {
                sound.play();
            }, 2900);
        });
    });

    video.onended = function() {
        container.fadeOut(function() {
            video.currentTime = 0;
            crosshair.style.fill = '#ada8ae';
        });
        warning.fadeOut();
    }
}


