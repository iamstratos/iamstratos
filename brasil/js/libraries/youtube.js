var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player_1,
    player_2,
    player_3,
    player_4;
    
function onYouTubeIframeAPIReady() {
    player_1 = new YT.Player('player--1', {
        videoId: pagesData[0].videoId,
        playerVars:
        {
            showinfo: 0,
            rel: 0
        },
        events: {
        'onReady': onPlayerReady
        }
    });
    player_2 = new YT.Player('player--2', {
        videoId: pagesData[1].videoId,
        playerVars:
        {
            showinfo: 0,
            rel: 0
        },
        events: {
        'onReady': onPlayerReady
        }
    });
    player_3 = new YT.Player('player--3', {
        videoId: pagesData[2].videoId,
        playerVars:
        {
            showinfo: 0,
            rel: 0
        },
        events: {
        'onReady': onPlayerReady
        }
    });
    player_4 = new YT.Player('player--4', {
        videoId: pagesData[3].videoId,
        playerVars:
        {
            showinfo: 0,
            rel: 0
        },
        events: {
        'onReady': onPlayerReady
        }
    });
}

var youtubeReady = false;

function onPlayerReady(event) {

    youtubeReady = true;
    // player__current.cueVideoById( pagesData[pageNum].videoId );

}