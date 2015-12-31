function Movie(title, url){
    this.title = title;
    this.url = url;
    
    this.isEqual = function(that){
        return this.url == that.url;  
    };
}

function parseFilm(film) {
    function getFilmTitle(film) {
        return $(film).find('> td').attr('sorttable_customkey');
    }

    function getFilmUrl(film) {
        baseUrl = 'http://www.filmweb.pl';
        return baseUrl + $(film).find('> td > a').attr('href');
    }

    return new Movie(getFilmTitle(film), getFilmUrl(film));
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