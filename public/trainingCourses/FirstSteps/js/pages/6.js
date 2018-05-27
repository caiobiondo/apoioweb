// Sounds
var s1 = null;
var s2 = null;

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
    
    s1 = index.boom.getSoundById("sc6s1");
    s2 = index.boom.getSoundById("sc6s2");

    // Setup Page
    index.theme.setBackgroundImage('pages/img03.jpg');     
    document.querySelector('#player-title').innerHTML = '<p>Bem-vinda</p>';
    index.theme.changeHeaderThemeColor('#E88024', 'theme-header-welcome');

    // Init Animation and Anudio
    step01();
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
            pageEnd();
        }
    });

    index.theme.currentPageVars.sounds.push(s1);
    index.theme.currentPageVars.sounds.push(s2);

}

function step01(){

    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);

    index.theme.setBackgroundImage('pages/img08.jpg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-your-beauty');

    var step01_g1 =["#step01_box01"];
    var step01_g2 =["#step01_p01","#step01_img01"];

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
    index.theme.killEventsOf(["#step01_box01", "#step01_p01","#step01_img01"]);
}

function step01_unmount()
{
    currentTime = 0;

    // Unmount Step 01
    var step01_g1 =["#step01_box01"];
    var step01_g2 =["#step01_p01","#step01_img01"];

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
    index.theme.setBackgroundImage('pages/img18.jpg');
    index.theme.changeHeaderThemeColor('#E36B21', 'theme-header-your-beauty-02');

    var step02_g1 =["#step02_img01", "#step02_p01"];
    
    TweenMax.set(step02_g1,    {x:0, y:deslocamentPos, autoAlpha: 0});
    
    TweenMax.to(step02_g1,     defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        pageEnd();
    }});

}

function kill_step02()
{
    s2.pause();
    index.theme.killEventsOf(["#step02_img01", "#step02_p01"]);
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