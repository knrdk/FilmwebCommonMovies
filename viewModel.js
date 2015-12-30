var CommonMoviesViewModel = function() {
    this.userName = ko.observable("");
    
    this.registerClick = function() {
        getMovies(this.userName());
    };
};
 
ko.applyBindings(new CommonMoviesViewModel());