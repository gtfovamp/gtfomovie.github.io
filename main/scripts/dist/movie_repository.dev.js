"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var API_KEY = '23db507c6ddf623a33c1632b28fb612c';
var url = 'https://api.themoviedb.org/3/';
var responseGenreOne = NaN;
var GenreOnejson = NaN;
var responseGenreTwo = NaN;
var GenreTwojson = NaN;

function setGenres() {
  return regeneratorRuntime.async(function setGenres$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url + 'genre/movie/list?api_key=' + API_KEY + '&language=en-US'));

        case 2:
          responseGenreOne = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(responseGenreOne.json());

        case 5:
          GenreOnejson = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(fetch(url + 'genre/tv/list?api_key=' + API_KEY + '&language=en-US'));

        case 8:
          responseGenreTwo = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(responseGenreTwo.json());

        case 11:
          GenreTwojson = _context.sent;
          return _context.abrupt("return", GenreOnejson);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getTrendingSerials() {
  var response, json, TrendingSerials, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function getTrendingSerials$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'trending/tv/week?api_key=' + API_KEY + '&page=1'));

        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context2.sent;
          console.log(json);

          if (!(json.Response == 'False')) {
            _context2.next = 11;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context2.abrupt("return");

        case 11:
          TrendingSerials = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 15;

          for (_iterator = json.results[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            TrendingSerials.push({
              Poster: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
              BackImage: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
              Id: item.id,
              Title: item.name,
              Discription: item.overview,
              FirstDate: item.first_air_date,
              Vote: item.vote_average,
              Type: item.media_type
            });
          }

          _context2.next = 23;
          break;

        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](15);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 23:
          _context2.prev = 23;
          _context2.prev = 24;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 26:
          _context2.prev = 26;

          if (!_didIteratorError) {
            _context2.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context2.finish(26);

        case 30:
          return _context2.finish(23);

        case 31:
          return _context2.abrupt("return", TrendingSerials);

        case 34:
          _context2.prev = 34;
          _context2.t1 = _context2["catch"](0);
          console.log('Ошибка:', _context2.t1);

        case 37:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 34], [15, 19, 23, 31], [24,, 26, 30]]);
}

function getTrendingMovies() {
  var response, json, TrendingMovies, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

  return regeneratorRuntime.async(function getTrendingMovies$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'trending/movie/week?api_key=' + API_KEY + '&page=1'));

        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context3.sent;
          console.log(json);

          if (!(json.Response == 'False')) {
            _context3.next = 11;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context3.abrupt("return");

        case 11:
          TrendingMovies = [];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 15;

          for (_iterator2 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            item = _step2.value;
            TrendingMovies.push({
              Poster: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
              BackImage: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
              Id: item.id,
              Title: item.original_title,
              Discription: item.overview,
              FirstDate: item.release_date,
              Vote: item.vote_average,
              Type: item.media_type
            });
          }

          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](15);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 23:
          _context3.prev = 23;
          _context3.prev = 24;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 26:
          _context3.prev = 26;

          if (!_didIteratorError2) {
            _context3.next = 29;
            break;
          }

          throw _iteratorError2;

        case 29:
          return _context3.finish(26);

        case 30:
          return _context3.finish(23);

        case 31:
          return _context3.abrupt("return", TrendingMovies);

        case 34:
          _context3.prev = 34;
          _context3.t1 = _context3["catch"](0);
          console.log('Ошибка:', _context3.t1);

        case 37:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 34], [15, 19, 23, 31], [24,, 26, 30]]);
}

