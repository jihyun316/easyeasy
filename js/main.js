

$( document ).ready(function() {

  $('.sns').find('.open').on('click', function(){
    $(this).parents('.sns').addClass("on");
  });

  $('.share').find('.close').on('click', function(){
    $(this).parents('.sns').removeClass("on");
  });
  $('#q_mobile').find('.menu').on('click', function(){
    $('#q_mobile').toggleClass("on");
  });

  $('.intro_close').on('click', function(){
    $('.intro_pop').removeClass('active');
  });
  $('.intro_pop_show').on('click', function(){
    $('#intro').removeClass('on');
    $('#quizWrap').addClass('on');
    $('.quiz_zone').delay(200).queue(function(next){
      $(this).addClass("on");
      next();
    });
  });
  $('#show_sheet').on('click', function(){
    $('#resultWrap').removeClass('on');
    $('#answerSheet').addClass('on');
    $('.answer_zone').delay(200).queue(function(next){
      $(this).addClass("on");
      next();
    });
  });

  var qArr = [];
  var qNum = 0;

  $('#mobile_foot').find('button').on('click', function(){

    var listIdx = ($('.quiz_cont ul').find('.on').index()) + 1;

    if($(this).hasClass('prev')){
      $('.progress_bar').css('width', ((100 / 13) * (listIdx -1)) + '%');
      if(listIdx == 1){
        alert('첫번째 문제입니다.');
      }else{
        $('.quiz_cont').find('li').removeClass('on');
        $('.quiz_cont').find('li').eq(listIdx - 2).addClass('on');
        $('#quizWrap .img').find('div').removeClass('on');
        $('#quizWrap .img').find('div').eq(listIdx - 2).addClass('on');
        $('#mobile_foot').find('em').text(listIdx - 1);
      }
    }else{
    
      $('.progress_bar').css('width', ((100 / 13) * (listIdx + 1)) + '%');
      if( listIdx == 13){
        if(qArr.length >= 12){
          $('#quizWrap').removeClass('on');
          $('#resultWrap').addClass('on');
        }else{
          alert('문제를 모두 풀어주세요');
        }
      }else{
        $('.quiz_cont').find('li').removeClass('on');
        $('.quiz_cont').find('li').eq(listIdx).addClass('on');
        $('#quizWrap .img').find('div').removeClass('on');
        $('#quizWrap .img').find('div').eq(listIdx).addClass('on');
        $('#mobile_foot').find('em').text(listIdx + 1);
      }
    }
  });


  $('.answer').find('input').on('click', function(){
    

    $(this).attr('disabled', 'disabled');
    const qIdx = $(this).parents('li').index();
    const qId = $(this).attr('id');
    var qName = qId.substring(qId.lastIndexOf('_') + 1);
    qArr.push(qName);

    $(this).parent('span').addClass('move').delay(500).queue(function(next){
        $(this).removeClass("move");
        next();
    });


    if(qName == 'a'){
      qNum++;
    }
    if(qIdx >= 12) {//마지막 문제
      if(qArr.length >= 12){
        $('#quizWrap').removeClass('on');
        $('#resultWrap').addClass('on');
        $('#result').text(qNum)
      }else{
        alert('문제를 모두 풀어주세요');
      }

    } else{ //마지막 전까지
      $(this).delay(500).queue(function(next){
        $('.quiz_zone nav li').removeClass('on last');
        $('.quiz_zone nav li').eq(qIdx + 1).addClass('on last');
        for(i=0; i < (qIdx + 1); i++) {
          $('.quiz_zone nav li').eq(i).addClass('on');
        }
        $(this).parents('#quizWrap').find('.img div').removeClass('on');
        $(this).parents('#quizWrap').find('.img div').eq(qIdx + 1).addClass('on');
        $(this).parents('li').removeClass('on');
        $(this).parents('li').next('li').addClass('on');
        next();
      });
    }

    $('#mobile_foot').find('em').text(qIdx + 2);
  });

  $('.quiz_zone nav').find('a').on('click', function(e){
    const navIdx = $(this).parents('li').index();
    $('.quiz_zone nav li').removeClass('on last');
    $('.quiz_zone nav li').eq(navIdx).addClass('on last');
    $('.quiz_cont').find('li').removeClass('on');
    $('.quiz_cont').find('li').eq(navIdx).addClass('on');
    for(i=0; i < navIdx; i++) {
      $('.quiz_zone nav li').eq(i).addClass('on');
    }
    e.preventDefault();
  });
  $('#answerSheet .prev').on('click', function(e){
    $('#answerSheet').removeClass('on');
    $('#resultWrap').addClass('on');
    
    e.preventDefault();
  });

});
function shareTwitter() {
  var sendUrl = encodeURIComponent(url);
  window.open("https://twitter.com/intent/tweet?text=&url=" + sendUrl);
}


Kakao.init('0df2803c00045c3afa0fb0f70c710851');

	function sendKakao() {
		snsShareCount('kakao');	
		var url = document.location.href;	
		if(url.indexOf('expDocView.do')> -1){
			url = url.substring(0, url.indexOf('&'));
		}else if(url.indexOf('&') > -1){			
			url = url.substring(0, url.lastIndexOf('&'));
		}	
			
		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title:  "[정책브리핑]\t\n"+$('meta[property="og:title"]').attr('content'),
				description: $('meta[property="og:description"]').attr('content'),
				imageUrl: $('meta[property="og:image"]').attr('content'),
				link: {
				  mobileWebUrl: url,
				  webUrl: url
				}
			}
		});
	}
function sendFaceBook() {
  var title = "<c:out value='${result.title}'/>";
  //var url = "http://www.korea.kr/policy/economyView.do?newsId=" + ${result.newsId};
  var url = document.location.href;
  var href = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url);
  var a = window.open(href, 'facettt', 'width=580, height=255');
} 
