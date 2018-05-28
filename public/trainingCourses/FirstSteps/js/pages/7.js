// Sounds
var s1 = null;
var s2 = null;
var s3 = null;

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

    s1 = index.boom.getSoundById("sc7s1");
    s2 = index.boom.getSoundById("sc7s2");
    s3 = index.boom.getSoundById("sc7s3");

    document.querySelector('#player-title').innerHTML = '<p>Proposta de valor</p>';
    index.theme.activeVideoPlayer();

    initAudio();    
}

function initAudio() {
    s1.load({
        onload: function () {
            step01();
        },
        onfinish: function () {
            s1.destruct();            
            step02();
        }
    });

    s2.load({
        onload: function(){
            this.onPosition(6836, function (eventPosition) {
                s2.pause();
                step03();
            })
        },
        onfinish: function () {
            s2.destruct();
        }
    });

    s3.load({
        onload: function(){
        },
        onfinish: function () {
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

    player.on('play', function() {
        if(!videoStarted)
        {
            s2.destruct();
            console.log("INICIO DO VIDEO - PG7");
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
        console.log("FIM DO VIDEO - PG7");
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

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_img01"];

    index.theme.setBackgroundImage('pages/dgd06.svg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

    TweenMax.set(step01_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g2, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {

        }
    });

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_p01", "#step01_img01"]);
}

function step02() {

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    // Unmount Step 01
    var step01_g1 = ["#step01_img01"];
    var step01_g2 = ["#step01_p01"];

    TweenMax.to(step01_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 02
    index.theme.setBackgroundColor('#7F604D');

    var step02_g1 = ["#step02_img01"];
    var step02_g2 = ["#step02_p01"];

    TweenMax.set(step02_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g2, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {

        }
    });
}

function kill_step02()
{
    s2.pause();    
    index.theme.killEventsOf(["#step02_img01", "#step02_p01"]);
}

function step03() {

    currentTime = 0;
    s2.play(7611);
    index.theme.setStep("step03");

    // Unmount Step 01
    var step02_g2 = ["#step02_img01"];
    var step02_g1 = ["#step02_p01"];

    TweenMax.to(step02_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 03
    var step03_g1 = ["#step03_p01"];
    var step03_g2 = ["#step03_vdo01"];

    TweenMax.set(step03_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step03_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g2, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
            initVideo();            
        }
    });

}

function kill_step03()
{
    s3.pause();
    s2.pause();
    stopVideo();
    index.theme.killEventsOf(["#step03_p01", "#step03_vdo01"]);
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