function getTrendingAll() {
  var response, json, TrendingAll, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, _i, _TrendingAll, _item, tempGenre, i, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, genre, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _genre;

  return regeneratorRuntime.async(function getTrendingAll$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'trending/all/week?api_key=' + API_KEY + '&page=1'));

        case 3:
          response = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context4.sent;

          if (!(json.Response == 'False')) {
            _context4.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context4.abrupt("return");

        case 10:
          TrendingAll = [];
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context4.prev = 14;

          for (_iterator3 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            item = _step3.value;
            if (item.original_title == undefined) item.original_title = item.name;
            if (item.overview.length > 259) item.overview = item.overview.substr(0, 256) + '...';
            TrendingAll.push({
              Poster: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
              BackImage: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + item.backdrop_path,
              Id: item.id,
              Title: item.original_title,
              Discription: item.overview,
              FirstDate: item.release_date,
              Vote: item.vote_average,
              Genres: item.genre_ids,
              Type: item.media_type
            });
          }

          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](14);
          _didIteratorError3 = true;
          _iteratorError3 = _context4.t0;

        case 22:
          _context4.prev = 22;
          _context4.prev = 23;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 25:
          _context4.prev = 25;

          if (!_didIteratorError3) {
            _context4.next = 28;
            break;
          }

          throw _iteratorError3;

        case 28:
          return _context4.finish(25);

        case 29:
          return _context4.finish(22);

        case 30:
          _i = 0, _TrendingAll = TrendingAll;

        case 31:
          if (!(_i < _TrendingAll.length)) {
            _context4.next = 85;
            break;
          }

          _item = _TrendingAll[_i];
          if (_item.FirstDate == undefined) _item.FirstDate = '2023-01-01';
          tempGenre = '(' + _item.FirstDate.split('-')[0] + ') ';
          i = 0;

        case 36:
          if (!(i < _item.Genres.length)) {
            _context4.next = 81;
            break;
          }

          if (!(_item.Type == 'movie')) {
            _context4.next = 59;
            break;
          }

          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context4.prev = 41;

          for (_iterator4 = GenreOnejson.genres[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            genre = _step4.value;
            if (_item.Genres[i] == genre.id) tempGenre = tempGenre + genre.name.toUpperCase() + ', ';
          }

          _context4.next = 49;
          break;

        case 45:
          _context4.prev = 45;
          _context4.t1 = _context4["catch"](41);
          _didIteratorError4 = true;
          _iteratorError4 = _context4.t1;

        case 49:
          _context4.prev = 49;
          _context4.prev = 50;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 52:
          _context4.prev = 52;

          if (!_didIteratorError4) {
            _context4.next = 55;
            break;
          }

          throw _iteratorError4;

        case 55:
          return _context4.finish(52);

        case 56:
          return _context4.finish(49);

        case 57:
          _context4.next = 78;
          break;

        case 59:
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context4.prev = 62;

          for (_iterator5 = GenreTwojson.genres[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            _genre = _step5.value;
            if (_item.Genres[i] == _genre.id) tempGenre = tempGenre + _genre.name.toUpperCase() + ', ';
          }

          _context4.next = 70;
          break;

        case 66:
          _context4.prev = 66;
          _context4.t2 = _context4["catch"](62);
          _didIteratorError5 = true;
          _iteratorError5 = _context4.t2;

        case 70:
          _context4.prev = 70;
          _context4.prev = 71;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 73:
          _context4.prev = 73;

          if (!_didIteratorError5) {
            _context4.next = 76;
            break;
          }

          throw _iteratorError5;

        case 76:
          return _context4.finish(73);

        case 77:
          return _context4.finish(70);

        case 78:
          i++;
          _context4.next = 36;
          break;

        case 81:
          _item.Genres = tempGenre.substr(0, tempGenre.length - 2);

        case 82:
          _i++;
          _context4.next = 31;
          break;

        case 85:
          return _context4.abrupt("return", TrendingAll);

        case 88:
          _context4.prev = 88;
          _context4.t3 = _context4["catch"](0);
          console.log('Ошибка:', _context4.t3);

        case 91:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 88], [14, 18, 22, 30], [23,, 25, 29], [41, 45, 49, 57], [50,, 52, 56], [62, 66, 70, 78], [71,, 73, 77]]);
}

