// Sounds
var s1 = null;
var s2 = null;
var s3 = null;

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

function initScreen() {

    s1 = index.boom.getSoundById("sc1s1");
    s2 = index.boom.getSoundById("sc1s2");
    s3 = index.boom.getSoundById("sc1s3");
    
    // Setup Page    
    document.querySelector('#player-title').innerHTML = '<p>Bem-vinda</p>';

    // Init Animation and Anudio
    initAudio();
}

function initAudio() {

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
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);
    index.theme.currentPageVars.sounds.push(s3);
    
}

function step01(){
    
    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    //Mound Step 01
    index.theme.setBackgroundImage('pages/img03.jpg');
    index.theme.changeHeaderThemeColor('#E88024', 'theme-header-welcome');

    var step01_g1 = ["#step01_box01"];
    var step01_g2 = ["#step01_img01"];

    TweenMax.set(step01_g1,   {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set(step01_g2,   {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step01_g1,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step01_g2,    defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
    }});

}

function kill_step01()
{
    s1.pause();
    index.theme.killEventsOf(["#step01_box01", "#step01_img01"]);
}

function step01_unmount()
{
    currentTime = 0;

    // Unmount Step 01
    var step01_g1 = ["#step01_box01"];
    var step01_g2 = ["#step01_img01"];

    TweenMax.to(step01_g2,    defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0});
    TweenMax.to(step01_g1,    defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        step02();
    }});
}

function step02(){

    index.theme.setStep("step02");
    currentTime = 0;
    s2.play();

    // Mound Step 02
    index.theme.setBackgroundColor('#F2A900');
    index.theme.changeHeaderThemeColor('#4E3629', 'theme-header-welcome-02');

    var step02_g1 = ["#step02_img01"];

    TweenMax.to(step02_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to(step02_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
    }});

}

function kill_step02()
{
    s2.pause();
    index.theme.killEventsOf(["#step02_img01"]);
}

function step02_unmount()
{
    currentTime = 0;

    // Unmount Step 02
    var step02_g1 = ["#step02_img01"];

    TweenMax.to(step02_g1,     defaultTime, {x:0, y:deslocamentNeg, delay:getAndSetDelay(true),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){        
        step03();
    }});
}

function step03(){

    index.theme.setStep("step03");
    currentTime = 0;
    s3.play();
    
    // Mound Step 03
    index.theme.setBackgroundColor('#E58024');
    index.theme.setBackgroundImage('pages/img19.jpg');
    index.theme.changeHeaderThemeColor('#FFFFFF', 'theme-white');

    var step03_g1 = ["#step03_img01"];

    TweenMax.set(step03_g1,    {x:0, y:deslocamentPos, autoAlpha: 0});

    TweenMax.to(step03_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        pageEnd();
    }});

}

function kill_step03()
{
    s3.pause();
    index.theme.killEventsOf(["#step03_img01"]);
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