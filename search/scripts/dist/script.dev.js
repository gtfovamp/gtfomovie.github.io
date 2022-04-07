"use strict";

var bard = $('.bt-bord');
var ais = $('.nav-bar').find('a');
$('.nav-bar').mouseleave(function () {
  bard.hide(300);
});

var _loop = function _loop(i) {
  $(ais[i]).hover(function () {
    bard.show();
    bard.css({
      top: ais[i].offsetTop + ais[i].offsetHeight + 5,
      left: ais[i].offsetLeft,
      width: ais[i].offsetWidth
    });
  });
};

for (var i = 0; i < ais.length; i++) {
  _loop(i);
} // HEADER //


document.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    if ($('.search').children().first().get(0).value != '') {
      $('.submit').click();
    }
  }
});
var page = 1;
var query = decodeURI(location.href.split('/?')[1].split('&')[0].split('=')[1].replace('%20', ' '));
var type = location.href.split('/?')[1].split('&')[1].split('=')[1];
var otherValues = [];

try {
  otherValues = location.href.split('/?')[1].split('&')[2].split('=')[1].split('|');
} catch (_unused) {
  otherValues = null;
}

$($('.search').find('input')).attr('value', query);
$('.submit').click(function () {
  if ($('.search').children().first().get(0).value.length == 0) alert('Enter content title:)');else if ($('.search').children().first().get(0).value == query) return;else location.href = "../search/?query=".concat($('.search').children().first().get(0).value, "&type=").concat(type);
});

