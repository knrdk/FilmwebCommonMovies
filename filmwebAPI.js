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

function getMovies(userName, callback) {
    $.ajax({
        url: "http://cors.io/?u=http://www.filmweb.pl/user/" + userName + "/films/wanna-see", //TODO: try to delete cors.io
        type: "GET",
        crossDomain: true,
        success: function (response) {
            moviesHtml = $(response).find(".wantToSeeSee > tbody > tr");

            var a = []
            //TODO: check synchronization: each
            $(moviesHtml).each(function (index, movieHtml) {
                a.push(parseFilm(movieHtml));
            });
            
            callback(a);
        }
    });
}