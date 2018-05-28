// Sounds
var s1 = null;
var s2 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament * -1;

var v = null;
var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;
var videoStarted = false;
var videoEnded = false;

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    s1 = index.boom.getSoundById("sc14s1");
    s2 = index.boom.getSoundById("sc14s2");

    document.querySelector('#player-title').innerHTML = '<p>Mensagem final</p>';
    index.theme.activeVideoPlayer();

    initAudio();    
}

function initAudio() {
    s1.load({
        onload: function () {
            step01();
        },
        onfinish: function () {
            var step02_g2 =["#step01_blk01"];
            TweenMax.to(step02_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
            s1.destruct();            
        }
    });
    s2.load({
        onload: function () {            
        },
        onfinish: function () {
            s2.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
}

function initVideo(){
    var win = window;
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);

    player.on('play', function() {
        if(!videoStarted)
        {
            s2.destruct();
            console.log("INICIO DO VIDEO - PG14");
            videoStarted = true;
        }
    });

    player.on('ended', function() {        
        if(!videoEnded)
        {
            win.focus();
            videoEnded = true;
            pageEnd();
        }
        console.log("FIM DO VIDEO - PG14");
        s2.play();
    });
}

function stopVideo()
{
    var win = window;
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);

    player.off('play');
    player.off('ended');

    player.pause();    
}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_vdo01"];
    var step01_g3 = ["#step01_blk01"];

    index.theme.setBackgroundColor('#7BB7C2');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-final-message');

    TweenMax.set(step01_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        initVideo();
    }});

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_p01", "#step01_vdo01"]);
}

function pageEnd() {
    if (!endPage) {
        if (index) {
            if (index.pageEnd) {
                index.pageEnd();
            }
        }
        endPage = true;
    }
}

if (index) {
    if (index.currentPage) {
        if(index.currentPage.scriptLoaded)
        {
            index.currentPage.scriptLoaded();
        }
    }
}