function getSerial(id) {
  var response, json, Serial, genre, i, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, item, ImagePath, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _item2, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _item3, _content, _rating;

  return regeneratorRuntime.async(function getSerial$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'tv/' + id + '?api_key=' + API_KEY + '&page=1'));

        case 3:
          response = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context5.sent;

          if (!(json.Response == 'False')) {
            _context5.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context5.abrupt("return");

        case 10:
          Serial = {
            Poster: "https://image.tmdb.org/t/p/w500/" + json.poster_path,
            BackImage: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + json.backdrop_path,
            Id: json.id,
            Title: json.name,
            Discription: json.overview,
            FirstDate: json.first_air_date,
            Vote: json.vote_average,
            Genre: json.genres[0].name,
            Creator: json.created_by[0].name,
            Creator_id: json.created_by[0].credit_id,
            Min: json.episode_run_time,
            Acters: [],
            Videos: [],
            Comments: []
          };
          genre = json.genres[0].name;

          for (i = 1; i < json.genres.length; i++) {
            genre += ', ' + json.genres[i].name;
          }

          Serial.Genre = genre; //https://api.themoviedb.org/3/tv/85552/credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US

          _context5.next = 16;
          return regeneratorRuntime.awrap(fetch(url + 'tv/' + id + '/credits?api_key=' + API_KEY + '&language=en-US'));

        case 16:
          response = _context5.sent;
          _context5.next = 19;
          return regeneratorRuntime.awrap(response.json());

        case 19:
          json = _context5.sent;
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context5.prev = 23;

          for (_iterator6 = json.cast[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            item = _step6.value;
            ImagePath = null;
            if (item.profile_path == null) ImagePath = "../catch.png";else ImagePath = "https://www.themoviedb.org/t/p/w276_and_h350_face/" + item.profile_path;
            Serial.Acters.push({
              Character: item.character,
              Id: item.id,
              Name: item.name,
              Image: ImagePath,
              Popularity: item.popularity
            });
          } //https://api.themoviedb.org/3/tv/85552/videos?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US


          _context5.next = 31;
          break;

        case 27:
          _context5.prev = 27;
          _context5.t0 = _context5["catch"](23);
          _didIteratorError6 = true;
          _iteratorError6 = _context5.t0;

        case 31:
          _context5.prev = 31;
          _context5.prev = 32;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 34:
          _context5.prev = 34;

          if (!_didIteratorError6) {
            _context5.next = 37;
            break;
          }

          throw _iteratorError6;

        case 37:
          return _context5.finish(34);

        case 38:
          return _context5.finish(31);

        case 39:
          _context5.next = 41;
          return regeneratorRuntime.awrap(fetch(url + 'tv/' + id + '/videos?api_key=' + API_KEY + '&language=en-US'));

        case 41:
          response = _context5.sent;
          _context5.next = 44;
          return regeneratorRuntime.awrap(response.json());

        case 44:
          json = _context5.sent;
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          _context5.prev = 48;

          for (_iterator7 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            _item2 = _step7.value;
            Serial.Videos.push("https://www.youtube.com/embed/" + _item2.key);
          } //https://api.themoviedb.org/3/tv/85552/reviews?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&page=1


          _context5.next = 56;
          break;

        case 52:
          _context5.prev = 52;
          _context5.t1 = _context5["catch"](48);
          _didIteratorError7 = true;
          _iteratorError7 = _context5.t1;

        case 56:
          _context5.prev = 56;
          _context5.prev = 57;

          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }

        case 59:
          _context5.prev = 59;

          if (!_didIteratorError7) {
            _context5.next = 62;
            break;
          }

          throw _iteratorError7;

        case 62:
          return _context5.finish(59);

        case 63:
          return _context5.finish(56);

        case 64:
          _context5.next = 66;
          return regeneratorRuntime.awrap(fetch(url + 'tv/' + id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1'));

        case 66:
          response = _context5.sent;
          _context5.next = 69;
          return regeneratorRuntime.awrap(response.json());

        case 69:
          json = _context5.sent;
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context5.prev = 73;

          for (_iterator8 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            _item3 = _step8.value;
            _content = _item3.content;
            _rating = _item3.rating / 10 * 5;
            if (_rating.toString() == "NaN") _rating = 1;
            if (_content.length > 240) _content = _content.substr(0, 237) + "...";
            Serial.Comments.push({
              Nick: _item3.author,
              Content: _content,
              Rating: _rating,
              Date: _item3.updated_at.substr(0, 10)
            });
          }

          _context5.next = 81;
          break;

        case 77:
          _context5.prev = 77;
          _context5.t2 = _context5["catch"](73);
          _didIteratorError8 = true;
          _iteratorError8 = _context5.t2;

        case 81:
          _context5.prev = 81;
          _context5.prev = 82;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 84:
          _context5.prev = 84;

          if (!_didIteratorError8) {
            _context5.next = 87;
            break;
          }

          throw _iteratorError8;

        case 87:
          return _context5.finish(84);

        case 88:
          return _context5.finish(81);

        case 89:
          return _context5.abrupt("return", Serial);

        case 92:
          _context5.prev = 92;
          _context5.t3 = _context5["catch"](0);
          console.log('Ошибка:', _context5.t3);

        case 95:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 92], [23, 27, 31, 39], [32,, 34, 38], [48, 52, 56, 64], [57,, 59, 63], [73, 77, 81, 89], [82,, 84, 88]]);
}

