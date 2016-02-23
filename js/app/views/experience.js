var Experience = function(){

	this.id = 'experience';

	View.apply(this, arguments);
};

Experience.prototype = Object.create(View.prototype);

Experience.prototype.bind = function() {
	this.maps();
    this.incDec();
    this.activeToggle();
};

Experience.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});
    $(".gps .blocLeft").velocity({
        opacity: [1, 0.5],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 1000,
        display: 'inline',
    });
    $("div#map").velocity({
        opacity: [1, 0.1]
    }, {
        duration: 1000,
        display: 'block',
    });
    $("div.dot").velocity({
        opacity: [1, 0]
    }, {
        duration: 1000,
        delay: 2800,
        display: 'block',
    });
    $("article.player").velocity({
        opacity: [1, 0.1],
    }, {
        duration: 500,
        delay: 100,
        display: 'inline-block',
    });
    $("article.agenda").velocity({
        opacity: [1, 0],
    }, {
        duration: 500,
        delay: 400,
        display: 'block',
    });
    $("div.graph").velocity({
        opacity: [1, 0],
    }, {
        duration: 800,
        delay: 500,
        display: 'block',
    });
    $("div.energyRight").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        duration: 800,
        delay: 400,
        display: 'inline-block',
    });
    $("div.pressure").velocity({
        opacity: [1, 0.1],
        translateX: [0, -100],
    }, {
        duration: 1000,
        delay: 430,
        display: 'inline-block',
    });
    $("div.usureBad").velocity({
        opacity: [1, 0],
        translateX: [0, 100],
    }, {
        duration: 1000,
        delay: 450,
        display: 'inline-block',
    });

    $("div.usure").velocity({
        opacity: [1, 0.1],
    }, {
        duration: 1500,
        delay: 450,
        display: 'inline-block',
    });
     $("div.car").velocity({
        opacity: [1, 0.1],
    }, {
        duration: 1500,
        delay: 750,
        display: 'inline-block',
    });

    $("header").velocity({
        opacity: [1, 0.5],
        translateY: [0, -10],
    }, {
        duration: 100,
        display: 'block'
    });

    $("footer").velocity({
        opacity: [1, 0.5],
        translateY: [0, 10],
    }, {
        duration: 100,
        display: 'block'
    });

};

Experience.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Experience.prototype.maps = function() {
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 14,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(48.8637447, 2.4315409), // Montreuil

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2},{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":"-51"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17},{"gamma":"1"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18},{"gamma":"1"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16},{"gamma":"1"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19},{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400)
    });
};

Experience.prototype.incDec = function() {
    
    // PressureLeft
    var counterPressureLeft = 2.3;

    $(".counterPressureLeft").text(counterPressureLeft);

    $(".addPressureLeft").click(function() {
        counterPressureLeft = counterPressureLeft + 0.1;
        $(".counterPressureLeft").text(counterPressureLeft);
    });

    $(".subtractPressureLeft").click(function() {
      counterPressureLeft = counterPressureLeft - 0.1;
      $(".counterPressureLeft").text(counterPressureLeft);
    });

    // PressureRight
    var counterPressureRight = 2.5;

    $(".counterPressureRight").text(counterPressureRight);

    $(".addPressureRight").click(function() {
        counterPressureRight = counterPressureRight + 0.1;
        $(".counterPressureRight").text(counterPressureRight);
    });

    $(".subtractPressureRight").click(function() {
      counterPressureRight = counterPressureRight - 0.1;
      $(".counterPressureRight").text(counterPressureRight);
    });

    // Elevation
    var counterPressureBot = 5.9;

    $(".counterPressureBot").text(counterPressureBot);

    $(".addPressureBot").click(function() {
        counterPressureBot = counterPressureBot + 0.1;
        $(".counterPressureBot").text(counterPressureBot);
    });

    $(".subtractPressureBot").click(function() {
      counterPressureBot = counterPressureBot - 0.1;
      $(".counterPressureBot").text(counterPressureBot);
    });
};

Experience.prototype.activeToggle = function() {
    console.log("00");
    $(".elevationActive").click(function() {
        console.log("1");
        $(".elevationActive").toggleClass("toggle");
    });
};
