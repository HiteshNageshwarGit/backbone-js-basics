// Person Model
var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 30,
		occupation: 'worker'
	}
});

// A List of People
var PeopleCollection = Backbone.Collection.extend({
	model: Person,
	
	comparator: function( collection ){
    return( collection.get( 'name' ) );
  },
  
  swapItems : function(index1, index2) {
        this.models[index1] = this.models.splice(index2, 1, this.models[index1])[0];
    }  
  
});


// View for all people
var PeopleView = Backbone.View.extend({
	tagName: 'ul',

	render: function() {
		this.collection.each(function(person) {			
			var personView = new PersonView({ model: person });
			this.$el.append(personView.render().el);
		}, this);

		return this;
	},
	
events: {
	"click .moveTop": "moveToTop",    
  },

  moveToTop: function() {	  
    this.collection.swapItems(2,0);	
	this.render();	
  },	
  

});

// The View for a Person
var PersonView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#personTemplate').html() ),
	
	render: function() {		
		this.$el.html( this.template(this.model.toJSON()) );
		return this;
	}
});

var peopleCollection = new PeopleCollection(
[{
		name: 'Hitesh',
		age: 26,
		occupation: 'Dot Net Developer'
	},
	{
		name: 'Sunil',
		age: 25,
		occupation: 'Web designer'
	},
	{
		name: 'Vinod',
		age: 26,
		occupation: 'PHP Developer'
	}]

);

var peopleView = new PeopleView({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);

