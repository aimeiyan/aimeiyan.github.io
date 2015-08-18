/**
 * Created by nancy on 14-9-17.
 */

//
//$("#left-panel li").each(function(){
//    $(this).click(function(){
//        $("#left-panel li").removeClass("active");
//        $(this).addClass("active");
//    })
//})

//refresh webpage
$('.btn-ribbon').click(function() {
    location.reload();
});

// disable browser autocomplete
$('form,input,select,textarea').attr("autocomplete", "off");