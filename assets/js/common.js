 
    
    $(document).ready(function(){
        //history.scrollRestoration = "auto";
        console.log("완");
        fetchData();
        const swiper = new Swiper('.layerpop', {
            centeredSlides : true,
            spaceBetween : 20,
            slidesPerView : 1,
            slidesPerGroup : 1,
            navigation : {
                prevEl : '.swiper-nav > .prev',
                nextEl : '.swiper-nav > .next'
            },
            on : {
                slideChange : function(){
                    const currIdx = this.activeIndex;
                    
                    $(".swiper-slide").removeClass("active");
                    $(".swiper-slide").eq(currIdx).addClass('active');
                }
            },
        });

        // === json 불러오기
        async function fetchData(){
            try{
                const response = await fetch('./projects.json');
                const data = await response.json();
                pjectList(data.project, 'tab-cont1');
                pjectList(data.study, 'tab-cont2');

                renderSlide(data.project);
                //initialSwiper();    
            }catch(e){
                console.log("Error Data Loading...", e);
            }
        }


        function renderSlide(projects){
            projects.forEach(pj => {          

                // 구조
                const slide = $('<div class="layerpop__wrap swiper-slide"></div>');

                const secPic = $('<section class="pic"><img src="' + pj.url + '" alt="' + pj.tit + '" /></section>');
                const secContents = $('<section class="contents"></section>');
                const dataDl = $('<div class="cont"><dl class="data"><dt>' + pj.tit + '</dt><dd>' 
                            + pj.content.replace(/\n/g, '<br />') + '</dd></dl></div>');

                // data
                secContents.append(dataDl);
                slide.append(secPic, secContents);
                $('.layerpop__container').append(slide);
                
            });

            
            /*
            $('.layerpop').attr('id', 'layerpop' + pj[idx].id);

            if(pj.hasOwnProperty){
                $('.cont .data').empty();
                $('.pic > img').attr('src', pj[idx].url);
                $('.cont .data').append('<dt>' + pj[idx].tit + '</dt>');
                $('.cont .data').append('<dd>' + (pj[idx].content.replace(/\n/g,'<br />')) + '</dd>');
            }else{
                alert('!!내용없음!!');
            }

            $('.pic > img').attr('src', pj[idx].url);
            $('.cont .data > dt').text(pj[idx].tit);
            $('.cont .data > dd').html( pj[idx].content.replace(/\n/g, '<br />') );
            
            if(pj[idx].aurl){
                $('#layerpop' + pj[idx].id + ' .cont .data dd').after('<dd><a href="' + pj[idx].aurl + '" target="_blank" >바로가기</a></dd>');
                $('.cont > a').attr('href', pj[idx].aurl);
                console.log("/////url 있음");
            }*/

        }
        // ==== 리스트 불러오기
        function pjectList(pjData, tabId){

            //popOn(2, pjData);
            console.log(pjData.length + '///' + tabId);
            pjData.reverse().forEach(pj => {

                const pjList = $('<li></li>');
                const content = '<a href="#none"><img src="' + pj.url + '" /></a>';

                pjList.append(content);
                $("#" + tabId + " .pject__list").append(pjList);
            });

            $("#" + tabId + " .pject__list > li").click(function(e){
                //const idx = pjData.length - $(this).index() - 1;
                const idx = $(this).index();
                popOn(idx, pjData);
            });
            
        }

        function popOn(idx, pj){
            $('.layerpop').addClass('on');
            $('.wrapper').addClass('on');

            swiper.slideTo(idx, 1000, false);
            
        }


        
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

    
    

        
/* 
    function pjectList(pjData, tabId){
        const dataTab = $("#" + tabId);
        //alert(pjData.length);
        for(var i=0; i<pjData.length; i++){
            $("#" + tabId + " .pject__list").append('<li></li>');
        }
        $("#" + tabId + " .pject__list > li").each(function(i){
            const idx = pjData.length - 1 - i;
            if(pjData.hasOwnProperty(idx)){// 해당 인덱스의 데이터가 존재하는지 확인
                $(this).append('<a href="#none"><img src="' + pjData[idx].url + '"/></a>');
            }
        });

        $('.pject__list > li').click(function(e){
            // #tab-cont 어떤건지 읽어오기
            const idx = $('#tab-cont1 .pject__list > li').length - $(this).index();
            // aurl 있을 때 바로가기 show/hide
            if (pjData.hasOwnProperty(idx)) { // 해당 인덱스의 데이터가 존재하는지 확인
                //$('.cont .data').empty('');
                //e.preventDefault();
                popOn(idx, pjData); 
                //alert(idx);
            } else {
                console.error("정의되지 않은 인덱스입니다:", idx);
            }
        });
    }

   */

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
    