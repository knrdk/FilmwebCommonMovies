function User(name) {
    var self = this;

    self.name = name;
    self.movies = ko.observableArray();
    self.isSelected = ko.observable(false);
    self.isLoaded = ko.observable(false);

    self.showSuccess = ko.computed(function () {
        return self.isLoaded() && self.isSelected();
    });

    self.showDanger = ko.computed(function () {
        return self.isLoaded() && !self.isSelected();
    });

    self.showWarning = ko.computed(function () {
        return !self.isLoaded();
    });
}

var CommonMoviesViewModel = function () {
    var self = this;

    this.users = ko.observableArray();
    this.newUserName = ko.observable("knrdk");

    self.getSelectedUsers = ko.computed(function () {
        var users = []

        ko.utils.arrayForEach(self.users(), function (user) {
            if (user.isSelected()) {
                users.push(user);
            }
        });

        return users;
    });

    self.commonMovies = ko.computed(function () {
        var users = self.getSelectedUsers();
        
        if (users.length < 1) {
            return [];
        } else {
            var common = users[0].movies();
            for(i=1; i < users.length; i++){
                common = getIntersection(common, users[i].movies());
            }
            return common;            
        }
    });

    getIntersection = function (listA, listB) {
        var movies = [];
        ko.utils.arrayForEach(listA, function (movie) {
            if (containsMovie(movie, listB)) {
                movies.push(movie);
            }
        });
        return movies;
    };

    containsMovie = function (movie, list) {
        var contains = false;
        ko.utils.arrayForEach(list, function (otherMovie) {
            if (movie.isEqual(otherMovie)) {
                contains = true;
            }
        });
        return contains;
    };

    this.registerClick = function () {
        var newUser = new User(this.newUserName());
        this.newUserName("");

        this.users.push(newUser);
        getMovies(newUser.name, this.callback);
    };

    this.selectUser = function (user) {
        var isSelected = user.isSelected();
        user.isSelected(!isSelected);
    };

    this.deleteUser = function (user) {
        self.users.remove(user);
    }

    this.getUserForName = function (userName) {
        var output = null;
        ko.utils.arrayForEach(this.users(), function (user) {
            if (user.name == userName) {
                output = user;
            }
        });
        return output;
    }

    this.callback = function (userName, movies) {
        if (movies.length > 0) {
            var user = self.getUserForName(userName);
            user.isLoaded(true);
            user.isSelected(true);
            user.movies(movies);
        } else {
            showNoMoviesNotification(userName);
        }
    };

    showNoMoviesNotification = function (userName) {
        toastr.options = { "timeOut": 0, "positionClass": "toast-bottom-right" };
        toastr.warning('Brak filmów które użytkownik <b>' + userName + '</b> chce obejrzeć', 'Błąd!')
    }
};



var viewModel = new CommonMoviesViewModel();
ko.applyBindings(viewModel);