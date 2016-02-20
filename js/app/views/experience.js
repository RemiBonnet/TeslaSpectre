var Experience = function(){

	this.id = 'experience';

	View.apply(this, arguments);

};

Experience.prototype = Object.create(View.prototype);

Experience.prototype.bind = function() {
	this.incDec();
};

Experience.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Experience.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Experience.prototype.incDec = function() {
	var counter = 88;

	$(".counter").text(counter);

	$(".add").click(function() {
		counter = counter + 1;
  		$(".counter").text(counter);
	});

	$(".subtract").click(function() {
	  counter = counter - 1;
	  $(".counter").text(counter);
	});
};


