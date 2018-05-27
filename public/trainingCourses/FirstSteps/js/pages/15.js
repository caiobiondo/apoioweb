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
var videoEnded = false;

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    s1 = index.boom.getSoundById("sc15s1");
    s2 = index.boom.getSoundById("sc15s2");

    document.querySelector('#player-title').innerHTML = '<p>Finalização</p>';
    index.theme.activeVideoPlayer();

    initAudio();
}

function initAudio() {
    s1.load({
        onload: function() {
            step01();
        },
        onfinish: function() {
            s1.destruct();
            //step01_unmount();
        }
    });
    s2.load({
        onfinish: function() {
            s2.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 = ["#step01_img01"];
    var step01_g2 = ["#step01_p01"];

    TweenMax.set(step01_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step01_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step01_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step01_g2, defaultTime, {
        x: 0,
        y: 0,
        delay: getAndSetDelay(),
        ease: Power1.easeOut,
        autoAlpha: 1,
        onComplete: function() {

            $("#step01_img01").css("cursor", "pointer");
            $("#step01_img01").off("click").on("click", function() {
                s1.pause();
                $("#step01_img01").css("cursor", "default");
                $("#step01_img01").off("click");
                /*************************** */
                /* ENCERRA O CURSO */
				window.location.hash = "#finish";
                /*************************** */
                step01_unmount();
            });

        }
    });

    index.theme.setBackgroundImage('pages/img15.jpg');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-finalization');

}

function kill_step01() {
    s1.pause();
    index.theme.killEventsOf(["#step01_box01", "#step01_icon01", "#step01_p01", "#step01_p02", "#step01_p03"]);
}

function step01_unmount() {
    currentTime = 0;

    var step01_g1 = ["#step01_img01"];
    var step01_g2 = ["#step01_p01"];

    TweenMax.to(step01_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g1, defaultTime, {
        x: 0,
        y: deslocamentPos,
        delay: getAndSetDelay(),
        ease: Power1.easeOut,
        autoAlpha: 0,
        onComplete: function() {
            step02();
        }
    });
}

function step02() {

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    var step02_g1 = ["#step02_p01"];
    var step02_g2 = ["#step02_p01", "#step02_p02", "#step02_p03"];
    var step02_g3 = ["#step02_img01", "#step02_p04"];

    document.querySelector('#player-title').innerHTML = '<p>Pesquisa</p>';
    index.theme.setBackgroundImage('pages/img16.jpg');
    index.theme.addTheme03ToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

    TweenMax.set(step02_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    $("#step02_img01").css("cursor", "pointer");
    $("#step02_img01").off("click").on("click", function() {
        pageEnd();
        window.open("https://pt.surveymonkey.com/r/XMJXY69", "natura_survey");
    });

    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g3, defaultTime, {
        x: 0,
        y: 0,
        delay: getAndSetDelay(),
        ease: Power1.easeOut,
        autoAlpha: 1,
        onComplete: function() {
            pageEnd();
        }
    });
}

function kill_step02() {
    s1.pause();
    $("#step02_img01").css("cursor", "default");
    $("#step02_img01").off("click");
    index.theme.killEventsOf(["#step02_p01", "#step02_p01", "#step02_p02", "#step02_p03", "#step02_img01", "#step02_p04"]);
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
        if (index.currentPage.scriptLoaded) {
            index.currentPage.scriptLoaded();
        }
    }
}