let API_KEY = '23db507c6ddf623a33c1632b28fb612c';
let url = 'https://api.themoviedb.org/3/';

let responseGenreOne = NaN;
let GenreOnejson = NaN;

let responseGenreTwo = NaN;
let GenreTwojson = NaN;

async function setGenres()
{
    responseGenreOne = await fetch(url + 'genre/movie/list?api_key=' + API_KEY + '&language=en-US');
    GenreOnejson = await responseGenreOne.json();

    responseGenreTwo = await fetch(url + 'genre/tv/list?api_key=' + API_KEY + '&language=en-US');
    GenreTwojson = await responseGenreTwo.json();
    return GenreOnejson;
}

async function getTrendingSerials()
{
    try 
    {
        // https://api.themoviedb.org/3/trending/all/week?api_key=23db507c6ddf623a33c1632b28fb612c&page=1
        const response = await fetch(url + 'trending/tv/week?api_key=' + API_KEY + '&page=1');
        const json = await response.json();
        console.log(json);
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }
        
        let TrendingSerials = [];
        for(let item of json.results)
        {
            TrendingSerials.push({
                Poster : "https://image.tmdb.org/t/p/w500/" + item.poster_path,
                BackImage : "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
                Id : item.id,
                Title : item.name,
                Discription : item.overview,
                FirstDate : item.first_air_date,
                Vote : item.vote_average,
                Type: item.media_type
            });
        }
        return TrendingSerials;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getTrendingMovies()
{
    try 
    {
        // https://api.themoviedb.org/3/trending/all/week?api_key=23db507c6ddf623a33c1632b28fb612c&page=1
        const response = await fetch(url + 'trending/movie/week?api_key=' + API_KEY + '&page=1');
        const json = await response.json();
        console.log(json);
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }
        
        let TrendingMovies = [];
        for(let item of json.results)
        {
            TrendingMovies.push({
                Poster : "https://image.tmdb.org/t/p/w500/" + item.poster_path,
                BackImage : "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
                Id : item.id,
                Title : item.original_title,
                Discription : item.overview,
                FirstDate : item.release_date,
                Vote : item.vote_average,
                Type: item.media_type
            });
        }
        return TrendingMovies;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getTrendingAll()
{
    try 
    {
        //https://api.themoviedb.org/3/genre/movie/list?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        //https://api.themoviedb.org/3/genre/tv/list?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        const response = await fetch(url + 'trending/all/week?api_key=' + API_KEY + '&page=1');
        const json = await response.json();

        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }
        
        let TrendingAll = [];
        for(let item of json.results)
        {
            if(item.original_title == undefined) item.original_title = item.name;
            if(item.overview.length > 259) item.overview = item.overview.substr(0,256) + '...';
            TrendingAll.push({
                Poster : "https://image.tmdb.org/t/p/w500/" + item.poster_path,
                BackImage : "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
                Id : item.id,
                Title : item.original_title,
                Discription : item.overview,
                FirstDate : item.release_date,
                Vote : item.vote_average,
                Genres : item.genre_ids,
                Type: item.media_type
            });
        }

        for(let item of TrendingAll)
        {
            if(item.FirstDate == undefined) item.FirstDate = '2023-01-01';

            let tempGenre = '(' + item.FirstDate.split('-')[0] + ') ';
            for(let i = 0; i < item.Genres.length; i++)
            {
                if(item.Type == 'movie')
                for (let genre of GenreOnejson.genres) {
                    if(item.Genres[i] == genre.id) tempGenre = tempGenre + genre.name.toUpperCase() + ', ';
                }

                else
                for (let genre of GenreTwojson.genres) {
                    if(item.Genres[i] == genre.id) tempGenre = tempGenre + genre.name.toUpperCase() + ', ';
                }
            }
            item.Genres = tempGenre.substr(0, tempGenre.length-2);
        }

        return TrendingAll;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getSerial(id)
{
    try 
    {
        //https://api.themoviedb.org/3/tv/85552?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        
        let response = await fetch(url + 'tv/' + id + '?api_key=' + API_KEY + '&page=1');
        let json = await response.json();
        
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }

        let Serial = {
            Poster : "https://image.tmdb.org/t/p/w500/" + json.poster_path,
            BackImage : "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + json.backdrop_path,
            Id : json.id,
            Title : json.name,
            Discription : json.overview,
            FirstDate : json.first_air_date,
            Vote : json.vote_average,
            Genre : json.genres[0].name,
            Creator: json.created_by[0].name,
            Creator_id : json.created_by[0].credit_id,
            Min:json.episode_run_time,
            Acters:[],
            Videos:[],
            Comments:[]
        }
        
        let genre = json.genres[0].name;

        for(let i = 1; i < json.genres.length; i++)
        {
            genre += ', ' + json.genres[i].name;
        }

        Serial.Genre = genre;

        //https://api.themoviedb.org/3/tv/85552/credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        response = await fetch(url + 'tv/' + id + '/credits?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();

        for (const item of json.cast) {
            let ImagePath = null;

            if(item.profile_path == null) ImagePath = "../catch.png";
            else ImagePath = "https://www.themoviedb.org/t/p/w276_and_h350_face/" + item.profile_path;

            Serial.Acters.push({
                Character: item.character,
                Id: item.id,
                Name: item.name,
                Image: ImagePath,
                Popularity: item.popularity
            });
        }

        //https://api.themoviedb.org/3/tv/85552/videos?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US

        response = await fetch(url + 'tv/' + id + '/videos?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();

        for (const item of json.results) {
            Serial.Videos.push("https://www.youtube.com/embed/" + item.key);
        }
        
        //https://api.themoviedb.org/3/tv/85552/reviews?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&page=1

        response = await fetch(url + 'tv/' + id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1');
        json = await response.json();

        for (const item of json.results) {
            let _content  = item.content;
            let _rating = (item.rating/10)*5;

            if(_rating.toString() == "NaN") _rating = 1;
            if(_content.length > 240) _content =  _content.substr(0,237) + "...";

            Serial.Comments.push({
                Nick : item.author,
                Content : _content,
                Rating : _rating,
                Date: item.updated_at.substr(0, 10)
            });
        }
        return Serial;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getMovie(id)
{
    try 
    {
        //https://api.themoviedb.org/3/movie/656663?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        
        let response = await fetch(url + 'movie/' + id + '?api_key=' + API_KEY + '&page=1');
        let json = await response.json();
        
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }

        let Movie = {
            Poster : "https://image.tmdb.org/t/p/w500/" + json.poster_path,
            BackImage : "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + json.backdrop_path,
            Id : json.id,
            Title : json.title,
            Discription : json.overview,
            FirstDate : json.release_date,
            Vote : json.vote_average,
            Genre : json.genres[0].name,
            Creator: json.production_companies[0].name,
            Creator_id : json.production_companies[0].credit_id,
            Min:json.runtime,
            Acters:[],
            Videos:[],
            Comments:[]
        }
        
        let genre = json.genres[0].name;

        for(let i = 1; i < json.genres.length; i++)
        {
            genre += ', ' + json.genres[i].name;
        }

        Movie.Genre = genre;

        //https://api.themoviedb.org/3/movie/656663/credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        response = await fetch(url + 'movie/' + id + '/credits?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();

        for (const item of json.cast) {
            let ImagePath = null;

            if(item.profile_path == null) ImagePath = "../catch.png";
            else ImagePath = "https://www.themoviedb.org/t/p/w276_and_h350_face/" + item.profile_path;

            Movie.Acters.push({
                Character: item.character,
                Id: item.id,
                Name: item.name,
                Image: ImagePath,
                Popularity: item.popularity
            });
        }

        //https://api.themoviedb.org/3/movie/656663/videos?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US

        response = await fetch(url + 'movie/' + id + '/videos?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();

        for (const item of json.results) {
            Movie.Videos.push("https://www.youtube.com/embed/" + item.key);
        }
        
        //https://api.themoviedb.org/3/movie/656663/reviews?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&page=1

        response = await fetch(url + 'movie/' + id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1');
        json = await response.json();

        for (const item of json.results) {
            let _content  = item.content;
            let _rating = (item.rating/10)*5;

            if(_rating.toString() == "NaN") _rating = 1;
            if(_content.length > 240) _content =  _content.substr(0,237) + "...";

            Movie.Comments.push({
                Nick : item.author,
                Content : _content,
                Rating : _rating,
                Date: item.updated_at.substr(0, 10)
            });
        }
        return Movie;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getPeople(id)
{
    try 
    {
        //https://api.themoviedb.org/3/person/7499?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        let response = await fetch(url + 'person/' + id + '?api_key=' + API_KEY + '&language=en-US');
        let json = await response.json();

        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }

        if(json.profile_path == null) json.profile_path = '../catch.png';
        else json.profile_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + json.profile_path;

        if(json.birthday == null) json.birthday = '1970';

        let Acter = {
            Poster : json.profile_path,
            BackImage : json.profile_path,
            Id : json.id,
            Title : json.name,
            Discription : json.biography.substr(0,800) + '...',
            FirstDate : json.birthday,
            Vote : parseFloat((json.popularity / 10).toString().substring(0,3)),
            Genre : json.known_for_department,
            Creator: json.place_of_birth,
            Movies : [],
            Serials : []
        }
        //https://api.themoviedb.org/3/person/7499/movie_credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US
        response = await fetch(url + 'person/' + id + '/movie_credits?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();
        
        for(let item of json.cast)
        {
            if(item.poster_path == null) item.poster_path = '../catch.png';
            else item.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;

            if(item.release_date == '' || item.release_date == null) item.release_date = '1970';

            Acter.Movies.push({
                Poster : item.poster_path,
                Title : item.original_title.substr(0,20)+'...',
                Date : item.release_date.substr(0,4),
                Id : item.id,
            });
        }

        response = await fetch(url + 'person/' + id + '/tv_credits?api_key=' + API_KEY + '&language=en-US');
        json = await response.json();
        console.log(json);
 
        for(let item of json.cast)
        {
            if(item.poster_path == null) item.poster_path = '../catch.png';
            else item.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;

            if(item.first_air_date == '' || item.first_air_date == null) item.first_air_date = '1970';

            Acter.Serials.push({
                Poster : item.poster_path,
                Title : item.name.substr(0,20)+'...',
                Date : item.first_air_date.substr(0,4),
                Id : item.id,
            });
        }

        return Acter;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getSearchMovies(query, page) 
{
    try 
    {
        //https://api.themoviedb.org/3/search/movie?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&query=Spider%20man&page=1&include_adult=false
        let response = await fetch(url + 'search/movie?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page='+ page +'&include_adult=false');
        let json = await response.json();
        
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }

        let Content = [];

        for (const item of json.results) {

            if(item.release_date == undefined || item.release_date == '') item.release_date = '1970';

            if(item.poster_path == null) item.poster_path = '../catch.png';
            else item.poster_path = 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' + item.poster_path; 

            Content.push(
            {
                'Poster' : item.poster_path,
                'Title' : item.original_title,
                'Description' : item.overview,
                'Vote' : item.vote_average,
                'Vote_Count' : item.vote_count,
                'Country' : item.original_language == 'en' ? '🇺🇸' : getFlagEmoji(item.original_language),
                'Date' : '(' + item.release_date.substring(0,4) + ')',
                'Genre' : item.genre_ids,
                'Link' : `../about/?type=movie&id=${item.id}`
            });
        } 
        return {'Content' : Content, 'count' : json.total_results}; 
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getSearchSerials(query, page) 
{
    try      
    {
        //https://api.themoviedb.org/3/search/tv?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&query=Spider%20man&page=1&include_adult=false
        let response = await fetch(url + 'search/tv?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page='+ page +'&include_adult=false');
        let json = await response.json();
        
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }

        let Content = [];

        for (const item of json.results) {
            if(item.first_air_date == undefined) item.first_air_date = '1970';
            Content.push(
            {
                'Poster' : 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' +  item.poster_path,
                'Title' : item.original_name,
                'Description' : item.overview,
                'Vote' : item.vote_average,
                'Vote_Count' : item.vote_count,
                'Country' : item.original_language == 'en' ? '🇺🇸' : getFlagEmoji(item.original_language),
                'Date' : '(' + item.first_air_date.substring(0,4) + ')',
                'Genre' : item.genre_ids,
                'Link' : `../about/?type=tv&id=${item.id}`
            });
        } 
        return {'Content' : Content, 'count' : json.total_results}; 
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getSearchPeoples(query, page) 
{
    try      
    {
        //https://api.themoviedb.org/3/search/person?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&query=leto&page=1&include_adult=false
        let response = await fetch(url + 'search/person?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page='+ page +'&include_adult=false');
        let json = await response.json();
        
        if(json.Response == 'False')
        {
            if(items.length == 0)LoadCatchWindow();
            return;
        }
        let Content = [];

        for (const item of json.results) {

            try { if(known_for.length == undefined) {} }
            catch
            {
                item.known_for.push({
                    'release_date' : '1970-00-00',
                    'first_air_date' :'1970-00-00',
                    'overview' : 'Coming Soon',
                    'original_title' : 'unknown'
                })
            }
            
            if(item.known_for[0].release_date == null) item.known_for[0].release_date = item.known_for[0].first_air_date;
            
            if(item.profile_path == null) item.profile_path = '../catch.png';
            else item.profile_path = 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' + item.profile_path; 

            Content.push(
            {
                'Poster' : item.profile_path,
                'Title' : item.name,
                'Description' : item.known_for[0].overview,
                'Vote' : item.popularity/10,
                'Vote_Count' : item.popularity,
                'Date' : '(' + item.known_for[0].release_date.substr(0,4) + ')',
                'Genre' : item.known_for[0].original_title,
                'Link' : `../about/?type=people&id=${item.id}`
            });
        } 

        return {'Content' : Content, 'count' : json.total_results}; 
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

async function getSearchCounts(query) 
{
    try      
    {
        let Values = [];

        let _temp = await getSearchMovies(query, 1);
        Values.push(_temp.count);
        
        _temp = await getSearchSerials(query, 1);
        Values.push(_temp.count);

        _temp = await getSearchPeoples(query, 1);
        Values.push(_temp.count);

        return Values;
    } 
    catch (error) 
    {
        console.log('Ошибка:', error);
    }
}

function getFlagEmoji(countryCode)
{
    const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

