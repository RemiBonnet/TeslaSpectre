var ViewController = function(){

	this.views = {};

	this.isBusy = false;

	this._onViewLoadComplete = new signals.Signal();

	this._onNavigate = new signals.Signal();

	this.prevView = null;
	this.currentView = null;
	this.nextView = null;

	this.init();

};

// Init views
ViewController.prototype.init = function() {

	// Create all views
	this.views = {
        'home': new Home(),
        'experience': new Experience(),
        'missions': new Missions(),
        'music': new Music(),
        'navigate': new Navigate(),
        'contact': new Contact()
	};

};

// Bind
ViewController.prototype.bind = function() {

	// Listen to the router for navigate event
	app.router._onNavigate.add( this.onNavigate, this );

};

// On navigate
ViewController.prototype.onNavigate = function(e) {

	var view = e.view;

	console.log('## VC Navigate >> ', e);

	// Go to next view
	this.goTo( this.views[ view ] );

};

// Go to a view
ViewController.prototype.goTo = function( nextView ) {

	// If same view as current, stop it
	if ( nextView == this.currentView ){
		this.isBusy = false;
		return;
	}

	// Set busy state
	this.isBusy = true;

	// Save next view
	this.nextView = nextView;

	// If it's the first view to be shown
	if ( this.currentView == null ){

		// Listen to onAnimateIn event
		this.nextView._onAnimateIn.add(this.onViewAnimateIn, this);

		// Animate next view in
		this.nextView.animateIn();

		// Dispatch navigation event
		this._onNavigate.dispatch();

		// Save prev view
		this.prevView = this.currentView;

		// Save new current view
		this.currentView = this.nextView;

		// Reset next view
		this.nextView = null;

		return;

	} else {

		// Animate out current view
		//this.currentView.animateOut( this.nextView );

        if (
            $.inArray(this.nextView.id, this.nextView.viewsFullPage) != -1 ||
            $.inArray(this.currentView.id, this.nextView.viewsFullPage) != -1
        ) {
            this.currentView.animateOut();
        }

        if (this.prevView != null) {
            this.prevView.animateOut();
        }

        this.prevView = this.currentView;

		// Listen to onAnimateIn event
		this.nextView._onAnimateIn.add( this.onViewAnimateIn, this );

		// Animate in next view
		this.nextView.animateIn();

		// Dispatch navigation event
		this._onNavigate.dispatch();

		// Save new current view
		this.currentView = this.nextView;

		// Reset next view
		this.nextView = null;

	}

};

ViewController.prototype.onViewLoadComplete = function(e) {
	this.nextView._onViewLoadComplete.remove( this.onViewLoadComplete );

	this._onViewLoadComplete.dispatch(e);

	if ( this.currentView == null ){

		app.mainLoader.animateOut();

	}

	this.goTo( this.nextView );

};

// Once next view has been animated in
ViewController.prototype.onViewAnimateIn = function() {

	// Remove listener
	this.currentView._onAnimateIn.remove( this.onViewAnimateIn, this );
    this.currentView.domElem.attr('attr-id', Math.random());

	// Set not busy anymore
	this.isBusy = false;

	// Bind navigation links again in case of new ones
	this.bindNavLinks();

};

// Bind navigation links
ViewController.prototype.bindNavLinks = function() {

	$('a').not('[target="_blank"]').off('click').on('click', $.proxy(this.onNavLinkClick, this));

};

// On nav link click
ViewController.prototype.onNavLinkClick = function(e) {

	// Prevent default link behavior
	e.preventDefault();

	// Get url of clicked link
	var url = $(e.currentTarget).attr('href');

	// If navigation is not busy and url is a valid link
	if ( url != '#' ){

		// Navigate to the new url
		app.router.navigate( url );

	}

};
