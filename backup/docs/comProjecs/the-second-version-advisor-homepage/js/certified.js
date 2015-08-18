$('#login-btn').click(function () {
    var url = "/usercenter/ajax/form.aspx?action=login";
    ajax_submit(url);
});

$('#signup-btn').click(function () {
    var url = "/usercenter/ajax/form.aspx?action=signup";
    ajax_submit(url);
});

function refreshCc() {
    var ccImg = document.getElementById("checkCodeImg");
    if (ccImg) {
        ccImg.src = ccImg.src + '&' + Math.random();
    }
}

function ajax_submit(url) {
//        $('#login-main').showLoading();
//        var url = '/usercenter/ajax/form.aspx?action=login';
    var data = {
        'username': $('#username').val(),
        'password': $('#password').val(),
        'verifyCode': $('#verifyCode').val()
    };
    $.post(url, data, function (json) {
        if ('string' == typeof json) {
            json = eval('(' + json + ')');
        }
        if (json.state == '200') {
            window.location.href = "/usercenter/index.aspx";
        } else {
//                $('#login-main').hideLoading()
            if (json.state == '402') {
                $('#verify_code_msg').html(json.errorMessage).addClass("tips-error").show();
                $('#username_msg').hide();
                $('#msg').hide();
            } else {
                $('#username_msg').html(json.errorMessage).addClass("tips-error").show();
                $('#verify_code_msg').hide();
                $('#msg').hide();
            }
        }
    })
}