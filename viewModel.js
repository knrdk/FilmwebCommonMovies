function User(name) {
    var self = this;
    
    self.name = name;
    self.movies = ko.observableArray();
    self.isSelected = ko.observable(true);
    self.isLoaded = ko.observable(false);
    
    self.showSuccess = ko.computed(function() {
        return self.isLoaded() && self.isSelected();
    });
    
    self.showDanger = ko.computed(function() {
        return self.isLoaded() && !self.isSelected();
    });
    
    self.showWarning = ko.computed(function() {
        return !self.isLoaded();
    });
}

var CommonMoviesViewModel = function () {
    var self = this;
    this.users = ko.observableArray();
    this.newUserName = ko.observable("knrdk");
    this.currentUser = ko.observable();

    this.registerClick = function () {
        var newUser = new User(this.newUserName());
        this.newUserName("");

        this.users.push(newUser);
        getMovies(newUser.name, this.callback);
    };
    
    this.selectUser = function(user){
      var isSelected = user.isSelected();
      user.isSelected(!isSelected);
      self.currentUser(user);  
    };

    this.getUserForName = function (userName) {
        var output = null;
        ko.utils.arrayForEach(this.users(), function (user) {
            if(user.name == userName){
                output = user;
            }
        });
        return output;
    }

    this.callback = function (userName, movies) {
        var user = self.getUserForName(userName);
        user.movies(movies);
        user.isLoaded(true);
        self.currentUser(user);
    };
};



var viewModel = new CommonMoviesViewModel();
ko.applyBindings(viewModel);