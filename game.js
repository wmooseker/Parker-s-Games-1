
var gametitle = localStorage.getItem('gametitle');
console.log(gametitle);
var searchstr;
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games/"+gametitle,
	"method": "GET"
}

var gameInfo;

$.ajax(settings).done(function (response) {
    console.log(response);
    gameInfo = response;
    var devs = gameInfo['developers'];
    console.log(devs);
    $('#gamecont').find('h3').text(gametitle.name).css('text-align', 'center');
    $('#gamebackground').prop('src',gameInfo.background_image);
    $('#scrsht-1').prop('src',gameInfo.background_image_additional);
    var clip = gameInfo['clip'];
    if (clip == null) {
        $('video').hide();
        
        $('#altimg').show().prop('src',gameInfo['background_image_additional'])
    } else {
        $('video').show();
        $('#altimg').hide();
        $('#gamevid').prop('src', gameInfo['clip'].clip);
    }
    $('#developers').html(devs[0].name);
    //console.log(gameInfo.dominant_color)
    $('body').css('background-color','#'+gameInfo.dominant_color);
    $('body').css('color','#fff');
    $('#gamedesc').text(gameInfo.description_raw);
    var criticval=gameInfo.metacritic;
    $('#criticval').text(criticval);
    if (criticval >= 85) {
        $('#criticval').addClass('btn-success');
    } else if (criticval <= 84 && criticval >= 75) {
        $('#criticval').addClass('btn-warning');
    }else{
        $('#criticval').addClass('btn-danger');
    }
    if (criticval==null) {
        $('#criticval').text('None Available')
    }
    $('#gametitle').text(gameInfo.name);
    gameInfo['tags'].forEach(element => {
        $('#gametags').append('<button id="'+element.slug+'" class="gametag m-2 btn btn-parker">'+element.name+'</button>');
    });
    var hasPCRequirements = false;
    var requirements="";
    gameInfo['platforms'].forEach(element => {
        $('#platforms').after('<h6 style="text-align:center;" id="'+element.platform.slug+'">'+element.platform.name+'</h6>');
        if (element.requirements != null) {
            hasPCRequirements = true;
            requirements = requirements +'<h6 class="mt-3" style="text-decoration:underline;">'+element.platform.name+'</h6>'+ element.requirements.minimum;
        }
        console.log(requirements);
    });
    if (hasPCRequirements) {
        $("#minreq").show().after(requirements);
    }  
});

$(document).on('click','.gametag',function(){
    var selectedSlug= $(this).prop('id');
    localStorage.setItem('tag',selectedSlug);
    window.location= "tags.html";
});



