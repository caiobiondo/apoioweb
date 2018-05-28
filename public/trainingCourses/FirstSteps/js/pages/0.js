// Sounds
var s1 = null;

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
    
    s1 = index.boom.getSoundById("sc0s1");

    document.querySelector("#inner-content").style.overflow = "visible";

    // Setup Page
    index.theme.setBackgroundImage('pages/dgd01.svg');
    index.theme.changeHeaderThemeColor('#FFF', 'theme-header-white');
    document.querySelector('#player-title').innerHTML = '<p>Preparação</p>';
    
    // Init Animation and Anudio    
    initAudio();
}

function initAudio() {

    s1.load({
       onload: function(){


            this.onPosition(13635, function (eventPosition) {                
                TweenMax.to('#step01_p04, #step01_img02',           defaultTime, {x:0, y:0, delay:defaultDelay,     ease: Power1.easeOut, autoAlpha: 1});
            });


            this.onPosition(15444, function (eventPosition) {
                s1.pause();
                unmount_step01();
            });

            this.onPosition(32000, function (eventPosition) {
                TweenMax.to('#step02_p02, #step02_img02',         defaultTime, {x:0, y:0, delay:defaultDelay,     ease: Power1.easeOut, autoAlpha: 1});
            });



            step01();
        },        
        onfinish: function(){
            s1.destruct();
            pageEnd();
        }
    });
    
    index.theme.currentPageVars.sounds.push(s1);

}

function step01()
{    
    index.theme.setStep("step01");
    currentTime = 0;
    s1.play(0);
    
    // SET
    TweenMax.set('#step01_p01, #step01_p02, #step01_p03',             {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set('#step01_p04, #step01_img02',                          {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set('#step01_p05, #step01_img03',                          {x:deslocamentNeg, y:0, autoAlpha: 0});
    
    // ANIMATE

    TweenMax.to('#step01_p01',                defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step01_p02',                defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step01_p03',                defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});


    //TweenMax.to('#step01_p04, #step01_img02',                           defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step01_p05, #step01_img03',                           defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){

    }});

}

function kill_step01()
{    
    s1.pause();    
    index.theme.killEventsOf(["#step01_p01", "#step01_p02", "#step01_p03", "#step01_img02", "#step01_p04", "#step01_img03", "#step01_p05", "#step01_img04"]);
}

function unmount_step01()
{
    console.log("unmount_step01");
    currentTime = 0;

    TweenMax.to('#step01_p01',                          defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0})
    TweenMax.to('#step01_p02',                          defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0})
    TweenMax.to('#step01_p03',                          defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0})
    TweenMax.to('#step01_p04, #step01_img02',           defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0})
    TweenMax.to('#step01_p05, #step01_img03',           defaultTime, {x:0, y:deslocamentPos, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 0, onComplete:function(){
        console.log("PAGE0 - CALL STEP 02");
        step02();
    }});
}

function step02()
{    
    index.theme.setStep("step02");
    currentTime = 0;
    s1.play(17095);    

    // SET
    TweenMax.set('#step02_p01',                                  {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set('#step02_img01',                                {x:0, y:deslocamentPos, autoAlpha: 0});
    TweenMax.set('#step02_list_item01, #step02_icon01',          {x:deslocamentNeg, y:0, autoAlpha: 0});
    TweenMax.set('#step02_list_item02, #step02_icon02',          {x:0, y:deslocamentNeg, autoAlpha: 0});
    TweenMax.set('#step02_list_item03, #step02_icon03',          {x:0, y:deslocamentNeg, autoAlpha: 0});
    TweenMax.set('#step02_list_item04, #step02_icon04',          {x:0, y:deslocamentNeg, autoAlpha: 0});
    TweenMax.set('#step02_list_item05, #step02_icon05',          {x:0, y:deslocamentNeg, autoAlpha: 0});
    TweenMax.set('#step02_icon06',                               {x:0, y:deslocamentNeg, autoAlpha: 0});
    TweenMax.set('#step02_p02, #step02_img02',                   {x:0, y:deslocamentNeg, autoAlpha: 0});
   
    // ANIMATE
    TweenMax.to('#step02_p01',                                 defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_img01',                               defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_list_item01, #step02_icon01',         defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_list_item02, #step02_icon02',         defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_list_item03, #step02_icon03',         defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_list_item04, #step02_icon04',         defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_list_item05, #step02_icon05',         defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1});
    TweenMax.to('#step02_icon06',                              defaultTime, {x:0, y:0, delay:getAndSetDelay(),     ease: Power1.easeOut, autoAlpha: 1, onComplete:function(){
        
    }});

}

function kill_step02()
{
    s1.pause();
    index.theme.killEventsOf(["#step02_p01", "#step02_img01", "#step02_list_item01", "#step02_icon01", "#step02_list_item02", "#step02_icon02", "#step02_list_item03", "#step02_icon03", "#step02_list_item04", "#step02_icon04", "#step02_list_item05", "#step02_icon05", "#step02_icon06", "#step02_p02", "#step02_img02"]);    
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