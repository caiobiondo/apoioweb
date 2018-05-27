// Sounds
var s1 = null;
var s2 = null;
var s3 = null;
var s4 = null;
var s5 = null;
var s6 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament * -1;

var v = null;
var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;
var videoEnded = false;
var timers = [120, 180];
//var timers = [10, 10];// teste
var foo = { bar: 0 };

function timer(seconds, callback) {
    foo = { bar: seconds };
    var currentBar = foo.bar;
    TweenMax.to(foo, foo.bar, {
        bar: 0, roundProps: "bar", ease: Linear.easeNone, onUpdate: function () {
            if (currentBar != this.target.bar) {
                //$('#container').text(this.target.bar);
                var time = this.target.bar;
                var minutes = Math.floor(time / 60);
                var seconds = time - minutes * 60;
                minutes = minutes <= 9 ? "0" + minutes : minutes;
                seconds = seconds <= 9 ? "0" + seconds : seconds;
                var timer_str = minutes + ":" + seconds;
                document.querySelector("#steps_timer").innerHTML = timer_str;
                currentBar = this.target.bar
            }
        }, onStart: function () {
            index.theme.disableElements();
        }, onComplete: function () {
            index.theme.enableElements();
            callback.apply(window);
        }
    });
};

function killTimer()
{
    TweenMax.killTweensOf(foo);
    document.querySelector("#steps_timer").innerHTML = "00:00";
}

function getAndSetDelay(ignore) {
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen() {

    s1 = index.boom.getSoundById("sc11s1");
    s2 = index.boom.getSoundById("sc11s2");
    s3 = index.boom.getSoundById("sc11s3");
    s4 = index.boom.getSoundById("sc11s4");
    s5 = index.boom.getSoundById("sc11s5");
    s6 = index.boom.getSoundById("sc11s6");

    document.querySelector('#player-title').innerHTML = '<p>Meu primeiro plano de negócios</p>';
    
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
        onfinish: function () {
            s2.destruct();
        }
    });

    s3.load({
        onfinish: function () {
            s3.destruct();
        }
    });

    s4.load({
        onfinish: function () {
            s4.destruct();
        }
    });

    s5.load({
        onfinish: function () {
            s5.destruct();
        }
    });

    s6.load({
        onfinish: function () {
            s6.destruct();
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);
    index.theme.currentPageVars.sounds.push(s4);
    index.theme.currentPageVars.sounds.push(s5);
    index.theme.currentPageVars.sounds.push(s6);
}

function step01() {

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_img01"];

    index.theme.setBackgroundColor('#dd632a');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-first-plan-02');

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
    var step01_g1 = ["#step01_p01"];
    var step01_g2 = ["#step01_img01"];

    TweenMax.to(step01_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step01_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 02
    index.theme.setBackgroundColor('#FFF');
    index.theme.addTheme03ToNavigation();
    index.theme.changeHeaderThemeColor('#3C1604', 'theme-header-first-plan-04');

    var step02_g1 = ["#steps_box01"];
    var step02_g2 = ["#step02_header, #step02_icon01, #step02_p01"];
    var step02_g3 = ["#steps_img_click, #steps_clock, #steps_timer"];
    var step02_g4 = ["#step02_list"];

    TweenMax.set(step02_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step02_g4, { x: 0, y: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step02_g4, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
            $("#steps_img_click, #steps_clock, #steps_timer").css({ 'zIndex': '100', 'cursor' : 'pointer' }).off('click').on('click', function () {
                $("#steps_img_click, #steps_clock, #steps_timer").css({ 'cursor' : 'default' });
                $("#steps_img_click, #steps_clock, #steps_timer").off();
                TweenMax.to("#steps_img_click", defaultTime, { x: 0, y: deslocamentPos, ease: Power1.easeOut, autoAlpha: 0 });
                
                s2.destruct();
                timer(timers[0], function () {
                    s3.play();
                    var step02_g1 = ["#steps_timer_end"];    
                    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {      
                        
                    }});
                });


                var step02_g2 = ["#steps_continue"];
                TweenMax.to(step02_g2, defaultTime, {x: 0, y: 0, delay: 5, ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
                        $("#steps_continue").css({ 'zIndex': '100' }).off('click').on('click', function () {
                            killTimer();
                            s3.destruct();                            
                            step03();
                        });
                    }
                });

            });
        }
    });
}

function kill_step02()
{
    s2.pause();
    s3.pause();
    killTimer();
    $("#steps_img_click, #steps_clock, #steps_timer").css({ 'zIndex': '100', 'cursor' : 'default' }).off('click');
    $("#steps_continue").css({ 'zIndex': '100' }).off('click');
    index.theme.killEventsOf(["#steps_box01", "#step02_header", "#step02_icon01", "#step02_p01", "#steps_img_click", "#steps_clock", "#steps_timer", "#step02_list", "#steps_continue", "#steps_timer_end"]);
}

function unmountStep02() {
    currentTime = 0;
    var step02_g1 = ["#steps_timer_end"];    
    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {      
        
    }});
}

