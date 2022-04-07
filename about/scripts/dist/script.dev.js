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


var type = location.href.split('?')[1].split('&')[0].split('=')[1];
var id = location.href.split('?')[1].split('&')[1].split('=')[1];

function Start() {
  var About, _loop2, _i, _loop3, _i2, _loop4, _i3, _i4, _i5, _stars, i1, _color;

  return regeneratorRuntime.async(function Start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(type == 'tv')) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(getSerial(id));

        case 3:
          About = _context.sent;
          _context.next = 15;
          break;

        case 6:
          if (!(type == 'people')) {
            _context.next = 12;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(getPeople(id));

        case 9:
          About = _context.sent;
          _context.next = 15;
          break;

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(getMovie(id));

        case 14:
          About = _context.sent;

        case 15:
          console.log(About);
          $($('.info img')[0]).attr('src', About.BackImage);
          $($('.info img')[1]).attr('src', About.Poster);
          $('.details .title h1').text(About.Title);
          $('.details .title h2').text('(' + About.FirstDate.split('-')[0] + ')');
          $($('.details .property span')[0]).text(About.Genre);
          $($('.details .property span')[2]).text(About.Min + " min");
          if (About.Vote.toString().length == 1) About.Vote = About.Vote.toString() + '.0';
          $('.donut .rating').text(About.Vote);
          $('.description').text(About.Discription);
          $('.creator').text(About.Creator);

          if (type == 'people') {
            $('.cast').text('Top Movies');
            $('.video-h1').text('Top Serials');
            $('.review-h1').remove();
            $('.reviews').remove();
            $('.creator').next().text('Birthday Place');
            $($('.details .property span')[1]).text('');
            $($('.details .property span')[2]).text('');
            $('.videos').css({
              'height': '220'
            });

            _loop2 = function _loop2(_i) {
              $('.acters').append("            <div class=\"acter-card\" data-tilt>" + "                <div class=\"acter\">" + "                    <img src=\"".concat(About.Movies[_i].Poster, "\" alt=\"\">") + "                    <div class=\"name\">".concat(About.Movies[_i].Title, "</div>") + "                    <div class=\"nick\">".concat(About.Movies[_i].Date, "</div>") + "                </div>" + "            </div>");
              $($('.acter')[_i]).click(function () {
                location.href = "../about/?type=movie&id=".concat(About.Movies[_i].Id);
              });
            };

            for (_i = 0; _i < About.Movies.length; _i++) {
              _loop2(_i);
            }

            _loop3 = function _loop3(_i2) {
              $('.videos').append("            <div class=\"acter-card\" data-tilt>" + "                <div class=\"acter\">" + "                    <img src=\"".concat(About.Serials[_i2].Poster, "\" alt=\"\">") + "                    <div class=\"name\">".concat(About.Serials[_i2].Title, "</div>") + "                    <div class=\"nick\">".concat(About.Serials[_i2].Date, "</div>") + "                </div>" + "            </div>");
              $($('.acter')[_i2 + About.Movies.length]).click(function () {
                location.href = "../about/?type=tv&id=".concat(About.Serials[_i2].Id);
              });
            };

            for (_i2 = 0; _i2 < About.Serials.length; _i2++) {
              _loop3(_i2);
            }

            $('.acters').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 3,
              dots: true
            });
            $('.videos').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 3,
              dots: true
            });
          } else {
            if (type == 'movie') $('.creator').next().text('Production');

            _loop4 = function _loop4(_i3) {
              $('.acters').append("            <div class=\"acter-card\" data-tilt>" + "                <div class=\"acter\">" + "                    <img src=\"".concat(About.Acters[_i3].Image, "\" alt=\"\">") + "                    <div class=\"name\">".concat(About.Acters[_i3].Name, "</div>") + "                    <div class=\"nick\">".concat(About.Acters[_i3].Character, "</div>") + "                </div>" + "            </div>");
              $($('.acter')[_i3]).click(function () {
                location.href = "../about/?type=people&id=".concat(About.Acters[_i3].Id);
              });
            };

            for (_i3 = 0; _i3 < About.Acters.length; _i3++) {
              _loop4(_i3);
            }

            for (_i4 = 0; _i4 < About.Videos.length; _i4++) {
              $('.videos').append("            <div class=\"video-card\">" + "                <div class=\"video\">" + "                    <iframe src=\"".concat(About.Videos[_i4], "\">") + "                </div>" + "            </div>");
            }

            for (_i5 = 0; _i5 < About.Comments.length; _i5++) {
              _stars = "";

              for (i1 = 0; i1 < About.Comments[_i5].Rating; i1++) {
                _stars += "★";
              }

              $('.reviews').append("            <div class=\"review-card\">" + "                <div class=\"review\">" + "                    <div class=\"review-head\">" + "                        <div class=\"profile-image\">" + "                            ".concat(About.Comments[_i5].Nick[0].toUpperCase()) + "                        </div>" + "                        <div style=\"display: flex; flex-direction: column; width: 216px;\">" + "                            <span style=\"font-size: 20px;" + "                            font-weight: 900;" + "                            font-family: 'Source Sans Pro';\">" + "                            ".concat(About.Comments[_i5].Nick, "</span>") + "                            <div style=\"display: flex; column-gap: 10px;\">" + "                                <div style=\"color: gray;font-size: 12.9px;margin-top: 3px;\">".concat(About.Comments[_i5].Rating, "</div>") + "                                <div class=\"review-star\">".concat(_stars, "</div>") + "                            </div>" + "                        </div>" + "                        <div style=\"color: gray;font-size: 15px;margin-top: 7px;\">".concat(About.Comments[_i5].Date, "</div>") + "                    </div>" + "                   <div class=\"review-body\">" + "                        ".concat(About.Comments[_i5].Content) + "                    </div>" + "                </div>" + "            </div>");
            }

            $('.acters').slick({
              infinite: true,
              slidesToShow: 5,
              slidesToScroll: 3,
              dots: true
            });
            $('.reviews').slick({
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true
            });
            $('.videos').slick({
              infinite: true,
              slidesToShow: 2,
              slidesToScroll: 1,
              dots: true
            });
          }

          $('.acter').tilt({
            scale: 1.04,
            glare: true,
            maxGlare: .1
          });
          _color = 'Lime';
          if (parseFloat(About.Vote) < 6.7) _color = 'Yellow';
          if (parseFloat(About.Vote) < 3.5) _color = 'Red';
          setTimeout(function () {
            $('.slick-slide').css({
              'display': 'flex',
              'justify-content': 'center'
            });
            $('.slick-track').css({
              'height': '220px',
              'padding-top': '10px'
            });
            $('.slick-list').css({
              'height': '-webkit-fill-available'
            });
            $('.donut').donutty({
              min: 0,
              max: 10,
              value: About.Vote,
              color: _color
            });
          }, 100);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  });
}

Start();