function Start() {
  var _temp, Content, _i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop2, _iterator, _step;

  return regeneratorRuntime.async(function Start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(setGenres());

        case 2:
          _temp = _context.sent;
          Content = [];

          if (!(otherValues == null)) {
            _context.next = 10;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(getSearchCounts(query));

        case 7:
          otherValues = _context.sent;
          _context.next = 11;
          break;

        case 10:
          console.log('Sucsess!');

        case 11:
          $($('.filter-node')[0]).click(function () {
            if (type == 'movie') return;
            location.href = "../search/?query=".concat(query, "&type=", 'movie', "&values=").concat(otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|');
          });
          $($('.filter-node')[1]).click(function () {
            if (type == 'tv') return;
            location.href = "../search/?query=".concat(query, "&type=", 'tv', "&values=").concat(otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|');
          });
          $($('.filter-node')[2]).click(function () {
            if (type == 'people') return;
            location.href = "../search/?query=".concat(query, "&type=", 'people', "&values=").concat(otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|');
          });

          for (_i = 0; _i < 3; _i++) {
            $($('.filter-node')[_i]).find('span').text(otherValues[_i]);
          }

          if (!(type == 'movie')) {
            _context.next = 20;
            break;
          }

          _context.next = 18;
          return regeneratorRuntime.awrap(getSearchMovies(query, page));

        case 18:
          Content = _context.sent;
          $($('.filter-node')[0]).css({
            'background-color': '#181818'
          });

        case 20:
          if (!(type == 'tv')) {
            _context.next = 25;
            break;
          }

          _context.next = 23;
          return regeneratorRuntime.awrap(getSearchSerials(query, page));

        case 23:
          Content = _context.sent;
          $($('.filter-node')[1]).css({
            'background-color': '#181818'
          });

        case 25:
          if (!(type == 'people')) {
            _context.next = 30;
            break;
          }

          _context.next = 28;
          return regeneratorRuntime.awrap(getSearchPeoples(query, page));

        case 28:
          Content = _context.sent;
          $($('.filter-node')[2]).css({
            'background-color': '#181818'
          });

        case 30:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 33;

          _loop2 = function _loop2() {
            var item = _step.value;
            var tempGenre = '';

            if (type != 'people') {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = item.Genre[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var itemOne = _step2.value;
                  var _iteratorNormalCompletion3 = true;
                  var _didIteratorError3 = false;
                  var _iteratorError3 = undefined;

                  try {
                    for (var _iterator3 = GenreOnejson.genres[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var itemTwo = _step3.value;
                      if (itemOne == itemTwo.id) tempGenre += itemTwo.name + ', ';
                    }
                  } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                        _iterator3["return"]();
                      }
                    } finally {
                      if (_didIteratorError3) {
                        throw _iteratorError3;
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                    _iterator2["return"]();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              tempGenre = tempGenre.substr(0, tempGenre.length - 2);
            } else tempGenre = item.Genre;

            if (item.Vote.toString().length == 1) item.Vote = item.Vote.toString() + '.0';
            if (item.Vote.toString().length > 3) item.Vote = item.Vote.toString().substr(0, 3);
            $('.search-content').append("            <div class=\"content\">" + "                <img src=\"".concat(item.Poster, "\" alt=\"\">") + "                <div class=\"about\">" + "                    <div class=\"title\">" + "                        ".concat(item.Title) + "                        <div class=\"year-rating\">" + "                            <div class=\"donut-rating\">" + "                                <div class=\"donut\">" + "                                    <div class=\"rating\">".concat(item.Vote, "</div>") + "                                </div>" + "                                <span>".concat(item.Vote_Count, "</span>") + "                            </div>" + "                        </div>" + "                    </div>" + "                    <span style=\"font-size: 12px; color: gray; margin-top: -5px;\">".concat(item.Date, " \u2022 ").concat(tempGenre, "</span>") + "                    <div class=\"description\">" + "                        ".concat(item.Description.substring(0, 240) + '...') + "                    </div>" + "                </div>" + "            </div>");
            var vote = parseFloat(item.Vote);
            var len = $('.content').length;
            var color = 'Lime';
            if (vote < 6.7) color = 'Yellow';
            if (vote < 3.5) color = 'Red';
            $($('.content')[len - 1]).click(function () {
              location.href = item.Link;
            });
            setTimeout(function () {
              $($('.content')[len - 1]).find('.donut').donutty({
                min: 0,
                max: 10,
                value: vote,
                color: color
              });
            }, 100);
          };

          for (_iterator = Content.Content[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop2();
          }

          _context.next = 42;
          break;

        case 38:
          _context.prev = 38;
          _context.t0 = _context["catch"](33);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 42:
          _context.prev = 42;
          _context.prev = 43;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 45:
          _context.prev = 45;

          if (!_didIteratorError) {
            _context.next = 48;
            break;
          }

          throw _iteratorError;

        case 48:
          return _context.finish(45);

        case 49:
          return _context.finish(42);

        case 50:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[33, 38, 42, 50], [43,, 45, 49]]);
}

Start();

var list = function list() {
  var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _loop3, _iterator4, _step4;

  return regeneratorRuntime.async(function list$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log($('.content').length);

          if (!(window.scrollY > document.body.scrollHeight - window.innerHeight - 10)) {
            _context2.next = 44;
            break;
          }

          page++;

          if (!(type == 'movie')) {
            _context2.next = 9;
            break;
          }

          if (otherValues[0] == $('.content').length) window.removeEventListener('scroll', list, false);
          _context2.next = 7;
          return regeneratorRuntime.awrap(getSearchMovies(query, page));

        case 7:
          Content = _context2.sent;
          $($('.filter-node')[0]).css({
            'background-color': '#181818'
          });

        case 9:
          if (!(type == 'tv')) {
            _context2.next = 15;
            break;
          }

          if (otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
          _context2.next = 13;
          return regeneratorRuntime.awrap(getSearchSerials(query, page));

        case 13:
          Content = _context2.sent;
          $($('.filter-node')[1]).css({
            'background-color': '#181818'
          });

        case 15:
          if (!(type == 'people')) {
            _context2.next = 21;
            break;
          }

          if (otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
          _context2.next = 19;
          return regeneratorRuntime.awrap(getSearchPeoples(query, page));

        case 19:
          Content = _context2.sent;
          $($('.filter-node')[2]).css({
            'background-color': '#181818'
          });

        case 21:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context2.prev = 24;

          _loop3 = function _loop3() {
            var item = _step4.value;
            var tempGenre = '';

            if (type != 'people') {
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = item.Genre[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var itemOne = _step5.value;
                  var _iteratorNormalCompletion6 = true;
                  var _didIteratorError6 = false;
                  var _iteratorError6 = undefined;

                  try {
                    for (var _iterator6 = GenreOnejson.genres[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                      var itemTwo = _step6.value;
                      if (itemOne == itemTwo.id) tempGenre += itemTwo.name + ', ';
                    }
                  } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                  } finally {
                    try {
                      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                        _iterator6["return"]();
                      }
                    } finally {
                      if (_didIteratorError6) {
                        throw _iteratorError6;
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                    _iterator5["return"]();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }

              tempGenre = tempGenre.substr(0, tempGenre.length - 2);
            } else tempGenre = item.Genre;

            if (item.Vote.toString().length == 1) item.Vote = item.Vote.toString() + '.0';
            if (item.Vote.toString().length > 3) item.Vote = item.Vote.toString().substr(0, 3);
            $('.search-content').append("            <div class=\"content\">" + "                <img src=\"".concat(item.Poster, "\" alt=\"\">") + "                <div class=\"about\">" + "                    <div class=\"title\">" + "                        ".concat(item.Title) + "                        <div class=\"year-rating\">" + "                            <div class=\"donut-rating\">" + "                                <div class=\"donut\">" + "                                    <div class=\"rating\">".concat(item.Vote, "</div>") + "                                </div>" + "                                <span>".concat(item.Vote_Count, "</span>") + "                            </div>" + "                        </div>" + "                    </div>" + "                    <span style=\"font-size: 12px; color: gray; margin-top: -5px;\">".concat(item.Date, " \u2022 ").concat(tempGenre, "</span>") + "                    <div class=\"description\">" + "                        ".concat(item.Description.substring(0, 240) + '...') + "                    </div>" + "                </div>" + "            </div>");
            var vote = parseFloat(item.Vote);
            var len = $('.content').length;
            var color = 'Lime';
            if (vote < 6.7) color = 'Yellow';
            if (vote < 3.5) color = 'Red';
            setTimeout(function () {
              $($('.content')[len - 1]).find('.donut').donutty({
                min: 0,
                max: 10,
                value: vote,
                color: color
              });
            }, 100);
          };

          for (_iterator4 = Content.Content[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            _loop3();
          }

          _context2.next = 33;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t0 = _context2["catch"](24);
          _didIteratorError4 = true;
          _iteratorError4 = _context2.t0;

        case 33:
          _context2.prev = 33;
          _context2.prev = 34;

          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }

        case 36:
          _context2.prev = 36;

          if (!_didIteratorError4) {
            _context2.next = 39;
            break;
          }

          throw _iteratorError4;

        case 39:
          return _context2.finish(36);

        case 40:
          return _context2.finish(33);

        case 41:
          if (type == 'movie') if (otherValues[0] == $('.content').length) window.removeEventListener('scroll', list, false);
          if (type == 'tv') if (otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
          if (type == 'people') if (otherValues[2] == $('.content').length) window.removeEventListener('scroll', list, false);

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[24, 29, 33, 41], [34,, 36, 40]]);
};

window.addEventListener('scroll', list);