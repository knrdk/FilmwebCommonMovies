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
    this.currentUser = ko.observable();

    self.commonMovies = ko.computed(function () {
        var movies = [];

        ko.utils.arrayForEach(self.users(), function (user) {
            if (user.isSelected()) {
                ko.utils.arrayForEach(user.movies(), function (movie) {
                    movies.push(movie);
                });
            }
        });

        return movies;
    });

    this.registerClick = function () {
        var newUser = new User(this.newUserName());
        this.newUserName("");

        this.users.push(newUser);
        getMovies(newUser.name, this.callback);
    };

    this.selectUser = function (user) {
        var isSelected = user.isSelected();
        user.isSelected(!isSelected);
        self.currentUser(user);
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