function getMovie(id) {
  var response, json, Movie, genre, i, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, item, ImagePath, _iteratorNormalCompletion10, _didIteratorError10, _iteratorError10, _iterator10, _step10, _item4, _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _item5, _content, _rating;

  return regeneratorRuntime.async(function getMovie$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'movie/' + id + '?api_key=' + API_KEY + '&page=1'));

        case 3:
          response = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context6.sent;

          if (!(json.Response == 'False')) {
            _context6.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context6.abrupt("return");

        case 10:
          Movie = {
            Poster: "https://image.tmdb.org/t/p/w500/" + json.poster_path,
            BackImage: "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + json.backdrop_path,
            Id: json.id,
            Title: json.title,
            Discription: json.overview,
            FirstDate: json.release_date,
            Vote: json.vote_average,
            Genre: json.genres[0].name,
            Creator: json.production_companies[0].name,
            Creator_id: json.production_companies[0].credit_id,
            Min: json.runtime,
            Acters: [],
            Videos: [],
            Comments: []
          };
          genre = json.genres[0].name;

          for (i = 1; i < json.genres.length; i++) {
            genre += ', ' + json.genres[i].name;
          }

          Movie.Genre = genre; //https://api.themoviedb.org/3/movie/656663/credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US

          _context6.next = 16;
          return regeneratorRuntime.awrap(fetch(url + 'movie/' + id + '/credits?api_key=' + API_KEY + '&language=en-US'));

        case 16:
          response = _context6.sent;
          _context6.next = 19;
          return regeneratorRuntime.awrap(response.json());

        case 19:
          json = _context6.sent;
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          _context6.prev = 23;

          for (_iterator9 = json.cast[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            item = _step9.value;
            ImagePath = null;
            if (item.profile_path == null) ImagePath = "../catch.png";else ImagePath = "https://www.themoviedb.org/t/p/w276_and_h350_face/" + item.profile_path;
            Movie.Acters.push({
              Character: item.character,
              Id: item.id,
              Name: item.name,
              Image: ImagePath,
              Popularity: item.popularity
            });
          } //https://api.themoviedb.org/3/movie/656663/videos?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US


          _context6.next = 31;
          break;

        case 27:
          _context6.prev = 27;
          _context6.t0 = _context6["catch"](23);
          _didIteratorError9 = true;
          _iteratorError9 = _context6.t0;

        case 31:
          _context6.prev = 31;
          _context6.prev = 32;

          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }

        case 34:
          _context6.prev = 34;

          if (!_didIteratorError9) {
            _context6.next = 37;
            break;
          }

          throw _iteratorError9;

        case 37:
          return _context6.finish(34);

        case 38:
          return _context6.finish(31);

        case 39:
          _context6.next = 41;
          return regeneratorRuntime.awrap(fetch(url + 'movie/' + id + '/videos?api_key=' + API_KEY + '&language=en-US'));

        case 41:
          response = _context6.sent;
          _context6.next = 44;
          return regeneratorRuntime.awrap(response.json());

        case 44:
          json = _context6.sent;
          _iteratorNormalCompletion10 = true;
          _didIteratorError10 = false;
          _iteratorError10 = undefined;
          _context6.prev = 48;

          for (_iterator10 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            _item4 = _step10.value;
            Movie.Videos.push("https://www.youtube.com/embed/" + _item4.key);
          } //https://api.themoviedb.org/3/movie/656663/reviews?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US&page=1


          _context6.next = 56;
          break;

        case 52:
          _context6.prev = 52;
          _context6.t1 = _context6["catch"](48);
          _didIteratorError10 = true;
          _iteratorError10 = _context6.t1;

        case 56:
          _context6.prev = 56;
          _context6.prev = 57;

          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
            _iterator10["return"]();
          }

        case 59:
          _context6.prev = 59;

          if (!_didIteratorError10) {
            _context6.next = 62;
            break;
          }

          throw _iteratorError10;

        case 62:
          return _context6.finish(59);

        case 63:
          return _context6.finish(56);

        case 64:
          _context6.next = 66;
          return regeneratorRuntime.awrap(fetch(url + 'movie/' + id + '/reviews?api_key=' + API_KEY + '&language=en-US&page=1'));

        case 66:
          response = _context6.sent;
          _context6.next = 69;
          return regeneratorRuntime.awrap(response.json());

        case 69:
          json = _context6.sent;
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context6.prev = 73;

          for (_iterator11 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
            _item5 = _step11.value;
            _content = _item5.content;
            _rating = _item5.rating / 10 * 5;
            if (_rating.toString() == "NaN") _rating = 1;
            if (_content.length > 240) _content = _content.substr(0, 237) + "...";
            Movie.Comments.push({
              Nick: _item5.author,
              Content: _content,
              Rating: _rating,
              Date: _item5.updated_at.substr(0, 10)
            });
          }

          _context6.next = 81;
          break;

        case 77:
          _context6.prev = 77;
          _context6.t2 = _context6["catch"](73);
          _didIteratorError11 = true;
          _iteratorError11 = _context6.t2;

        case 81:
          _context6.prev = 81;
          _context6.prev = 82;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 84:
          _context6.prev = 84;

          if (!_didIteratorError11) {
            _context6.next = 87;
            break;
          }

          throw _iteratorError11;

        case 87:
          return _context6.finish(84);

        case 88:
          return _context6.finish(81);

        case 89:
          return _context6.abrupt("return", Movie);

        case 92:
          _context6.prev = 92;
          _context6.t3 = _context6["catch"](0);
          console.log('Ошибка:', _context6.t3);

        case 95:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 92], [23, 27, 31, 39], [32,, 34, 38], [48, 52, 56, 64], [57,, 59, 63], [73, 77, 81, 89], [82,, 84, 88]]);
}

