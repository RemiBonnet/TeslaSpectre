var Music = function(){

	this.id = 'music';

	View.apply(this, arguments);
};

Music.prototype = Object.create(View.prototype);

Music.prototype.bind = function() {
    View.prototype.bind.call(this);
    this.call();

    this.play.on('click', $.proxy(this.onPlayClick, this));
    this.pause.on('click', $.proxy(this.onPauseClick, this));
    this.track.on('click', $.proxy(this.onTrackClick, this));
};

Music.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

    $("#left").velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 500,
        display: 'inline-block',
    });
    $("#center .player").velocity({
        opacity: [1, 0],
    }, {
        duration: 300,
        delay: 900,
        display: 'block',
    });
    $("#center .disclamer").velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 1200,
        display: 'block',
    });

};

Music.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});
};

Music.prototype.onAnimateIn = function() {
    View.prototype.onAnimateIn.call(this);

    this.writeSpectrumVideoDuration();

};

Music.prototype.update = function() {
    View.prototype.update.call();

    var currentTime = this.spectrumVideo[0].currentTime;

    var seconds = Math.round(currentTime);
    var minutes = parseInt( seconds / 60 ) % 60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    var currentTime = minutes + ':' + seconds;

    if (this.spectrumVideoCurrentTime !== currentTime) {
        this.spectrumVideoCurrentTime = currentTime;
        this.spectrumVideoTimeCode.html(currentTime);
    }

}

Music.prototype.onPauseClick = function() {
    this.pause.addClass('hidden');
    this.play.removeClass('hidden');

    this.spectrumVideo[0].pause();
};

Music.prototype.onPlayClick = function() {
    this.play.addClass('hidden').removeClass('active');
    this.pause.removeClass('hidden active').addClass('active');

    this.spectrumVideo[0].play();
};

Music.prototype.onTrackClick = function(event) {
    var currentTarget = $(event.currentTarget);
    this.track.each(function() {
        $(this).removeClass('active');
    })
    currentTarget.addClass('active');

    this.spectrumVideo[0].currentTime = 0;
    this.onPlayClick();
};

Music.prototype.setSelectors = function() {
    View.prototype.setSelectors.call(this);

    this.playlist = this.domElem.find('.playlist');
    this.track = this.playlist.find('li');

    this.spectrum = this.domElem.find('.spectrum');
    this.spectrumVideo = this.spectrum.find('video');
    this.spectrumVideoTimeCode = this.spectrum.find('.timecode');
    this.spectrumVideoDurationElement = this.spectrum.find('.duration');

    this.spectrumVideoCurrentTime = null;
    this.spectrumVideoDuration = null;

    this.control = this.domElem.find('.controls');
    this.pause = this.control.find('.pause');
    this.play = this.control.find('.play');
};

Music.prototype.writeSpectrumVideoDuration = function() {
    var duration = this.spectrumVideo[0].duration;

    if (null === this.spectrumVideoDuration) {
        this.spectrumVideoDuration = duration;
    }

    this.spectrumVideoDurationElement.html(duration);
};

Music.prototype.call = function() {
    var container = $('#call');
    var video = $('#call #modal video')[0];
    var time = $('#call #modal .time');
    var minute = $('#call #modal .time .minute');
    var second = $('#call #modal .time .second');
    var decline = $('#call #modal .infos .decline');
    var accept = $('#call #modal .infos .accept');
    var secondCount = 0;
    var minuteCount = 0;

    $(document).keydown(function(e){
        if(e.keyCode == 67) {
            video.play();
            container.fadeIn();
        }
    });

    decline.on('click', function(){
        container.fadeOut(function(){
            minuteCount = 0;
            secondCount = 0;

            accept.velocity({
                opacity: [1, 0],
                translateX: [0, 100]
            }, {
                duration: 500,
                opacity: 1
            });

            decline.velocity({
                translateX: [0, 80]
            }, {
                duration: 500
            });

            time.velocity({
                translateY: [0, -200],
                opacity: [0, 1]
            }, {
                duration: 1000,
                opacity: 0
            });

            decline.html('decline');
        });
    });

    accept.on('click', function(){

        accept.velocity({
            opacity: [0, 1],
            translateX: [100, 0]
        }, {
            duration: 500,
            opacity: 0
        });

        decline.velocity({
            translateX: [80, 0]
        }, {
            duration: 500
        });

        time.velocity({
            translateY: [-200, 0],
            opacity: [1, 0]
        }, {
            duration: 1000,
            opacity: 1
        });

        decline.html('end');

        setInterval(function(){
            secondCount ++;

            if(secondCount < 10) {
                secondCount = '0' + secondCount;
            }

            if(secondCount == 60) {
                secondCount = 0;
                minuteCount ++;

                if(minuteCount < 10) {
                    minuteCount = '0' + minuteCount;
                }
            }

            second.html(secondCount);
            minute.html(minuteCount);
        }, 1000);
    });
}