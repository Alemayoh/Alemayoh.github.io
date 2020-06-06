"use strict";

$(function() {
    $('#hw').change(function() {
        var file = 'homeworks/' + $('#hw').val();
        $.ajax({
            'url': file,
            'type': 'GET',
            'success': ajaxSuccess,
            'error': ajaxFailure
        });
    });
});

function ajaxSuccess(data) {
    $('#output').val(data);
}

function ajaxFailure(xhr, status, exception) {
    console.log(xhr, status, exception);
}

$.get('https://www.google.com/images/branding/product/ico/googleg_lodp.ico');