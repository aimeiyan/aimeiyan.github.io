/*
 * SimpleModal Confirm Modal Dialog
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery(function ($) {
    $('#lists .title-time a.del-confirm').click(function (e) {
        e.preventDefault();
        var data = $(this).find("input").val();

        // example of calling the confirm function
        // you must use a callback function to perform the "yes" action
        confirm("确定要删除吗?", function () {
            console.log(data, '+++++++++++++++')
            $.post("/bloglist/" + data, function () {
                window.location.href = '/bloglist';
            })

        });
    });

});

function confirm(message, callback) {
    $('#confirm').modal({
        closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
        position: ["30%", ],
        overlayId: 'confirm-overlay',
        containerId: 'confirm-container',
        onShow: function (dialog) {
            var modal = this;

            $('.message', dialog.data[0]).append(message);

            // if the user clicks "yes"
            $('.yes', dialog.data[0]).click(function () {
                // call the callback
                if ($.isFunction(callback)) {
                    callback.apply();
                }
                // close the dialog
                modal.close(); // or $.modal.close();
            });
        }
    });
}