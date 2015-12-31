function Movie(title, url, image){
    this.title = title;
    this.url = url;
    this.image = image;
    
    this.isEqual = function(that){
        return this.url == that.url;  
    };
}

function parseFilm(movie) {
    function getMovieTitle(movie) {
        return $(movie).find('> td').attr('sorttable_customkey');
    }

    function getMovieUrl(movie) {
        baseUrl = 'http://www.filmweb.pl';
        return baseUrl + $(movie).find('> td > a').attr('href');
    }
    
    function getMovieImage(movie){
        return baseUrl + $(movie).find('> td > a > img').attr('src');
    }

    return new Movie(getMovieTitle(movie), getMovieUrl(movie), getMovieImage(movie));
}

function getMovies(userName, callback) {
    $.ajax({
        url: "http://cors.io/?u=http://www.filmweb.pl/user/" + userName + "/films/wanna-see",
        type: "GET",
        crossDomain: true,
        success: function (response) {
            var moviesHtml = $(response).find(".wantToSeeSee > tbody > tr");

            var movies = []
            //TODO: check synchronization: each
            $(moviesHtml).each(function (index, movieHtml) {
                movies.push(parseFilm(movieHtml));
            });

            callback(userName, movies);
        }
    });
}