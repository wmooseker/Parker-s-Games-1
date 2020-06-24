$('#searchbtn').click(function(e){
    e.preventDefault();
    searchstr = $('#searchinput').val()
    $('.searchdropdown').empty();
    console.log(searchstr);
    var search = {
        "async": true,
        "crossDomain": true,
        "url": "https://rawg-video-games-database.p.rapidapi.com/games?search="+searchstr,
        "method": "GET"
    }
    $.ajax(search).done(function(response) {
        console.log(response);
        var searchresult = response['results'];
        searchresult.forEach(element => {
            $('.searchdropdown').append('<a id="'+element.slug+'">'+element.name+'</a>')
        });
       // $('.searchdropdown').append('<a id="'+searchresult[0].slug+'">'+searchresult[0].name+'</a>')
       // $('.searchdropdown').append('<a id="'+searchresult[1].slug+'">'+searchresult[1].name+'</a>')
       // $('.searchdropdown').append('<a id="'+searchresult[2].slug+'">'+searchresult[2].name+'</a>')
        //$('.searchdropdown').append('<a id="'+searchresult[3].slug+'">'+searchresult[3].name+'</a>')
        //$('.searchdropdown').append('<a id="'+searchresult[4].slug+'">'+searchresult[4].name+'</a>')
        $('.searchdropdown').fadeIn();
    });
});
$("#searchbtn").blur(function() {
    $('.searchdropdown').fadeOut();
});

$(document).on('click','.searchdropdown a',function(){
    var selectedSlug= $(this).prop('id');
    localStorage.setItem('gametitle',selectedSlug);
    window.location= "game.html";
});