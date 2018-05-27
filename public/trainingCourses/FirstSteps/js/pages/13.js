// Sounds
var s1 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament * -1;

var v = null;
var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;
var videoEnded = false;

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    s1 = index.boom.getSoundById("sc13s1");
    document.querySelector('#player-title').innerHTML = '<p>Ferramentas</p>';
    
    initAudio();    
}

var step01_item01 = ["#step01_item01"];
var step01_item02 = ["#step01_item02"];
var step01_item03 = ["#step01_item03"];
var step01_item04 = ["#step01_item04"];
var step01_item05 = ["#step01_item05"];
var step01_item06 = ["#step01_item06"];
var step01_item07 = ["#step01_item07"];
var step01_item08 = ["#step01_item08"];

function initAudio() {

    TweenMax.set(step01_item01, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item02, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item03, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item04, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item05, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item06, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item07, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_item08, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    s1.load({
        onload: function () {

            this.onPosition(11100, function (eventPosition) {
                TweenMax.to(step01_item01, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(13100, function (eventPosition) {
                TweenMax.to(step01_item01, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item02, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(16700, function (eventPosition) {
                TweenMax.to(step01_item02, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item03, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(19300, function (eventPosition) {
                TweenMax.to(step01_item03, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item04, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(26100, function (eventPosition) {
                TweenMax.to(step01_item04, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item05, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(29900, function (eventPosition) {
                TweenMax.to(step01_item05, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item06, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(33000, function (eventPosition) {
                TweenMax.to(step01_item06, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item07, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(35500, function (eventPosition) {
                TweenMax.to(step01_item07, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_item08, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            step01();
        },
        onfinish: function () {
            s1.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g0 = ["#step01_img01"];
    var step01_g1 = ["#step01_icon01"];
    var step01_g2 = ["#step01_box01"];
    var step01_g3 = ["#step01_p01"];
    var step01_g4 = ["#step01_p02"];
    var step01_g5 = ["#step01_list"];
    var step01_g6 = ["#step01_p03"];

    index.theme.setBackgroundImage('pages/img14.jpg');
    index.theme.removeTheme02ToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

    TweenMax.set(step01_g0, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g1, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step01_g2, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g4, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g5, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g6, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step01_g0, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function(){
        
    } });
    
    TweenMax.to(step01_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g4, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g5, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g6, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
        }
    });
}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_img01", "#step01_icon01", "#step01_box01", "#step01_p01", "#step01_p02", "#step01_list", "#step01_p03", "#step01_item01", "#step01_item02", "#step01_item03", "#step01_item04", "#step01_item05", "#step01_item06", "#step01_item07", "#step01_item08"]);
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