function step03() {
    
    index.theme.setStep("step03");
    currentTime = 0;
    s4.play(0);

    // Unmount Step 02
    var step02_g0 = ["#steps_box01"];
    var step02_g1 = ["#steps_continue"];
    var step02_g2 = ["#steps_timer_end"];
    var step02_g3 = ["#step02_list"];
    var step02_g4 = ["#step02_header, #step02_icon01, #step02_p01"];

    TweenMax.to(step02_g4, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g3, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step02_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });

    // Mount Step 03
    index.theme.setBackgroundColor('#FFF');
    index.theme.addTheme03ToNavigation();
    document.querySelector('#steps_timer').innerHTML = '<p>03:00</p>';    
    var step03_g1 = ["#step03_header, #step03_icon01, #step03_p01"];
    var step03_g2 = ["#steps_img_click, #steps_clock, #steps_timer"];
    var step03_g3 = ["#step03_list"];

    TweenMax.to(step02_g0, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.set(step03_g1, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g2, { x: 0, y: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step03_g3, { x: 0, y: deslocamentPos, autoAlpha: 0 });    

    TweenMax.to(step03_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step03_g3, defaultTime, {
        x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
            $("#steps_img_click, #steps_clock, #steps_timer").css({ 'zIndex': '100', 'cursor' : 'pointer' }).off('click').on('click', function () {
                $("#steps_img_click, #steps_clock, #steps_timer").css({ 'cursor' : 'default' });
                $("#steps_img_click, #steps_clock, #steps_timer").off();
                TweenMax.to("#steps_img_click", defaultTime, { x: 0, y: deslocamentPos, ease: Power1.easeOut, autoAlpha: 0 });
                s4.destruct();
                timer(timers[1], function () {
                    s5.play();
                    var step02_g1 = ["#steps_timer_end"];
                    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1 });
                });

                var step02_g1 = ["#steps_timer_end"];
                var step02_g2 = ["#steps_continue"];
                TweenMax.to(step02_g2, defaultTime, {x: 0, y: 0, delay: 5, ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {
                        $("#steps_continue").css({ 'zIndex': '100' }).off('click').on('click', function () {
                            TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 0 });
                            killTimer();                            
                            step04();
                        });
                    }
                });


            });
        }
    });
}

function kill_step03()
{
    s4.pause();
    s5.pause();
    killTimer();
    $("#steps_img_click, #steps_clock, #steps_timer").css({ 'zIndex': '100', 'cursor' : 'default' }).off('click');
    $("#steps_continue").css({ 'zIndex': '100' }).off('click');
    index.theme.killEventsOf(["#steps_box01", "#step03_header", "#step03_icon01", "#step03_p01", "#steps_img_click", "#steps_clock", "#steps_timer", "#step03_list", "#steps_continue", "#steps_timer_end"]);
}

function unmountStep03() {
    currentTime = 0;    
    var step02_g1 = ["#steps_timer_end"];
    var step02_g2 = ["#steps_continue"];
    TweenMax.to(step02_g1, defaultTime, { x: 0, y: 0, ease: Power1.easeOut, autoAlpha: 1, onComplete: function () {

    }});
}

function step04(){

    index.theme.setStep("step04");
    currentTime = 0;
    s6.play(0);

    var step03_g0 = ["#steps_box01"];
    var step03_g1 = ["#step03_header, #step03_icon01, #step03_p01"];
    var step03_g2 = ["#steps_img_click, #steps_clock, #steps_timer, #steps_continue, #steps_timer_end"];
    var step03_g3 = ["#step03_list"];

    TweenMax.to(step03_g3, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step03_g2, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step03_g1, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    TweenMax.to(step03_g0, defaultTime, { x: 0, y: deslocamentPos, delay: getAndSetDelay(true), ease: Power1.easeOut, autoAlpha: 0 });
    
    index.theme.setBackgroundColor('#de9f1d');
    index.theme.removeThemesToNavigation();
    index.theme.changeHeaderThemeColor('#3C1604', 'theme-header-first-plan');

    var step04_g1 = ["#step04_p01"];
    var step04_g2 = ["#step04_icon01"];
    var step04_g3 = ["#step04_img01"];
    var step04_g4 = ["#step04_icon02"];
    var step04_g5 = ["#step04_img02"];
    var step04_g6 = ["#step04_icon03"];
    var step04_g7 = ["#step04_img03"];
    var step04_g8 = ["#step04_icon04"];
    var step04_g9 = ["#step04_img04"];

    TweenMax.set(step04_g1, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step04_g2, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step04_g3, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step04_g4, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step04_g5, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step04_g6, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step04_g7, { y: 0, x: deslocamentPos, autoAlpha: 0 });
    TweenMax.set(step04_g8, { y: 0, x: deslocamentNeg, autoAlpha: 0 });
    TweenMax.set(step04_g9, { y: 0, x: deslocamentPos, autoAlpha: 0 });

    TweenMax.to(step04_g1, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g2, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g3, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g4, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g5, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g6, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g7, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g8, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });
    TweenMax.to(step04_g9, defaultTime, { x: 0, y: 0, delay: getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1 });

}

function kill_step04()
{
    s6.pause();
    killTimer();
    index.theme.killEventsOf(["#steps_box01", "#step04_p01", "#step04_icon01", "#step04_img01", "#step04_icon02", "#step04_img02", "#step04_icon03", "#step04_img03", "#step04_icon04", "#step04_img04", "#steps_continue", "#steps_timer_end"]);
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
};

if (index) {
    if (index.currentPage) {
        if(index.currentPage.scriptLoaded)
        {
            index.currentPage.scriptLoaded();
        }
    }
};
