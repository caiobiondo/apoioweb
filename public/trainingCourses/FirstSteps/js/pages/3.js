// Sounds
var s1 = null;
var s2 = null;
var s3 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament*-1;

var v = null;
var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;
var videoStarted = false;
var videoEnded = false;

function getAndSetDelay(ignore)
{
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    document.querySelector('#player-title').innerHTML = '<p>A casa é sua</p>';
    index.theme.activeVideoPlayer();

    s1 = index.boom.getSoundById("sc3s1");
    s2 = index.boom.getSoundById("sc3s2");
    s3 = index.boom.getSoundById("sc3s3");
    
    initAudio();    
}

function initAudio(){

    s1.load({
        onload: function () {
            step01();
        },        
        onfinish: function(){
            s1.destruct();
            step01_unmount();
            step02();
        }
    });

    s2.load({
        onload: function(){
            this.onPosition(9143, function (eventPosition) {

            });
        },
        onfinish: function(){
            var step02_g2 =["#step03_blk01"];
            TweenMax.to(step02_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
            s2.destruct();
        }
    });

    s3.load({
        onload: function(){
        },
        onfinish: function(){
            s3.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);

}

function initVideo(){
    var win = window;
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);

    player.off('play');
    player.on('play', function() {
        if(!videoStarted)
        {
            s2.destruct();
            console.log("INICIO DO VIDEO - PG3");
            videoStarted = true;
        }
    });

    player.off('ended');
    player.on('ended', function() {
        if(!videoEnded)
        {
            win.focus();      
            videoEnded = true;
            pageEnd();
        }
        console.log("FIM DO VIDEO - PG3");
        s3.play();
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

function step01(){

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 =["#step01_img01"];

    index.theme.setBackgroundImage('pages/img05.jpg');
    index.theme.changeHeaderThemeColor('#3C1604', 'theme-header-your-home');  
    
    TweenMax.set(step01_g1,   {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step01_g1,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
    }});

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_img01", "#step01_p01", "#step01_p02", "#step01_img02"]);
}

function step01_unmount()
{
    currentTime = 0;
    
    // Unmount Step 01
    var step01_g1 =["#step01_img01"];
    var step01_g2 =["#step01_p01", "#step01_p02"];
    var step01_g3 =["#step01_img02"];

    TweenMax.to(step01_g1,    defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step01_g2,    defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step01_g3,    defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){

    }});
}

function step02(){

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    // Unmount Step 02
    var step02_g1 =["#step02_p01"];

    TweenMax.to(step02_g1,    defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});

    // Mount Step 03
    var step03_g1 = ["#step03_p01"];
    var step03_g2 = ["#step03_vdo01"];
    var step03_g3 = ["#step03_blk01"];

    index.theme.setBackgroundColor('#71809E');
    //index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

    TweenMax.set(step03_g1,   {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step03_g2,   {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step03_g3,   {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step03_g1,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step03_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step03_g3,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        initVideo();
    }});

}

function kill_step02()
{
    s2.pause();
    s3.pause();
    stopVideo();
    index.theme.killEventsOf(["#step03_p01", "#step03_vdo01", "#step03_blk01"]);
}

function endScreen(callback){

    currentTime = 0;

    // Unmount Step 03
    var step03_g1 = ["#step03_p01"];
    var step03_g2 = ["#step03_vdo01"];

    TweenMax.to(step03_g1,    defaultTime, {x:0, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step03_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        if(callback)
        {
            endScreen = false;
            callback.apply(index);
        }
    }});

}

function pageEnd()
{
    if(!endPage)
    {
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