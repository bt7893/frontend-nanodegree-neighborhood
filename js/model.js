// Create knockout model to bind to the search element
function yelpSearchItem() {
  var self = this;

	// Set the bind-data to the search field to the 'default search item'
	self.searchTerm = ko.observable(defaultSearchItem);
	// Update search model
	self.updateYelpResults = function(){
		// Return the updated data from the search field	then run the ajax function to create the yelp list
		ko.computed(function(){
			yelpAjax(zipCode, self.searchTerm());
		}, self);
	};
}

// Start New Search Item
ko.applyBindings(new yelpSearchItem());
