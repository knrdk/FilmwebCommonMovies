function parseFilm(film) {
    function getFilmTitle(film) {
        return $(film).find('> td').attr('sorttable_customkey');
    }

    function getFilmUrl(film) {
        baseUrl = 'http://www.filmweb.pl';
        return baseUrl + $(film).find('> td > a').attr('href');
    }

    return {
        title: getFilmTitle(film),
        url: getFilmUrl(film)
    };
}

function getMovies(r) {   
    //TODO: check synchronization: each
    var a = []

    $(r).each(function (index, movieHtml) {
        a.push(parseFilm(movieHtml));
    });

    return a;
}

function processMovies(r) {
    var a = getMovies(r);
    $.each(a, function (index, movie) {
        $('#result').append(
            $('<li>').append(
                $('<a>').attr('href', movie.url).append(
                    movie.title
                    )));
    });
}

$(document).ready(function () {
    var moviesHtml;
    $.get("http://cors.io/?u=http://www.filmweb.pl/user/knrdk/films/wanna-see", function (my_var) {
        moviesHtml = $(my_var).find(".wantToSeeSee > tbody > tr");
        processMovies(moviesHtml);
    });
});