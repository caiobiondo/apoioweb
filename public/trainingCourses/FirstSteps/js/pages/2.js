// Sounds
var s1 = null;
var s2 = null;
var s3 = null;
var s4 = null;
var s5 = null;

// Deslocament
var deslocamentPos = index.theme.defaultDeslocament;
var deslocamentNeg = index.theme.defaultDeslocament*-1;

var endPage = false;
var currentTime = 0;
var defaultDelay = .5;
var defaultTime = .7;

function getAndSetDelay(ignore)
{
    currentTime += ignore ? 0 : defaultDelay;
    return currentTime;
}

function initScreen()
{
    s1 = index.boom.getSoundById("sc2s1");
    s2 = index.boom.getSoundById("sc2s2");
    s3 = index.boom.getSoundById("sc2s3");
    s4 = index.boom.getSoundById("sc2s5");
    s5 = index.boom.getSoundById("sc2s4");
    
    // Setup Page
    document.querySelector('#player-title').innerHTML = '<p>Bem-vinda</p>';

    // Init Animation and Anudio    
    initAudio();
}

function initAudio(id) {

    if(id)
    {
        eval("s"+id+".play();");
    }

    s1.load({
        onload: function () {
            step01();
        },
        onfinish: function(){
            s1.destruct();            
            step01_unmount();
        }
    });

    s2.load({   
        onfinish: function(){
            s2.destruct();            
            step02_unmount();
        }
    });

    s3.load({   
        onfinish: function(){
            s3.destruct();
        }
    });

    s4.load({   
        onload: function () {

            this.onPosition(77653, function (eventPosition) {                
                TweenMax.to("#step04_img02", defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(), ease: Power1.easeOut, autoAlpha: 1});
            });

        },
        onfinish: function(){
            s4.destruct();            
            step04_unmount();
        }
    });

    s5.load({   
        onfinish: function(){
            s5.destruct();
            
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);
    index.theme.currentPageVars.sounds.push(s4);
    index.theme.currentPageVars.sounds.push(s5);

}

function step01(){

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    index.theme.addTheme04ToNavigation();
    index.theme.setBackgroundImage('pages/img20.jpg');
    index.theme.changeHeaderThemeColor('#FFFFFF', 'theme-white');

    var step01_g1 =["#step01_box01"];
    var step01_g2 =["#step01_p01","#step01_p02"];
    
    TweenMax.set(step01_g1,   {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step01_g2,   {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step01_g1,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step01_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        //step02();
    }});

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_box01", "#step01_p01","#step01_p02"]);
}

function step01_unmount()
{
    currentTime = 0;

    // Unmount Step 01
    var step01_g1 =["#step01_box01"];
    var step01_g2 =["#step01_p01","#step01_p02"];

    TweenMax.to(step01_g2,    defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});    
    TweenMax.to(step01_g1,    defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        step02();
    }});   
}

function step02(){

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play(0);

    // Mound Step 02
    index.theme.addTheme03ToNavigation();
    index.theme.setBackgroundImage('pages/img04.jpg');
    document.querySelector('#player-title').innerHTML = '<p>Seu sonho</p>';
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-dream-02');

    var step02_g1 =["#step02_icon01"];
    var step02_g2 =["#step02_box01"];
    var step02_g3 =["#step02_p01", "#step02_img01"];
    
    TweenMax.set(step02_g1,    {x:deslocamentNeg, y:0, autoAlpha: 0});
    TweenMax.set(step02_g2,    {x:deslocamentPos, y:0, autoAlpha: 0});
    TweenMax.set(step02_g3,    {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step02_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step02_g2,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step02_g3,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        //step03();
    }});

}

function kill_step02()
{
    s2.pause();
    index.theme.killEventsOf(["#step02_icon01", "#step02_box01", "#step02_p01", "#step02_img01"]);
}

function step02_unmount()
{
    currentTime = 0;

    // Unmount Step 02
    var step02_g1 =["#step02_icon01"];
    var step02_g2 =["#step02_box01"];
    var step02_g3 =["#step02_p01", "#step02_img01"];

    TweenMax.to(step02_g3,     defaultTime, {x:0, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step02_g2,     defaultTime, {x:deslocamentPos, y:0, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step02_g1,     defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){        
        step03();
    }});  
}

