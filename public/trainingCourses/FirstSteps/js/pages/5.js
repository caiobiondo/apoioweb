// Sounds
var s1 = null;
var s2 = null;
var s3 = null;
var s4 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament * -1;

var v = null;
var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;
var videoEnded = false;
var currentColor = "";
var arrayColors = ['rgb("255,106,19")', 'rgb("242,169,0")', 'rgb("93, 107,143")', 'rgb("113, 202,205")', 'rgb("207, 221,66")', 'rgb("111, 89,166")'];
var svgDocument = null;
var a = null;
var b = null;

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function getColor() {
    var rand = arrayColors[Math.floor(Math.random() * arrayColors.length)];
    if (rand == currentColor) {
        return getColor();
    }
    return rand;
}

function mirrorStep01() {
    var rand = Math.floor((Math.random() * 4) + 1);
    var svgDocument = window.document.querySelector('#step03_img02').contentDocument;
    if (svgDocument) {
        var a = svgDocument.querySelector('.a');
        var b = svgDocument.querySelector('.b');
        currentColor = getColor();
        TweenMax.to([a, b], 1.6, { fill: currentColor, ease: Power1.easeOut, delay: rand, onComplete: mirrorStep01 });
    }
}

function initScreen() {

    s1 = index.boom.getSoundById("sc5s1");
    s2 = index.boom.getSoundById("sc5s2");
    s3 = index.boom.getSoundById("sc5s3");
    s4 = index.boom.getSoundById("sc5s4");

    svgDocument = window.document.querySelector('#step03_img02').contentDocument;
    if (svgDocument) {
        a = svgDocument.querySelector('.a');
        b = svgDocument.querySelector('.b');
    }

    document.querySelector('#player-title').innerHTML = '<p>Autoestima</p>';

    initAudio();

}

function initAudio() {
    s1.load({
        onload: function() {
            step01();
        },
        onfinish: function() {
            s1.destruct();
            step02();
        }
    });

    s2.load({
        onload: function() {},
        onfinish: function() {
            s2.destruct();
            step03();
        }
    });

    s3.load({
        onload: function() {},
        onfinish: function() {
            s3.destruct();
        }
    });

    s4.load({
        onload: function() {
            this.onPosition(55045, function(eventPosition) {
                currentColor = 'rgb("214, 192, 0")';
                console.log('94', mirrorStep01, currentColor);
            });

            this.onPosition(59635, function(eventPosition) {
                $('#inner-content').css('overflow', 'hidden');
                TweenMax.to('#step03_img02', 2, { scale: 2.0, y: 100, rotation: -9 });
                TweenMax.to([a, b], 1, { fill: 'rgb("214, 192, 0")', ease: Power1.easeOut });
                TweenMax.to('#step04_p01', defaultTime, {
                    autoAlpha: 1,
                    ease: Power1.easeOut,
                    delay: 1,
                    onComplete: function() {}
                });
            });
        },
        onfinish: function() {
            s4.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);
    index.theme.currentPageVars.sounds.push(s4);

}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_img01"];

    index.theme.setBackgroundImage('pages/img06.jpg');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

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
            //step02();
        }
    });

}

function kill_step01() {
    s1.pause();
    index.theme.killEventsOf(["#step01_p01", "#step01_img01"]);
}

function step02() {

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    // Unmount Step 01
    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_img01"];

    TweenMax.to(step01_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 02
    index.theme.setBackgroundImage('pages/img24.jpg');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');

}

function kill_step02() {
    s2.pause();
    index.theme.killEventsOf([]);
}

function step03() {

    index.theme.setStep("step03");
    currentTime = 0;
    s3.play(0);

    // Unmount Step 02
    var step02_g1 = ["#step02_box01"];
    var step02_g2 = ["#step02_p01", "#step02_p02"];
    var step02_g3 = ["#step02_img02", "#step02_img01"];

    TweenMax.to(step02_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g3, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 02
    index.theme.setBackgroundColor('#FFF');
    index.theme.addTheme03ToNavigation();
    index.theme.changeHeaderThemeColor('#3C1604', 'theme-header-self-esteem');

    var step03_g1 = ["#step03_p01"];
    var step03_g2 = ["#step03_img01"];
    var step03_g3 = ["#step03_img02_01"];
    var step03_g4 = ["#step03_img03"];
    var step03_clicks = "#step03_img03";

    TweenMax.set(step03_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g4, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step03_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g4, defaultTime, {
        x: 0,
        y: 0,
        delay: getAndSetDelay(),
        ease: Power1.easeOut,
        autoAlpha: 1,
        onComplete: function() {

            $("#preloader-image").hide();
            $(step03_clicks).addClass('cursor-pointer').off('click').on('click', function() {

                currentTime = 0;

                // Unmount Step 03
                $(this).removeClass('cursor-pointer');

                TweenMax.to(step03_g4, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step03_g3, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step03_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
                TweenMax.to(step03_g1, defaultTime, {
                    x: 0,
                    y: deslocamentPos,
                    delay: getAndSetDelay(true),
                    ease: Power1.easeOut,
                    autoAlpha: 0,
                    onComplete: function() {
                        step04();
                    }
                });

            });

        }
    });

}

function kill_step03() {
    s3.pause();
    index.theme.killEventsOf(["#step03_p01", "#step03_img01", "#step03_p02", "#step03_list_item01", "#step03_list_item02", "#step03_list_item03", "#step03_list_item04", "#step03_img02_01", "#step03_img03", "#step03_img02_01", "#step03_img02", "#step03_img03"]);
    $("#step03_img02_01, #step03_img02, #step03_img03").removeClass('cursor-pointer');
    $("#step03_img02_01, #step03_img02, #step03_img03").off('click');
}

function step04() {

    index.theme.setStep("step04");
    currentTime = 0;
    s4.play(0);

    var step04_g1 = ["#step03_img02_01"];
    var step04_g2 = ["#step03_img02"];

    TweenMax.set(step04_g1, { autoAlpha: 1, y: 0 });
    TweenMax.set(step04_g2, { autoAlpha: 0, y: 0 });

    svgDocument = window.document.querySelector('#step03_img02').contentDocument;
    a = svgDocument.querySelector('.a');
    b = svgDocument.querySelector('.b');
    TweenMax.set([a, b], { fill: '#DEDEDE' });

    TweenMax.to(step04_g1, defaultTime, {
        autoAlpha: 0,
        ease: Power1.easeOut,
        onStart: function() {
            TweenMax.to(step04_g2, defaultTime, { autoAlpha: 1, ease: Power1.easeOut });
            TweenMax.to([a, b], defaultTime, {
                fill: '#DDDDDD',
                ease: Power1.easeOut,
                delay: .5,
                onComplete: function() {
                    TweenMax.to(step04_g2, (defaultTime * 1.5), {
                        scale: 1.5,
                        ease: Power1.easeOut,
                        onComplete: function() {
                            mirrorStep01();
                        }
                    });
                }
            });
        }
    });
}

function kill_step04() {
    s4.pause();

    svgDocument = window.document.querySelector('#step03_img02').contentDocument;
    a = svgDocument.querySelector('.a');
    b = svgDocument.querySelector('.b');
    TweenMax.set([a, b], { fill: '#DEDEDE' });

    TweenMax.set("#step03_img02", { scale: 1, rotation: 0, autoAlpha: 0, y: 0, x: 0 });
    index.theme.killEventsOf(["#step03_img02_01", "#step03_img02", "#step04_p01"]);
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