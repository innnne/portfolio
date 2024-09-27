let swiper1, swiper2;
var pjCnt = 0;



$(document).ready(function(){
    //history.scrollRestoration = "auto";

    // === json 불러오기
    async function fetchData(){
        try{
            const response = await fetch('./projects.json');

            if(!response.ok){
                throw new Error('HTTP error : ${response.status}');
            }
            const data = await response.json();

            pjectList(data.project, 'tab-cont1');
            pjectList(data.study, 'tab-cont2');
            
            pjCnt = $('.pject li').length;
            $('#pjCnt').text(pjCnt);
            
        }catch(e){
            console.log("데이터 로딩실패", e);
        }
    }

    // ==== 리스트 불러오기
    function pjectList(pjData, tabId){

        pjData.reverse().forEach(pj => {

            // 프로젝트 목록생성
            const pjList = $('<li></li>');
            const content = '<a href="#none"><p><span>' + pj.tit + '</span><span>' + pj.cus + '</span></p><img src="' + pj.url + '" /></a>';

            pjList.append(content);
            $("#" + tabId + " .pject__list").append(pjList);

            // Swiper 슬라이드 생성

            const slide = $('<div class="layerpop__wrap swiper-slide"></div>');

            const secPic = $('<section class="pic"><img src="' + pj.url + '" alt="' + pj.tit + '" /></section>');
            const secContents = $('<section class="contents"></section>');
            const dataDl = $('<div class="cont"><dl class="data"><dt>' + pj.tit + '</dt><dd>' 
                        + pj.content.replace(/\n/g, '<br />') + '</dd></dl></div>');

            
            // data
            secContents.append(dataDl);
            slide.append(secPic, secContents);
            
            // 240820 
            const skillData = (pj.skills || '').split(' ');
            const bedgeWrap = $('<div class="bedgeWrap"></div>');
            dataDl.before(bedgeWrap);

            skillData.forEach(skill => {
                if(skill === 'html'){
                    //skillEl = $('<span class="bedge html">html</span>');
                    bedgeWrap.append('<span class="bedge html">html</span>');
                }
                if(skill === 'css'){
                    bedgeWrap.append('<span class="bedge css">css</span>');
                }
                if(skill === 'js'){
                    bedgeWrap.append('<span class="bedge js">javascript</span>');
                }
                if(skill === 'jquery'){
                    bedgeWrap.append('<span class="bedge jquery">jQuery</span>');
                }
                if(skill === 'rn'){
                    bedgeWrap.append('<span class="bedge rn">React Native</span>');
                }

                if(skill === 'web'){
                    bedgeWrap.append('<span class="bedge web"></span>');
                }
                if(skill === 'mb'){
                    bedgeWrap.append('<span class="bedge mb"></span>');
                }
                if(skill === 'mw'){
                    bedgeWrap.append('<span class="bedge mw"></span>');
                }
            });
            

            $('#swiper_' + tabId + ' .layerpop__container').append(slide);
        });
            
        

        $("#" + tabId + " .pject__list > li").click(function(e){
            //const idx = pjData.length - $(this).index() - 1;
            const idx = $(this).index();
            popOn(idx, tabId);
        });

        
        //popOn(2,'tab-cont1');
        initialSwiper(tabId);    
        
    }

    function popOn(idx, swiperId){
        $('#swiper_' + swiperId).addClass('on');
        $('.wrapper').addClass('on');
        
        
        if(swiperId === 'tab-cont1'){
            swiper1.slideTo(idx, 1000, false);
        }else{
            swiper2.slideTo(idx, 1000, false);
        }
    }

    function initialSwiper(swiperId){
        if(swiperId === 'tab-cont1'){
            swiper1 = new Swiper('#swiper_' + swiperId, {
                centeredSlides : true,
                spaceBetween : 20,
                slidesPerView : 1,
                slidesPerGroup : 1,
                navigation : {
                    prevEl : '#swiper_' + swiperId + ' .swiper_nav-prev',
                    nextEl : '#swiper_' + swiperId + ' .swiper_nav-next',
                },
                on : {
                    slideChange : function(){
                        const currIdx = this.activeIndex;
                        
                        $("#swiper_" + swiperId + " swiper-slide").removeClass("active");
                        $("#swiper_" + swiperId + " swiper-slide").eq(currIdx).addClass('active');
                    }
                },
            });
        }else{
            swiper2 = new Swiper('#swiper_' + swiperId, {
                centeredSlides : true,
                spaceBetween : 20,
                slidesPerView : 1,
                slidesPerGroup : 1,
                navigation : {
                    prevEl : '#swiper_' + swiperId + ' .swiper_nav-prev',
                    nextEl : '#swiper_' + swiperId + ' .swiper_nav-next',
                },
                on : {
                    slideChange : function(){
                        const currIdx = this.activeIndex;
                        
                        $("#swiper_" + swiperId + " swiper-slide").removeClass("active");
                        $("#swiper_" + swiperId + " swiper-slide").eq(currIdx).addClass('active');
                    }
                },
            });
        }
        

    }

    fetchData();

    
});

window.onload = function(){        
    $('.tab__item > li').click(function(){
        var tabCont = $(this).attr('data-tab');
        $(this).addClass('on').siblings().removeClass('on');

        $('#' + tabCont).addClass('on')
        $('#' + tabCont).siblings().removeClass('on');
    });

    $('.layerpop__close').click(function(){
        $('.layerpop').removeClass('on');
        $('.wrapper').removeClass('on');
    });
}

$(window).scroll(function(){

    var scrollTop = window.pageYOffset;
    var height = $(document).scrollTop();
    var itemPos = $('.pject').offset().top;
    
    $('.pject__list > li').each(function() {
        var $this = $(this);
        if ($this.offset().top + $this.outerHeight() > $(window).scrollTop() &&
            $this.offset().top < $(window).scrollTop() + $(window).height() &&
            !$this.hasClass('animated')) {
            $this.animate({ opacity: 1 }, 600).addClass('animated');
        }
    });
    
    $('.pject__list > li').each(function(i) {
        //console.log(i);
        setTimeout(() => {
            $(this).animate({
                opacity: 1,
            }, 300);
        }, 300 * i);
    });
    //console.log(scrollTop + ', ' + itemPos + ', ' + $(window).outerHeight() );
});
