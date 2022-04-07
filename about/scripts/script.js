let bard = $('.bt-bord');
let ais = $('.nav-bar').find('a');

$('.nav-bar').mouseleave(function () { 
    bard.hide(300);
});

for(let i = 0; i < ais.length; i++)
{
    $(ais[i]).hover(()=>{
        bard.show();
        bard.css(
        {   
            top: ais[i].offsetTop + ais[i].offsetHeight + 5, 
            left: ais[i].offsetLeft, 
            width: ais[i].offsetWidth
        }
        );
    });
}
                            // HEADER //

let type = location.href.split('?')[1].split('&')[0].split('=')[1];
let id = location.href.split('?')[1].split('&')[1].split('=')[1];

async function Start()
{
    let About;

    if(type == 'tv') About = await getSerial(id);
    else if(type == 'people') About = await getPeople(id);
    else About = await getMovie(id);

    console.log(About);

    $($('.info img')[0]).attr('src', About.BackImage);
    $($('.info img')[1]).attr('src', About.Poster);

    $('.details .title h1').text(About.Title);
    $('.details .title h2').text('(' + About.FirstDate.split('-')[0]+')');

    $($('.details .property span')[0]).text(About.Genre);
    $($('.details .property span')[2]).text(About.Min + " min");

    if(About.Vote.toString().length == 1)About.Vote = About.Vote.toString() + '.0';

    $('.donut .rating').text(About.Vote);
    $('.description').text(About.Discription);
    $('.creator').text(About.Creator);

    if(type == 'people')
    {
        $('.cast').text('Top Movies');
        $('.video-h1').text('Top Serials');
        $('.review-h1').remove();
        $('.reviews').remove();
        $('.creator').next().text('Birthday Place');
        $($('.details .property span')[1]).text('');
        $($('.details .property span')[2]).text('');
        $('.videos').css({'height':'220'});

        for(let i = 0; i < About.Movies.length; i++)
        {
            $('.acters').append(
                `            <div class="acter-card" data-tilt>` +
                `                <div class="acter">` +
                `                    <img src="${About.Movies[i].Poster}" alt="">` +
                `                    <div class="name">${About.Movies[i].Title}</div>` +
                `                    <div class="nick">${About.Movies[i].Date}</div>` +
                `                </div>` +
                `            </div>`
                );
            $($('.acter')[i]).click(()=>{
                location.href = `../about/?type=movie&id=${About.Movies[i].Id}`;
            });
        }

        for(let i = 0; i < About.Serials.length; i++)
        {
            $('.videos').append(
                `            <div class="acter-card" data-tilt>` +
                `                <div class="acter">` +
                `                    <img src="${About.Serials[i].Poster}" alt="">` +
                `                    <div class="name">${About.Serials[i].Title}</div>` +
                `                    <div class="nick">${About.Serials[i].Date}</div>` +
                `                </div>` +
                `            </div>`
                );
            $($('.acter')[i+About.Movies.length]).click(()=>{
                location.href = `../about/?type=tv&id=${About.Serials[i].Id}`;
            });
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
    }
    else
    {
        if(type == 'movie') $('.creator').next().text('Production');

        for(let i = 0; i < About.Acters.length; i++)
        {
            $('.acters').append(
                `            <div class="acter-card" data-tilt>` +
                `                <div class="acter">` +
                `                    <img src="${About.Acters[i].Image}" alt="">` +
                `                    <div class="name">${About.Acters[i].Name}</div>` +
                `                    <div class="nick">${About.Acters[i].Character}</div>` +
                `                </div>` +
                `            </div>`
                );
                $($('.acter')[i]).click(()=>{
                    location.href = `../about/?type=people&id=${About.Acters[i].Id}`;
                });
        }

        for(let i = 0; i < About.Videos.length; i++)
        {
            $('.videos').append(
                `            <div class="video-card">` +
                `                <div class="video">` +
                `                    <iframe src="${About.Videos[i]}">` +
                `                </div>` +
                `            </div>`
                );
        }

        for(let i = 0; i < About.Comments.length; i++)
        {
            let _stars = "";
            for(let i1 = 0; i1 < About.Comments[i].Rating; i1++) _stars += "★";

            $('.reviews').append(
                `            <div class="review-card">` +
                `                <div class="review">` +
                `                    <div class="review-head">` +
                `                        <div class="profile-image">` +
                `                            ${About.Comments[i].Nick[0].toUpperCase()}` +
                `                        </div>` +
                `                        <div style="display: flex; flex-direction: column; width: 216px;">` +
                `                            <span style="font-size: 20px;` +
                `                            font-weight: 900;` +
                `                            font-family: 'Source Sans Pro';">` +
                `                            ${About.Comments[i].Nick}</span>` +
                `                            <div style="display: flex; column-gap: 10px;">` +
                `                                <div style="color: gray;font-size: 12.9px;margin-top: 3px;">${About.Comments[i].Rating}</div>` +
                `                                <div class="review-star">${_stars}</div>` +
                `                            </div>` +
                `                        </div>` +
                `                        <div style="color: gray;font-size: 15px;margin-top: 7px;">${About.Comments[i].Date}</div>` +
                `                    </div>` +
                `                   <div class="review-body">` +
                `                        ${About.Comments[i].Content}` +
                `                    </div>` +
                `                </div>` +
                `            </div>`
                );
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

    let _color = 'Lime';

    if (parseFloat(About.Vote) < 6.7) _color = 'Yellow';
    if (parseFloat(About.Vote) < 3.5) _color = 'Red';

    setTimeout(()=>{
        $('.slick-slide').css({'display':'flex', 'justify-content' : 'center'});
        $('.slick-track').css({'height' : '220px', 'padding-top':'10px'});
        $('.slick-list').css({'height': '-webkit-fill-available'});

        $('.donut').donutty({ min: 0, max: 10, value: About.Vote, color: _color });}, 100);
}

Start();

