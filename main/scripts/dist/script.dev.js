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
      location.href = "../search/?query=".concat($('.search').children().first().get(0).value, "&type=movie");
    }
  }
});
var TrendSerials = [],
    TrendMovies = [];

function Start() {
  var _temp, _loop2, _i, _loop3, _i2, _i3, tempVote, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return regeneratorRuntime.async(function Start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(setGenres());

        case 2:
          _temp = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(getTrendingAll());

        case 5:
          TrendAll = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(getTrendingSerials());

        case 8:
          TrendSerials = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(getTrendingMovies());

        case 11:
          TrendMovies = _context.sent;
          console.log(TrendAll);
          $('.submit').click(function () {
            if ($('.search').children().first().get(0).value.length == 0) alert('Enter content title:)');else location.href = "../search/?query=".concat($('.search').children().first().get(0).value, "&type=movie");
          });

          _loop2 = function _loop2(_i) {
            var tempVote = TrendSerials[_i].Vote;
            if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';
            $('.serials').append("        <div class='wrapper' style=\"height: 300px;\">" + "            <div class=\"card\" data-tilt data-id = \"".concat(TrendSerials[_i].Id, "\">") + "                <img class=\"card-img\" src=\"".concat(TrendSerials[_i].Poster, "\" data-howerImage=\"").concat(TrendSerials[_i].BackImage, "\" data-outerImage=\"").concat(TrendSerials[_i].Poster, "\" width=\"150\" height=\"250\" alt=\"\">") + "                <div class=\"title\" hidden>".concat(TrendSerials[_i].Title, "</div>") + "                <div class=\"stars\"></div>" + "                <div class=\"donut\"></div>" + "                <div class=\"vote\" hidden>".concat(tempVote, "</div>") + "            </div>" + "        </div>");
            $($($('.serials').get(0).lastChild).get(0)).find('.card').click(function () {
              location.href = "../about/?type=".concat(TrendSerials[_i].Type, "&id=").concat(TrendSerials[_i].Id);
            });
          };

          for (_i = 0; _i < TrendSerials.length; _i++) {
            _loop2(_i);
          }

          _loop3 = function _loop3(_i2) {
            var tempVote = TrendMovies[_i2].Vote;
            if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';
            $('.movies').append("        <div class='wrapper' style=\"height: 300px;\">" + "            <div class=\"card\" data-tilt data-id = \"".concat(TrendSerials[_i2].Id, "\">") + "                <img class=\"card-img\" src=\"".concat(TrendMovies[_i2].Poster, "\" data-howerImage=\"").concat(TrendMovies[_i2].BackImage, "\" data-outerImage=\"").concat(TrendMovies[_i2].Poster, "\" width=\"150\" height=\"250\" alt=\"\">") + "                <div class=\"title\" hidden>".concat(TrendMovies[_i2].Title, "</div>") + "                <div class=\"stars\"></div>" + "                <div class=\"donut\"></div>" + "                <div class=\"vote\" hidden>".concat(tempVote, "</div>") + "            </div>" + "        </div>");
            $($($('.movies').get(0).lastChild).get(0)).find('.card').click(function () {
              location.href = "../about/?type=".concat(TrendMovies[_i2].Type, "&id=").concat(TrendMovies[_i2].Id);
            });
          };

          for (_i2 = 0; _i2 < TrendMovies.length; _i2++) {
            _loop3(_i2);
          }

          for (_i3 = 0; _i3 < TrendAll.length; _i3++) {
            tempVote = TrendAll[_i3].Vote;
            if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';
            $('.monitor').append("            <div class=\"wrapper\">" + "                <div class=\"big-card\" data-id = \"".concat(TrendSerials[_i3].Id, "\" style=\"background-image: linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(37,37,37,1) 70%), url(").concat(TrendAll[_i3].BackImage, "); background-size: contain;\">") + "                    <div class=\"big-card-inner\">" + "                        <h3>".concat(TrendAll[_i3].Title, "</h3>") + "                        <span class=\"big-card-info\">".concat(TrendAll[_i3].Genres, "</span>") + "                        <span class=\"big-card-description\">".concat(TrendAll[_i3].Discription, "</span>") + "                        <div class=\"go-site\">" + "                            <a href=\"../about/?type=".concat(TrendAll[_i3].Type, "&id=").concat(TrendAll[_i3].Id, "\" target=\"_blank\">GO TO SITE</a>") + "                        </div>" + "                    </div>" + "                </div>" + "            </div>");
          }

          $('.card').hover(function (handler) {
            if (handler.type == 'mouseenter') {
              $(event.currentTarget).find('.card-img').attr('src', $(event.currentTarget).find('.card-img').attr('data-howerimage'));
              var vote = parseFloat($(event.currentTarget).find('.vote').text());
              var color = 'Lime';
              if (vote < 6.7) color = 'Yellow';
              if (vote < 3.5) color = 'Red';

              if ($(event.currentTarget).find('.stars').text() == '') {
                var stars = 1 + vote / 2;
                var starText = '';

                for (var _i4 = 0; _i4 < parseInt(stars); _i4++) {
                  starText += '★';
                }

                $(event.currentTarget).find('.stars').text(starText);
              }

              $(event.currentTarget).find('.title').fadeIn();
              $(event.currentTarget).find('.donut').donutty({
                min: 0,
                max: 10,
                value: vote,
                color: color
              });
              $(event.currentTarget).find('.vote').fadeIn();
              $(event.currentTarget).find('.stars').fadeIn();
            } else {
              $(event.currentTarget).find('.card-img').attr('src', $(event.currentTarget).find('.card-img').attr('data-outerimage'));
              $(event.currentTarget).find('.title').fadeOut();
              $(event.currentTarget).find('.donut').empty();
              $(event.currentTarget).find('.vote').fadeOut();
              $(event.currentTarget).find('.stars').fadeOut();
            }
          });
          $('.serials').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 3,
            dots: true
          });
          $('.movies').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 3,
            dots: true
          });
          $('.monitor').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 26;

          for (_iterator = $('.slick-slide')[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            item = _step.value;
            $(item).css({
              display: 'flex',
              'justify-content': 'center'
            });
          }

          _context.next = 34;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](26);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 34:
          _context.prev = 34;
          _context.prev = 35;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 37:
          _context.prev = 37;

          if (!_didIteratorError) {
            _context.next = 40;
            break;
          }

          throw _iteratorError;

        case 40:
          return _context.finish(37);

        case 41:
          return _context.finish(34);

        case 42:
          $('.serials').css({
            display: 'flex'
          });
          $('.slick-dots').css({
            left: 0
          });
          $('.card').tilt({
            scale: 1.08,
            glare: true,
            maxGlare: .1
          });

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[26, 30, 34, 42], [35,, 37, 41]]);
}

Start();