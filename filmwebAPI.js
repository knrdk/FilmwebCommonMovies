function Movie(title, url, image) {
    this.title = title;
    this.url = url;
    this.image = image;

    this.isEqual = function (that) {
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

    function getMovieImage(movie) {
        var image_url = String($(movie).find('> td > a > img').attr('src'));
        var length = image_url.length;
        return setCharAt(image_url, length-5, '6');
    }

    function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    return new Movie(getMovieTitle(movie), getMovieUrl(movie), getMovieImage(movie));
}

function getMovies(userName, callback) {
    $.ajax({
        url: "http://cors.io/?http://www.filmweb.pl/user/" + userName + "/films/wanna-see",
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