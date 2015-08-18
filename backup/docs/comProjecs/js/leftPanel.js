$(function(){
    $("#leftPanel").hover(function(){
        $(this).stop(true,true).animate({left:"0"},500);
    },function(){
        $(this).stop(true,true).animate({left:"-222px"},500);
    })
})