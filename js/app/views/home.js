var Home = function(){

	this.id = 'home';

	View.apply(this, arguments);
};

Home.prototype = Object.create(View.prototype);

Home.prototype.bind = function() {
	this.animateText();
};

Home.prototype.animateIn = function() {
	
	View.prototype.animateIn.call(this);

	var self = this;

	if ( !this.loaded ) return;

	this.domElem.fadeIn(function(){
		self.onAnimateIn();
	});

};

Home.prototype.animateOut = function() {
	
	View.prototype.animateOut.call(this);

	var self = this;

	this.domElem.fadeOut(function(){
		self.onAnimateOut();
	});

};

Home.prototype.animateText = function() {
	
	var $randomnbr = $('.nbr');
  	var $timer= 25;
  	var $it;
  	var $data = 0;
  	var index;
  	var change;
  	var letters = ["P", "L", "A", "C", "E", "Y", "O", "U", "R", "F", "I", "N", "G", "E", "R", "S"];

  	$randomnbr.each(function(){
    	change = Math.round(Math.random()*100);
    	$(this).attr('data-change', change);
	});
	  
	function random(){
		return Math.round(Math.random()*9);
	};
	  
	function select(){
		return Math.round(Math.random()*$randomnbr.length+1);
	};
	  
	function value(){
	    $('.nbr:nth-child('+select()+')').html(''+random()+'');
	    $('.nbr:nth-child('+select()+')').attr('data-number', $data);
	    $data++;
	    
	    $randomnbr.each(function(){
	        if(parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
	          index = $('.ltr').index(this);
	          $(this).html(letters[index]);
	          $(this).removeClass('nbr');
	        }
	    });
	  };
	  $it = setInterval(value, $timer);

};