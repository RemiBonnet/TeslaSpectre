var Router = function(){

	// Create navigate event
	this._onNavigate = new signals.Signal();

	// Create routes
	this.createRoutes();

};

// Init router
Router.prototype.init = function() {

	var self = this;

	// Bind HistoryJS state change
	History.Adapter.bind(window, "statechange", function(e){

		self.onStateChange(e);

	});

	// Parse first token
	this.onStateChange();

};

// On state change
Router.prototype.onStateChange = function(e) {
	
	// Get token
	var token = this.getToken();

	// Parse token - test if it matches a route
	crossroads.parse( token );

};

// Create routes
Router.prototype.createRoutes = function() {

	var self = this;

	// Homepage
	crossroads.addRoute( '', function(){

		// Dispatch navigate event
		self._onNavigate.dispatch({
			view: 'home'
		});

        console.log( '## Navigate view home' );
	});

    // Experience
    crossroads.addRoute( '/experience' , function(){

        self._onNavigate.dispatch({
            view: 'experience'
        });

        console.log( '## Navigate view experience' );
    });

    // Music
    crossroads.addRoute( '/music' , function(){

        self._onNavigate.dispatch({
            view: 'music'
        });

        console.log( '## Navigate view music' );
    });

    // Music
    crossroads.addRoute( '/contact' , function(){

        self._onNavigate.dispatch({
            view: 'contact'
        });

        console.log( '## Navigate view contact' );
    });

    // Navigate
    crossroads.addRoute( '/navigate' , function(){

        self._onNavigate.dispatch({
            view: 'navigate'
        });

        console.log( '## Navigate view navigate' );

    });

    // Missions
    crossroads.addRoute( '/missions' , function(){

        self._onNavigate.dispatch({
            view: 'missions'
        });

        console.log( '## Navigate view missions' );

    });

};

// Navigate
Router.prototype.navigate = function( href ) {
	
	History.pushState(null, null, href);

};

// Get token from History hash
Router.prototype.getToken = function() {
	
	var token = History.getState().hash;

	if ( token.indexOf('?') != -1 ){

		var tokenSplit = token.split('?');
		return tokenSplit[0];

	} else {

		return token;

	}

};
