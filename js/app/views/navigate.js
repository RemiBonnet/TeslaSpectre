var Navigate = function(){

	this.id = 'navigate';

	View.apply(this, arguments);
};

Navigate.prototype = Object.create(View.prototype);

Navigate.prototype.bind = function() {
	// this.mapsNavigate();
    this.velocity();
};

Navigate.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});
};

Navigate.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Navigate.prototype.mapsNavigate = function() {
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
    var mapElement = document.getElementById('mapsNavigate');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400)
    });
};

Navigate.prototype.onAnimateIn = function() {
    View.prototype.onAnimateIn.call(this);
};

Navigate.prototype.velocity = function(){

    $(".blocLeft").velocity({
        opacity: [1, 0.5],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 1000,
        display: 'inline',
    });
    $(".leftNavigate").velocity({
        opacity: [1, 0.5],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 1500,
        display: 'block',
    });
    $(".bottomNavigate").velocity({
        opacity: [1, 0.5],
    }, {
        duration: 300,
        delay: 1600,
        display: 'block',
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

}
