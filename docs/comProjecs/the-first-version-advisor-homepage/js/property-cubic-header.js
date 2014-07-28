    //登录框出现效果
    $(function () {
        $('.login a,#login-chart').click(function () {

            $('#login-box,.overlay').fadeIn();


            return false;

        });
        $('#login-box span').click(function () {
            $('#login-box, .overlay').fadeOut();
        });
    });