function getPeople(id) {
  var response, json, Acter, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, item, _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _item6;

  return regeneratorRuntime.async(function getPeople$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'person/' + id + '?api_key=' + API_KEY + '&language=en-US'));

        case 3:
          response = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context7.sent;

          if (!(json.Response == 'False')) {
            _context7.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context7.abrupt("return");

        case 10:
          if (json.profile_path == null) json.profile_path = '../catch.png';else json.profile_path = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/" + json.profile_path;
          Acter = {
            Poster: json.profile_path,
            BackImage: json.profile_path,
            Id: json.id,
            Title: json.name,
            Discription: json.biography.substr(0, 800) + '...',
            FirstDate: json.birthday,
            Vote: parseFloat((json.popularity / 10).toString().substring(0, 3)),
            Genre: json.known_for_department,
            Creator: json.place_of_birth,
            Movies: [],
            Serials: []
          }; //https://api.themoviedb.org/3/person/7499/movie_credits?api_key=23db507c6ddf623a33c1632b28fb612c&language=en-US

          _context7.next = 14;
          return regeneratorRuntime.awrap(fetch(url + 'person/' + id + '/movie_credits?api_key=' + API_KEY + '&language=en-US'));

        case 14:
          response = _context7.sent;
          _context7.next = 17;
          return regeneratorRuntime.awrap(response.json());

        case 17:
          json = _context7.sent;
          console.log(json);
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          _context7.prev = 22;

          for (_iterator12 = json.cast[Symbol.iterator](); !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
            item = _step12.value;
            if (item.poster_path == null) item.poster_path = '../catch.png';else item.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
            Acter.Movies.push({
              Poster: item.poster_path,
              Title: item.original_title.substr(0, 20) + '...',
              Date: item.release_date.substr(0, 4),
              Id: item.id
            });
          }

          _context7.next = 30;
          break;

        case 26:
          _context7.prev = 26;
          _context7.t0 = _context7["catch"](22);
          _didIteratorError12 = true;
          _iteratorError12 = _context7.t0;

        case 30:
          _context7.prev = 30;
          _context7.prev = 31;

          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }

        case 33:
          _context7.prev = 33;

          if (!_didIteratorError12) {
            _context7.next = 36;
            break;
          }

          throw _iteratorError12;

        case 36:
          return _context7.finish(33);

        case 37:
          return _context7.finish(30);

        case 38:
          _context7.next = 40;
          return regeneratorRuntime.awrap(fetch(url + 'person/' + id + '/tv_credits?api_key=' + API_KEY + '&language=en-US'));

        case 40:
          response = _context7.sent;
          _context7.next = 43;
          return regeneratorRuntime.awrap(response.json());

        case 43:
          json = _context7.sent;
          _iteratorNormalCompletion13 = true;
          _didIteratorError13 = false;
          _iteratorError13 = undefined;
          _context7.prev = 47;

          for (_iterator13 = json.cast[Symbol.iterator](); !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
            _item6 = _step13.value;
            if (_item6.poster_path == null) _item6.poster_path = '../catch.png';else _item6.poster_path = "https://image.tmdb.org/t/p/w500/" + _item6.poster_path;
            Acter.Serials.push({
              Poster: _item6.poster_path,
              Id: _item6.id
            });
          }

          _context7.next = 55;
          break;

        case 51:
          _context7.prev = 51;
          _context7.t1 = _context7["catch"](47);
          _didIteratorError13 = true;
          _iteratorError13 = _context7.t1;

        case 55:
          _context7.prev = 55;
          _context7.prev = 56;

          if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
            _iterator13["return"]();
          }

        case 58:
          _context7.prev = 58;

          if (!_didIteratorError13) {
            _context7.next = 61;
            break;
          }

          throw _iteratorError13;

        case 61:
          return _context7.finish(58);

        case 62:
          return _context7.finish(55);

        case 63:
          return _context7.abrupt("return", Acter);

        case 66:
          _context7.prev = 66;
          _context7.t2 = _context7["catch"](0);
          console.log('Ошибка:', _context7.t2);

        case 69:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 66], [22, 26, 30, 38], [31,, 33, 37], [47, 51, 55, 63], [56,, 58, 62]]);
}

