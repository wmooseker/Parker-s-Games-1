
var tagsearchstr = localStorage.getItem('tag');
var taggames = {
    "async": true,
    "crossDomain": true,
    "url": "https://rawg-video-games-database.p.rapidapi.com/games?tags="+tagsearchstr,
    "method": "GET"
}
var moretags = {
    "async": true,
    "crossDomain": true,
    "url": "https://rawg-video-games-database.p.rapidapi.com/tags?page_size=50",
    "method": "GET"
}
var tagGameList;
$.ajax(taggames).done(function(response){
    $('#searchedtag').text(tagsearchstr);
    tagGameList = response['results'];
    console.log(tagGameList)
    tagGameList.forEach(element => {
        $('#tagtablebody').append('<tr class="tagresultrow" id="'+element.slug+'"><td>'+element.name+'</td></tr>')
    });
});
$.ajax(moretags).done(function(response){
    $('#searchedtag').text(tagsearchstr);
    taggames = response['results'];
    console.log(taggames)
    taggames.forEach(element => {
        $('#moretags').append('<button id="'+element.slug+'" class="moretag m-2 btn btn-parker">'+element.name+'</button>');
    });
});

$(document).on('click','.moretag',function(){
    var selectedSlug= $(this).prop('id');
    localStorage.setItem('tag',selectedSlug);
    window.location= "tags.html";
});

$(document).on('click','.tagresultrow',function(){
    var selectedSlug= $(this).prop('id');
    localStorage.setItem('gametitle',selectedSlug);
    window.location= "game.html";
});