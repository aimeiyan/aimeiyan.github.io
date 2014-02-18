/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/21/13
 * Time: 8:02 PM
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    $("#jnDetails .selectSize a").click(function () {
        $(this).addClass("cur").parent().siblings().find("a").removeClass("cur");
        $("#jnDetails .selectSize").parent().find("strong").text($(this).text());
    });

    var $num = $("#jnDetails .sum")
    var price = $num.find("strong").text();
    $("#jnDetails .selectNum select").change(function () {
        var amount = $(this).val() * price;
        $num.find("strong").text(amount);
    }).change()
})