function getSearchMovies(query, page) {
  var response, json, Content, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, item;

  return regeneratorRuntime.async(function getSearchMovies$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'search/movie?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false'));

        case 3:
          response = _context8.sent;
          _context8.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context8.sent;

          if (!(json.Response == 'False')) {
            _context8.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context8.abrupt("return");

        case 10:
          Content = [];
          _iteratorNormalCompletion14 = true;
          _didIteratorError14 = false;
          _iteratorError14 = undefined;
          _context8.prev = 14;

          for (_iterator14 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
            item = _step14.value;
            if (item.release_date == undefined || item.release_date == '') item.release_date = '1970';
            if (item.poster_path == null) item.poster_path = '../catch.png';else item.poster_path = 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' + item.poster_path;
            Content.push({
              'Poster': item.poster_path,
              'Title': item.original_title,
              'Description': item.overview,
              'Vote': item.vote_average,
              'Vote_Count': item.vote_count,
              'Country': item.original_language == 'en' ? '🇺🇸' : getFlagEmoji(item.original_language),
              'Date': '(' + item.release_date.substring(0, 4) + ')',
              'Genre': item.genre_ids
            });
          }

          _context8.next = 22;
          break;

        case 18:
          _context8.prev = 18;
          _context8.t0 = _context8["catch"](14);
          _didIteratorError14 = true;
          _iteratorError14 = _context8.t0;

        case 22:
          _context8.prev = 22;
          _context8.prev = 23;

          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }

        case 25:
          _context8.prev = 25;

          if (!_didIteratorError14) {
            _context8.next = 28;
            break;
          }

          throw _iteratorError14;

        case 28:
          return _context8.finish(25);

        case 29:
          return _context8.finish(22);

        case 30:
          return _context8.abrupt("return", {
            'Content': Content,
            'count': json.total_results
          });

        case 33:
          _context8.prev = 33;
          _context8.t1 = _context8["catch"](0);
          console.log('Ошибка:', _context8.t1);

        case 36:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 33], [14, 18, 22, 30], [23,, 25, 29]]);
}

