/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/19/13
 * Time: 12:58 PM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    $("#inputSearch").focus(function(){
        $(this).addClass("focus");
        if($(this).val()==this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
            $(this).removeClass("focus");
            if($(this).val()==""){
                $(this).val(this.defaultValue);
            }
        }).keyup(function(e){
            if(e.which==13){
                alert("回车提交表单！")
            }
        })
});