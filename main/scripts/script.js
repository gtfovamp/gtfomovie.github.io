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

document.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        if($('.search').children().first().get(0).value != '')
        {
            location.href = `../search/?query=${$('.search').children().first().get(0).value}&type=movie`;
        }
    }
});

let TrendSerials = [], TrendMovies = [];

async function Start()
{
    let _temp = await setGenres();
    TrendAll = await getTrendingAll();
    TrendSerials = await getTrendingSerials();
    TrendMovies = await getTrendingMovies();

    console.log(TrendAll);

    $('.submit').click(()=>{
        if($('.search').children().first().get(0).value.length == 0)
        alert('Enter content title:)');
        else location.href = `../search/?query=${$('.search').children().first().get(0).value}&type=movie`;
    });

    for(let i = 0; i < TrendSerials.length; i++)
    {
        let tempVote = TrendSerials[i].Vote;
        if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';

        $('.serials').append(
            `        <div class='wrapper' style="height: 300px;">` +
            `            <div class="card" data-tilt data-id = "${TrendSerials[i].Id}">` +
            `                <img class="card-img" src="${TrendSerials[i].Poster}" data-howerImage="${TrendSerials[i].BackImage}" data-outerImage="${TrendSerials[i].Poster}" width="150" height="250" alt="">` +
            `                <div class="title" hidden>${TrendSerials[i].Title}</div>` +
            `                <div class="stars"></div>` +
            `                <div class="donut"></div>` +
            `                <div class="vote" hidden>${tempVote}</div>` +
            `            </div>` +
            `        </div>`
            );

        $($($('.serials').get(0).lastChild).get(0)).find('.card').click(()=>{
            location.href = `../about/?type=${TrendSerials[i].Type}&id=${TrendSerials[i].Id}`;
        });
    }

    for(let i = 0; i < TrendMovies.length; i++)
    {
        let tempVote = TrendMovies[i].Vote;
        if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';

        $('.movies').append(
            `        <div class='wrapper' style="height: 300px;">` +
            `            <div class="card" data-tilt data-id = "${TrendSerials[i].Id}">` +
            `                <img class="card-img" src="${TrendMovies[i].Poster}" data-howerImage="${TrendMovies[i].BackImage}" data-outerImage="${TrendMovies[i].Poster}" width="150" height="250" alt="">` +
            `                <div class="title" hidden>${TrendMovies[i].Title}</div>` +
            `                <div class="stars"></div>` +
            `                <div class="donut"></div>` +
            `                <div class="vote" hidden>${tempVote}</div>` +
            `            </div>` +
            `        </div>`
            );

        $($($('.movies').get(0).lastChild).get(0)).find('.card').click(()=>{
            location.href = `../about/?type=${TrendMovies[i].Type}&id=${TrendMovies[i].Id}`;
        });
    }

    for(let i = 0; i < TrendAll.length; i++)
    {
        let tempVote = TrendAll[i].Vote;
        if (tempVote.toString().length == 1) tempVote = tempVote.toString() + '.0';

        $('.monitor').append(
            `            <div class="wrapper">` +
            `                <div class="big-card" data-id = "${TrendSerials[i].Id}" style="background-image: linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(37,37,37,1) 70%), url(${TrendAll[i].BackImage}); background-size: contain;">` +
            `                    <div class="big-card-inner">` +
            `                        <h3>${TrendAll[i].Title}</h3>` +
            `                        <span class="big-card-info">${TrendAll[i].Genres}</span>` +
            `                        <span class="big-card-description">${TrendAll[i].Discription}</span>` +
            `                        <div class="go-site">` +
            `                            <a href="../about/?type=${TrendAll[i].Type}&id=${TrendAll[i].Id}" target="_blank">GO TO SITE</a>` +
            `                        </div>` +
            `                    </div>` +
            `                </div>` +
            `            </div>`
            );
    }

    $('.card').hover((handler)=>{   
        if(handler.type == 'mouseenter') 
        {  
            $(event.currentTarget).find('.card-img').attr('src', $(event.currentTarget).find('.card-img').attr('data-howerimage'));
            

            let vote = parseFloat($(event.currentTarget).find('.vote').text());

            let color = 'Lime';

            if (vote < 6.7) color = 'Yellow';
            if (vote < 3.5) color = 'Red';
            
            if($(event.currentTarget).find('.stars').text() == '')
            {
                let stars = 1 + vote/2;
                let starText = '';
    
                for(let i = 0; i < parseInt(stars); i++)
                {
                    starText += '★';
                }
                $(event.currentTarget).find('.stars').text(starText);
            }
            $(event.currentTarget).find('.title').fadeIn();
            $(event.currentTarget).find('.donut').donutty({ min: 0, max: 10, value: vote, color: color });
            $(event.currentTarget).find('.vote').fadeIn();
            $(event.currentTarget).find('.stars').fadeIn();
        }
        else 
        {
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
        autoplaySpeed: 2000,
    });

    for(let item of $('.slick-slide'))
    {
        $(item).css({display:'flex', 'justify-content': 'center'});
    }
    $('.serials').css({display:'flex'});
    $('.slick-dots').css({left:0});
    
    $('.card').tilt({
        scale: 1.08,
        glare: true,
        maxGlare: .1
    });
}
Start();