function getSearchSerials(query, page) {
  var response, json, Content, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, item;

  return regeneratorRuntime.async(function getSearchSerials$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'search/tv?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false'));

        case 3:
          response = _context9.sent;
          _context9.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context9.sent;

          if (!(json.Response == 'False')) {
            _context9.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context9.abrupt("return");

        case 10:
          Content = [];
          _iteratorNormalCompletion15 = true;
          _didIteratorError15 = false;
          _iteratorError15 = undefined;
          _context9.prev = 14;

          for (_iterator15 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
            item = _step15.value;
            if (item.first_air_date == undefined) item.first_air_date = '1970';
            Content.push({
              'Poster': 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' + item.poster_path,
              'Title': item.original_name,
              'Description': item.overview,
              'Vote': item.vote_average,
              'Vote_Count': item.vote_count,
              'Country': item.original_language == 'en' ? '🇺🇸' : getFlagEmoji(item.original_language),
              'Date': '(' + item.first_air_date.substring(0, 4) + ')',
              'Genre': item.genre_ids
            });
          }

          _context9.next = 22;
          break;

        case 18:
          _context9.prev = 18;
          _context9.t0 = _context9["catch"](14);
          _didIteratorError15 = true;
          _iteratorError15 = _context9.t0;

        case 22:
          _context9.prev = 22;
          _context9.prev = 23;

          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }

        case 25:
          _context9.prev = 25;

          if (!_didIteratorError15) {
            _context9.next = 28;
            break;
          }

          throw _iteratorError15;

        case 28:
          return _context9.finish(25);

        case 29:
          return _context9.finish(22);

        case 30:
          return _context9.abrupt("return", {
            'Content': Content,
            'count': json.total_results
          });

        case 33:
          _context9.prev = 33;
          _context9.t1 = _context9["catch"](0);
          console.log('Ошибка:', _context9.t1);

        case 36:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 33], [14, 18, 22, 30], [23,, 25, 29]]);
}

