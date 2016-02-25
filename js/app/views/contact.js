var Contact = function(){

	this.id = 'contact';

	View.apply(this, arguments);
};

Contact.prototype = Object.create(View.prototype);

Contact.prototype.bind = function() {
    View.prototype.bind.call(this);
    this.velocity();
    this.name.on('click', $.proxy(this.onNameClick, this));

};

Contact.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});
};

Contact.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});
};

Contact.prototype.onAnimateIn = function() {
    View.prototype.onAnimateIn.call(this);

};

Contact.prototype.onNameClick = function(event) {
    var currentTarget = $(event.currentTarget);
    this.name.each(function() {
        $(this).removeClass('active');
    })
    currentTarget.addClass('active');
};

Contact.prototype.setSelectors = function() {
    View.prototype.setSelectors.call(this);

    this.contactList = this.domElem.find('.contact-list');
    this.name = this.contactList.find('li');
};

Contact.prototype.velocity = function(){
    var left = this.domElem.find('#left');
    var right = this.domElem.find('#right');

    left.velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 700,
        display: 'inline-block',
    });

    right.find('.name').velocity({
        opacity: [1, 0],
        translateX: [0, -100],
    }, {
        duration: 300,
        delay: 1000,
        display: 'inline-block',
    });

    right.find('table').velocity({
        opacity: [1, 0],
    }, {
        duration: 800,
        delay: 500,
        display: 'block',
    });

}
