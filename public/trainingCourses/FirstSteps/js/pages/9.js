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
var videoEnded = false;

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    s1 = index.boom.getSoundById("sc9s1");
    s2 = index.boom.getSoundById("sc9s2");
    s3 = index.boom.getSoundById("sc9s3");

    document.querySelector('#player-title').innerHTML = '<p>A vida como ela é</p>';
    index.theme.activeVideoPlayer();

    initAudio();
    
}

var step01_g1 = ["#step01_p01"];
var step01_g2 = ["#step01_p02"];
var step01_g3 = ["#step01_p03"];
var step01_g4 = ["#step01_p04"];
var step01_g5 = ["#step01_p05"];

function initAudio() {
    s1.load({
        onload: function () {

            this.onPosition(12200, function (eventPosition) {
                TweenMax.to(step01_g1, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(17100, function (eventPosition) {
                TweenMax.to(step01_g1, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_g2, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(19100, function (eventPosition) {
                TweenMax.to(step01_g2, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_g3, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(23000, function (eventPosition) {
                TweenMax.to(step01_g3, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_g4, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(27400, function (eventPosition) {
                TweenMax.to(step01_g4, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
                TweenMax.to(step01_g5, defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 1});
            });

            this.onPosition(34000, function (eventPosition) {
                TweenMax.to(step01_g5, defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
            });

            step01();
        },
        onfinish: function () {
            s1.destruct();            
            step02();
        }
    });

    s2.load({
        onfinish: function () {
            s2.destruct();            
            step03();
        }
    });

    s3.load({
        onfinish: function () {
            s3.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);

}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    index.theme.setBackgroundImage('pages/img11_dgd.jpg');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#FFFFFF', 'theme-header-first-plan');    

    TweenMax.set(step01_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g4, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g5, { x: 0, y: deslocamentPos, autoAlpha: 0 });

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_icon01", "#step01_box01", "#step01_img01", "#step01_p01", "#step01_p02", "#step01_p03", "#step01_p04", "#step01_p05"]);
}

function step02() {

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    // Unmount Step 01
   var step01_g1 = ["#step01_icon01"];
    var step01_g2 = ["#step01_box01"];
    var step01_g3 = ["#step01_img01"];
    var step01_g4 = ["#step01_p01, #step01_p02, #step01_p03, #step01_p04, #step01_p05"];

    TweenMax.to(step01_g4, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g3, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g2, defaultTime, { y: 0, x: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g1, defaultTime, { y: 0, x: deslocamentNeg, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 02
    index.theme.setBackgroundColor('#F2A900');    
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#4E3629', 'theme-header-first-plan-02');

    var step02_g1 = ["#step02_p01"];
    var step02_g2 = ["#step02_img01"];

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
    index.theme.killEventsOf(["#step02_p01", "#step02_img01"]);
}

function step03() {

     index.theme.setStep("step03");
    currentTime = 0;
    s3.play(0);

    index.theme.addTheme03ToNavigation();

    // Unmount Step 01
    var step02_g1 = ["#step02_p01"];
    var step02_g2 = ["#step02_img01"];

    TweenMax.to(step02_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    index.theme.setBackgroundColor('#FFF');
    index.theme.addTheme04ToNavigation();
    index.theme.changeHeaderThemeColor('#DD632A', 'theme-header-first-plan-03');

    // Mount Step 03
    var step03_g1 = ["#step03_icon01"];
    var step03_g2 = ["#step03_p01"];
    var step03_g3 = ["#step03_icon02"];
    var step03_g4 = ["#step03_p02"];

    TweenMax.set(step03_g1, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step03_g2, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g3, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step03_g4, { y: 0, x: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step03_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g4, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {

        }
    });
}

function kill_step03()
{
    s3.pause();
    index.theme.killEventsOf(["#step03_icon01", "#step03_p01", "#step03_icon02", "#step03_p02"]);
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