function step03(){

    index.theme.setStep("step03");
    currentTime = 0;
    s3.play(0);
    
    // Mound Step 03
    index.theme.removeThemesToNavigation();
    index.theme.setBackgroundImage('pages/dgd03.svg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-dream-02');

    var step03_g1 =["#step03_img02"];
    var step03_g2 =["#step03_img03"];

    TweenMax.set(step03_g1,    {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step03_g2,    {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step03_g2,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step03_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){

        pulseCloud();
        $("#preloader-image").hide();
        $("#step03_img02").css( 'cursor', 'pointer' );
        $("#step03_img02").on('click', function(){

            currentTime = 0;

            // Unmount Step 03
            $(this).off("click");
            $("#step03_img02").css( 'cursor', 'default' );
            TweenMax.to("#step03_img03",     defaultTime, {x:0, y:0, ease: Power1.easeOut, autoAlpha: 0});

            s3.pause();
            s3.destruct();

            step03_unmount();

        });        
    }});
}

function kill_step03()
{
    s3.pause();
    index.theme.killEventsOf(["#step03_img03"]);
}

function step03_unmount()
{
    currentTime = 0;

    var step03_g1 =["#step03_img03"];

    clearInterval(pulseInterval);

    TweenMax.to(step03_g1,     defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        step04();
    }});

}

var pulseInterval = 0;

function pulseCloud()
{
    var step04_g1 =["#step03_img02"];
    TweenMax.to(step04_g1, .4, {scaleX:1.10, scaleY:1.10, ease:Power1.easeIn, onComplete:function(){
        TweenMax.to(step04_g1, .1, {scaleX:1, scaleY:1, ease:Power1.easeOut, onComplete:function(){
            
            TweenMax.to(step04_g1, .3, {scaleX:1.10, scaleY:1.10, ease:Circ.easeIn, onComplete:function(){
                TweenMax.to(step04_g1, .4, {scaleX:1, scaleY:1, ease:Power1.easeOut, onComplete:function(){
                    pulseInterval = setTimeout(function(){ pulseCloud() }, 1500);
                }});
            }});
            
        }});
    }});
}

function clearPulseCloud()
{
    clearInterval(pulseInterval);
}

function step04()
{
    index.theme.setStep("step04");
    index.theme.setBackgroundImage('pages/dgd03.svg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-dream-02');
    currentTime = 0;
    s4.play(0);

    var step04_g1 = ["#step03_img02"];

    TweenMax.to(step04_g1, defaultTime, {autoAlpha: 1, ease:Power1.easeIn, onComplete:function(){
    }});

}

function kill_step04()
{
    s4.pause();
    index.theme.killEventsOf(["#step03_img02"]);
}

function step04_unmount()
{
    currentTime = 0;

    var step04_g1 = ["#step03_img02","#step04_img02"];
    
    TweenMax.to(step04_g1,     defaultTime, {delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        step05();
    }});
}

function step05()
{
    index.theme.setStep("step05");
    index.theme.setBackgroundImage('pages/dgd03.svg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-dream-02');
    currentTime = 0;
    s5.play(0);

    var step05_g1 = ["#step05_img01"];
    var step05_g2 = ["#step05_img02"];
    var step05_g3 = ["#step05_img03"];

    TweenMax.set(step05_g1,    {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step05_g2,    {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step05_g3,    {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step05_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step05_g2,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step05_g3,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){

        
        $("#step05_img03").css( 'cursor', 'pointer' );
        $("#step05_img03").off('click').on('click', function(){

            // Unmount Step 03
            $("#step05_img02").css( 'cursor', 'default' );
            $("#step05_img03").css( 'cursor', 'default' );
            $("#step05_img02").off("click");
            $("#step05_img03").off("click");
            TweenMax.to("#step05_img02",     defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
            TweenMax.to("#step05_img03",     defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
            pageEnd();

        });
        $("#step05_img02").css( 'cursor', 'pointer' );
        $("#step05_img02").off('click').on('click', function(){

            // Unmount Step 03
            $("#step05_img02").css( 'cursor', 'default' );
            $("#step05_img03").css( 'cursor', 'default' );
            $("#step05_img02").off("click");
            $("#step05_img03").off("click");
            TweenMax.to("#step05_img02",     defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
            TweenMax.to("#step05_img03",     defaultTime, {x:0, y:deslocamentPos, ease: Power1.easeOut, autoAlpha: 0});
            pageEnd();

        });
        
    }});
}

function kill_step05()
{
    s4.pause();
    index.theme.killEventsOf(["#step05_img01", "#step05_p01", "#step05_box01", "#step05_box02", "#step05_img02", "#step05_p02", "#step05_img03"]);
    $("#step05_img03").css( 'cursor', 'default' );
    $("#step05_img03").off('click');
}

function pageEnd()
{
    if(!endPage)
    {
        if (index) {
            if (index.pageEnd) {
                index.pageEnd();
                index.navigation.next();
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