function getSearchPeoples(query, page) {
  var response, json, Content, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, item;

  return regeneratorRuntime.async(function getSearchPeoples$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(fetch(url + 'search/person?api_key=' + API_KEY + '&language=en-US&query=' + query + '&page=' + page + '&include_adult=false'));

        case 3:
          response = _context10.sent;
          _context10.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          json = _context10.sent;

          if (!(json.Response == 'False')) {
            _context10.next = 10;
            break;
          }

          if (items.length == 0) LoadCatchWindow();
          return _context10.abrupt("return");

        case 10:
          Content = [];
          _iteratorNormalCompletion16 = true;
          _didIteratorError16 = false;
          _iteratorError16 = undefined;
          _context10.prev = 14;

          for (_iterator16 = json.results[Symbol.iterator](); !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
            item = _step16.value;

            try {
              if (known_for.length == undefined) {}
            } catch (_unused) {
              item.known_for.push({
                'release_date': '1970-00-00',
                'first_air_date': '1970-00-00',
                'overview': 'Coming Soon',
                'original_title': 'unknown'
              });
            }

            if (item.known_for[0].release_date == null) item.known_for[0].release_date = item.known_for[0].first_air_date;
            if (item.profile_path == null) item.profile_path = '../catch.png';else item.profile_path = 'https://image.tmdb.org/t/p/w188_and_h282_bestv2' + item.profile_path;
            Content.push({
              'Poster': item.profile_path,
              'Title': item.name,
              'Description': item.known_for[0].overview,
              'Vote': item.popularity / 10,
              'Vote_Count': item.popularity,
              'Date': '(' + item.known_for[0].release_date.substr(0, 4) + ')',
              'Genre': item.known_for[0].original_title
            });
          }

          _context10.next = 22;
          break;

        case 18:
          _context10.prev = 18;
          _context10.t0 = _context10["catch"](14);
          _didIteratorError16 = true;
          _iteratorError16 = _context10.t0;

        case 22:
          _context10.prev = 22;
          _context10.prev = 23;

          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }

        case 25:
          _context10.prev = 25;

          if (!_didIteratorError16) {
            _context10.next = 28;
            break;
          }

          throw _iteratorError16;

        case 28:
          return _context10.finish(25);

        case 29:
          return _context10.finish(22);

        case 30:
          return _context10.abrupt("return", {
            'Content': Content,
            'count': json.total_results
          });

        case 33:
          _context10.prev = 33;
          _context10.t1 = _context10["catch"](0);
          console.log('Ошибка:', _context10.t1);

        case 36:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 33], [14, 18, 22, 30], [23,, 25, 29]]);
}

function getSearchCounts(query) {
  var Values, _temp;

  return regeneratorRuntime.async(function getSearchCounts$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          Values = [];
          _context11.next = 4;
          return regeneratorRuntime.awrap(getSearchMovies(query, 1));

        case 4:
          _temp = _context11.sent;
          Values.push(_temp.count);
          _context11.next = 8;
          return regeneratorRuntime.awrap(getSearchSerials(query, 1));

        case 8:
          _temp = _context11.sent;
          Values.push(_temp.count);
          _context11.next = 12;
          return regeneratorRuntime.awrap(getSearchPeoples(query, 1));

        case 12:
          _temp = _context11.sent;
          Values.push(_temp.count);
          return _context11.abrupt("return", Values);

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](0);
          console.log('Ошибка:', _context11.t0);

        case 20:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

function getFlagEmoji(countryCode) {
  var codePoints = countryCode.toUpperCase().split('').map(function (_char) {
    return 127397 + _char.charCodeAt();
  });
  return String.fromCodePoint.apply(String, _toConsumableArray(codePoints));
}