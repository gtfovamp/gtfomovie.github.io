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
            $('.submit').click();
        }
    }
});
                            
let page = 1;
let query = decodeURI(location.href.split('/?')[1].split('&')[0].split('=')[1].replace('%20', ' '));
let type = location.href.split('/?')[1].split('&')[1].split('=')[1];
let otherValues = [];

try
{
    otherValues = location.href.split('/?')[1].split('&')[2].split('=')[1].split('|');
}
catch { otherValues = null }

$($('.search').find('input')).attr('value', query);

$('.submit').click(()=>{
    if($('.search').children().first().get(0).value.length == 0)
    alert('Enter content title:)');
    else if($('.search').children().first().get(0).value == query) return;
    else location.href = `../search/?query=${$('.search').children().first().get(0).value}&type=${type}`;
});

async function Start()
{
    let _temp = await setGenres();
    let Content = [];
    
    if(otherValues == null) otherValues = await getSearchCounts(query);
    else {console.log('Sucsess!')}

    $($('.filter-node')[0]).click(()=>{
        if(type == 'movie') return;
        location.href = `../search/?query=${query}&type=${'movie'}&values=${otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|'}`
    });
    $($('.filter-node')[1]).click(()=>{
        if(type == 'tv') return;
        location.href = `../search/?query=${query}&type=${'tv'}&values=${otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|'}`
    });
    $($('.filter-node')[2]).click(()=>{
        if(type == 'people') return;
        location.href = `../search/?query=${query}&type=${'people'}&values=${otherValues[0] + '|' + otherValues[1] + '|' + otherValues[2] + '|'}`
    });

    for(let i = 0; i < 3; i++) $($('.filter-node')[i]).find('span').text(otherValues[i]);

    if(type == 'movie') 
    {
        Content = await getSearchMovies(query, page);
        $($('.filter-node')[0]).css({'background-color' : '#181818'})
    }
    if(type == 'tv')
    { 
        Content = await getSearchSerials(query, page);
        $($('.filter-node')[1]).css({'background-color' : '#181818'})
    }
    if(type == 'people')
    {
        Content = await getSearchPeoples(query, page);
        $($('.filter-node')[2]).css({'background-color' : '#181818'})
    }

    for(let item of Content.Content)
    {
        let tempGenre = '';
        if(type != 'people')
        {
            for (const itemOne of item.Genre)
            {
                for (const itemTwo of GenreOnejson.genres) {
                    if(itemOne == itemTwo.id) tempGenre +=itemTwo.name + ', ';
                }
            }
            tempGenre = tempGenre.substr(0, tempGenre.length-2);
        }
        else tempGenre = item.Genre;
        
        if(item.Vote.toString().length == 1) item.Vote = item.Vote.toString() + '.0';
        if(item.Vote.toString().length > 3) item.Vote = item.Vote.toString().substr(0,3);
        $('.search-content').append(
            `            <div class="content">` +
            `                <img src="${item.Poster}" alt="">` +
            `                <div class="about">` +
            `                    <div class="title">` +
            `                        ${item.Title}` +
            `                        <div class="year-rating">` +
            `                            <div class="donut-rating">` +
            `                                <div class="donut">` +
            `                                    <div class="rating">${item.Vote}</div>` +
            `                                </div>` +
            `                                <span>${item.Vote_Count}</span>` +
            `                            </div>` +
            `                        </div>` +
            `                    </div>` +
            `                    <span style="font-size: 12px; color: gray; margin-top: -5px;">${item.Date} • ${tempGenre}</span>` +
            `                    <div class="description">` +
            `                        ${item.Description.substring(0,240) + '...'}` +
            `                    </div>` +
            `                </div>` +
            `            </div>`
        );

        let vote = parseFloat(item.Vote);
        let len = $('.content').length;
        let color = 'Lime';

        if (vote < 6.7) color = 'Yellow';
        if (vote < 3.5) color = 'Red';
        
        $($('.content')[len-1]).click(()=>{
            location.href = item.Link;
        })

        setTimeout(()=>{
            $($('.content')[len-1]).find('.donut').donutty({ min: 0, max: 10, value: vote, color: color });
        }, 100);
    }

}

Start();

let list = async function()
{
    console.log($('.content').length);
    if(window.scrollY > document.body.scrollHeight - window.innerHeight - 10)
    {
        page++;
        if(type == 'movie') 
        {
            if(otherValues[0] == $('.content').length) window.removeEventListener('scroll', list, false);
            Content = await getSearchMovies(query, page);
            $($('.filter-node')[0]).css({'background-color' : '#181818'})
        }
        if(type == 'tv')
        { 
            if(otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
            Content = await getSearchSerials(query, page);
            $($('.filter-node')[1]).css({'background-color' : '#181818'})
        }
        if(type == 'people')
        {
            if(otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
            Content = await getSearchPeoples(query, page);
            $($('.filter-node')[2]).css({'background-color' : '#181818'})
        }

        for(let item of Content.Content)
        {
            let tempGenre = '';
            if(type != 'people')
            {
                for (const itemOne of item.Genre)
                {
                    for (const itemTwo of GenreOnejson.genres) {
                        if(itemOne == itemTwo.id) tempGenre +=itemTwo.name + ', ';
                    }
                }
                tempGenre = tempGenre.substr(0, tempGenre.length-2);
            }
            else tempGenre = item.Genre;

            if(item.Vote.toString().length == 1) item.Vote = item.Vote.toString() + '.0';
            if(item.Vote.toString().length > 3) item.Vote = item.Vote.toString().substr(0,3);
            $('.search-content').append(
                `            <div class="content">` +
                `                <img src="${item.Poster}" alt="">` +
                `                <div class="about">` +
                `                    <div class="title">` +
                `                        ${item.Title}` +
                `                        <div class="year-rating">` +
                `                            <div class="donut-rating">` +
                `                                <div class="donut">` +
                `                                    <div class="rating">${item.Vote}</div>` +
                `                                </div>` +
                `                                <span>${item.Vote_Count}</span>` +
                `                            </div>` +
                `                        </div>` +
                `                    </div>` +
                `                    <span style="font-size: 12px; color: gray; margin-top: -5px;">${item.Date} • ${tempGenre}</span>` +
                `                    <div class="description">` +
                `                        ${item.Description.substring(0,240) + '...'}` +
                `                    </div>` +
                `                </div>` +
                `            </div>`
            );

            let vote = parseFloat(item.Vote);
            let len = $('.content').length;
            let color = 'Lime';

            if (vote < 6.7) color = 'Yellow';
            if (vote < 3.5) color = 'Red';

            setTimeout(()=>{
                $($('.content')[len-1]).find('.donut').donutty({ min: 0, max: 10, value: vote, color: color });
            }, 100);
        }
        if(type == 'movie') if(otherValues[0] == $('.content').length) window.removeEventListener('scroll', list, false);
        if(type == 'tv') if(otherValues[1] == $('.content').length) window.removeEventListener('scroll', list, false);
        if(type == 'people') if(otherValues[2] == $('.content').length) window.removeEventListener('scroll', list, false);
    }
}

window.addEventListener('scroll', list);

