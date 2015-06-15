# Neighborhood Map Project Description

This program demonstrates the use of Google Maps and Yelp! APIs as well as utilizing the Knockout MVVM patterns. The purpose of the app is to perform a local search of businesses around the downtown Dallas, TX area. You can perform keyword searches such as "pizza", "automotive" or "post office", and the app will return a list of search results with markers located on the map as well as a list of businesses on the left panel.

Interface Design and Map functionality

The interface is responsive allowing support from pc, mobile and tablet. The interface has a list view of the items you can tour, a search box to look up additional locations, and an info window that displays the business details. The map is customized via Google Maps API to compliment Yelp! display requirements and provide an effortless and fun search experience for the user.

# App Functionality

Upon launching the site, the app does a default search for 'restaurant'. The map will be populated with markers that represents businesses that relates to the search. Clicking on each marker will display an info window that will yield information about the business. The info window pulls the data from Yelp! api. You can dismiss the info window by clicking on the X on the top right to close. Each new search will place markers in the map, and the map auto-centers & auto-zooms via map-bounds to encompass all the markers in the viewport. Clicking on each marker will pan the map to include the info window. The list view will provide the business thumbnail, rating, review count as well as a button link to Yelp! website for the focus item.

# App Architecture

The app uses Knockout MVVM patterns. Observables update the UI, and Objects also subscribe to observable data to perform automatic updates when data becomes available from ajax calls. Minify JS is used to optimize the code.

Asynchronous Data Usage

The app uses Google Maps API, Google Places API, Google Search API, Yelp! API call in a asynchronous manner. The app now graciously manage API errors when the internet connection is lost (i.e. The user is informed that something is wrong). The app uses Offline.js to manage these errors.

# Geospatial / Map functionality

Markers inherit the bounce animation to distinguish the focus item. Info window displays information about the business. The list panel returns a list of search results. Each time the marker is clicked on the map, the focus business item is highlighted on the list panel so that it compliments the info window marker of the business.

# Location Details Functionality

Each location has additional data included in it's InfoWindow. Specifically, information about Yelp! metadata such as name of the restaurant, address, phone, snippet image and snippet url.

# Search Functionality

The app has a search box, and implements error handling if search does not return a result. Search box will be responsive depending on the screen size.

List View Functionality

The app offers a list view of the locations on the map with animation.

# Code Quality

Code passes JSHint and W3C validation tests

# Comments

Comments are provided throughout the code, and code naming conventions are self documenting.

# Documentation

This readme file.

# Links

Source files are located at https://github.com/bt7893/frontend-nanodegree-neighborhoodmap

The working site is hosted at http://bt7893.github.io/frontend-nanodegree-neighborhoodmap/neighborhoodmap.html

# References

Where to obtain a Google Maps API Key: http://www.google.com/apis/maps/signup.html

Where to obtain a "Yelp Web Services ID" (ywsid): http://www.yelp.com/developers/getting_started/api_access

Yelp API Documentation: http://www.yelp.com/developers/documentation

Yelp API Support Forum: http://groups.google.com/group/yelp-developer-support

Google Maps API, Yelp! API, jQuery, w3c, knockoutjs
