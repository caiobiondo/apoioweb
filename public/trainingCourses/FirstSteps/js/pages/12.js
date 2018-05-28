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

var step01_icon1 = ["#step01_icon01"];
var step01_g1 = ["#step01_p01"];

var step01_icon2 = ["#step01_icon02"];
var step01_g2 = ["#step01_p02"];

var step01_icon3 = ["#step01_icon03"];
var step01_g3 = ["#step01_p03"];

var step01_icon4 = ["#step01_icon04"];
var step01_g4 = ["#step01_p04"];

function initScreen() {

    s1 = index.boom.getSoundById("sc12s1");

    document.querySelector('#player-title').innerHTML = '<p>Consultora de sucesso</p>';
    
    initAudio();    
}

function initAudio() {
    s1.load({
        onload: function () {

            this.onPosition(10500, function (eventPosition) {
                console.log("Step1");
                TweenMax.to(step01_icon1, defaultTime, { x: 0, y: 0,  ease: Power1.easeOut, autoAlpha: 1 });
                TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1 });
            });

            this.onPosition(15200, function (eventPosition) {
                console.log("Some Step1");
                TweenMax.to(step01_icon1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
            });

            this.onPosition(15600, function (eventPosition) {
                console.log("Step2");
                TweenMax.to(step01_icon2, defaultTime, { x: 0, y: 0,  ease: Power1.easeOut, autoAlpha: 1 });
                TweenMax.to(step01_g2, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1 });
            });

            this.onPosition(18700, function (eventPosition) {
                console.log("Some Step2");
                TweenMax.to(step01_icon2, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step01_g2, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
            });

            this.onPosition(19200, function (eventPosition) {
                console.log("Step3");
                TweenMax.to(step01_icon3, defaultTime, { x: 0, y: 0,  ease: Power1.easeOut, autoAlpha: 1 });
                TweenMax.to(step01_g3, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1 });
            });

            this.onPosition(26300, function (eventPosition) {
                console.log("Some Step3");
                TweenMax.to(step01_icon3, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step01_g3, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
            });

            this.onPosition(27900, function (eventPosition) {
                console.log("Step4");
                TweenMax.to(step01_icon4, defaultTime, { x: 0, y: 0,  ease: Power1.easeOut, autoAlpha: 1 });
                TweenMax.to(step01_g4, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1 });
            });

            this.onPosition(33800, function (eventPosition) {
                console.log("Some Step4");
                TweenMax.to(step01_icon4, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step01_g4, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
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

    index.theme.setBackgroundColor('#FFF');
    index.theme.addTheme03ToNavigation();
    index.theme.changeHeaderThemeColor('#DD6428', 'theme-header-consultant');

    TweenMax.set(step01_icon1, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step01_g1, { y: 0, x: deslocamentPos, autoAlpha: 0 });

    TweenMax.set(step01_icon2, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step01_g2, { y: 0, x: deslocamentPos, autoAlpha: 0 });

    TweenMax.set(step01_icon3, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step01_g3, { y: 0, x: deslocamentPos, autoAlpha: 0 });

    TweenMax.set(step01_icon4, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step01_g4, { y: 0, x: deslocamentPos, autoAlpha: 0 });

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_icon01", "#step01_p01", "#step01_p02", "#step01_p03", "#step01_p04", "#step01_p05"]);
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