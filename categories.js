
var categories = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/genres",
	"method": "GET"
}


var categoryList;
var selectedGame;

function makeCategoryCard(name, imgref){
    return '<div class="categorycard card shadow-lg img-fluid"><img class="card-img-top categorycardimg" src="'+imgref+'"><div class="card-img-overlay"><h4 style="color:white;" class="card-title">'+name+'</h4></div></div>';
} 

$.ajax(categories).done(function (response) {
    console.log(response);
    categoryList = response['results'];
    var decknum = 0;
    for (var x = 0; x < 19; x++) {
        if (x ===0 || x===5 || x == 10 || x === 15 || x===20 || x===20 || x===25) {
            $('#categorycards').append('<div id="deck-'+decknum+'" class="mt-4 mb-4 card-deck"></div>');
            $('#categorycards').children().last().append(makeCategoryCard(categoryList[x].name, categoryList[x].image_background));
        }else {
            $('#categorycards').children().last().append(makeCategoryCard(categoryList[x].name, categoryList[x].image_background));
        }
        decknum += 1;
    }
});

function getGamesForCategory(catName){
    for (var z = 0; z < 19; z++) {
        if (catName == categoryList[z].name) {
            return categoryList[z].games;
        }
    }
}



$(document).on('click','.card-img-overlay',function(){
    console.log('adshad');
    
    $('#categorytable').find('thead').children().remove()
    $('#categorytable').find('tbody').children().remove()
    var selectedCategory = $(this).find('h4').text();
    var selectedCatGames = getGamesForCategory(selectedCategory);
    console.log(selectedCatGames);
    //$(this).closest('.card-deck').after(makeCategoryGameList(selectedCatGames,selectedCategory));
    $('#categorytable').find('thead').append('<th>'+selectedCategory+'</th>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[0].slug+'">'+selectedCatGames[0].name+'</td></tr>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[1].slug+'">'+selectedCatGames[1].name+'</td></tr>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[2].slug+'">'+selectedCatGames[2].name+'</td></tr>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[3].slug+'">'+selectedCatGames[3].name+'</td></tr>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[4].slug+'">'+selectedCatGames[4].name+'</td></tr>');
    $('#categorytable').find('tbody').append('<tr><td id="'+selectedCatGames[5].slug+'">'+selectedCatGames[5].name+'</td></tr>');
    
    $('#categorytable').insertAfter($(this).closest('.card-deck'));
    $('#categorytable').fadeIn();
});

$(document).on('click', 'tr', function() {
    selectedGame = $(this).find('td').text();
    
    var selectedSlug = $(this).find('td').attr('id');
    console.log(selectedSlug);
    localStorage.setItem('gametitle',selectedSlug);
    window.location= "game.html";
});

