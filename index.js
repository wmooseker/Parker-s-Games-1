
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games",
	"method": "GET"
}

var gamesList;

function makeGameCard(name, imgref, slug){
    return '<div class="card shadow-lg img-fluid"><img class="card-img-top" src="'+imgref+'"><div id="'+slug+'"class="card-img-overlay"><h6 style="color:white;" class="card-title">'+name+'</h6></div></div>';
} 

$.ajax(settings).done(function (response) {
    console.log(response);
    gamesList = response["results"];
    console.log(gamesList);
    var $featured = $('#carousel').find('.carousel-item')
    var i = 0;
    $featured.each(function(){
        $(this).find('img').prop('src', gamesList[i].background_image)
        var titletext = gamesList[i].slug;
        var displayTitle = titleCase(titletext.split('-').join(' '));
        $(this).find('h5').text(displayTitle);
        i = i+1;
    })
    for (var x = 0; x < 25; x++) {
        if (x ===0 || x===5 || x == 10 || x === 15 || x===20 || x===20 || x===25) {
            $('#gamecards').append('<div class="mt-2 mb-2 card-deck"></div>');
            $('#gamecards').children().last().append(makeGameCard(gamesList[x].name, gamesList[x].background_image,gamesList[x].slug));
        }else {
            $('#gamecards').children().last().append(makeGameCard(gamesList[x].name, gamesList[x].background_image,gamesList[x].slug));
        }
    }
    
});

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

$('.card-img-overlay').hover( function(){
    $(this).addClass('shadow-lg');
}, function () {
    $(this).removeClass('shadow-lg');
}
);

$(document).on('click', '.card-img-overlay', function() {
    var selectedSlug = $(this).prop('id');
    localStorage.setItem('gametitle',selectedSlug);
    window.location= "game.html";
});

 